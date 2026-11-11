export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // 1. Construct paths for part 1 and part 2
    const part1Url = new URL(request.url);
    part1Url.pathname = `${pathname}.part001`;

    const part2Url = new URL(request.url);
    part2Url.pathname = `${pathname}.part002`;

    // 2. Try fetching part 1 from your static assets
    const res1 = await env.ASSETS.fetch(new Request(part1Url, request));

    // 3. If part 1 exists, check for and fetch part 2
    if (res1.ok) {
      const res2 = await env.ASSETS.fetch(new Request(part2Url, request));

      if (res2.ok) {
        const buf1 = await res1.arrayBuffer();
        const buf2 = await res2.arrayBuffer();

        const combinedBlob = new Blob([buf1, buf2]);

        const headers = new Headers(res1.headers);
        headers.set("Content-Length", combinedBlob.size);

        return new Response(combinedBlob, {
          status: 200,
          headers: headers,
        });
      }
    }

    // 4. Fallback: If parts don't exist, serve the requested file normally
    return await env.ASSETS.fetch(request);
  },
};