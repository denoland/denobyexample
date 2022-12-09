import { assertEquals, assertThrows } from "$std/testing/asserts.ts";
import { Example, parseExample } from "./example.ts";

Deno.test("parse jsdoc", () => {
  const example = `
/**
 * @title Input Prompts
 * @difficulty beginner
 * @tags cli, web   ,   deploy
 * @run <url>
 * @playground <url>
 *
 * Prompts are used to ask the user for input or feedback on actions.
 */
`;
  const expected: Example = {
    id: "input-prompts",
    title: "Input Prompts",
    description:
      "Prompts are used to ask the user for input or feedback on actions.",
    difficulty: "beginner",
    tags: ["cli", "web", "deploy"],
    additionalResources: [],
    run: "<url>",
    playground: "<url>",
    files: [{
      name: "",
      snippets: [],
    }],
  };
  const actual = parseExample("input-prompts", example);
  assertEquals(actual, expected);
});

Deno.test("parse jsdoc unknown tag", () => {
  const example = `
/**
 * @title abc
 * @difficulty beginner
 * @tags foo, cli, deploy
 * @run <url>
 * 
 * xyz
 */
`;
  assertThrows(
    () => {
      parseExample("abc", example);
    },
    Error,
    "Unknown tag 'foo'",
  );
});

Deno.test("parse jsdoc unknown difficulty", () => {
  const example = `
/**
 * @title abc
 * @difficulty garbage
 * @tags cli, deploy
 * @run <url>
 * 
 * xyz
 */
`;
  assertThrows(
    () => {
      parseExample("abc", example);
    },
    Error,
    "Unknown difficulty 'garbage'",
  );
});

Deno.test("parse jsdoc missing title", () => {
  const example = `
/**
 * @difficulty garbage
 * @tags cli, deploy
 * @run <url>
 * 
 * xyz
 */
`;
  assertThrows(
    () => {
      parseExample("abc", example);
    },
    Error,
    "Missing title",
  );
});

Deno.test("parse jsdoc no run", () => {
  const example = `
/**
 * @title abc
 * @difficulty beginner
 * @tags cli, deploy
 * 
 * xyz
 */
`;
  const expected: Example = {
    id: "abc",
    title: "abc",
    description: "xyz",
    difficulty: "beginner",
    tags: ["cli", "deploy"],
    additionalResources: [],
    run: undefined,
    playground: undefined,
    files: [{
      name: "",
      snippets: [],
    }],
  };
  const actual = parseExample("abc", example);
  assertEquals(actual, expected);
});

Deno.test("parse jsdoc no description", () => {
  const example = `
/**
 * @title abc
 * @difficulty beginner
 * @tags cli, deploy
 */
`;
  const expected: Example = {
    id: "abc",
    title: "abc",
    description: "",
    difficulty: "beginner",
    tags: ["cli", "deploy"],
    additionalResources: [],
    run: undefined,
    playground: undefined,
    files: [{
      name: "",
      snippets: [],
    }],
  };
  const actual = parseExample("abc", example);
  assertEquals(actual, expected);
});

Deno.test("parse jsdoc resources", () => {
  const example = `
/**
 * @title abc
 * @difficulty beginner
 * @tags cli, deploy
 * @resource {https://deno.land#install} Deno: Installation
 * @resource {https://deno.land/manual/getting_started/setup_your_environment} Deno Manual: Setup your environemnt
 */
`;
  const expected: Example = {
    id: "abc",
    title: "abc",
    description: "",
    difficulty: "beginner",
    tags: ["cli", "deploy"],
    additionalResources: [
      ["https://deno.land#install", "Deno: Installation"],
      [
        "https://deno.land/manual/getting_started/setup_your_environment",
        "Deno Manual: Setup your environemnt",
      ],
    ],
    run: undefined,
    playground: undefined,
    files: [{
      name: "",
      snippets: [],
    }],
  };
  const actual = parseExample("abc", example);
  assertEquals(actual, expected);
});

Deno.test("parse jsdoc resources broken", () => {
  const example = `
/**
 * @title abc
 * @difficulty beginner
 * @tags cli, deploy
 * @resource {}
 */
`;
  assertThrows(
    () => {
      parseExample("abc", example);
    },
    Error,
    "Invalid resource",
  );
});

const BASIC_JSDOC = `
/**
 * @title abc
 * @difficulty beginner
 * @tags cli, deploy
 */
`;
const EXPECTED_BASIC: Example = {
  id: "abc",
  title: "abc",
  description: "",
  difficulty: "beginner",
  tags: ["cli", "deploy"],
  additionalResources: [],
  run: undefined,
  playground: undefined,
  files: [{
    name: "",
    snippets: [],
  }],
};

Deno.test("parse snippets", () => {
  const example = `${BASIC_JSDOC}

// snippet 1
code 1;

// snippet 2

  // snippet 3
  foo;

/** still snippet 3 */

// ending snippet
`;
  const expected: Example = {
    ...EXPECTED_BASIC,
    files: [
      {
        name: "",
        snippets: [
          {
            text: "snippet 1",
            code: "code 1;",
          },
          {
            text: "snippet 2",
            code: "",
          },
          {
            text: "snippet 3",
            code: "  foo;\n\n/** still snippet 3 */",
          },
          {
            text: "ending snippet",
            code: "",
          },
        ],
      },
    ],
  };
  const actual = parseExample("abc", example);
  assertEquals(actual, expected);
});

Deno.test("parser ignores deno-lint-ignore", () => {
  const example = `${BASIC_JSDOC}
// deno-lint-ignore no-unused-vars
const foo = "bar";

// comment
// deno-lint-ignore no-unused-vars
const bar = "baz";

// comment 2
foo;
// deno-lint-ignore no-unused-vars
bar;
  // deno-lint-ignore no-unused-vars
`;

  const expected: Example = {
    ...EXPECTED_BASIC,
    files: [
      {
        name: "",
        snippets: [
          {
            text: "",
            code: `const foo = "bar";`,
          },
          {
            text: "comment",
            code: `const bar = "baz";`,
          },
          {
            text: "comment 2",
            code: `foo;\nbar;`,
          },
        ],
      },
    ],
  };
  const actual = parseExample("abc", example);
  assertEquals(actual, expected);
});

Deno.test("parse multiple files", () => {
  const example = `${BASIC_JSDOC}

// File: main.ts
// Main file
import "./foo.ts";

// File: foo.ts
// Hello
globalThis.Hello = "World";

// Back to main
foo;
  // File: main.ts

// foo
// File: bar.ts

/* File: hey.json
{
  "hello": "world"
}
*/
`;
  const expected: Example = {
    ...EXPECTED_BASIC,
    files: [
      {
        name: "main.ts",
        snippets: [
          {
            text: "Main file",
            code: `import "./foo.ts";`,
          },
        ],
      },
      {
        name: "foo.ts",
        snippets: [
          {
            text: "Hello",
            code: `globalThis.Hello = "World";`,
          },
          {
            code: "foo;",
            text: "Back to main",
          },
          {
            code: "",
            text: "File: main.ts",
          },
          {
            text: "foo File: bar.ts",
            code: "",
          },
        ],
      },
      {
        name: "hey.json",
        snippets: [
          {
            text: "",
            code: `{
  "hello": "world"
}`,
          },
        ],
      },
    ],
  };
  const actual = parseExample("abc", example);
  assertEquals(actual, expected);
});
