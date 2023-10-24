import { TOC } from "../toc.ts";

const files: string[] = [];
const tocFlatten = TOC.flatMap((group) => group.items);

// Check if every file in data is listed in the TOC
for await (const dirEntry of Deno.readDir("data")) {
  if (dirEntry.isDirectory) {
    throw `Unexpected directory ${dirEntry.name} in data`;
  }
  if (dirEntry.isSymlink) {
    throw `Unexpected symlink ${dirEntry.name} in data`;
  }

  const slug = dirEntry.name.slice(0, -3);

  // ignore .json
  if (!dirEntry.name.endsWith(".ts")) {
    continue;
  }

  files.push(slug);
  if (!tocFlatten.includes(slug)) {
    throw `${dirEntry.name} is not listed in toc.js`;
  }
}

// Check if everything in TOC is a file in data
for (const filename of tocFlatten) {
  if (!files.includes(filename)) {
    throw `Found "${filename}" in TOC but no file found in directory`;
  }
}
