import { AxeBuilder } from "@axe-core/playwright";
import {
  axeTagsForLevel,
  tagsToWcag,
  type AuditReport,
  type ScanResult,
  type ScanTarget,
  type Severity,
  type Violation,
  type WcagLevel,
} from "@a11yscout/core";
import { chromium, type Browser, type Page } from "playwright";

const DEFAULT_VIEWPORT = { width: 1280, height: 800 };
const DEFAULT_TIMEOUT_MS = 30_000;

export interface ScanOptions {
  level: WcagLevel;
  screenshot?: boolean;
  timeoutMs?: number;
  userAgent?: string;
}

export interface ScannerHandle {
  scan: (target: ScanTarget) => Promise<ScanResult>;
  close: () => Promise<void>;
}

export async function createScanner(options: ScanOptions): Promise<ScannerHandle> {
  const browser: Browser = await chromium.launch({ headless: true });
  const timeout = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  async function scan(target: ScanTarget): Promise<ScanResult> {
    const started = Date.now();
    const context = await browser.newContext({
      viewport: target.viewport ?? DEFAULT_VIEWPORT,
      ...(options.userAgent ? { userAgent: options.userAgent } : {}),
    });
    const page = await context.newPage();
    page.setDefaultTimeout(timeout);

    try {
      await page.goto(target.url, { waitUntil: "networkidle", timeout });
      if (target.waitFor) {
        await page.waitForSelector(target.waitFor, { timeout });
      }

      const analysis = await new AxeBuilder({ page })
        .withTags(axeTagsForLevel(options.level))
        .analyze();

      const screenshot = options.screenshot
        ? (await page.screenshot({ fullPage: true, type: "png" })).toString("base64")
        : undefined;

      const violations: Violation[] = analysis.violations.map((v) => ({
        ruleId: v.id,
        impact: (v.impact ?? "minor") as Severity,
        description: v.description,
        help: v.help,
        helpUrl: v.helpUrl,
        wcag: tagsToWcag(v.tags),
        nodes: v.nodes.map((n) => ({
          target: n.target.map(String),
          html: n.html,
          failureSummary: n.failureSummary ?? "",
        })),
      }));

      return {
        target,
        scannedAt: new Date(started).toISOString(),
        durationMs: Date.now() - started,
        pageTitle: await page.title().catch(() => ""),
        violations,
        passes: analysis.passes.length,
        incomplete: analysis.incomplete.length,
        inapplicable: analysis.inapplicable.length,
        ...(screenshot ? { screenshot } : {}),
      };
    } finally {
      await closePage(page);
      await context.close();
    }
  }

  async function close(): Promise<void> {
    await browser.close();
  }

  return { scan, close };
}

async function closePage(page: Page): Promise<void> {
  try {
    await page.close();
  } catch {
    // already closed
  }
}

export async function runAudit(
  targets: ScanTarget[],
  options: ScanOptions,
): Promise<AuditReport> {
  const started = new Date();
  const scanner = await createScanner(options);
  const results: ScanResult[] = [];

  try {
    for (const target of targets) {
      results.push(await scanner.scan(target));
    }
  } finally {
    await scanner.close();
  }

  return buildReport(started, new Date(), options.level, results);
}

function buildReport(
  started: Date,
  finished: Date,
  level: WcagLevel,
  results: ScanResult[],
): AuditReport {
  const byImpact: Record<Severity, number> = {
    critical: 0,
    serious: 0,
    moderate: 0,
    minor: 0,
  };
  const byCriterion: Record<string, number> = {};
  let totalViolations = 0;

  for (const scan of results) {
    for (const violation of scan.violations) {
      const count = violation.nodes.length;
      totalViolations += count;
      byImpact[violation.impact] += count;
      for (const criterion of violation.wcag) {
        byCriterion[criterion.id] = (byCriterion[criterion.id] ?? 0) + count;
      }
    }
  }

  return {
    version: "0.0.0",
    startedAt: started.toISOString(),
    finishedAt: finished.toISOString(),
    level,
    results,
    summary: { totalViolations, byImpact, byCriterion },
  };
}
