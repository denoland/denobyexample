import { DIFFICULTIES, TAGS } from "./constants.ts";

export interface Example {
  id: string;
  title: string;
  description: string;
  difficulty: keyof typeof DIFFICULTIES;
  tags: (keyof typeof TAGS)[];
  run?: string;
  files: ExampleFile[];
}

export interface ExampleFile {
  name: string;
  snippets: ExampleSnippet[];
}

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
  const files: ExampleFile[] = [{
    name: "",
    snippets: [],
  }];
  let parseMode = "code";
  let currentFile = files[0];
  let text = "";
  let code = "";

  for (const line of rest.split("\n")) {
    const trimmedLine = line.trim();
    if (parseMode == "code") {
      if (line.startsWith("// File:")) {
        if (text || code.trimEnd()) {
          code = code.trimEnd();
          currentFile.snippets.push({ text, code });
          text = "";
          code = "";
        }
        const name = line.slice(8).trim();
        if (currentFile.snippets.length == 0) {
          currentFile.name = name;
        } else {
          currentFile = {
            name,
            snippets: [],
          };
          files.push(currentFile);
        }
      } else if (trimmedLine.startsWith("//")) {
        if (text || code.trimEnd()) {
          code = code.trimEnd();
          currentFile.snippets.push({ text, code });
        }
        text = trimmedLine.slice(2).trim();
        code = "";
        parseMode = "comment";
      } else {
        code += line + "\n";
      }
    } else if (parseMode == "comment") {
      if (
        trimmedLine.startsWith("// deno-lint-ignore") ||
        trimmedLine.startsWith("//deno-lint-ignore")
      ) {
        // skip lint directives
      } else if (trimmedLine.startsWith("//")) {
        text += " " + trimmedLine.slice(2).trim();
      } else {
        code += line + "\n";
        parseMode = "code";
      }
    }
  }
  if (text || code.trimEnd()) {
    code = code.trimEnd();
    currentFile.snippets.push({ text, code });
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
    files,
  };
}
