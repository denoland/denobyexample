/**
 * @title Deno KV Watch
 * @difficulty intermediate
 * @tags cli, deploy
 * @run --unstable <url>
 * @resource {https://deno.land/manual/runtime/kv} Deno KV user guide
 * @resource {https://deno.land/api?unstable=&s=Deno.Kv} Deno KV Runtime API docs
 *
 * Deno KV watch allows you to detect changes to your KV database, making
 * it easier to build real-time applications, newsfeeds, chat, and more.
 */

// Open the default database
const kv = await Deno.openKv();

// Set value in ["counter"] to 0, then increment every second.
await kv.set(["counter"], new Deno.KvU64(0n));
setInterval(() => {
  kv.atomic().sum(["counter"], 1n).commit();
}, 1000);

// Create a server that responds with a stream. Each time
// a change to ["counter"] is detected, send the updated value to
// the client.
Deno.serve((_req) => {
  const stream = kv.watch([["counter"]]).getReader();
  const body = new ReadableStream({
    async start(controller) {
      while (true) {
        if ((await stream.read()).done) {
          return;
        }
        const data = await kv.get(["counter"]);
        controller.enqueue(
          new TextEncoder().encode(`Counter: ${data.value}\n`),
        );
      }
    },
    cancel() {
      stream.cancel();
    },
  });
  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream",
    },
  });
});
