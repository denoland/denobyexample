import IconDatabase from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/database.tsx";
import IconFlag3 from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/flag-3.tsx";
import IconTransform from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/transform.tsx";
import IconFileShredder from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/file-shredder.tsx";
import IconTerminal2 from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/terminal-2.tsx";
import IconDeviceDesktop from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/device-desktop.tsx";
import IconFiles from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/files.tsx";
import IconNetwork from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/network.tsx";
import IconStars from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/stars.tsx";
import { FunctionComponent } from "preact";

interface TocGroup {
  title: string;
  icon?: FunctionComponent;
  items: string[];
}

export const TOC: TocGroup[] = [
  {
    title: "Basics",
    icon: IconFlag3,
    items: [
      "hello-world",
      "color-logging",
      "import-export",
      "dependency-management",
      "node",
      "npm",
      "typescript",
      "timers",
      "url-parsing",
    ],
  },
  {
    title: "Encoding",
    icon: IconTransform,
    items: [
      "importing-json",
      "parsing-serializing-json",
      "parsing-serializing-toml",
      "parsing-serializing-yaml",
      "parsing-serializing-csv",
      "hex-base64-encoding",
      "byte-manipulation",
    ],
  },

  {
    title: "CLI",
    icon: IconTerminal2,
    items: [
      "command-line-arguments",
      "prompts",
      "deno-version",
      "permissions",
      "writing-tests",
    ],
  },
  {
    title: "Network",
    icon: IconNetwork,
    items: [
      "http-requests",
      "websocket",
      "dns-queries",
      "http-server",
      "http-server-routing",
      "http-server-streaming",
      "http-server-files",
      "http-server-websocket",
      "tcp-listener",
      "tcp-connector",
      "udp-listener",
      "udp-connector",
      "tls-listener",
      "tls-connector",
      "piping-streams",
    ],
  },
  {
    title: "System",
    icon: IconDeviceDesktop,
    items: [
      "benchmarking",
      "pid",
      "os-signals",
      "environment-variables",
      "subprocesses-output",
      "subprocesses-spawn",
    ],
  },
  {
    title: "File System",
    icon: IconFiles,
    items: [
      "reading-files",
      "writing-files",
      "deleting-files",
      "moving-renaming-files",
      "temporary-files",
      "create-remove-directories",
      "symlinks",
      "watching-files",
      "walking-directories",
      "checking-file-existence",
      "path-operations",
      "streaming-files",
    ],
  },
  {
    title: "Databases",
    icon: IconDatabase,
    items: [
      "postgres",
      "kv",
    ],
  },
  {
    title: "Cryptography",
    icon: IconFileShredder,
    items: [
      "hashing",
      "uuids",
    ],
  },
  {
    title: "Advanced",
    icon: IconStars,
    items: [
      "web-workers",
      "webassembly",
    ],
  },
];
