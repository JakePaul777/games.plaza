const ENCODING = "auto";
const MAX_PARTS = 30;
// Cache-busting bucket: rotate every hour so stale cached responses
// (browser HTTP cache + any Cache API entries) are abandoned and refetched.
const CACHE_BUCKET_MS = 60 * 60 * 1000;
function cacheBucket() { return Math.floor(Date.now() / CACHE_BUCKET_MS); }

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil((async () => {
  // Drop any previously stored caches so old versions can't linger.
  try {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
  } catch (e) {}
  await self.clients.claim();
})()));

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.method !== "GET" && req.method !== "HEAD") return;
  if (url.pathname.includes(".part")) return;
  // Eaglercraft 26.3 (Horizon) shares memory across threads: it needs
  // COEP "require-corp" instead of the site's usual "credentialless".
  // Bust the browser HTTP cache by versioning the URL with the current hour bucket.
  // New bucket => new URL => cache miss => fresh fetch, while old entries go stale.
  const busted = new URL(url.href);
  busted.searchParams.set("_v", String(cacheBucket()));
  // `req` may be a navigation request, whose `mode` is "navigate". The
  // Request constructor rejects "navigate" in RequestInit, so copy only
  // the safe, transferable fields and let the mode default.
  const init = {};
  for (const k of ['method', 'headers', 'credentials', 'cache', 'redirect',
                   'referrer', 'referrerPolicy', 'integrity', 'keepalive', 'signal']) {
    if (req[k] !== undefined) init[k] = req[k];
  }
  const bustedReq = new Request(busted.href, init);
  event.respondWith(handle(bustedReq, busted));
});

function withCOI(res, url) {
  if (!res || res.status === 0) return res;
  const gamePath = !!url && (url.pathname === "/games/eagler/26.3" || url.pathname.startsWith("/games/eagler/26.3/"));
  const coep = gamePath ? "require-corp" : "credentialless";
  const headers = new Headers(res.headers);
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Cross-Origin-Embedder-Policy", coep);
  if (gamePath) headers.set("Cross-Origin-Resource-Policy", "same-origin");
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
}

function typeFor(path) {
  if (path.endsWith(".js.unityweb")) return "application/javascript";
  return "application/octet-stream";
}

function isGzip(head) {
  return !!head && head[0] === 0x1f && head[1] === 0x8b;
}

async function peek(stream) {
  const [a, b] = stream.tee();
  const reader = a.getReader();
  const { value } = await reader.read();
  reader.cancel().catch(() => {});
  return { head: value, body: b };
}

async function sniffUrl(url) {
  const res = await fetch(url);
  if (!res.ok || !res.body) return null;
  const reader = res.body.getReader();
  const { value } = await reader.read();
  reader.cancel().catch(() => {});
  return isGzip(value) ? "gzip" : null;
}

function decode(stream, enc) {
  if (!stream) return null;
  if (enc === "gzip") return stream.pipeThrough(new DecompressionStream("gzip"));
  if (enc === "br") return stream.pipeThrough(new DecompressionStream("brotli"));
  return stream;
}

function build(url, body, length, enc) {
  const h = new Headers();
  h.set("Content-Type", typeFor(url.pathname));
  h.set("Cache-Control", "public, max-age=3600");
  if (length && !enc) h.set("Content-Length", String(length));
  return new Response(decode(body, enc), { status: 200, headers: h });
}

async function findParts(url) {
  const urls = [];
  let total = 0;
  let known = true;
  for (let i = 1; i <= MAX_PARTS; i++) {
    const partUrl = `${url.origin}${url.pathname}.part${String(i).padStart(3, "0")}?_v=${cacheBucket()}`;
    const head = await fetch(partUrl, { method: "HEAD" });
    if (!head.ok) break;
    if ((head.headers.get("content-type") || "").includes("text/html")) break;
    const len = Number(head.headers.get("content-length")) || 0;
    if (len) total += len;
    else known = false;
    urls.push(partUrl);
  }
  return urls.length ? { urls, total: known ? total : 0 } : null;
}

function streamParts(urls) {
  let i = 0;
  let reader = null;
  return new ReadableStream({
    async pull(controller) {
      while (true) {
        if (!reader) {
          if (i >= urls.length) return controller.close();
          const res = await fetch(urls[i++]);
          if (!res.ok || !res.body) return controller.error(new Error(`Part ${i} failed: ${res.status}`));
          reader = res.body.getReader();
        }
        const { done, value } = await reader.read();
        if (done) {
          reader = null;
          continue;
        }
        controller.enqueue(value);
        return;
      }
    },
    cancel() {
      return reader ? reader.cancel() : undefined;
    },
  });
}

async function handle(req, url) {
  let direct;
  try {
    direct = await fetch(req);
  } catch (e) {
    return fetch(req);
  }
  const isUnity = url.pathname.endsWith(".unityweb");

  if (direct.status !== 404) {
    if (direct.status === 200 && isUnity && req.method === "GET" && direct.body) {
      let enc = ENCODING === "auto" ? null : ENCODING;
      let body = direct.body;
      if (ENCODING === "auto") {
        const p = await peek(body);
        enc = isGzip(p.head) ? "gzip" : null;
        body = p.body;
      }
      return withCOI(build(url, body, Number(direct.headers.get("content-length")) || 0, enc), url);
    }
    return withCOI(direct, url);
  }

  const found = await findParts(url);
  if (!found) return withCOI(direct, url);

  let enc = null;
  if (isUnity) enc = ENCODING === "auto" ? await sniffUrl(found.urls[0]) : ENCODING;

  if (req.method === "HEAD") return withCOI(build(url, null, found.total, enc), url);
  return withCOI(build(url, streamParts(found.urls), found.total, enc), url);
}
