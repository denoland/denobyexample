/**
 * @title HTTP Server: Streaming
 * @difficulty intermediate
 * @tags cli, deploy
 * @run --allow-net <url>
 * @resource {/http-server} Example: HTTP Server: Hello World
 * @resource {https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream} MDN: ReadableStream
 * @playground https://dash.deno.com/playground/example-streaming
 *
 * An example HTTP server that streams a response back to the client.
 */

// Import the http server from std/http.
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

function handler(_req: Request): Response {
  // Set up a variable to store a timer ID, and the ReadableStream.
  let timer: number | undefined;

  const body = new ReadableStream({
    // When the stream is first created, start an interval that will emit a
    // chunk every second containing the current time.
    start(controller) {
      timer = setInterval(() => {
        const message = `It is ${new Date().toISOString()}\n`;
        controller.enqueue(new TextEncoder().encode(message));
      }, 1000);
    },
    // If the stream is closed (the client disconnects), cancel the interval.
    cancel() {
      if (timer !== undefined) {
        clearInterval(timer);
      }
    },
  });

  // Return a response with the stream as the body.
  return new Response(body, {
    headers: {
      "content-type": "text/plain",
      "x-content-type-options": "nosniff",
    },
  });
}

// To start the server on the default port, call `serve` with the handler.
console.log("Listening on http://localhost:8000");
serve(handler);
