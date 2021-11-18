/**
 * @title Reading Files
 * @difficulty beginner
 * @tags cli, deploy
 *
 * Many applications need to read files from disk. Deno provides a simple
 * interface for reading files.
 */

// Here we read a text file from disk. The first argument is the path to the
// file. A promise resolving to a string is returned.
const text = await Deno.readTextFile("hello.txt");
console.log(text); // "Hello, World!"

// The path can either be a relative or absolute. Relative paths are resolved
// relative to the current working directory.
await Deno.readTextFile("/etc/passwd");

// Reading binary files is similar. Instead of returning a string, this function
// returns a Uint8Array of the file contents.
const logo = await Deno.readFile("data/logo.png");
console.log(logo); // Uint8Array(420) [ ... ]

// Files can also be read synchronously. This can sometimes be useful, but
// generally prefer using async functions.
const readme = Deno.readTextFileSync("README.md");
console.log(readme); // "# deno by example\n"
const trailer = Deno.readFileSync("trailer.mp4");
console.log(trailer); // Uint8Array(1567887) [ ... ]

// The `--allow-read` permission is required to read files.
