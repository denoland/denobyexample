import { gfm, Handlers } from "../server_deps.ts";

export const handler: Handlers = {
  GET() {
    return new Response(gfm.CSS, {
      status: 200,
      headers: {
        "content-type": "text/css; charset: utf-8",
      },
    });
  },
};
