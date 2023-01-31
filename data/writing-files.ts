/**
 * @title Writing Files
 * @difficulty beginner
 * @tags cli
 * @run --allow-read --allow-write <url>
 * @resource {https://deno.land/api?s=Deno.writeFile} Doc: Deno.writeFile
 * @resource {https://deno.land/api?s=Deno.create} Doc: Deno.create
 * @resource {https://deno.land/api?s=Deno.File} Doc: Deno.File
 * @resource {https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder} MDN: TextEncoder
 *
 * Many applications need to write files to disk. Deno provides a simple
 * interface for writing files.
 */

// The easiest way to write a file, is to dump an entire buffer into the file at
// once.
const bytes = new Uint8Array([72, 101, 108, 108, 111]);
await Deno.writeFile("hello.txt", bytes, { mode: 0o644 });

// You can also write a string instead of a byte array.
await Deno.writeTextFile("hello.txt", "Hello World");

// For more granular writes, open a new file for writing.
const file = await Deno.create("hello.txt");

// You can write chunks of data to the file.
const written = await file.write(bytes);
console.log(`${written} bytes written.`);

// A `file.write` returns the number of bytes written, as it might not write all
// bytes passed. Use the `writeAll` utility from `std/streams` to make sure the
// entire buffer is written.
import { writeAll } from "$std/streams/write_all.ts";
await writeAll(file, new TextEncoder().encode("World!"));

// Make sure to close the file after you are done with it.
file.close();

// Synchronous writing is also supported.
Deno.writeFileSync("hello.txt", bytes);
Deno.writeTextFileSync("hello.txt", "Hello World");
const f = Deno.createSync("hello.txt");
import { writeAllSync } from "$std/streams/write_all.ts";
writeAllSync(f, new TextEncoder().encode("World!"));
f.close();

// The `--allow-write` permission is required to write files.
