const fs = require("node:fs");
const path = require("node:path");

function render(report) {
  const { summary, level, results } = report;
  const lines = [];
  lines.push(`## a11yscout — WCAG 2.1 ${level} audit`);
  lines.push("");

  if (summary.totalViolations === 0) {
    lines.push(`No violations found across ${results.length} page(s).`);
    return lines.join("\n");
  }

  lines.push(`**${summary.totalViolations} violation(s)** across ${results.length} page(s).`);
  lines.push("");
  lines.push("| Impact | Count |");
  lines.push("| --- | ---: |");
  for (const impact of ["critical", "serious", "moderate", "minor"]) {
    if (summary.byImpact[impact] > 0) lines.push(`| ${impact} | ${summary.byImpact[impact]} |`);
  }

  const criteria = Object.entries(summary.byCriterion)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);
  if (criteria.length > 0) {
    lines.push("");
    lines.push("### Top WCAG failures");
    lines.push("");
    lines.push("| Criterion | Occurrences |");
    lines.push("| --- | ---: |");
    for (const [id, count] of criteria) lines.push(`| ${id} | ${count} |`);
  }

  const sourceMappedCount = results
    .flatMap((r) => r.violations)
    .flatMap((v) => v.nodes)
    .filter((n) => n.sourceLocation).length;
  if (sourceMappedCount === 0 && summary.totalViolations > 0) {
    lines.push("");
    lines.push(
      "> **Tip:** install `@a11yscout/vite-plugin` in your app to see the exact file and line of each violation.",
    );
  }

  return lines.join("\n");
}

function main() {
  const jsonPath = process.argv[2];
  if (!jsonPath || !fs.existsSync(jsonPath)) {
    console.log("a11yscout: no report produced.");
    return;
  }
  const report = JSON.parse(fs.readFileSync(path.resolve(jsonPath), "utf8"));
  console.log(render(report));
}

main();
