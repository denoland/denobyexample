import { gfm, HandlerContext } from "../deps.ts";

export const handler = (_ctx: HandlerContext) => {
  return new Response(gfm.CSS, {
    status: 200,
    headers: {
      "content-type": "text/css; charset: utf-8",
    },
  });
};
