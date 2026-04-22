# a11yscout

WCAG 2.1 A/AA accessibility audits for GitHub pull requests. Built for indie developers shipping on Vercel/Netlify preview deployments.

## Why this exists

Paste a preview URL, get a WCAG 2.1 A/AA audit on every PR. Works out of the box. Install an optional Vite plugin and violations point at exact JSX file and line — not a mangled CSS selector.

## Quick start (Tier 1 — black-box)

```yaml
# .github/workflows/a11y.yml
on: pull_request
jobs:
  a11y:
    runs-on: ubuntu-latest
    permissions: { contents: read, pull-requests: write }
    steps:
      - uses: jpatel3/a11yscout@v1
        with:
          urls: https://your-preview-url.example.com
          level: AA
          fail-on: serious
```

### Inputs

| Input | Default | Description |
|---|---|---|
| `urls` | *(required)* | URL(s) to scan, newline- or comma-separated |
| `level` | `AA` | WCAG conformance level (`A` or `AA`) |
| `fail-on` | `serious` | Impact threshold to fail the job (`minor`, `moderate`, `serious`, `critical`, `none`) |
| `wait-for` | — | CSS selector to wait for before scanning (SPAs) |
| `viewport` | `1280x800` | Viewport size |
| `screenshot` | `false` | Capture full-page screenshots |
| `comment-on-pr` | `true` | Post a summary PR comment |
| `upload-artifact` | `true` | Upload JSON + SARIF as workflow artifact |

### Outputs

| Output | Description |
|---|---|
| `report-path` | Path to JSON report |
| `sarif-path` | Path to SARIF report (upload with `github/codeql-action/upload-sarif@v3` for inline annotations) |
| `total-violations` | Total violation count |

## Quick start (Tier 2 — source-mapped)

Add the Vite plugin to your app:

```ts
// vite.config.ts
import { a11yscout } from "@a11yscout/vite-plugin";

export default defineConfig({
  plugins: [react(), a11yscout()],
});
```

Now PR comments say `src/components/Button.tsx:12:4` instead of `button.sc-xyz`.

---

## Design principles

These are the decisions we keep coming back to. Every change should check against them.

### 1. The goal is usage, not feature completeness

Every friction point between "I heard about a11yscout" and "I see my first report" is the enemy. Features that can't be demonstrated in 60 seconds of README reading are lower priority than whatever removes the next click.

### 2. Target persona: indie developers on Vercel/Netlify

Not hobbyists, not OSS-only maintainers, not enterprise compliance teams. People who auto-deploy preview URLs on every PR, ship frequently, and care about accessibility as a risk-and-quality concern. Design tradeoffs favor this persona.

### 3. Tiered install: one path gets users in, the other keeps them

- **Tier 1 — Action only.** URL in, report out. No code changes to the user's app. This is what Marketplace visitors try first; it must work in 5 minutes on a fresh repo.
- **Tier 2 — Vite plugin.** Adds source-level mapping. Optional, but once seen the value is obvious: `src/Button.tsx:12` instead of `button.sc-xyz`.

Lead with Tier 1. Let Tier 2 be discovered organically from PR comments.

### 4. WCAG 2.1 A/AA — not 2.0, not 2.2

- 2.0 is outdated; most legal frameworks (EAA, updated ADA, Section 508) reference 2.1+.
- 2.2 adds rules most tools don't test well yet and would add noise for the target persona.
- 2.1 is the sweet spot: legally relevant, broadly tested by axe-core.

### 5. No-config-first, but configurable for power users

Sensible defaults for preview URLs, `wcag2aa`, `fail-on: serious`. Every setting is overridable, but an install with no config must produce a useful report.

### 6. Stable technical foundation

- **pnpm monorepo** — single repo, multiple publishable packages
- **Composite GitHub Action** (not ncc-bundled JS) — reliable with Playwright/axe-core
- **axe-core + Playwright** — the accurate rendered-page scanner, not a static linter
- **Babel plugin injecting `data-a11yscout-src`** — the source-mapping mechanism

---

## Packages

| Package | Description |
|---|---|
| `@a11yscout/core` | WCAG 2.1 rule mapping, shared types, SARIF emitter |
| `@a11yscout/scanner` | axe-core + Playwright scanner |
| `@a11yscout/cli` | `a11y-audit` command-line tool |
| `@a11yscout/source-mapper` | Babel plugin that injects source-location data attributes |
| `@a11yscout/vite-plugin` | Vite wrapper for the source-mapper plugin |
| `action.yml` | Composite GitHub Action (at repo root) |
| `fixtures/vite-app` | Integration test fixture (not published) |

## Local development

```sh
pnpm install
pnpm --filter @a11yscout/scanner exec playwright install chromium
pnpm build

# Scan any URL
node packages/cli/dist/index.js https://example.com --level AA
```

See `docs/audit-local-app.md` for how to audit any locally-running app without modifying it.

## Roadmap

- [x] Scanner CLI
- [x] Source mapper (Babel + Vite plugin)
- [x] GitHub Action
- [ ] GitHub App (webhook-driven PR comments with Check Runs)
- [ ] Marketplace listing

## License

MIT
