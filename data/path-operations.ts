/**
 * @title Path operations
 * @difficulty beginner
 * @tags cli
 * @run --allow-read <url>
 * @resource {https://deno.land/std@0.172.0/path} Deno: std/path
 * @resource {https://deno.land/api?s=Deno.cwd} Deno: Deno.cwd
 *
 * Many applications need to manipulate file paths in one way or another.
 * The Deno standard library provides simple utilities for this.
 */

// First we will import the module from the Deno standard library
import * as path from "https://deno.land/std@0.172.0/path/mod.ts";

// Converting from a file url to a directory can be done simply by the `fromFileUrl`
// method from the appropriate implementation.
const p1 = path.posix.fromFileUrl("file:///home/foo");
const p2 = path.win32.fromFileUrl("file:///home/foo");
console.log(`PATH 1: ${p1} PATH 2: ${p2}`); // PATH 1: /home/foo PATH 2: \\home\\foo

// We can also choose to not specify and automatically use whatever Deno is running on
const p3 = path.fromFileUrl("file:///home/foo");

// You want get the last part of a file path you can use this
const p = path.basename("./deno/is/awesome/mod.ts");
console.log(p); // mod.ts

// We can get the directory of a file path using the dirname method
const base = path.dirname("./deno/is/awesome/mod.ts");
console.log(base); // ./deno/is/awesome

// You want get the extension from a path
const ext = path.extname("./deno/is/awesome/mod.ts");
console.log(ext); // .ts

// We can format a path using a FormatInputPathObject
const formatPath = path.format({
  root: "/",
  dir: "/home/user/dir",
  ext: ".html",
  name: "index",
});
console.log(formatPath); // "/home/user/dir/index.html"

// You want join files with the os separator
const joinPath = path.join("foo", "bar");
console.log(joinPath); // foo/bar LINUX MACOS -- foo\\bar WINDOWS

// You want get the current directory
const current = Deno.cwd();
console.log(current); // Prints the current directory
