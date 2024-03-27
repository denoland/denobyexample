/**
 * @title Checking for file existence
 * @difficulty beginner
 * @tags cli, deploy
 * @run --allow-read --allow-write <url>
 *
 * Often one reaches to checking if a file exists before performing an operation
 * on it. This is a common anti-pattern that can lead to race conditions. This
 * example demonstrates how to avoid this anti-pattern.
 */

// You may want to create a folder if it does not exist. The naive way to do
// this is to check if the folder exists and then create it if it does not.
// This is an anti-pattern as it can lead to no folder being created if the
// folder is deleted between the check and the creation.
//
// Instead of checking for existence, you should simply try to create the
// folder and catch the error if it already exists.
try {
  await Deno.mkdir("new_dir");
} catch (err) {
  if (!(err instanceof Deno.errors.AlreadyExists)) {
    throw err;
  }
}

// In some cases, you may still have to check if a file exists or not. For
// example you may want to avoid expensive work to compute the content of a file
// to be created, if the file already exists.
// In this case, you can call `Deno.lstat` to check if the file exists, and
// catch the `NotFound` error if it does not.
try {
  await Deno.lstat("example.txt");
  console.log("exists!");
} catch (err) {
  if (!(err instanceof Deno.errors.NotFound)) {
    throw err;
  }
  console.log("does not exists!");
}
