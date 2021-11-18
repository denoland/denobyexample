/** @jsx h */

import { ComponentChildren, h, Head, tw } from "../deps.ts";
import { Footer } from "./Footer.tsx";
import { Header } from "./Header.tsx";

export function Page(
  props: { title: string; children: ComponentChildren },
) {
  return (
    <div
      class={tw`min-h-screen grid grid-cols-1`}
      style={"grid-template-rows: auto 1fr auto;"}
    >
      <Head>
        <link
          rel="shortcut icon"
          href="/favicon.ico"
          type="image/x-icon"
        />
        <title>{props.title}</title>
      </Head>
      <Header />
      <div>
        {props.children}
      </div>
      <Footer />
    </div>
  );
}
