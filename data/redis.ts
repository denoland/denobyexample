/**
 * @title Connect to Redis
 * @difficulty intermediate
 * @tags cli, deploy
 * @run --allow-net --allow-env <url>
 * @resource {https://jsr.io/@iuioiua/r2d2} r2d2 module on jsr.io
 * @resource {https://redis.io/docs/getting-started/} Getting started with Redis
 * @dependency jsr:@iuioiua/r2d2
 *
 * Using the r2d2 module, you can connect to a Redis database running anywhere.
 */

// Import the `sendCommand()` function from r2d2
import { RedisClient } from "@iuioiua/r2d2";

// Create a TCP connection with the Redis server
const redisConn = await Deno.connect({ port: 6379 });
const redisClient = new RedisClient(redisConn);

// Authenticate with the server by sending the command "AUTH <username> <password>"
await redisClient.sendCommand([
  "AUTH",
  Deno.env.get("REDIS_USERNAME")!,
  Deno.env.get("REDIS_PASSWORD")!,
]);

// Set the "hello" key to have value "world" using the command "SET hello world"
await redisClient.sendCommand(["SET", "hello", "world"]); // "OK"

// Get the "hello" key using the command "GET hello"
await redisClient.sendCommand(["GET", "hello"]); // "world"

// Close the connection to the database
redisConn.close();
