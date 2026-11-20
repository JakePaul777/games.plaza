export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const url = new URL(request.url);
    const path = url.pathname;

    const requireCorp = path === "/games/eagler/26.3" || path.startsWith("/games/eagler/26.3/");
    if (requireCorp) {
      const headers = new Headers(response.headers);
      headers.set("Cross-Origin-Opener-Policy", "same-origin");
      headers.set("Cross-Origin-Embedder-Policy", "require-corp");
      headers.set("Cross-Origin-Resource-Policy", "same-origin");
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }
    const headers = new Headers(response.headers);
    if (!headers.has("Cross-Origin-Opener-Policy")) {
      headers.set("Cross-Origin-Opener-Policy", "same-origin");
    }
    if (!headers.has("Cross-Origin-Embedder-Policy")) {
      headers.set("Cross-Origin-Embedder-Policy", "credentialless");
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};