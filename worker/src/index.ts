export interface Env {
  INTERNAL_API: Fetcher;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    try {
      const url = new URL(request.url);

      // Forward the exact request pathname and search params to your local server
      const targetUrl = `http://localhost:6767${url.pathname}${url.search}`;
      
      const modifiedRequest = new Request(targetUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: request.redirect,
      });

      return await env.INTERNAL_API.fetch(modifiedRequest);
    } catch (error) {
      return new Response("Local server unreachable via tunnel.", { status: 502 });
    }
  },
} satisfies ExportedHandler<Env>;