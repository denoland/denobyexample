/**
 * @title Deleting files and directories
 * @difficulty beginner
 * @tags cli
 * @run --allow-write <url>
 * @resource {https://doc.deno.land/deno/stable/~/Deno.remove} Doc: Deno.remove
 * @resource {https://doc.deno.land/deno/stable/~/Deno.removeSync} Doc: Deno.removeSync
 *
 * Deleting files from disk is a common operation. Deno provides a simple
 * interface for deleting files.
 */

// Files and empty directories can be deleted with the `Deno.remove` API.
await Deno.remove("/path/to/empty_dir/or/file");

// To delete a directory with its contents, set the `recursive` flag on the
// Deno.remove call.
await Deno.remove("/path/to/populated_dir/or/file", { recursive: true });

// A synchronous version of the API is also available.
Deno.removeSync("/path/to/empty_dir/or/file");
