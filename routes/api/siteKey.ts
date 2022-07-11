import { HandlerContext } from "$fresh/server.ts";

export const handler = (req: Request, _ctx: HandlerContext): Response => {
  if (req.method !== "GET") return new Response("Not Found", { status: 404 });

  const siteKey = Deno.env.get("SITE_KEY");

  if (siteKey) {
    return new Response(JSON.stringify({ siteKey }));
  }

  return new Response(undefined, { status: 500 });
};
