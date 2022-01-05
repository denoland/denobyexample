/** @jsx h */
/** @jsxFrag Fragment */
import { TOC } from "../../toc.js";
import { Page } from "../components/Page.tsx";
import { h, Head, PageProps, tw, useData } from "../deps.ts";
import { parseExample } from "../utils/example.ts";

export default function Example(props: PageProps) {
  const examples = useData("", fetcher);
  return (
    <Page title={`Deno by Example`} noSubtitle>
      <Head>
        <meta
          name="description"
          content="Deno by example is a collection of annotated examples for how to use Deno, and the various features it provides."
        />
      </Head>
      <main class={tw`max-w-screen-sm mx-auto p-4`}>
        <h1>
          <span class={tw`text(5xl gray-900) tracking-tight font-bold`}>
            Deno
          </span>
          <span
            class={tw
              `text(2xl gray-700) tracking-tight italic font-medium ml-2`}
          >
            by example
          </span>
        </h1>
        <p class={tw`mt-8 text-gray-900`}>
          Deno is a simple, modern and secure runtime for JavaScript and
          TypeScript that uses V8 and is built in Rust.
        </p>
        <p class={tw`mt-6 text-gray-900`}>
          <i class={tw`italic`}>Deno by example</i>{" "}
          is a collection of annotated examples for how to use Deno, and the
          various features it provides. It acts as a reference for how to do
          various things in Deno, but can also be used as a guide to learn about
          many of the features Deno provides.
        </p>
        <ul class={tw`mt-6 text-gray-900`}>
          {examples.map((example) => (
            <li>
              <a href={`/${example.id}`} class={tw`underline`}>
                {example.title}
              </a>
            </li>
          ))}
        </ul>
        <p class={tw`mt-12 text-gray-500`}>
          <a
            href="https://github.com/denoland/denobyexample"
            class={tw`underline`}
          >
            Source
          </a>{" "}
          |{" "}
          <a
            href="https://github.com/denoland/denobyexample/blob/main/LICENSE"
            class={tw`underline`}
          >
            License
          </a>{" "}
          | Inspired by{" "}
          <a href="https://gobyexample.com/" class={tw`underline`}>
            Go by Example
          </a>
        </p>
      </main>
    </Page>
  );
}

function fetcher() {
  return Promise.all(
    TOC.map((id) =>
      Deno.readTextFile(`./data/${id}.ts`)
        .then((text) => parseExample(id, text))
    ),
  );
}
