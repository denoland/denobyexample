/**
 * @title Importing & Exporting
 * @difficulty beginner
 * @tags cli, deploy
 * @run <url>
 * @resource {/dependency-management} Example: Dependency Management
 * @resource {https://deno.land/manual@v1.30.0/basics/modules} Manual: Modules
 *
 * To build composable programs, it is necessary to be able to import and export
 * functions from other modules. This is accomplished by using ECMA script
 * modules in Deno.
 */

// File: ./util.ts

// To export a function, you use the export keyword.
export function sayHello(thing: string) {
  console.log(`Hello, ${thing}!`);
}

// You can also export types, variables, and classes.
// deno-lint-ignore no-empty-interface
export interface Foo {}
export class Bar {}
export const baz = "baz";

// File: ./main.ts

// To import things from files other files can use the import keyword.
import { sayHello } from "./util.ts";
sayHello("World");

// You can also import all exports from a file.
import * as util from "./util.ts";
util.sayHello("World");

// Imports don't have to be relative, they can also reference absolute file or
// https URLs.
import { VERSION } from "https://deno.land/std/version.ts";
console.log(VERSION);
