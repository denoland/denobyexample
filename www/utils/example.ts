import { DIFFICULTIES, TAGS } from "./constants.ts";

export interface Example {
  id: string;
  title: string;
  description: string;
  difficulty: keyof typeof DIFFICULTIES;
  tags: (keyof typeof TAGS)[];
  run?: string;
  snippets: ExampleSnippet[];
}

// A snippet is a chunk of code which may optionally be prefixed with a block of
// comments.
export interface ExampleSnippet {
  text: string;
  code: string;
}

export function parseExample(id: string, file: string): Example {
  // Extract the multi line JS doc comment at the top of the file
  const [, jsdoc, rest] = file.match(/^\s*\/\*\*(.*?)\*\/\s*(.*)/s) || [];

  // Extract the @key value pairs from the JS doc comment
  let description = "";
  const kvs: Record<string, string> = {};
  for (let line of jsdoc.split("\n")) {
    line = line.trim().replace(/^\*/, "").trim();
    const [, key, value] = line.match(/^\s*@(\w+)\s+(.*)/) || [];
    if (key) {
      kvs[key] = value.trim();
    } else {
      description += " " + line;
    }
  }
  description = description.trim();

  // Seperate the code into snippets.
  const snippets: ExampleSnippet[] = [];
  let parseMode = "code";
  let text = "";
  let code = "";

  for (const line of rest.split("\n")) {
    if (parseMode == "code") {
      if (line.startsWith("//")) {
        if (text || code) {
          code = code.trimEnd();
          snippets.push({ text, code });
        }
        text = line.slice(2).trim();
        code = "";
        parseMode = "comment";
      } else {
        code += line + "\n";
      }
    } else if (parseMode == "comment") {
      if (line.startsWith("//")) {
        text += " " + line.slice(2).trim();
      } else {
        code += line + "\n";
        parseMode = "code";
      }
    }
  }
  if (text || code) {
    code = code.trimEnd();
    snippets.push({ text, code });
  }

  if (!kvs.title) {
    throw new Error("Missing title in JS doc comment.");
  }

  const tags = kvs.tags.split(",").map((s) => s.trim() as keyof typeof TAGS);
  for (const tag of tags) {
    if (!TAGS[tag]) {
      throw new Error(`Unknown tag ${tag}`);
    }
  }

  const difficulty = kvs.difficulty as keyof typeof DIFFICULTIES;
  if (!DIFFICULTIES[difficulty]) {
    throw new Error(`Unknown difficulty ${difficulty}`);
  }

  return {
    id,
    title: kvs.title,
    description,
    difficulty,
    tags,
    run: kvs.run,
    snippets,
  };
}
