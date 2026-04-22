import type { AuditReport, Severity } from "./types.js";

const SARIF_SEVERITY: Record<Severity, "error" | "warning" | "note"> = {
  critical: "error",
  serious: "error",
  moderate: "warning",
  minor: "note",
};

export function toSarif(report: AuditReport): object {
  const rules = new Map<string, {
    id: string;
    name: string;
    shortDescription: { text: string };
    fullDescription: { text: string };
    helpUri: string;
    properties: { tags: string[]; impact: Severity };
  }>();
  const results: unknown[] = [];

  for (const scan of report.results) {
    for (const violation of scan.violations) {
      if (!rules.has(violation.ruleId)) {
        rules.set(violation.ruleId, {
          id: violation.ruleId,
          name: violation.ruleId,
          shortDescription: { text: violation.description },
          fullDescription: { text: violation.help },
          helpUri: violation.helpUrl,
          properties: {
            tags: violation.wcag.map((c) => `WCAG ${c.id} (${c.level})`),
            impact: violation.impact,
          },
        });
      }

      for (const node of violation.nodes) {
        results.push({
          ruleId: violation.ruleId,
          level: SARIF_SEVERITY[violation.impact],
          message: { text: node.failureSummary || violation.help },
          locations: [
            node.sourceLocation
              ? {
                  physicalLocation: {
                    artifactLocation: { uri: node.sourceLocation.file },
                    region: {
                      startLine: node.sourceLocation.line,
                      ...(node.sourceLocation.column !== undefined
                        ? { startColumn: node.sourceLocation.column }
                        : {}),
                    },
                  },
                }
              : {
                  logicalLocations: [
                    { fullyQualifiedName: node.target.join(" "), kind: "element" },
                  ],
                  properties: { url: scan.target.url, selector: node.target.join(" ") },
                },
          ],
          properties: { html: node.html, target: node.target },
        });
      }
    }
  }

  return {
    $schema: "https://raw.githubusercontent.com/oasis-tcs/sarif-spec/main/Schemata/sarif-schema-2.1.0.json",
    version: "2.1.0",
    runs: [
      {
        tool: {
          driver: {
            name: "a11yscout",
            version: report.version,
            informationUri: "https://github.com/jpatel3/a11yscout",
            rules: Array.from(rules.values()),
          },
        },
        results,
      },
    ],
  };
}
