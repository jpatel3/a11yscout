export type WcagLevel = "A" | "AA" | "AAA";

export type Severity = "critical" | "serious" | "moderate" | "minor";

export interface WcagCriterion {
  id: string;
  level: WcagLevel;
  title: string;
  url: string;
}

export interface ViolationNode {
  target: string[];
  html: string;
  failureSummary: string;
  screenshot?: string;
  sourceLocation?: SourceLocation;
}

export interface SourceLocation {
  file: string;
  line: number;
  column?: number;
  componentName?: string;
}

export interface Violation {
  ruleId: string;
  impact: Severity;
  description: string;
  help: string;
  helpUrl: string;
  wcag: WcagCriterion[];
  nodes: ViolationNode[];
}

export interface ScanTarget {
  url: string;
  label?: string;
  viewport?: { width: number; height: number };
  waitFor?: string;
}

export interface ScanResult {
  target: ScanTarget;
  scannedAt: string;
  durationMs: number;
  pageTitle: string;
  violations: Violation[];
  passes: number;
  incomplete: number;
  inapplicable: number;
  screenshot?: string;
}

export interface AuditReport {
  version: string;
  startedAt: string;
  finishedAt: string;
  level: WcagLevel;
  results: ScanResult[];
  summary: {
    totalViolations: number;
    byImpact: Record<Severity, number>;
    byCriterion: Record<string, number>;
  };
}
