export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    const buffers = [];
    let i = 1;
    let firstRes = null;

    // Loop dynamically to check for part001, part002, part003, ... until one is missing
    while (true) {
      const partNumStr = String(i).padStart(3, '0');
      const partUrl = new URL(request.url);
      partUrl.pathname = `${pathname}.part${partNumStr}`;

      const partRes = await env.ASSETS.fetch(new Request(partUrl, request));

      // If the part doesn't exist, stop checking
      if (!partRes.ok) {
        break;
      }

      // Keep track of the first response to copy its headers later
      if (i === 1) {
        firstRes = partRes;
      }

      buffers.push(await partRes.arrayBuffer());
      i++;
    }

    // If parts were found and collected, stitch them together
    if (buffers.length > 0) {
      const combinedBlob = new Blob(buffers);

      const headers = new Headers(firstRes.headers);
      headers.set("Content-Length", combinedBlob.size);

      return new Response(combinedBlob, {
        status: 200,
        headers: headers,
      });
    }

    // Fallback: If no split parts exist for this file, serve it normally
    return await env.ASSETS.fetch(request);
  },
};