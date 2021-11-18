/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { start } from "https://raw.githubusercontent.com/lucacasonato/fresh/aa1e1bcdb4693610feb3eb4ad7bba460c54cacaf/server.ts";
import routes from "./routes.gen.ts";

await start(routes);
