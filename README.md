# a11yscout

WCAG 2.1 A/AA accessibility audits for GitHub pull requests. Built for indie SaaS founders shipping on Vercel/Netlify preview deployments.

## Packages

| Package | Description |
|---|---|
| `@a11yscout/core` | WCAG rule mapping, shared types, SARIF emitter |
| `@a11yscout/scanner` | axe-core + Playwright scanner |
| `@a11yscout/cli` | `a11y-audit` command-line tool |

## Quick start

```sh
pnpm install
pnpm --filter @a11yscout/scanner exec playwright install chromium
pnpm build
node packages/cli/dist/index.js https://example.com --level AA
```

## Roadmap

- [x] Phase 1: Scanner CLI
- [ ] Phase 2: GitHub Action
- [ ] Phase 3: Source mapper (Vite/Next.js plugin + AST fallback)
- [ ] Phase 4: GitHub App (Cloudflare Workers + Hono)
- [ ] Phase 5: Marketplace listing
- [ ] Phase 6: AI fix suggestions (Claude)
- [ ] Phase 7: Monetization
