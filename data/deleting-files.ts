/**
 * @title Deleting files and directories
 * @difficulty beginner
 * @tags cli
 * @resource {https://deno.land/api?s=Deno.remove} Deno: Deno.remove
 * @resource {https://deno.land/api?s=Deno.removeSync} Deno: Deno.removeSync
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
