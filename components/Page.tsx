import type { ComponentChildren } from "preact";
import { Head } from "$fresh/runtime.ts";
import { Footer } from "./Footer.tsx";
import { Header } from "./Header.tsx";

export function Page(props: {
  title: string;
  noSubtitle?: boolean;
  children: ComponentChildren;
}) {
  return (
    <div
      class="min-h-screen grid grid-cols-1"
      style="grid-template-rows: auto 1fr auto;"
    >
      <Head>
        <link
          rel="shortcut icon"
          href="/favicon.ico"
          type="image/x-icon"
        />
        <title>{props.title}</title>
      </Head>
      <Header noSubtitle={props.noSubtitle} />
      <div>
        {props.children}
      </div>
      <Footer />
    </div>
  );
}
