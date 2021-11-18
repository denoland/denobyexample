/** @jsx h */

import { h, tw } from "../deps.ts";
import { DenoLogo } from "./Logo.tsx";

const FOOTER_LINKS = [
  ["https://deno.land/manual", "Manual"],
  ["https://doc.deno.land/builtin/stable", "Runtime API"],
  ["https://deno.land/std", "Standard Library"],
  ["https://deno.land/x", "Third Party Modules"],
  ["https://deno.com/blog", "Blog"],
  ["https://deno.com/company", "Company"],
];

export function Footer() {
  return (
    <footer class={tw`flex justify-between items-end p-8 pt-32`}>
      <div class={tw`flex align-center`}>
        <DenoLogo />
        <p class={tw`ml-4 font-bold text-xl`}>Deno</p>
      </div>
      <div class={tw`flex flex-col lg:flex-row gap-x-8 gap-y-6 text-right`}>
        {FOOTER_LINKS.map(([href, text]) => (
          <a href={href} class={tw`text-gray-500 hover:underline`}>{text}</a>
        ))}
      </div>
    </footer>
  );
}
