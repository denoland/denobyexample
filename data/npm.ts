/**
 * @title Import modules from npm
 * @difficulty beginner
 * @tags cli
 * @run --allow-net --allow-read --allow-env <url>
 * @resource {https://docs.deno.com/runtime/manual/node} Node.js / npm support in Deno
 * @resource {https://docs.deno.com/runtime/manual/node/npm_specifiers} npm: specifiers
 * @resource {https://www.npmjs.com/package/express} express on npmjs.com
 * @dependency npm:express
 * @dependency npm:@types/express
 *
 * Use JavaScript modules from npm in your Deno programs with the "npm:"
 * specifier in your imports.
 */

// After adding the module using deno add, you can import it like any other
// module.

// @deno-types="@types/express";
import express from "express";

// Create an express server.
const app = express();

// Configure a route that will process HTTP GET requests.
app.get("/", (_req, res) => {
  res.send("Welcome to the Dinosaur API!");
});

// Start an HTTP server using the configured Express app.
app.listen(3000);
