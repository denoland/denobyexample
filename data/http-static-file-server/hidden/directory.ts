import { IGNORE_PATHS } from "../main.ts";

export async function generateDir(dirPath: string, url: URL): Promise<string> {
  const dir = [];

  for await (const entry of await Deno.readDir(url)) {
    const basename = "/" + entry.name;
    const path = dirPath === "/" ? basename : dirPath + basename;
    if (!IGNORE_PATHS.some((ignored) => path.startsWith(ignored))) {
      dir.push({
        ...entry,
        path,
      });
    }
  }

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Deno static file server - ${dirPath}</title>
  </head>
  <body>
    <ul>
      ${
    dir.map(({ name, path, isDirectory }) => {
      const display = isDirectory ? name + "/" : name;
      return `<li><a href="${path}">${display}</a></li>`;
    }).join("")
  }
    </ul>
  </body>
</html>
`;
}
