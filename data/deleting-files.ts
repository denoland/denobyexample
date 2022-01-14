/**
 * @title Deleting files
 * @difficulty beginner
 * @tags cli
 * @run --allow-write <url>
 * @resource {https://doc.deno.land/deno/stable/~/Deno.remove} Doc: Deno.remove
 * @resource {https://doc.deno.land/deno/stable/~/Deno.removeSync} Doc: Deno.removeSync
 *
 * Deleting files from disk is a common operation. Deno provides a simple
 * interface for deleting files.
 */

// The easiest way to delete a file or directory empty, is pass the path and
// delete this file.
await Deno.remove("/path/to/empty_dir/or/file");

// Throws error if permission is denied, path not found, or path is non empty
// directory for fix the last error you need set recursive true
await Deno.remove("/path/to/populated_dir/or/file", { recursive: true });

// For remove the file or directory synchronously you can use this:
Deno.removeSync("/path/to/empty_dir/or/file");

// For remove a non empty directorty synchronously you set recursive true
Deno.removeSync("/path/to/populated_dir/or/file", { recursive: true });
