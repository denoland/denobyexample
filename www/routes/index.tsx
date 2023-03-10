import { TOC } from "../../toc.ts";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Page } from "../components/Page.tsx";
import { ExampleGroup, parseExample } from "../utils/example.ts";
import { IndexGroup } from "../components/List.tsx";

async function loadExample(id: string) {
  const data = await Deno.readTextFile(`./data/${id}.ts`);
  return parseExample(id, data);
}

export const handler: Handlers<ExampleGroup[]> = {
  async GET(_req, { render }) {
    const data = await Promise.all(
      TOC.map(async (category): Promise<ExampleGroup> => {
        return {
          title: category.title,
          items: await Promise.all(category.items.map(loadExample)),
        };
      }),
    );

    return render!(data);
  },
};

export default function Home(props: PageProps<ExampleGroup[]>) {
  return (
    <Page title={`Deno by Example`} noSubtitle>
      <Head>
        <meta
          name="description"
          content="Deno by example is a collection of annotated examples for how to use Deno, and the various features it provides."
        />
      </Head>
      <main class="max-w-screen-sm mx-auto p-4">
        <h1>
          <span class="text(5xl gray-900) tracking-tight font-bold">
            Deno
          </span>
          <span class="text(2xl gray-700) tracking-tight italic font-medium ml-2">
            by example
          </span>
        </h1>
        <p class="mt-8 text-gray-900">
          Deno is a simple, modern and secure runtime for JavaScript and
          TypeScript that uses V8 and is built in Rust.
        </p>
        <p class="mt-6 text-gray-900">
          <i class="italic">Deno by example</i>{" "}
          is a collection of annotated examples for how to use Deno, and the
          various features it provides. It acts as a reference for how to do
          various things in Deno, but can also be used as a guide to learn about
          many of the features Deno provides.
        </p>
        <ul class="mt-6 text-gray-900 space-y-8">
          {props.data.map(
            (group) => <IndexGroup group={group} />,
          )}
        </ul>
        <p class="mt-6 text-gray-900">
          For WebGPU examples, visit our{" "}
          <a
            class="underline"
            href="https://github.com/denoland/webgpu-examples"
          >
            WebGPU examples repo
          </a>
          .
        </p>
        <p class="mt-12 text-gray-500">
          <a
            href="https://github.com/denoland/denobyexample"
            class="underline"
          >
            Source
          </a>{" "}
          |{" "}
          <a
            href="https://github.com/denoland/denobyexample/blob/main/LICENSE"
            class="underline"
          >
            License
          </a>{" "}
          | Inspired by{" "}
          <a href="https://gobyexample.com/" class="underline">
            Go by Example
          </a>
        </p>
      </main>
    </Page>
  );
}
