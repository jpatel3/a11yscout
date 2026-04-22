import { describe, expect, it } from "vitest";
import { axeTagsForLevel, isLevelIncluded, tagsToWcag, WCAG_CRITERIA } from "./wcag.js";

describe("tagsToWcag", () => {
  it("maps axe wcag tags to criteria", () => {
    const result = tagsToWcag(["cat.color", "wcag2a", "wcag143", "wcag412"]);
    expect(result.map((c) => c.id)).toEqual(["1.4.3", "4.1.2"]);
    expect(result[0]?.level).toBe("AA");
    expect(result[1]?.level).toBe("A");
  });

  it("deduplicates", () => {
    const result = tagsToWcag(["wcag111", "wcag111"]);
    expect(result).toHaveLength(1);
  });

  it("ignores unknown tags", () => {
    expect(tagsToWcag(["best-practice", "wcag999"])).toEqual([]);
  });
});

describe("axeTagsForLevel", () => {
  it("includes AA tags for AA level", () => {
    expect(axeTagsForLevel("AA")).toContain("wcag2aa");
    expect(axeTagsForLevel("AA")).toContain("wcag2a");
  });

  it("excludes AAA for AA level", () => {
    expect(axeTagsForLevel("AA")).not.toContain("wcag2aaa");
  });
});

describe("isLevelIncluded", () => {
  it("AA includes A and AA criteria", () => {
    expect(isLevelIncluded(WCAG_CRITERIA["1.1.1"]!, "AA")).toBe(true);
    expect(isLevelIncluded(WCAG_CRITERIA["1.4.3"]!, "AA")).toBe(true);
  });

  it("A excludes AA criteria", () => {
    expect(isLevelIncluded(WCAG_CRITERIA["1.4.3"]!, "A")).toBe(false);
  });
});
