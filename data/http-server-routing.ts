/**
 * @title HTTP Server: Routing
 * @difficulty intermediate
 * @tags cli, deploy
 * @run --allow-net <url>
 *
 * An example of a HTTP server that handles requests with different reponses
 * based on the incoming URL.
 */

// Import the http server from std/http.
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

// URL patterns can be used to match request URLs. They can contain named groups
// that can be used to extract parts of the URL, e.g. the book ID.
const BOOK_ROUTE = new URLPattern({ pathname: "/books/:id" });

function handler(req: Request): Response {
  // Match the incoming request against the URL patterns.
  const match = BOOK_ROUTE.exec(req.url);
  // If there is a match, extract the book ID and return a response.
  if (match) {
    const id = match.pathname.groups.id;
    return new Response(`Book ${id}`);
  }

  // If there is no match, return a 404 response.
  return new Response("Not found (try /books/1)", {
    status: 404,
  });
}

// To start the server on the default port, call `serve` with the handler.
console.log("Listening on http://localhost:8000");
serve(handler);
