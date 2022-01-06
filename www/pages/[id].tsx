/** @jsx h */
/** @jsxFrag Fragment */
import { Page } from "../components/Page.tsx";
import {
  Fragment,
  h,
  HandlerContext,
  Head,
  PageProps,
  Prism,
  tw,
  useData,
} from "../deps.ts";
import { TOC } from "../../toc.js";
import { DIFFICULTIES, TAGS } from "../utils/constants.ts";
import { ExampleSnippet, parseExample } from "../utils/example.ts";

export default function Example(props: PageProps) {
  const example = useData(props.params.id as string, fetcher);
  if (!example) {
    return <div>404 Example Not Found</div>;
  }

  const cur = TOC.indexOf(props.params.id as string);
  const prev = TOC[cur - 1];
  const next = TOC[cur + 1];
  const url = `${props.url.origin}${props.url.pathname}.ts`;

  const description = (example.description || example.title) +
    " -- Deno by example is a collection of annotated examples for how to use Deno, and the various features it provides.";

  return (
    <Page title={`${example.title} - Deno by Example`}>
      <Head>
        <link rel="stylesheet" href="/gfm.css" />
        <meta name="description" content={description} />
      </Head>
      <main class={tw`max-w-screen-lg mx-auto p-4`}>
        <div class={tw`flex gap-2`}>
          <p
            class={tw`text-gray-500 italic`}
            title={DIFFICULTIES[example.difficulty].description}
          >
            {DIFFICULTIES[example.difficulty].title}
          </p>
          <div class={tw`flex gap-2 items-center`}>
            {example.tags.map((tag) => (
              <span
                class={tw`text-xs bg-gray-200 py-0.5 px-2 rounded-md`}
                title={TAGS[tag].description}
              >
                {TAGS[tag].title}
              </span>
            ))}
          </div>
        </div>
        <h1 class={tw`mt-2 text-3xl font-bold`}>{example.title}</h1>
        {example.description && (
          <div class={tw`mt-1`}>
            <p class={tw`text-gray-500`}>
              {example.description}
            </p>
          </div>
        )}
        {example.files.map((file) => (
          <div class={tw`group mt-10`}>
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
        <div class={tw`grid grid-cols-1 sm:grid-cols-5 gap-x-6`}>
          <div class={tw`col-span-2 mt-8 relative`}>
            <p class={tw`text-gray-700 absolute bottom-0 text-sm`}>
              {prev && (
                <a
                  href={`/${prev}`}
                  class={tw`hover:underline focus:underline`}
                >
                  PREV
                </a>
              )}
              &nbsp;&nbsp;
              {next && (
                <a
                  href={`/${next}`}
                  class={tw`hover:underline focus:underline`}
                >
                  NEXT
                </a>
              )}
            </p>
          </div>
          {example.run && (
            <div class={tw`col-span-3 mt-8`}>
              <p class={tw`text-gray-700`}>
                Run{" "}
                <a href={url} class={tw`hover:underline focus:underline`}>
                  this example
                </a>{" "}
                locally using the Deno CLI:
              </p>
              <pre
                class={tw
                  `mt-2 bg-gray-100 p-4 overflow-x-auto text-sm select-all rounded-md`}
              >
                deno run {example.run.replace("<url>", url)}
              </pre>
            </div>
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
    <div
      class={tw
        `grid grid-cols-1 sm:grid-cols-5 gap-x-6 group-hover:opacity-60 hover:!opacity-100 transition duration-150 ease-in`}
    >
      <div class={tw`py-4 text-gray-700 select-none col-span-2`}>
        {props.snippet.text}
      </div>
      <div
        class={tw`col-span-3 relative bg-gray-100 ${
          props.firstOfFile ? "rounded-t-md" : ""
        } ${props.lastOfFile ? "rounded-b-md" : ""} ${
          props.snippet.code.length === 0 ? "hidden sm:block" : ""
        }`}
      >
        {props.filename && (
          <span
            class={tw
              `font-mono text-xs absolute -top-3 left-4 bg-gray-200 z-10 p-1 rounded-sm ${
                props.firstOfFile ? "block" : "block sm:hidden"
              }`}
          >
            {props.filename}
          </span>
        )}
        <div
          class={tw
            `px-4 py-4 text-sm overflow-scroll sm:overflow-hidden relative` +
            " highlight"}
        >
          <pre dangerouslySetInnerHTML={{ __html: renderedSnippet }} />
        </div>
      </div>
    </div>
  );
}

async function fetcher(id: string) {
  try {
    const data = await Deno.readTextFile(`./data/${id}.ts`);
    return parseExample(id, data);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return null;
    }
    console.error(err);
  }
}

export const handler = async (ctx: HandlerContext) => {
  const id = ctx.match.id;
  if (id.endsWith(".ts")) {
    const accept = ctx.req.headers.get("accept") || "";
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
  return ctx.render!();
};
