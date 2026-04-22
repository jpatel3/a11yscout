import type { NodePath, PluginObj } from "@babel/core";
import type * as BabelTypes from "@babel/core";
import { relative } from "node:path";
import { SOURCE_ATTR, encodeSourceLocation } from "./constants.js";

type Types = typeof BabelTypes.types;

export interface A11yscoutBabelOptions {
  /** Absolute path to the project root. File paths in the injected attribute are relative to this. */
  root?: string;
  /** If true, inject the attribute even in production. Default: only non-production. */
  injectInProduction?: boolean;
  /** Glob or substring filters for files to skip. Default: excludes node_modules. */
  exclude?: RegExp[];
  /** Skip custom-component JSX (uppercase tag names). Default true — only host DOM elements get the attr. */
  hostElementsOnly?: boolean;
}

interface State {
  file: { opts: { filename?: string | undefined | null } };
  opts: A11yscoutBabelOptions;
}

export default function a11yscoutBabelPlugin(babel: { types: Types }): PluginObj<State> {
  const { types: t } = babel;

  return {
    name: "a11yscout-source",
    visitor: {
      JSXOpeningElement(path: NodePath<BabelTypes.types.JSXOpeningElement>, state: State) {
        const opts = state.opts ?? {};
        if (!opts.injectInProduction && process.env.NODE_ENV === "production") return;

        const filename = state.file.opts.filename;
        if (!filename) return;

        const exclude = opts.exclude ?? [/node_modules/];
        if (exclude.some((re) => re.test(filename))) return;

        const loc = path.node.loc;
        if (!loc) return;

        if (opts.hostElementsOnly !== false) {
          if (!isHostElement(t, path.node.name)) return;
        }

        if (hasAttribute(t, path.node.attributes, SOURCE_ATTR)) return;

        const root = opts.root ?? process.cwd();
        const rel = relative(root, filename) || filename;
        const value = encodeSourceLocation(rel, loc.start.line, loc.start.column);

        path.node.attributes.push(
          t.jsxAttribute(t.jsxIdentifier(SOURCE_ATTR), t.stringLiteral(value)),
        );
      },
    },
  };
}

function isHostElement(t: Types, name: BabelTypes.types.JSXOpeningElement["name"]): boolean {
  if (t.isJSXIdentifier(name)) {
    const first = name.name.charAt(0);
    return first === first.toLowerCase() && first !== first.toUpperCase();
  }
  return false;
}

function hasAttribute(
  t: Types,
  attrs: BabelTypes.types.JSXOpeningElement["attributes"],
  name: string,
): boolean {
  for (const attr of attrs) {
    if (t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name) && attr.name.name === name) {
      return true;
    }
  }
  return false;
}
