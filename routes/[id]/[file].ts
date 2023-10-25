import { Handlers } from "$fresh/server.ts";
import { typeByExtension } from "$std/media_types/type_by_extension.ts";
import { parseExample } from "../../utils/example.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const id = ctx.params.id;
    const filename = ctx.params.file;
    const extension = filename.split(".").pop();

    if (extension && ["ts", "json"].includes(extension)) {
      const accept = req.headers.get("accept") || "";
      const acceptsHTML = accept.includes("text/html");
      try {
        const data = await Deno.readTextFile(`./data/${id}.ts`);
        const example = parseExample(id, data);
        if (example.files.length === 1) {
          return new Response(
            "Source for single file examples can not be split by files",
            {
              status: 400,
            },
          );
        }
        const file = example.files.find((file) =>
          file.name === "./" + filename
        );

        if (file) {
          let code = "";
          for (const snippet of file.snippets) {
            code += snippet.code + "\n";
          }
          return new Response(code, {
            headers: {
              "content-type": acceptsHTML
                ? "text/plain; charset=utf-8"
                : `${typeByExtension(extension)}; charset=utf-8`,
            },
          });
        } else {
          return new Response("404 File Not Found", { status: 404 });
        }
      } catch (err) {
        if (err instanceof Deno.errors.NotFound) {
          return new Response("404 Example Not Found", { status: 404 });
        }
        console.error(err);
        return new Response("500 Internal Server Error", { status: 500 });
      }
    }
    return new Response("400 Must view source", { status: 400 });
  },
};
