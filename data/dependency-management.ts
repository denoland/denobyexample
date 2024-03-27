/**
 * @title Dependency Management
 * @difficulty beginner
 * @tags cli, deploy
 * @resource {/import-export} Example: Importing & Exporting
 * @run <url>
 *
 * It is unwieldy to have to specify version constraints for the same module
 * over and over again in your code. Deno provides tools to make managing
 * dependencies easier.
 */

/* File: ./deno.json
// The `deno.json` file acts like an import map, allowing you to specify
// aliases for remote modules.
{
  "imports": {
    "@std/path": "jsr:@std/path@^0.220",
    "@std/bytes": "jsr:@std/bytes@^0.220"
  }
}
*/

// File: ./main.ts

// Other files can import modules using the aliases specified in `deno.json`.
// deno-lint-ignore no-unused-vars
import * as path from "@std/path";
// deno-lint-ignore no-unused-vars
import { concat } from "@std/bytes/concat";

// Doing this makes package version upgrades really easy, as the version
// constraints for all dependencies are in one place.
