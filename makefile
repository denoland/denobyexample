dev:
	deno run --allow-net --allow-read=. --allow-env --no-check --watch www/main.ts

fmt:
	deno fmt

lint:
	deno lint