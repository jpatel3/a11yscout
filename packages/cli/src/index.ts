import { toSarif, type ScanTarget, type WcagLevel } from "@a11yscout/core";
import { runAudit } from "@a11yscout/scanner";
import { Command } from "commander";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import pc from "picocolors";
import { renderReport } from "./render.js";

const program = new Command();

program
  .name("a11y-audit")
  .description("WCAG 2.1 A/AA accessibility audits powered by axe-core + Playwright")
  .version("0.0.0")
  .argument("<urls...>", "One or more URLs to audit")
  .option("-l, --level <level>", "WCAG conformance level (A, AA, AAA)", "AA")
  .option("-o, --out <dir>", "Directory to write JSON + SARIF report", ".")
  .option("--json <file>", "Write JSON report to specific file")
  .option("--sarif <file>", "Write SARIF report to specific file")
  .option("--screenshot", "Capture full-page screenshots", false)
  .option("--wait-for <selector>", "Wait for a CSS selector before scanning")
  .option("--viewport <WxH>", "Viewport size, e.g. 1280x800")
  .option("--fail-on <impact>", "Exit non-zero if violations at this impact or higher", "serious")
  .option("--silent", "Suppress human-readable output", false)
  .action(async (urls: string[], opts: Record<string, string | boolean>) => {
    const level = (opts.level as string).toUpperCase() as WcagLevel;
    if (!["A", "AA", "AAA"].includes(level)) {
      console.error(pc.red(`Invalid level: ${opts.level}`));
      process.exit(2);
    }

    const viewport = parseViewport(opts.viewport as string | undefined);
    const targets: ScanTarget[] = urls.map((url) => ({
      url,
      ...(viewport ? { viewport } : {}),
      ...(opts.waitFor ? { waitFor: opts.waitFor as string } : {}),
    }));

    if (!opts.silent) {
      console.error(pc.dim(`Scanning ${urls.length} URL(s) at WCAG 2.1 ${level}...`));
    }

    const report = await runAudit(targets, {
      level,
      screenshot: Boolean(opts.screenshot),
    });

    const outDir = resolve(process.cwd(), opts.out as string);
    const jsonPath = resolve(outDir, (opts.json as string) ?? "a11y-report.json");
    const sarifPath = resolve(outDir, (opts.sarif as string) ?? "a11y-report.sarif");

    await writeFile(jsonPath, JSON.stringify(report, null, 2));
    await writeFile(sarifPath, JSON.stringify(toSarif(report), null, 2));

    if (!opts.silent) {
      console.log(renderReport(report));
      console.log("");
      console.log(pc.dim(`JSON:  ${jsonPath}`));
      console.log(pc.dim(`SARIF: ${sarifPath}`));
    }

    const threshold = (opts.failOn as string) || "serious";
    const code = exitCodeFor(report, threshold);
    process.exit(code);
  });

program.parseAsync().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error(pc.red(`Error: ${message}`));
  process.exit(2);
});

function parseViewport(raw: string | undefined): { width: number; height: number } | undefined {
  if (!raw) return undefined;
  const match = raw.match(/^(\d+)x(\d+)$/i);
  if (!match) throw new Error(`--viewport must look like 1280x800, got: ${raw}`);
  return { width: Number(match[1]), height: Number(match[2]) };
}

function exitCodeFor(
  report: { summary: { byImpact: Record<string, number> } },
  threshold: string,
): number {
  const order = ["minor", "moderate", "serious", "critical"];
  const min = order.indexOf(threshold);
  if (min < 0) return 0;
  for (let i = min; i < order.length; i++) {
    const key = order[i] as string;
    if ((report.summary.byImpact[key] ?? 0) > 0) return 1;
  }
  return 0;
}
