/**
 * @title Outbound Websockets
 * @difficulty beginner
 * @tags cli, deploy, web
 * @run --allow-net <url>
 * @resource {https://developer.mozilla.org/en-US/docs/Web/API/WebSocket} MDN: WebSocket
 *
 * Opening a WebSocket connection for real-time, bi-directional communication with Deno is very simple.
 */

// First we need to use the WebSocket constructor to initiate
// our connection to an external server
const socket = new WebSocket("ws://ws.example.com");

// Before we do anything with the websocket, we should
// wait to make sure that we are connected. We can do
// so by listening to the "open" event.
socket.addEventListener("open", () => {
  // We can ready the "ready state" of our instance
  // this determines if we are able to send messages.
  // The ready state for open should be 1.
  console.log(socket.readyState);

  // We can now send messages to the server. The messages
  // can be of the type string, ArrayBuffer, Blob, or
  // TypedArray. In this case we will be sending a string
  socket.send("ping");
});

// We can handle messages back from the server by listing
// to the "message" event. We can ready the data sent by
// the server using the data property of the event.
socket.addEventListener("message", (event) => {
  console.log(event.data);
});
