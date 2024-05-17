# Archived

The contents of this repository have been moved to
https://docs.deno.com/examples (website) / https://github.com/denoland/deno-docs
(source).

# Deno by Example

This repository contains the source code for https://examples.deno.land/.

Deno by Example is a collection of small snippets showcasing various functions
of the APIs implemented in Deno.

- Examples are written in TypeScript
- Each example should be a single file, no more than 50 lines
- Each example should be a self-contained unit, and should depend on no
  dependencies other than Deno builtins and the standard library, unless a
  third-party library is strictly required.
- Each example should be runnable without additional dependencies on all systems
  (exceptions can be made for platform specific functionality)
- Examples should be introduce at most one (or in exceptional cases two or
  three) concepts in Deno / Web APIs. Existing concepts should be linked to.
- Code should be kept _really simple_, and should be easy to read and understand
  by anyone. Do not use complicated code constructs, or hard to follow builtins
  like `Array.reduce`
- Concepts introduced in an example should be explained

## Contributing

### Adding an example

To add an example, create a file in the `data` directory. The file name should
be the id of the example, and the contents should be the code for the example.
The file should be in the `.ts` format. The file should start with a JSDoc style
multi line comment that describes the example:

```ts
/**
 * @title HTTP server: Hello World
 * @difficulty intermediate
 * @tags cli, deploy
 * @run --allow-net <url>
 *
 * An example of a HTTP server that serves a "Hello World" message.
 */
```

You should add a title, a difficulty level (`beginner` or `intermediate`), and a
list of tags (`cli`, `deploy`, `web` depending on where an example is runnable).
The `@run` tag should be included if the example can be run locally by just
doing `deno run <url>`. If running requires permissions, add these:

```ts
/**
 * ...
 * @run --allow-net --allow-read <url>
 */
```

After the pragmas, you can add a description of the example. This is optional,
but recommended for most examples. It should not be longer than one or two
lines. The description shows up at the top of the example in the example page,
and in search results.

After the JS Doc comment, you can write the code. Code can be prefixed with a
comment that describes the code. The comment will be rendered next to the code
in the example page.

Now add your example to the `toc.js` file. This will cause it to show up on the
index page.

After you have added the example, run `deno task fmt` and `deno task lint` to
format and lint the example.

### Running the webserver locally

To run the webserver locally, open a terminal and run:

```sh
deno task start
```

You can then view the page at http://localhost:8000/

Before opening a PR with a change, make sure `deno task fmt` and
`deno task lint` pass.
