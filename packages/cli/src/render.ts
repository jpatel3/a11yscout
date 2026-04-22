import type { AuditReport, Severity, Violation } from "@a11yscout/core";
import pc from "picocolors";

const IMPACT_COLOR: Record<Severity, (s: string) => string> = {
  critical: pc.red,
  serious: pc.red,
  moderate: pc.yellow,
  minor: pc.dim,
};

const IMPACT_ORDER: Severity[] = ["critical", "serious", "moderate", "minor"];

export function renderReport(report: AuditReport): string {
  const lines: string[] = [];
  const { summary } = report;

  lines.push("");
  lines.push(pc.bold(`WCAG 2.1 ${report.level} audit — ${report.results.length} page(s) scanned`));
  lines.push(pc.dim(`${report.startedAt}`));
  lines.push("");

  if (summary.totalViolations === 0) {
    lines.push(pc.green("✓ No violations found."));
    return lines.join("\n");
  }

  lines.push(pc.bold(`${summary.totalViolations} violation(s):`));
  for (const impact of IMPACT_ORDER) {
    const n = summary.byImpact[impact];
    if (n > 0) lines.push(`  ${IMPACT_COLOR[impact](impact.padEnd(9))} ${n}`);
  }
  lines.push("");

  for (const scan of report.results) {
    if (scan.violations.length === 0) {
      lines.push(pc.green(`✓ ${scan.target.url}`));
      continue;
    }
    lines.push(pc.bold(scan.target.url) + pc.dim(`  (${scan.durationMs}ms)`));
    const sorted = [...scan.violations].sort(
      (a, b) => IMPACT_ORDER.indexOf(a.impact) - IMPACT_ORDER.indexOf(b.impact),
    );
    for (const violation of sorted) {
      lines.push(...renderViolation(violation));
    }
    lines.push("");
  }

  const topCriteria = Object.entries(summary.byCriterion)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);
  if (topCriteria.length > 0) {
    lines.push(pc.bold("Top WCAG failures:"));
    for (const [id, count] of topCriteria) {
      lines.push(`  ${pc.cyan(id)}  ${count} occurrence(s)`);
    }
  }

  return lines.join("\n");
}

function renderViolation(violation: Violation): string[] {
  const color = IMPACT_COLOR[violation.impact];
  const header = `  ${color("●")} ${pc.bold(violation.ruleId)} ${pc.dim(`(${violation.impact})`)} — ${violation.help}`;
  const criteria = violation.wcag.length
    ? pc.dim(`    WCAG ${violation.wcag.map((c) => `${c.id} ${c.level}`).join(", ")}`)
    : "";
  const nodes = violation.nodes.slice(0, 3).map((n) => {
    const selector = n.target.join(" ");
    if (n.sourceLocation) {
      const { file, line, column } = n.sourceLocation;
      const location = pc.cyan(`${file}:${line}:${column}`);
      return `      ${location}  ${pc.dim(selector)}`;
    }
    return pc.dim(`      ${selector}`);
  });
  const more =
    violation.nodes.length > 3
      ? pc.dim(`      … and ${violation.nodes.length - 3} more`)
      : "";
  return [header, criteria, ...nodes, more].filter(Boolean);
}
