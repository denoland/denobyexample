import { DenoLogo } from "./Logo.tsx";

export function Header(props: { noSubtitle?: boolean }) {
  return (
    <header class="px(3 lg:14) h(12 lg:20) text-gray-500 flex justify-between items-center">
      <a class="flex items-center flex-shrink-0" href="/">
        <DenoLogo />
        <span class="ml-4 flex items-baseline gap-x-1 flex-col sm:flex-row tracking-tighter">
          <span class="text(2xl gray-900) font-bold leading-none">
            Deno
          </span>
          {!props.noSubtitle &&
            (
              <span class="font-medium italic text(sm sm:base gray-600) leading-none">
                by example
              </span>
            )}
        </span>
      </a>
      <div class="flex items-center gap-6">
        <a
          href="https://deno.land/manual"
          class="hover:underline focus:underline"
        >
          Manual
        </a>
        <a
          href="https://doc.deno.land/builtin/stable"
          class="hover:underline focus:underline"
        >
          API
        </a>
      </div>
    </header>
  );
}
