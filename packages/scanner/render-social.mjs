// Render ../../assets/social-preview.png from ../../assets/social-card.html.
// Run: pnpm --filter @a11yscout/scanner exec node render-social.mjs
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(here, "../../assets/social-card.html");
const out = resolve(here, "../../assets/social-preview.png");

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 640 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
await page.goto(`file://${htmlPath}`);
await page.waitForLoadState("networkidle");
await page.screenshot({
  path: out,
  clip: { x: 0, y: 0, width: 1280, height: 640 },
});
await browser.close();
console.log(`wrote ${out}`);
