// "auto": add Content-Encoding only if the file is gzip (starts with 1F 8B), otherwise none.
// Set to "br", "gzip", or null to force it.
const ENCODING = "auto";

function typeFor(path) {
  if (path.endsWith(".wasm.unityweb")) return "application/wasm";
  if (path.endsWith(".js.unityweb")) return "application/javascript";
  return "application/octet-stream";
}

function pickEncoding(path, head) {
  if (!path.endsWith(".unityweb")) return null;
  if (ENCODING !== "auto") return ENCODING;
  if (head[0] === 0x1f && head[1] === 0x8b) return "gzip";
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
      // Unsplit .unityweb files (e.g. framework.js.unityweb) still need the right headers
      if (direct.status === 200 && path.endsWith(".unityweb")) {
        const buf = await direct.arrayBuffer();
        const enc = pickEncoding(path, new Uint8Array(buf, 0, 4));
        return new Response(request.method === "HEAD" ? null : buf, {
          status: 200,
          headers: buildHeaders(path, enc, buf.byteLength),
          encodeBody: "manual",
        });
      }
      return direct;
    }

    // 2. Look for split parts (clean requests, no conditional/range headers)
    const parts = [];
    for (let i = 1; i <= 30; i++) {
      const partUrl = new URL(request.url);
      partUrl.pathname = `${path}.part${String(i).padStart(3, "0")}`;
      const res = await env.ASSETS.fetch(new Request(partUrl));
      if (!res.ok) {
        res.body?.cancel();
        break;
      }
      parts.push(res);
    }

    if (parts.length === 0) return direct; // genuine 404

    // 3. Work out encoding from the first few bytes of part 1
    let enc = null;
    if (path.endsWith(".unityweb")) {
      if (ENCODING !== "auto") {
        enc = ENCODING;
      } else {
        const reader = parts[0].clone().body.getReader();
        const { value } = await reader.read();
        reader.cancel();
        enc = pickEncoding(path, value);
      }
    }

    const lengths = parts.map((p) => Number(p.headers.get("Content-Length")));
    const total = lengths.every((n) => n > 0) ? lengths.reduce((a, b) => a + b, 0) : 0;
    const headers = buildHeaders(path, enc, 0); // no Content-Length: chunked, avoids any length mismatch

    if (request.method === "HEAD") {
      parts.forEach((p) => p.body?.cancel());
      return new Response(null, { status: 200, headers, encodeBody: "manual" });
    }

    // Pull-based stream: reads the next chunk only when the browser wants it.
    // No background task, so nothing to get cut off when the response returns.
    let idx = 0;
    let reader = null;
    const stitched = new ReadableStream({
      async pull(controller) {
        while (true) {
          if (!reader) {
            if (idx >= parts.length) {
              controller.close();
              return;
            }
            reader = parts[idx++].body.getReader();
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
        parts.forEach((p) => p.body?.cancel().catch(() => {}));
      },
    });

    // encodeBody "manual" = bytes are already compressed, send them as-is
    return new Response(stitched, { status: 200, headers, encodeBody: "manual" });
  },
};
