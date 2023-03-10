interface TocGroup {
  title: string;
  items: string[];
}

export const TOC: TocGroup[] = [
  {
    title: "Basics",
    items: [
      "hello-world",
      "color-logging",
      "import-export",
      "dependency-management",
      "timers",
    ],
  },
  {
    title: "Encoding",
    items: [
      "importing-json",
      "parsing-serializing-json",
      "parsing-serializing-toml",
      "parsing-serializing-yaml",
      "hex-base64-encoding",
      "byte-manipulation",
    ],
  },
  {
    title: "Cryptography",
    items: [
      "hashing",
      "uuids",
    ],
  },
  {
    title: "CLI",
    items: [
      "command-line-arguments",
      "prompts",
      "deno-version",
      "permissions",
    ],
  },
  {
    title: "System",
    items: [
      "benchmarking",
      "pid",
      "os-signals",
      "environment-variables",
      "subprocesses-output",
    ],
  },
  {
    title: "File System",
    items: [
      "reading-files",
      "writing-files",
      "moving-renaming-files",
      "temporary-files",
      "create-remove-directories",
      "watching-files",
      "walking-directories",
      "checking-file-existence",
    ],
  },
  {
    title: "Network",
    items: [
      "http-requests",
      "dns-queries",
      "http-server",
      "http-server-routing",
      "http-server-streaming",
      "http-server-files",
      "tcp-listener",
      "tcp-connector",
    ],
  },
  {
    title: "Advanced",
    items: [
      "web-workers",
      "webassembly",
    ],
  },
];
