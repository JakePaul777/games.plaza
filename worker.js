// "auto": add Content-Encoding only if the file is gzip (starts with 1F 8B), otherwise none.
// Set to "br", "gzip", or null to force it.
const ENCODING = "auto";

function typeFor(path) {
  // Unity loads .unityweb files as raw buffers, so the wasm type isn't needed.
  // Keep wasm as octet-stream (same as the data file, which delivers correctly).
  if (path.endsWith(".js.unityweb")) return "application/javascript";
  return "application/octet-stream";
}

function pickEncoding(path, head) {
  if (!path.endsWith(".unityweb")) return null;
  if (ENCODING !== "auto") return ENCODING;
  if (head && head[0] === 0x1f && head[1] === 0x8b) return "gzip";
  return null; // Brotli has no magic bytes, so never guess it; set ENCODING = "br" explicitly if needed
}

function buildHeaders(path, encoding, length) {
  const h = new Headers();
  h.set("Content-Type", typeFor(path));
  if (encoding) h.set("Content-Encoding", encoding);
  if (length) h.set("Content-Length", String(length));
  h.set("Cache-Control", "public, max-age=3600");
  return h;
}

// Reads just the first chunk of a stream without buffering the rest.
// Returns { head, body } where body is the full stream, safe to send.
async function peekStream(stream) {
  const [peek, rest] = stream.tee();
  const reader = peek.getReader();
  const { value } = await reader.read();
  reader.cancel().catch(() => {});
  return { head: value, body: rest };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    if ((request.method !== "GET" && request.method !== "HEAD") || path.includes(".part")) {
      return env.ASSETS.fetch(request);
    }

    // 1. Real file first
    const direct = await env.ASSETS.fetch(request);
    if (direct.status !== 404) {
      // Unsplit .unityweb files (e.g. framework.js.unityweb) still need the right headers.
      // Stream the body; only peek at the first bytes to detect gzip.
      if (direct.status === 200 && path.endsWith(".unityweb")) {
        let enc = ENCODING === "auto" ? null : ENCODING;
        let body = direct.body;

        if (ENCODING === "auto" && request.method !== "HEAD" && body) {
          const peeked = await peekStream(body);
          enc = pickEncoding(path, peeked.head);
          body = peeked.body;
        }

        const len = direct.headers.get("content-length");
        return new Response(request.method === "HEAD" ? null : body, {
          status: 200,
          headers: buildHeaders(path, enc, len ? Number(len) : 0),
          encodeBody: "manual",
        });
      }
      return direct;
    }

    // 2. Probe split parts with HEAD requests (sizes only, no bodies held open)
    const partUrls = [];
    let total = 0;
    let lengthKnown = true;
    for (let i = 1; i <= 30; i++) {
      const partUrl = new URL(request.url);
      partUrl.pathname = `${path}.part${String(i).padStart(3, "0")}`;

      const head = await env.ASSETS.fetch(new Request(partUrl, { method: "HEAD" }));
      if (!head.ok) break; // no more parts

      let len = Number(head.headers.get("content-length")) || 0;
      if (!len) {
        // Some asset responses omit Content-Length on HEAD; try a GET and drop the body.
        const probe = await env.ASSETS.fetch(new Request(partUrl));
        if (!probe.ok) break;
        len = Number(probe.headers.get("content-length")) || 0;
        probe.body?.cancel().catch(() => {});
      }

      partUrls.push(partUrl);
      if (len) total += len;
      else lengthKnown = false; // can't promise an exact length; stream without one
    }

    if (partUrls.length === 0) return direct; // genuine 404
    if (!lengthKnown) total = 0; // buildHeaders skips Content-Length when 0

    // 3. Work out encoding from the first few bytes of part 1 (.unityweb only)
    let enc = null;
    let firstBody = null;
    if (path.endsWith(".unityweb")) {
      if (ENCODING !== "auto") {
        enc = ENCODING;
      } else if (request.method !== "HEAD") {
        const firstRes = await env.ASSETS.fetch(new Request(partUrls[0]));
        const peeked = await peekStream(firstRes.body);
        enc = pickEncoding(path, peeked.head);
        firstBody = peeked.body; // reuse for part 1 so it isn't fetched twice
      } else {
        // HEAD: just read a small first chunk and discard it
        const firstRes = await env.ASSETS.fetch(new Request(partUrls[0]));
        const peeked = await peekStream(firstRes.body);
        enc = pickEncoding(path, peeked.head);
        peeked.body.cancel().catch(() => {});
      }
    }

    const headers = buildHeaders(path, enc, total);

    if (request.method === "HEAD") {
      return new Response(null, { status: 200, headers, encodeBody: "manual" });
    }

    // 4. Stream parts back-to-back. Only one part is being read at a time, and
    // FixedLengthStream gives the client an accurate Content-Length.
    const { readable, writable } = lengthKnown
      ? new FixedLengthStream(total)
      : new TransformStream();
    ctx.waitUntil(
      (async () => {
        try {
          for (let i = 0; i < partUrls.length; i++) {
            let body;
            if (i === 0 && firstBody) {
              body = firstBody;
            } else {
              const res = await env.ASSETS.fetch(new Request(partUrls[i]));
              if (!res.ok || !res.body) throw new Error(`Part ${i + 1} failed: ${res.status}`);
              body = res.body;
            }
            await body.pipeTo(writable, { preventClose: true });
          }
          await writable.close();
        } catch (err) {
          await writable.abort(err).catch(() => {});
        }
      })()
    );

    return new Response(readable, { status: 200, headers, encodeBody: "manual" });
  },
};
