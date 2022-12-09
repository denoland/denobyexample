import { TOC } from "../../toc.js";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Page } from "../components/Page.tsx";
import { CircleArrow, DeployLogo } from "../components/Logo.tsx";
import { DIFFICULTIES, TAGS } from "../utils/constants.ts";
import { Example, ExampleSnippet, parseExample } from "../utils/example.ts";

type Data = [Example, Example | null, Example | null] | null;

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const id = ctx.params.id;
    if (id.endsWith(".ts")) {
      const accept = req.headers.get("accept") || "";
      const acceptsHTML = accept.includes("text/html");
      try {
        const data = await Deno.readTextFile(`./data/${id}`);
        const example = parseExample(id, data);
        if (example.files.length > 1) {
          return new Response(
            "Source for multi file examples can not be viewed",
            {
              status: 400,
            },
          );
        }
        const file = example.files[0];
        let code = "";
        for (const snippet of file.snippets) {
          code += snippet.code + "\n";
        }
        return new Response(code, {
          headers: {
            "content-type": acceptsHTML
              ? "text/plain; charset=utf-8"
              : "application/typescript; charset=utf-8",
          },
        });
      } catch (err) {
        if (err instanceof Deno.errors.NotFound) {
          return new Response("404 Example Not Found", { status: 404 });
        }
        console.error(err);
        return new Response("500 Internal Server Error", { status: 500 });
      }
    }

    try {
      const cur = TOC.indexOf(id);
      const prev = TOC[cur - 1];
      const next = TOC[cur + 1];
      const [data, prevData, nextData] = await Promise.all(
        [id, prev, next].map((name) =>
          name
            ? Deno.readTextFile(`./data/${name}.ts`)
            : Promise.resolve(undefined)
        ),
      );
      ctx.render!([
        parseExample(id, data),
        prev ? parseExample(prev, prevData) : null,
        next ? parseExample(next, nextData) : null,
      ]);
    } catch (err) {
      if (err instanceof Deno.errors.NotFound) {
        return ctx.render!(null);
      }

      throw err;
    }
  },
};

export default function ExamplePage(props: PageProps<Data>) {
  if (props.data === null) {
    return <div>404 Example Not Found</div>;
  }

  const [example, prev, next] = props.data;
  const url = `${props.url.origin}${props.url.pathname}.ts`;

  const description = (example.description || example.title) +
    " -- Deno by example is a collection of annotated examples for how to use Deno, and the various features it provides.";

  return (
    <Page title={`${example.title} - Deno by Example`}>
      <Head>
        <link rel="stylesheet" href="/gfm.css" />
        <meta name="description" content={description} />
      </Head>
      <main class="max-w-screen-lg mx-auto p-4">
        <div class="flex gap-2">
          <p
            class="text-gray-500 italic"
            title={DIFFICULTIES[example.difficulty].description}
          >
            {DIFFICULTIES[example.difficulty].title}
          </p>
          <div class="flex gap-2 items-center">
            {example.tags.map((tag) => (
              <span
                class="text-xs bg-gray-200 py-0.5 px-2 rounded-md"
                title={TAGS[tag].description}
              >
                {TAGS[tag].title}
              </span>
            ))}
          </div>
        </div>
        <h1 class="mt-2 text-3xl font-bold">{example.title}</h1>
        {example.description && (
          <div class="mt-1">
            <p class="text-gray-500">
              {example.description}
            </p>
          </div>
        )}
        {example.files.map((file) => (
          <div class="mt-10">
            {file.snippets.map((snippet, i) => (
              <SnippetComponent
                key={i}
                firstOfFile={i === 0}
                lastOfFile={i === file.snippets.length - 1}
                filename={file.name}
                snippet={snippet}
              />
            ))}
          </div>
        ))}
        <div class="grid grid-cols-1 sm:grid-cols-5 gap-x-6">
          <div class="col-span-2 mt-8" />
          <div class="col-span-3 mt-8">
            {example.run && (
              <>
                <p class="text-gray-700">
                  Run{" "}
                  <a href={url} class="hover:underline focus:underline">
                    this example
                  </a>{" "}
                  locally using the Deno CLI:
                </p>
                <pre class="mt-2 bg-gray-100 p-4 overflow-x-auto text-sm select-all rounded-md">
                  deno run {example.run.replace("<url>", url)}
                </pre>
              </>
            )}
            {example.playground && (
              <div class="col-span-3 mt-8">
                <p class="text-gray-700">
                  Try this example in a Deno Deploy playground:
                </p>
                <p class="mt-3">
                  <a
                    class="py-2 px-4 bg-black inline-block text-white text-base rounded-md opacity-90 hover:opacity-100"
                    href={example.playground}
                    target="_blank"
                    rel="noreferrer"
                    title="Deploy"
                  >
                    <DeployLogo />
                  </a>
                </p>
              </div>
            )}
            {example.additionalResources.length > 0 && (
              <div class="col-span-3 mt-12 pt-6 border-t-1 border-gray-200">
                <p class="text-gray-500">
                  Additional resources:
                </p>
                <ul class="list-disc list-inside mt-1">
                  {example.additionalResources.map(([link, title]) => (
                    <li
                      class="text-gray-700 hover:text-gray-900"
                      key={link + title}
                    >
                      <a
                        class="hover:underline focus:underline"
                        href={link}
                      >
                        {title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div class="col-span-2 mt-12 flex justify-between h-14">
          {prev
            ? (
              <a
                href={`/${prev.id}`}
                class="w-6/12 text-gray-600 flex items-center gap-3 lg:gap-2 :hover:text-gray-900"
              >
                <CircleArrow />
                {prev.title}
              </a>
            )
            : <div class="w-6/12" />}
          {next && (
            <a
              href={`/${next.id}`}
              class="w-6/12 text-gray-600 text-right flex items-center justify-end gap-3 lg:gap-2 :hover:text-gray-900"
            >
              {next.title}
              <CircleArrow right />
            </a>
          )}
        </div>
      </main>
    </Page>
  );
}

function SnippetComponent(props: {
  filename: string;
  firstOfFile: boolean;
  lastOfFile: boolean;
  snippet: ExampleSnippet;
}) {
  const renderedSnippet = Prism.highlight(
    props.snippet.code,
    Prism.languages.ts,
    "ts",
  );

  return (
    <div class="grid grid-cols-1 sm:grid-cols-5 gap-x-6  transition duration-150 ease-in">
      <div class="py-4 text-gray-700 select-none col-span-2">
        {props.snippet.text}
      </div>
      <div
        class={`col-span-3 relative bg-gray-100 ${
          props.firstOfFile ? "rounded-t-md" : ""
        } ${props.lastOfFile ? "rounded-b-md" : ""} ${
          props.snippet.code.length === 0 ? "hidden sm:block" : ""
        }`}
      >
        {props.filename && (
          <span
            class={`font-mono text-xs absolute -top-3 left-4 bg-gray-200 z-10 p-1 rounded-sm ${
              props.firstOfFile ? "block" : "block sm:hidden"
            }`}
          >
            {props.filename}
          </span>
        )}
        <div class="px-4 py-4 text-sm overflow-scroll sm:overflow-hidden relative highlight">
          <pre dangerouslySetInnerHTML={{ __html: renderedSnippet }} />
        </div>
      </div>
    </div>
  );
}
