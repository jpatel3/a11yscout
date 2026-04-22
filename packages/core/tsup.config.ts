import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/wcag.ts", "src/sarif.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  target: "node20",
});
