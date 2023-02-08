/**
 * @title Checking for file existence
 * @difficulty beginner
 * @tags cli, deploy
 * @run --allow-read --allow-write <url>
 *
 * Sometimes we as developers think that we need to check
 * if a file exists or not. More often than not, we are
 * entirely wrong.
 */

// Let's say we wanted to create a folder if one doesn't
// already exist. Logically it makes sense to first verify
// that the folder exists, then try to create it right?
// Wrong. This will create a race condition where if a folder
// gets created in between when you check if the folder exists
// and when you create a folder, your program will crash.
// Instead, you should just create a folder and try to catch
// errors like so.
try {
  Deno.mkdir("new_dir");
} catch (err) {
  if (!(err instanceof Deno.errors.AlreadyExists)) {
    throw err;
  }
}

// This applies to almost every usecase. If you have a niche
// usecase that requires you to check for existence of a file
// without doing an filesystem operations other than that
// (which is quite rare), the standard library provides a
// utiltity for this.
import { exists } from "$std/fs/exists.ts";

if (await exists("./foo.text")) {
  // do some operation entirely unrelated to the file system
}
