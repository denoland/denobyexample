export function Header(props: { noSubtitle?: boolean }) {
  return (
    <header class="px(3 lg:14) h(12 lg:20) text-gray-500 flex justify-between items-center">
      {!props.noSubtitle
        ? (
          <a class="flex items-center flex-shrink-0" href="/">
            <img src="/logo.png" alt="logo" class="w-12 h-12" />
            <span class="ml-4 flex items-baseline gap-x-1 flex-col sm:flex-row tracking-tighter">
              <span class="text(2xl gray-900) font-bold leading-none dark:text-gray-100">
                Deno
              </span>
              <span class="font-medium italic text(sm sm:base gray-600) leading-none dark:text-gray-400">
                by example
              </span>
            </span>
          </a>
        )
        : <div />}
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
