/**
 * @title Subprocesses: Collecting Output
 * @difficulty intermediate
 * @tags cli
 * @run --allow-run <url>
 * @resource {https://deno.land/api?s=Deno.Command} Doc: Deno.Command
 *
 * We don't often write programs in isolation. In a lot of cases we want
 * to interact with the outside system and spawning a subprocess is a
 * common way to do this.
 */

// The Deno namespace has a unified api for interacting with the shell called
// Deno.command. With it, we can initialize some information about the command
// but it will not be executed immediately.
const command = new Deno.Command("deno", {
  args: [
    "eval",
"\
    console.log('hello from deno'); \
    console.error('hello from stderr'); \
    ",
  ],
});

// In the most simple case we just want to run the process to completion. This
// can be achieved using command.output()
let result = await command.output();

// It can also be achieved syncronously using command.outputSync()
result = command.outputSync();

// We can now interact with stdout and stderr
const textDecoder = new TextDecoder();
console.log("stdout:", textDecoder.decode(result.stdout));
console.log("stderr:", textDecoder.decode(result.stderr));
