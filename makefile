dev:
	deno run --allow-net --allow-read=. --allow-env --no-check --watch www/main.ts

fmt:
	deno fmt

fmt_check:
	deno fmt --check

lint:
	deno lint