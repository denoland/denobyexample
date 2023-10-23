/**
 * @title Foreign Function Interface
 * @difficulty intermediate
 * @tags cli
 * @run --unstable --allow-ffi <url>
 * @resource {https://docs.deno.com/runtime/manual/runtime/ffi_api} Manual: FFI
 *
 * Foreign Function Interface (FFI) is a way to call functions written in other languages from JavaScript.
 */

// Prerequisites:
// - [Julia](https://julialang.org/downloads/) installed
// - `julia` in your `PATH`

// This example shows how to use the julia FFI library to execute Julia code from Deno.

// First lets define the symbols we want to import from the library.
const SYMBOLS = {
  // The `jl_init` function initializes the Julia runtime.
  jl_init: {
    // The function takes no parameters so we pass an empty array.
    parameters: [],
    // The function returns a `void` pointer.
    result: "void",
  },
  // The `jl_eval_string` function takes a string and evaluates it as Julia code.
  jl_eval_string: {
    // The function takes a string so we pass an array with a buffer type
    parameters: ["buffer"],
    // The function results in a `pointer`.
    result: "pointer",
  },
} as const;

// Next, we import the FFI library from Deno.
const julia = Deno.dlopen(
  // Change .dll to .dylib on macOS and .so on Linux
  `libjulia.dll`,
  SYMBOLS,
).symbols;

// Before we can call the functions we need to convert the string to a C string. Let's define a helper function for that.
export function cstr(str: string): Uint8Array {
  const buf = new Uint8Array(str.length + 1);
  new TextEncoder().encodeInto(str, buf);
  return buf;
}

// We can now call the functions we imported.
julia.jl_init();

// We can now evaluate Julia code.
julia.jl_eval_string(
  cstr("println(sqrt(2.0))"),
);
