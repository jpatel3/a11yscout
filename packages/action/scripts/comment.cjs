const fs = require("node:fs");
const path = require("node:path");

const MARKER = "<!-- a11yscout-report -->";

function renderBody(report) {
  const { summary, level, results } = report;
  const lines = [MARKER, `## a11yscout — WCAG 2.1 ${level} audit`, ""];

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

  const samples = results.flatMap((r) =>
    r.violations.slice(0, 3).map((v) => ({
      ruleId: v.ruleId,
      impact: v.impact,
      help: v.help,
      url: r.target.url,
      wcag: v.wcag.map((c) => `${c.id} ${c.level}`).join(", "),
      source: v.nodes.find((n) => n.sourceLocation)?.sourceLocation,
      selector: v.nodes[0]?.target?.join(" ") ?? "",
    })),
  );

  if (samples.length > 0) {
    lines.push("");
    lines.push("### Sample violations");
    lines.push("");
    for (const s of samples.slice(0, 8)) {
      const loc = s.source ? `\`${s.source.file}:${s.source.line}:${s.source.column}\`` : `\`${s.selector}\``;
      lines.push(`- **${s.ruleId}** (${s.impact}, WCAG ${s.wcag}) — ${s.help}  \n  ${loc}`);
    }
  }

  const sourceMappedCount = results
    .flatMap((r) => r.violations)
    .flatMap((v) => v.nodes)
    .filter((n) => n.sourceLocation).length;
  if (sourceMappedCount === 0 && summary.totalViolations > 0) {
    lines.push("");
    lines.push(
      "> Install `@a11yscout/vite-plugin` to see the exact file and line of each violation.",
    );
  }

  lines.push("");
  lines.push("<sub>Full JSON + SARIF report attached as a workflow artifact.</sub>");
  return lines.join("\n");
}

async function postComment({ github, context, jsonPath }) {
  if (!jsonPath || !fs.existsSync(jsonPath)) return;
  const pr = context.payload.pull_request;
  if (!pr) return;

  const report = JSON.parse(fs.readFileSync(path.resolve(jsonPath), "utf8"));
  const body = renderBody(report);

  const { data: comments } = await github.rest.issues.listComments({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: pr.number,
    per_page: 100,
  });
  const prior = comments.find((c) => c.body && c.body.includes(MARKER));
  if (prior) {
    await github.rest.issues.updateComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      comment_id: prior.id,
      body,
    });
  } else {
    await github.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: pr.number,
      body,
    });
  }
}

module.exports = { postComment };
