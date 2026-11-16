// sw.js - serve this from the site root (/sw.js) so it controls every page.
// If a file 404s but name.part001, name.part002, ... exist, the browser fetches
// the parts and streams them back to the page as one file. No Worker CPU used.

// Only affects .unityweb files:
//   "auto" = decompress if gzip (detected by magic bytes), otherwise pass through
//   "gzip" / "br" = always decompress with that format, null = never
const ENCODING = "auto";
const MAX_PARTS = 30;

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.method !== "GET" && req.method !== "HEAD") return;
  if (url.pathname.includes(".part")) return; // let part files load normally
  event.respondWith(handle(req, url));
});

function typeFor(path) {
  if (path.endsWith(".js.unityweb")) return "application/javascript";
  return "application/octet-stream";
}

function isGzip(head) {
  return !!head && head[0] === 0x1f && head[1] === 0x8b;
}

// Read the first chunk of a stream without buffering the rest.
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
  // Brotli only works in browsers that support DecompressionStream("brotli")
  if (enc === "br") return stream.pipeThrough(new DecompressionStream("brotli"));
  return stream;
}

function build(url, body, length, enc) {
  const h = new Headers();
  h.set("Content-Type", typeFor(url.pathname));
  h.set("Cache-Control", "public, max-age=3600");
  // Decompressed size is unknown, so only send a length for raw bodies
  if (length && !enc) h.set("Content-Length", String(length));
  return new Response(decode(body, enc), { status: 200, headers: h });
}

// Probe name.part001, .part002, ... with HEAD requests until one is missing.
async function findParts(url) {
  const urls = [];
  let total = 0;
  let known = true;
  for (let i = 1; i <= MAX_PARTS; i++) {
    const partUrl = `${url.origin}${url.pathname}.part${String(i).padStart(3, "0")}`;
    const head = await fetch(partUrl, { method: "HEAD" });
    if (!head.ok) break;
    if ((head.headers.get("content-type") || "").includes("text/html")) break; // SPA fallback, not a real part
    const len = Number(head.headers.get("content-length")) || 0;
    if (len) total += len;
    else known = false;
    urls.push(partUrl);
  }
  return urls.length ? { urls, total: known ? total : 0 } : null;
}

// Fetch parts one at a time and emit their bytes back-to-back.
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
  const direct = await fetch(req);
  const isUnity = url.pathname.endsWith(".unityweb");

  if (direct.status !== 404) {
    // Unsplit .unityweb files still need the right type / decompression
    if (direct.status === 200 && isUnity && req.method === "GET" && direct.body) {
      let enc = ENCODING === "auto" ? null : ENCODING;
      let body = direct.body;
      if (ENCODING === "auto") {
        const p = await peek(body);
        enc = isGzip(p.head) ? "gzip" : null;
        body = p.body;
      }
      return build(url, body, Number(direct.headers.get("content-length")) || 0, enc);
    }
    return direct;
  }

  const found = await findParts(url);
  if (!found) return direct; // genuine 404

  let enc = null;
  if (isUnity) enc = ENCODING === "auto" ? await sniffUrl(found.urls[0]) : ENCODING;

  if (req.method === "HEAD") return build(url, null, found.total, enc);
  return build(url, streamParts(found.urls), found.total, enc);
}
