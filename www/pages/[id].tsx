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
import { DIFFICULTIES, TAGS } from "../utils/constants.ts";
import { ExampleSnippet, parseExample } from "../utils/example.ts";

export default function Example(props: PageProps) {
  const example = useData(props.params.id as string, fetcher);
  if (!example) {
    return <div>404 Example Not Found</div>;
  }

  const url = `${props.url.origin}${props.url.pathname}.ts`;

  return (
    <Page title={`${example.title} - Deno by Example`}>
      <Head>
        <link rel="stylesheet" href="/gfm.css" />
      </Head>
      <main class={tw`max-w-screen-lg mx-auto p-4`}>
        <div class={tw`flex gap-2 justify-between`}>
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
          <div class={tw`mt-4 text-gray-700`}>
            {example.description}
          </div>
        )}
        <div class={tw`mt-8 grid grid-cols-1 sm:grid-cols-5 gap-x-6`}>
          {example.snippets.map((snippet, i) => (
            <SnippetComponent key={i} snippet={snippet} />
          ))}
        </div>
        {example.run && (
          <div class={tw`mt-8`}>
            <p class={tw`text-gray-700`}>
              Run{" "}
              <a href={url} class={tw`hover:underline focus:underline`}>
                this example
              </a>{" "}
              locally using the Deno CLI:
            </p>
            <pre
              class={tw
                `mt-2 bg-gray-100 p-2 overflow-x-auto text-sm select-all`}
            >
              deno run {example.run.replace("<url>", url)}
            </pre>
          </div>
        )}
      </main>
    </Page>
  );
}

function SnippetComponent(props: { snippet: ExampleSnippet }) {
  const renderedSnippet = Prism.highlight(
    props.snippet.code,
    Prism.languages.ts,
    "ts",
  );

  return (
    <>
      <div class={tw`py-4 text-gray-700 select-none col-span-2`}>
        {props.snippet.text}
      </div>
      <div class={tw`bg-gray-100 px-4 py-4 text-sm col-span-3` + " highlight"}>
        <pre
          dangerouslySetInnerHTML={{ __html: renderedSnippet }}
          class={tw`overflow-hidden`}
        />
      </div>
    </>
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
      let code = "";
      for (const snippet of example.snippets) {
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
