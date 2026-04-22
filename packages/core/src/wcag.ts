import type { WcagCriterion, WcagLevel } from "./types.js";

const WCAG21_BASE = "https://www.w3.org/TR/WCAG21";

export const WCAG_CRITERIA: Record<string, WcagCriterion> = {
  "1.1.1": { id: "1.1.1", level: "A", title: "Non-text Content", url: `${WCAG21_BASE}/#non-text-content` },
  "1.2.1": { id: "1.2.1", level: "A", title: "Audio-only and Video-only (Prerecorded)", url: `${WCAG21_BASE}/#audio-only-and-video-only-prerecorded` },
  "1.2.2": { id: "1.2.2", level: "A", title: "Captions (Prerecorded)", url: `${WCAG21_BASE}/#captions-prerecorded` },
  "1.2.3": { id: "1.2.3", level: "A", title: "Audio Description or Media Alternative (Prerecorded)", url: `${WCAG21_BASE}/#audio-description-or-media-alternative-prerecorded` },
  "1.2.4": { id: "1.2.4", level: "AA", title: "Captions (Live)", url: `${WCAG21_BASE}/#captions-live` },
  "1.2.5": { id: "1.2.5", level: "AA", title: "Audio Description (Prerecorded)", url: `${WCAG21_BASE}/#audio-description-prerecorded` },
  "1.3.1": { id: "1.3.1", level: "A", title: "Info and Relationships", url: `${WCAG21_BASE}/#info-and-relationships` },
  "1.3.2": { id: "1.3.2", level: "A", title: "Meaningful Sequence", url: `${WCAG21_BASE}/#meaningful-sequence` },
  "1.3.3": { id: "1.3.3", level: "A", title: "Sensory Characteristics", url: `${WCAG21_BASE}/#sensory-characteristics` },
  "1.3.4": { id: "1.3.4", level: "AA", title: "Orientation", url: `${WCAG21_BASE}/#orientation` },
  "1.3.5": { id: "1.3.5", level: "AA", title: "Identify Input Purpose", url: `${WCAG21_BASE}/#identify-input-purpose` },
  "1.4.1": { id: "1.4.1", level: "A", title: "Use of Color", url: `${WCAG21_BASE}/#use-of-color` },
  "1.4.2": { id: "1.4.2", level: "A", title: "Audio Control", url: `${WCAG21_BASE}/#audio-control` },
  "1.4.3": { id: "1.4.3", level: "AA", title: "Contrast (Minimum)", url: `${WCAG21_BASE}/#contrast-minimum` },
  "1.4.4": { id: "1.4.4", level: "AA", title: "Resize text", url: `${WCAG21_BASE}/#resize-text` },
  "1.4.5": { id: "1.4.5", level: "AA", title: "Images of Text", url: `${WCAG21_BASE}/#images-of-text` },
  "1.4.10": { id: "1.4.10", level: "AA", title: "Reflow", url: `${WCAG21_BASE}/#reflow` },
  "1.4.11": { id: "1.4.11", level: "AA", title: "Non-text Contrast", url: `${WCAG21_BASE}/#non-text-contrast` },
  "1.4.12": { id: "1.4.12", level: "AA", title: "Text Spacing", url: `${WCAG21_BASE}/#text-spacing` },
  "1.4.13": { id: "1.4.13", level: "AA", title: "Content on Hover or Focus", url: `${WCAG21_BASE}/#content-on-hover-or-focus` },
  "2.1.1": { id: "2.1.1", level: "A", title: "Keyboard", url: `${WCAG21_BASE}/#keyboard` },
  "2.1.2": { id: "2.1.2", level: "A", title: "No Keyboard Trap", url: `${WCAG21_BASE}/#no-keyboard-trap` },
  "2.1.4": { id: "2.1.4", level: "A", title: "Character Key Shortcuts", url: `${WCAG21_BASE}/#character-key-shortcuts` },
  "2.2.1": { id: "2.2.1", level: "A", title: "Timing Adjustable", url: `${WCAG21_BASE}/#timing-adjustable` },
  "2.2.2": { id: "2.2.2", level: "A", title: "Pause, Stop, Hide", url: `${WCAG21_BASE}/#pause-stop-hide` },
  "2.3.1": { id: "2.3.1", level: "A", title: "Three Flashes or Below Threshold", url: `${WCAG21_BASE}/#three-flashes-or-below-threshold` },
  "2.4.1": { id: "2.4.1", level: "A", title: "Bypass Blocks", url: `${WCAG21_BASE}/#bypass-blocks` },
  "2.4.2": { id: "2.4.2", level: "A", title: "Page Titled", url: `${WCAG21_BASE}/#page-titled` },
  "2.4.3": { id: "2.4.3", level: "A", title: "Focus Order", url: `${WCAG21_BASE}/#focus-order` },
  "2.4.4": { id: "2.4.4", level: "A", title: "Link Purpose (In Context)", url: `${WCAG21_BASE}/#link-purpose-in-context` },
  "2.4.5": { id: "2.4.5", level: "AA", title: "Multiple Ways", url: `${WCAG21_BASE}/#multiple-ways` },
  "2.4.6": { id: "2.4.6", level: "AA", title: "Headings and Labels", url: `${WCAG21_BASE}/#headings-and-labels` },
  "2.4.7": { id: "2.4.7", level: "AA", title: "Focus Visible", url: `${WCAG21_BASE}/#focus-visible` },
  "2.5.1": { id: "2.5.1", level: "A", title: "Pointer Gestures", url: `${WCAG21_BASE}/#pointer-gestures` },
  "2.5.2": { id: "2.5.2", level: "A", title: "Pointer Cancellation", url: `${WCAG21_BASE}/#pointer-cancellation` },
  "2.5.3": { id: "2.5.3", level: "A", title: "Label in Name", url: `${WCAG21_BASE}/#label-in-name` },
  "2.5.4": { id: "2.5.4", level: "A", title: "Motion Actuation", url: `${WCAG21_BASE}/#motion-actuation` },
  "3.1.1": { id: "3.1.1", level: "A", title: "Language of Page", url: `${WCAG21_BASE}/#language-of-page` },
  "3.1.2": { id: "3.1.2", level: "AA", title: "Language of Parts", url: `${WCAG21_BASE}/#language-of-parts` },
  "3.2.1": { id: "3.2.1", level: "A", title: "On Focus", url: `${WCAG21_BASE}/#on-focus` },
  "3.2.2": { id: "3.2.2", level: "A", title: "On Input", url: `${WCAG21_BASE}/#on-input` },
  "3.2.3": { id: "3.2.3", level: "AA", title: "Consistent Navigation", url: `${WCAG21_BASE}/#consistent-navigation` },
  "3.2.4": { id: "3.2.4", level: "AA", title: "Consistent Identification", url: `${WCAG21_BASE}/#consistent-identification` },
  "3.3.1": { id: "3.3.1", level: "A", title: "Error Identification", url: `${WCAG21_BASE}/#error-identification` },
  "3.3.2": { id: "3.3.2", level: "A", title: "Labels or Instructions", url: `${WCAG21_BASE}/#labels-or-instructions` },
  "3.3.3": { id: "3.3.3", level: "AA", title: "Error Suggestion", url: `${WCAG21_BASE}/#error-suggestion` },
  "3.3.4": { id: "3.3.4", level: "AA", title: "Error Prevention (Legal, Financial, Data)", url: `${WCAG21_BASE}/#error-prevention-legal-financial-data` },
  "4.1.1": { id: "4.1.1", level: "A", title: "Parsing", url: `${WCAG21_BASE}/#parsing` },
  "4.1.2": { id: "4.1.2", level: "A", title: "Name, Role, Value", url: `${WCAG21_BASE}/#name-role-value` },
  "4.1.3": { id: "4.1.3", level: "AA", title: "Status Messages", url: `${WCAG21_BASE}/#status-messages` },
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
  if (level === "A") return ["wcag2a", "wcag21a"];
  if (level === "AA") return ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];
  return ["wcag2a", "wcag2aa", "wcag2aaa", "wcag21a", "wcag21aa", "wcag21aaa"];
}

export function isLevelIncluded(criterion: WcagCriterion, target: WcagLevel): boolean {
  if (target === "A") return criterion.level === "A";
  if (target === "AA") return criterion.level === "A" || criterion.level === "AA";
  return true;
}
