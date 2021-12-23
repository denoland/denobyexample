/**
 * @title Static File Server
 * @difficulty intermediate
 * @tags cli, deploy
 * @run --allow-read --allow-write <url>
 *
 * An example of an HTTP static file server, with ability to render directories
 * and ignore specific paths.
 */

import { serve } from "https://deno.land/std@0.118.0/http/server.ts";
import { lookup } from "https://deno.land/x/media_types@v2.11.0/mod.ts";
import { generateDir } from "./hidden/directory.ts";

export const IGNORE_PATHS = [
  "/main.ts",
  "/hidden",
  "/images/secret.txt",
] as const;

async function serveFile(path: string): Promise<Response> {
  const url = new URL(path, import.meta.url);
  const res = await fetch(url);
  return new Response(res!.body, {
    headers: {
      "content-type": lookup(path) ?? "application/octet-stream",
    },
  });
}

async function handler(req: Request): Promise<Response> {
  const pathname = (new URL(req.url)).pathname;
  const url = new URL("." + pathname, import.meta.url);

  if (IGNORE_PATHS.some((ignored) => pathname.startsWith(ignored))) {
    return serveFile("./hidden/404.html");
  }

  try {
    const stat = await Deno.stat(url);

    if (!stat.isFile) {
      return new Response(await generateDir(pathname, url), {
        headers: {
          "content-type": "text/html",
        },
      });
    }

    return await serveFile("." + pathname);
  } catch (e) {
    if (
      e.message === "NetworkError when attempting to fetch resource." ||
      e instanceof Deno.errors.NotFound
    ) {
      return serveFile("./hidden/404.html");
    }
    throw e;
  }
}

// To start the server on the default port, call `serve` with the handler.
console.log("Listening on http://localhost:8000");
serve(handler);
