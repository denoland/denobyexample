/**
 * @title Command Line Arguments
 * @difficulty beginner
 * @tags cli
 * @run <url> Deno Sushi --help --version=1.0.0 --no-color
 * @resource {https://deno.land/api?s=Deno.args} Doc: Deno.args
 * @resource {$std/cli/parse_args.ts} Doc: std/cli
 *
 * Command line arguments are often used to pass configuration options to a
 * program.
 */

// You can get the list of command line arguments from `Deno.args`.
const name = Deno.args[0];
const food = Deno.args[1];
console.log(`Hello ${name}, I like ${food}!`);

// Often you want to parse command line arguments like `--foo=bar` into
// structured data. This can be done using `std/cli`.
import { parseArgs } from "$std/cli/parse_args.ts";

// The `parseArgs` function takes the argument list, and a list of options. In these
// options you specify the types of the accepted arguments and possibly default
// values. An object is returned with the parsed arguments.
const flags = parseArgs(Deno.args, {
  boolean: ["help", "color"],
  string: ["version"],
  default: { color: true },
  negatable: ["color"],
});
console.log("Wants help?", flags.help);
console.log("Version:", flags.version);
console.log("Wants color?:", flags.color);

// The `_` field of the returned object contains all arguments that were not
// recognized as flags.
console.log("Other:", flags._);
