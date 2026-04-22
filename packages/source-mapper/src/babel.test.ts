import { transformSync } from "@babel/core";
import { describe, expect, it } from "vitest";
import a11yscoutBabelPlugin from "./babel.js";

function transform(code: string, filename: string, opts: Record<string, unknown> = {}): string {
  const result = transformSync(code, {
    filename,
    babelrc: false,
    configFile: false,
    plugins: [["@babel/plugin-syntax-jsx"], [a11yscoutBabelPlugin, { root: "/repo", ...opts }]],
  });
  return result?.code ?? "";
}

describe("a11yscout babel plugin", () => {
  it("injects data-a11yscout-src on host elements", () => {
    const out = transform(`const el = <div>hi</div>;`, "/repo/src/App.tsx");
    expect(out).toMatch(/data-a11yscout-src="src\/App\.tsx:1:11"/);
  });

  it("skips custom components by default", () => {
    const out = transform(`const el = <Button>x</Button>;`, "/repo/src/App.tsx");
    expect(out).not.toContain("data-a11yscout-src");
  });

  it("does not duplicate attribute if already present", () => {
    const code = `const el = <div data-a11yscout-src="manual">hi</div>;`;
    const out = transform(code, "/repo/src/App.tsx");
    const matches = out.match(/data-a11yscout-src/g) ?? [];
    expect(matches).toHaveLength(1);
  });

  it("excludes node_modules by default", () => {
    const out = transform(`const el = <div>hi</div>;`, "/repo/node_modules/lib/x.js");
    expect(out).not.toContain("data-a11yscout-src");
  });

  it("honors custom exclude patterns", () => {
    const out = transform(`const el = <div>hi</div>;`, "/repo/vendor/x.tsx", { exclude: [/vendor/] });
    expect(out).not.toContain("data-a11yscout-src");
  });

  it("writes paths relative to the configured root", () => {
    const out = transform(`const el = <span>x</span>;`, "/repo/packages/ui/src/Foo.tsx", {
      root: "/repo/packages/ui",
    });
    expect(out).toMatch(/data-a11yscout-src="src\/Foo\.tsx:/);
  });
});
