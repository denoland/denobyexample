/**
 * @title TCP Listener: Ping
 * @difficulty intermediate
 * @tags cli
 * @run --allow-net <url>
 * @resource {https://deno.land/api?s=Deno.listen} Deno.listen: API
 *
 * An example of a TCP listener on localhost that will log the message if written to and close the connection if connected to.
 */
const decoder = new TextDecoder();

const listener = Deno.listen({
  hostname: "127.0.0.1",
  port: 8080,
  transport: "tcp",
});
for await (const conn of listener) {
  const buf = new Uint8Array(1024);
  await conn.read(buf);
  console.log("Server - received: ", decoder.decode(buf));
  conn.close();
}
