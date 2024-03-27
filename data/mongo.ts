/**
 * @title Connect to MongoDB
 * @difficulty intermediate
 * @tags cli, deploy
 * @run --allow-net --allow-sys --allow-read <url>
 * @resource {https://www.npmjs.com/package/mongodb} MongoDB on npmjs.com
 * @dependency npm:mongodb
 *
 * Using the official MongoDB client, you can connect to a Mongo database
 * running anywhere.
 */

import { MongoClient } from "mongodb";

// Create a new instance of the MongoDB client running locally on port 27017
const client = new MongoClient("mongodb://127.0.0.1:27017");

// Connect to the MongoDB server
await client.connect();

// Define the schema for the collection
interface DinosaurSchema {
  name: string;
  skills: string[];
}

// Access the database
const db = client.db("animals");

// Access the collection within the database
const dinosaurs = db.collection<DinosaurSchema>("dinosaurs");

// Insert a new document into the collection
await dinosaurs.insertOne({
  name: "deno",
  skills: ["dancing", "hiding"],
});

// Find all documents in the collection with the filter
const allDinosaurs = await dinosaurs.find({ name: "deno" }).toArray();

console.log(allDinosaurs);

// Close the MongoDB client connection
client.close();
