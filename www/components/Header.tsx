/** @jsx h */

import { h, tw } from "../deps.ts";
import { DenoLogo } from "./Logo.tsx";

export function Header() {
  return (
    <header
      class={tw
        `px(3 lg:14) h(12 lg:20) text-gray-500 flex justify-between items-center`}
    >
      <a
        class={tw`flex items-center flex-shrink-0`}
        href="/"
      >
        <DenoLogo />
        <span
          class={tw
            `ml-4 flex items-baseline gap-x-1 flex-col sm:flex-row tracking-tighter`}
        >
          <span class={tw`text(2xl gray-900) font-bold leading-none`}>
            Deno
          </span>
          <span
            class={tw
              `font-medium italic text(sm sm:base gray-600) leading-none`}
          >
            by example
          </span>
        </span>
      </a>
      <div class={tw`flex items-center gap-6`}>
        <a
          href="https://deno.land/manual"
          class={tw`hover:underline focus:underline`}
        >
          Manual
        </a>
        <a
          href="https://doc.deno.land/builtin/stable"
          class={tw`hover:underline focus:underline`}
        >
          API
        </a>
      </div>
    </header>
  );
}
