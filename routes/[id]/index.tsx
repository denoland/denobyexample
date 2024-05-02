import { TOC } from "../../toc.ts";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Page } from "../../components/Page.tsx";
import { CircleArrow, DeployLogo } from "../../components/Logo.tsx";
import { Prism } from "../../utils/prism.ts";
import { DIFFICULTIES, TAGS } from "../../utils/constants.ts";
import { Example, ExampleSnippet, parseExample } from "../../utils/example.ts";
import CopyButton from "../../islands/CopyButton.tsx";

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
      const flatToc = TOC.flatMap((category) => category.items);
      const cur = flatToc.indexOf(id);
      const prev = flatToc[cur - 1];
      const next = flatToc[cur + 1];
      const [data, prevData, nextData] = await Promise.all(
        [id, prev, next].map((name) =>
          name
            ? Deno.readTextFile(`./data/${name}.ts`)
            : Promise.resolve(undefined)
        ),
      );
      if (!data) {
        return new Response("404 Example Not Found", { status: 404 });
      }

      return ctx.render!([
        parseExample(id, data),
        prev && prevData ? parseExample(prev, prevData) : null,
        next && nextData ? parseExample(next, nextData) : null,
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
  const url = `${props.url.origin}${props.url.pathname}${
    example.files.length > 1 ? "/main" : ""
  }.ts`;

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
                class="text-xs bg-gray-200 py-0.5 px-2 rounded-md dark:(bg-gray-800 text-gray-300)"
                title={TAGS[tag].description}
              >
                {TAGS[tag].title}
              </span>
            ))}
          </div>
        </div>
        <div class="flex justify-between items-center">
          <h1 class="mt-2 text-3xl font-bold dark:text-gray-100">
            {example.title}
          </h1>
          <a
            href={`https://github.com/denoland/denobyexample/blob/main/data${props.url.pathname}.ts`}
            class="px-4 py-2 rounded bg-gray-100 hover:bg-gray-300 text-slate-900 dark:(bg-gray-700 text-slate-300 hover:bg-gray-600)"
          >
            Edit
          </a>
        </div>
        {example.description && (
          <div class="mt-1">
            <p class="text-gray-500">{example.description}</p>
          </div>
        )}
        {example.files.map((file) => (
          <div class="mt-10">
            <div class="relative hidden sm:block">
              <CopyButton
                text={file.snippets.map((snippet) => snippet.code).join("\n\n")}
              />
            </div>
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
        <div class="grid grid-cols-1 sm:grid-cols-10 gap-x-8">
          <div class="col-span-3 mt-8" />
          <div class="col-span-7 mt-8">
            {example.run && (
              <>
                <p class="text-gray-700 dark:text-gray-200">
                  Run{" "}
                  <a href={url} class="hover:underline focus:underline">
                    this example
                  </a>{" "}
                  locally using the Deno CLI:
                </p>
                <pre class="mt-2 bg-gray-100 p-4 overflow-x-auto text-sm select-all rounded-md dark:(bg-gray-800 text-gray-300)">
                  {example.run.startsWith("deno")
                    ? example.run.replace("<url>", url)
                    : "deno run " + example.run.replace("<url>", url)}
                </pre>
              </>
            )}
            {example.playground && (
              <div class="col-span-3 mt-8">
                <p class="text-gray-700 dark:text-gray-300">
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
                <p class="text-gray-500">Additional resources:</p>
                <ul class="list-disc list-inside mt-1">
                  {example.additionalResources.map(([link, title]) => (
                    <li
                      class="text-gray-700 hover:text-gray-900 dark:(text-gray-300 hover:text-gray-200)"
                      key={link + title}
                    >
                      <a class="hover:underline focus:underline" href={link}>
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
                class="w-6/12 text-gray-600 flex items-center gap-3 lg:gap-2 :hover:text-gray-900 dark:(text-gray-400 hover:text-gray-300)"
              >
                <CircleArrow />
                {prev.title}
              </a>
            )
            : <div class="w-6/12" />}
          {next && (
            <a
              href={`/${next.id}`}
              class="w-6/12 text-gray-600 text-right flex items-center justify-end gap-3 lg:gap-2 :hover:text-gray-900 dark:(text-gray-400 hover:text-gray-300)"
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
    <div class="grid grid-cols-1 sm:grid-cols-10 gap-x-8  transition duration-150 ease-in">
      <div class="py-4 text-gray-700 select-none col-span-3 text-sm dark:text-gray-300">
        {props.snippet.text}
      </div>
      <div
        class={`col-span-7 relative bg-gray-100 dark:bg-gray-800 ${
          props.firstOfFile ? "rounded-t-md" : ""
        } ${props.lastOfFile ? "rounded-b-md" : ""} ${
          props.snippet.code.length === 0 ? "hidden sm:block" : ""
        }`}
      >
        {props.filename && (
          <span
            class={`font-mono text-xs absolute -top-3 left-4 bg-gray-200 dark:(bg-gray-700 text-gray-200) z-10 p-1 rounded-sm ${
              props.firstOfFile ? "block" : "block sm:hidden"
            }`}
          >
            {props.filename}
          </span>
        )}
        <div class="relative block sm:hidden">
          <CopyButton text={props.snippet.code} />
        </div>
        <div
          data-color-mode="auto"
          data-light-theme="light"
          data-dark-theme="dark"
          class="px-4 py-4 text-sm overflow-scroll sm:overflow-hidden relative gfm-highlight markdown-body"
          style={{ backgroundColor: "transparent" }}
        >
          <pre
            style={{ padding: "0px", backgroundColor: "transparent" }}
            dangerouslySetInnerHTML={{ __html: renderedSnippet }}
          />
        </div>
      </div>
    </div>
  );
}
