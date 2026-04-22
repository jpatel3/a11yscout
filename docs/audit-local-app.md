# Audit any running app locally (Tier 1, zero integration)

Use this when you want to point a11yscout at an app that's already running on your machine — including apps whose source you don't want to modify.

## Prerequisites

- a11yscout cloned and built: `pnpm install && pnpm build && pnpm --filter @a11yscout/scanner exec playwright install chromium`

## Steps

1. Start your app however you normally do. For example:

   ```sh
   # in a separate terminal, from your app's directory
   npm run dev
   ```

   Note the URL it's serving on (e.g. `http://localhost:3000`, `http://127.0.0.1:5173`).

2. From the a11yscout checkout, run the CLI against that URL:

   ```sh
   node packages/cli/dist/index.js http://localhost:3000 \
     --level AA \
     --fail-on serious \
     --out /tmp/my-app-audit
   ```

   Add `--wait-for "#root > *"` if your app is an SPA that renders after a delay.

3. Inspect the output:

   ```sh
   ls /tmp/my-app-audit/
   # a11y-report.json  a11y-report.sarif
   ```

   The human-readable summary prints to the terminal. The JSON has the full
   structure. The SARIF can be opened in any SARIF viewer.

## What you'll see

Without the Vite plugin installed in your app, violations will include:
- The WCAG criterion that failed
- Severity (critical/serious/moderate/minor)
- The CSS selector of the offending DOM element
- The raw HTML snippet

You will **not** see source file locations — those come from Tier 2 (the
`@a11yscout/vite-plugin` integration).

## Scanning multiple pages

```sh
node packages/cli/dist/index.js \
  http://localhost:3000/ \
  http://localhost:3000/pricing \
  http://localhost:3000/dashboard \
  --level AA
```

## Notes

- This command **does not modify the target app** in any way. It only loads pages with a headless browser and reads the rendered DOM.
- `--fail-on none` makes the command always exit 0, useful for exploratory audits.
- Screenshots are off by default to keep JSON small; add `--screenshot` to embed them.
