/**
 * @title Module metadata
 * @difficulty intermediate
 * @tags cli, deploy
 *
 * To get information on the context of current module `import.meta` API can be used.
 */

// File: ./module_a.ts

import { outputB } from "./module_b.ts";

function outputA() {
  console.log("Module A's import.meta.url", import.meta.url);
  console.log("Module A's mainModule url", Deno.mainModule);
  console.log(
    "Is module A the main module via import.meta.main?",
    import.meta.main,
  );
}

outputA();
console.log("");
outputB();

// File: ./module_b.ts

export function outputB() {
  console.log("Module B's import.meta.url", import.meta.url);
  console.log("Module B's mainModule url", Deno.mainModule);
  console.log(
    "Is module B the main module via import.meta.main?",
    import.meta.main,
  );
}
