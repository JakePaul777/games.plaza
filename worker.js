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
        const buf = await parts[0].clone().arrayBuffer();
        enc = pickEncoding(path, new Uint8Array(buf, 0, 4));
      }
    }

    // 4. Buffer all parts into one contiguous body up front.
    // Streaming them lazily caused incomplete chunked transfers (Unity cancels
    // mid-stream / ASSETS body streams time out). Reading everything eagerly
    // keeps the response complete and lets us send an accurate Content-Length.
    const buffers = [];
    let total = 0;
    for (const p of parts) {
      const b = await p.arrayBuffer();
      buffers.push(b);
      total += b.byteLength;
    }
    // release part responses
    parts.forEach((p) => p.body?.cancel().catch(() => {}));

    const stitched = new Uint8Array(total);
    let offset = 0;
    for (const b of buffers) {
      stitched.set(new Uint8Array(b), offset);
      offset += b.byteLength;
    }

    const headers = buildHeaders(path, enc, total);

    if (request.method === "HEAD") {
      return new Response(null, { status: 200, headers, encodeBody: "manual" });
    }

    return new Response(stitched, { status: 200, headers, encodeBody: "manual" });
  },
};