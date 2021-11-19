/**
 * @title Dependency Management
 * @difficulty beginner
 * @tags cli, deploy
 */

// File: ./deps.ts

// The Deno ecosystem has a convention to re-export all remote dependencies from
// a deps.ts file at the root of the repo. This keeps remote dependencies
// organized, and in a single place.
export * as http from "https://deno.land/std@0.114.0/http/mod.ts";
export * as path from "https://deno.land/std@0.114.0/path/mod.ts";

// File: ./main.ts

// Other files can then import dependencies from the deps.ts file.
import { path } from "./deps.ts";

// Doing this makes package version upgrades really easy, as all external
// dependency specifiers live in the same file.
