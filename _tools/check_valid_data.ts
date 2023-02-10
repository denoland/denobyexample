import { TOC } from "../toc.js";

const files: string[] = [];

// Check if every file in data is listed in the TOC
for await (const dirEntry of Deno.readDir("data")) {
  if (dirEntry.isDirectory) {
    throw `Unexpected directory ${dirEntry.name} in data`;
  }
  if (dirEntry.isSymlink) {
    throw `Unexpected symlink ${dirEntry.name} in data`;
  }

  const slug = dirEntry.name.slice(0, -3);

  files.push(slug);

  if (!TOC.includes(slug)) {
    throw `${dirEntry.name} is not listed in toc.js`;
  }
}

// Check if everything in TOC is a file in data
for (const filename of TOC) {
  if (!files.includes(filename)) {
    throw `Found "${filename}" in TOC but no file found in directory`;
  }
}
