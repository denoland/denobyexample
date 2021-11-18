/**
 * @title Writing Files
 * @difficulty beginner
 * @tags cli
 *
 * Many applications need to write files to disk. Deno provides a simple
 * interface for writing files.
 */

// Here we write a text file to disk. The first argument is the path to the
// file, and the second argument the content to write as a string.
await Deno.writeTextFile("hello.txt", "Hello, World!");

// The path can either be a relative or absolute. Relative paths are resolved
// relative to the current working directory.
await Deno.writeTextFile("/tmp/test.txt", "foobar");

// Writing binary files is similar. Instead of taking a string, this function
// takes a Uint8Array of the file contents.
await Deno.writeFile("data/logo.png", new Uint8Array(1024));

// Files can also be read synchronously. This can sometimes be useful, but
// generally prefer using async functions.
Deno.writeTextFileSync("README.md", "deno by example");
Deno.writeFileSync("trailer.mp4", new Uint8Array(1567887));

// The `--allow-write` permission is required to write files.
