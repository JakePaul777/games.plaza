export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    let i = 1;
    let firstRes = null;
    const partResponses = [];

    // Quickly verify and collect responses for all existing parts
    while (i <= 30 && !url.pathname.includes('.part')) {
      const partNumStr = String(i).padStart(3, '0');
      const partUrl = new URL(request.url);
      partUrl.pathname = `${pathname}.part${partNumStr}`;

      const partRes = await env.ASSETS.fetch(new Request(partUrl, request));
      if (!partRes.ok) {
        break;
      }
      if (i === 1) {
        firstRes = partRes;
      }
      partResponses.push(partRes);
      i++;
    }

    // If split parts were found, stream them together sequentially
    if (partResponses.length > 0) {
      const headers = new Headers(firstRes.headers);
      headers.set("Content-Type", "application/octet-stream");

      // If it's a HEAD request, just return headers without streaming bodies
      if (request.method === "HEAD") {
        return new Response(null, {
          status: 200,
          headers: headers,
        });
      }

      const { readable, writable } = new TransformStream();
      
      ctx.waitUntil((async () => {
        const writer = writable.getWriter();
        try {
          for (const res of partResponses) {
            // Guard against null bodies (like on HEAD requests or empty assets)
            if (res.body) {
              const reader = res.body.getReader();
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                await writer.write(value);
              }
            }
          }
        } finally {
          await writer.close();
        }
      })());

      return new Response(readable, {
        status: 200,
        headers: headers,
      });
    }

    // Fallback for regular files
    return await env.ASSETS.fetch(request);
  },
};