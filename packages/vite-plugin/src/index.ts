import { transformAsync } from "@babel/core";
import { a11yscoutBabelPlugin } from "@a11yscout/source-mapper";
import type { Plugin } from "vite";

export interface A11yscoutViteOptions {
  /** Project root. Defaults to Vite's resolved root. */
  root?: string;
  /** Enable in production builds (default: false). */
  injectInProduction?: boolean;
  /** Files to skip. Default: node_modules. */
  exclude?: RegExp[];
  /** Only add the attribute to host DOM elements. Default: true. */
  hostElementsOnly?: boolean;
}

const JSX_EXTENSIONS = /\.(jsx|tsx|mjs|cjs|js|ts)(\?|$)/;

export function a11yscout(options: A11yscoutViteOptions = {}): Plugin {
  let resolvedRoot = options.root ?? process.cwd();
  let isProduction = false;

  return {
    name: "a11yscout:source",
    enforce: "pre",
    configResolved(config) {
      resolvedRoot = options.root ?? config.root;
      isProduction = config.command === "build" && config.mode === "production";
    },
    async transform(code, id) {
      if (!options.injectInProduction && isProduction) return null;
      if (!JSX_EXTENSIONS.test(id)) return null;
      if (!code.includes("<")) return null;

      const exclude = options.exclude ?? [/node_modules/];
      if (exclude.some((re) => re.test(id))) return null;

      try {
        const result = await transformAsync(code, {
          filename: id,
          babelrc: false,
          configFile: false,
          sourceMaps: true,
          ast: false,
          parserOpts: {
            plugins: ["jsx", id.endsWith(".ts") || id.endsWith(".tsx") ? "typescript" : "flow"],
            sourceType: "module",
          },
          plugins: [
            [
              a11yscoutBabelPlugin,
              {
                root: resolvedRoot,
                injectInProduction: options.injectInProduction ?? false,
                exclude,
                hostElementsOnly: options.hostElementsOnly ?? true,
              },
            ],
          ],
        });
        if (!result?.code) return null;
        return { code: result.code, map: result.map ?? null };
      } catch {
        return null;
      }
    },
  };
}

export default a11yscout;
