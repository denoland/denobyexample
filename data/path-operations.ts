/**
 * @title Path operations
 * @difficulty beginner
 * @tags cli
 * @run --allow-read <url>
 * @resource {$std/path} Deno: std/path
 * @resource {https://deno.land/api?s=Deno.cwd} Deno: Deno.cwd
 *
 * Many applications need to manipulate file paths in one way or another.
 * The Deno standard library provides simple utilities for this.
 */

// First we will import the module from the Deno standard library
import * as path from "$std/path/mod.ts";

// Converting from a file url to a directory can be done simply by the `fromFileUrl`
// method from the appropriate implementation.
const p1 = path.posix.fromFileUrl("file:///home/foo");
const p2 = path.win32.fromFileUrl("file:///home/foo");
console.log(`Path 1: ${p1} Path 2: ${p2}`);

// We can also choose to not specify and automatically use whatever Deno is running on
const p3 = path.fromFileUrl("file:///home/foo");
console.log(`Path on current OS: ${p3}`);

// We can get the last part of a file path using the basename method
const p = path.basename("./deno/is/awesome/mod.ts");
console.log(p); // mod.ts

// We can get the directory of a file path using the dirname method
const base = path.dirname("./deno/is/awesome/mod.ts");
console.log(base); // ./deno/is/awesome

// We can get the extension of a file path using the extname method
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

// When we want to make our code cross-platform, we can use the join method.
// This joins any number of string by the OS-specific file separator. On
// Mac OS this would be foo/bar. On windows, this would be foo\bar.
const joinPath = path.join("foo", "bar");
console.log(joinPath);

// We can get the current working directory using the built-in cwd method
const current = Deno.cwd();
console.log(current);
