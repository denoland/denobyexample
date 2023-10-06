/**
 * @title Connect to MongoDB
 * @difficulty intermediate
 * @tags cli, deploy
 * @run --allow-net --allow-env <url>
 * @resource {https://deno.land/x/mongo} Deno MongoDB on deno.land/x
 *
 * Using the Deno MongoDB client, you can connect to a Mongo database
 * running anywhere.
 */

import {
  MongoClient,
  ObjectId,
} from "https://deno.land/x/mongo@v0.32.0/mod.ts";

// Create a new instance of the MongoDB client
const client = new MongoClient();

// Connect to the MongoDB server running locally on port 27017
await client.connect("mongodb://127.0.0.1:27017");

// Define the schema for the collection
interface DinosaurSchema {
  _id: ObjectId; // MongoDB ObjectID, a unique identifier
  name: string;
  skills: string[];
}

// Access the database
const db = client.database("animals");

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
