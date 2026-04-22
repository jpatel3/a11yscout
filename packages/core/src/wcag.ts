import type { WcagCriterion, WcagLevel } from "./types.js";

export const WCAG_CRITERIA: Record<string, WcagCriterion> = {
  "1.1.1": { id: "1.1.1", level: "A", title: "Non-text Content", url: "https://www.w3.org/TR/WCAG20/#text-equiv-all" },
  "1.2.1": { id: "1.2.1", level: "A", title: "Audio-only and Video-only (Prerecorded)", url: "https://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt" },
  "1.2.2": { id: "1.2.2", level: "A", title: "Captions (Prerecorded)", url: "https://www.w3.org/TR/WCAG20/#media-equiv-captions" },
  "1.2.3": { id: "1.2.3", level: "A", title: "Audio Description or Media Alternative (Prerecorded)", url: "https://www.w3.org/TR/WCAG20/#media-equiv-audio-desc" },
  "1.2.4": { id: "1.2.4", level: "AA", title: "Captions (Live)", url: "https://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions" },
  "1.2.5": { id: "1.2.5", level: "AA", title: "Audio Description (Prerecorded)", url: "https://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only" },
  "1.3.1": { id: "1.3.1", level: "A", title: "Info and Relationships", url: "https://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic" },
  "1.3.2": { id: "1.3.2", level: "A", title: "Meaningful Sequence", url: "https://www.w3.org/TR/WCAG20/#content-structure-separation-sequence" },
  "1.3.3": { id: "1.3.3", level: "A", title: "Sensory Characteristics", url: "https://www.w3.org/TR/WCAG20/#content-structure-separation-understanding" },
  "1.4.1": { id: "1.4.1", level: "A", title: "Use of Color", url: "https://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color" },
  "1.4.2": { id: "1.4.2", level: "A", title: "Audio Control", url: "https://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio" },
  "1.4.3": { id: "1.4.3", level: "AA", title: "Contrast (Minimum)", url: "https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast" },
  "1.4.4": { id: "1.4.4", level: "AA", title: "Resize text", url: "https://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale" },
  "1.4.5": { id: "1.4.5", level: "AA", title: "Images of Text", url: "https://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation" },
  "2.1.1": { id: "2.1.1", level: "A", title: "Keyboard", url: "https://www.w3.org/TR/WCAG20/#keyboard-operation-keyboard-operable" },
  "2.1.2": { id: "2.1.2", level: "A", title: "No Keyboard Trap", url: "https://www.w3.org/TR/WCAG20/#keyboard-operation-trapping" },
  "2.2.1": { id: "2.2.1", level: "A", title: "Timing Adjustable", url: "https://www.w3.org/TR/WCAG20/#time-limits-required-behaviors" },
  "2.2.2": { id: "2.2.2", level: "A", title: "Pause, Stop, Hide", url: "https://www.w3.org/TR/WCAG20/#time-limits-pause" },
  "2.3.1": { id: "2.3.1", level: "A", title: "Three Flashes or Below Threshold", url: "https://www.w3.org/TR/WCAG20/#seizure-does-not-violate" },
  "2.4.1": { id: "2.4.1", level: "A", title: "Bypass Blocks", url: "https://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip" },
  "2.4.2": { id: "2.4.2", level: "A", title: "Page Titled", url: "https://www.w3.org/TR/WCAG20/#navigation-mechanisms-title" },
  "2.4.3": { id: "2.4.3", level: "A", title: "Focus Order", url: "https://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order" },
  "2.4.4": { id: "2.4.4", level: "A", title: "Link Purpose (In Context)", url: "https://www.w3.org/TR/WCAG20/#navigation-mechanisms-refs" },
  "2.4.5": { id: "2.4.5", level: "AA", title: "Multiple Ways", url: "https://www.w3.org/TR/WCAG20/#navigation-mechanisms-mult-loc" },
  "2.4.6": { id: "2.4.6", level: "AA", title: "Headings and Labels", url: "https://www.w3.org/TR/WCAG20/#navigation-mechanisms-descriptive" },
  "2.4.7": { id: "2.4.7", level: "AA", title: "Focus Visible", url: "https://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible" },
  "3.1.1": { id: "3.1.1", level: "A", title: "Language of Page", url: "https://www.w3.org/TR/WCAG20/#meaning-doc-lang-id" },
  "3.1.2": { id: "3.1.2", level: "AA", title: "Language of Parts", url: "https://www.w3.org/TR/WCAG20/#meaning-other-lang-id" },
  "3.2.1": { id: "3.2.1", level: "A", title: "On Focus", url: "https://www.w3.org/TR/WCAG20/#consistent-behavior-receive-focus" },
  "3.2.2": { id: "3.2.2", level: "A", title: "On Input", url: "https://www.w3.org/TR/WCAG20/#consistent-behavior-unpredictable-change" },
  "3.2.3": { id: "3.2.3", level: "AA", title: "Consistent Navigation", url: "https://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations" },
  "3.2.4": { id: "3.2.4", level: "AA", title: "Consistent Identification", url: "https://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-functionality" },
  "3.3.1": { id: "3.3.1", level: "A", title: "Error Identification", url: "https://www.w3.org/TR/WCAG20/#minimize-error-identified" },
  "3.3.2": { id: "3.3.2", level: "A", title: "Labels or Instructions", url: "https://www.w3.org/TR/WCAG20/#minimize-error-cues" },
  "3.3.3": { id: "3.3.3", level: "AA", title: "Error Suggestion", url: "https://www.w3.org/TR/WCAG20/#minimize-error-suggestions" },
  "3.3.4": { id: "3.3.4", level: "AA", title: "Error Prevention (Legal, Financial, Data)", url: "https://www.w3.org/TR/WCAG20/#minimize-error-reversible" },
  "4.1.1": { id: "4.1.1", level: "A", title: "Parsing", url: "https://www.w3.org/TR/WCAG20/#ensure-compat-parses" },
  "4.1.2": { id: "4.1.2", level: "A", title: "Name, Role, Value", url: "https://www.w3.org/TR/WCAG20/#ensure-compat-rsv" },
};

export function tagsToWcag(tags: string[]): WcagCriterion[] {
  const criteria: WcagCriterion[] = [];
  const seen = new Set<string>();
  for (const tag of tags) {
    const match = tag.match(/^wcag(\d)(\d)(\d+)$/);
    if (!match) continue;
    const id = `${match[1]}.${match[2]}.${match[3]}`;
    const criterion = WCAG_CRITERIA[id];
    if (criterion && !seen.has(id)) {
      criteria.push(criterion);
      seen.add(id);
    }
  }
  return criteria;
}

export function axeTagsForLevel(level: WcagLevel): string[] {
  if (level === "A") return ["wcag2a"];
  if (level === "AA") return ["wcag2a", "wcag2aa"];
  return ["wcag2a", "wcag2aa", "wcag2aaa"];
}

export function isLevelIncluded(criterion: WcagCriterion, target: WcagLevel): boolean {
  if (target === "A") return criterion.level === "A";
  if (target === "AA") return criterion.level === "A" || criterion.level === "AA";
  return true;
}
