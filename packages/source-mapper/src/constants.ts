export const SOURCE_ATTR = "data-a11yscout-src";

export function encodeSourceLocation(file: string, line: number, column: number): string {
  return `${file}:${line}:${column}`;
}

export function decodeSourceLocation(value: string): { file: string; line: number; column: number } | null {
  const lastColon = value.lastIndexOf(":");
  if (lastColon <= 0) return null;
  const secondLastColon = value.lastIndexOf(":", lastColon - 1);
  if (secondLastColon <= 0) return null;
  const file = value.slice(0, secondLastColon);
  const line = Number(value.slice(secondLastColon + 1, lastColon));
  const column = Number(value.slice(lastColon + 1));
  if (!Number.isFinite(line) || !Number.isFinite(column) || !file) return null;
  return { file, line, column };
}
