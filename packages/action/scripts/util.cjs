// Decode CSS-escape sequences in selectors so PR comments are readable.
// axe-core emits selectors like "#\30 -18" (CSS escape for IDs starting with
// a digit), which are valid CSS but unreadable. This converts them back.
function prettifySelector(selector) {
  if (typeof selector !== "string") return selector;
  return selector
    .replace(/\\([0-9a-fA-F]{1,6}) ?/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(/\\(.)/g, "$1");
}

module.exports = { prettifySelector };
