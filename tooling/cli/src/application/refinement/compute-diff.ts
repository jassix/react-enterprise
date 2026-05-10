import { createTwoFilesPatch } from "diff";
import type { Colors } from "~/infrastructure/colors";

export interface FilePair {
  readonly path: string;
  readonly before: string | null;
  readonly after: string;
}

export function computeUnifiedDiff(pairs: readonly FilePair[]): string {
  return pairs.map((pair) => oneFileDiff(pair)).join("\n\n");
}

export function colorizeUnifiedDiff(diff: string, colors: Colors): string {
  if (!colors.enabled) return diff;
  return diff
    .split("\n")
    .map((line) => colorizeLine(line, colors))
    .join("\n");
}

function oneFileDiff(pair: FilePair): string {
  const oldContent = pair.before ?? "";
  const oldName = pair.before === null ? `${pair.path} (new file)` : pair.path;
  const newName = pair.path;
  return createTwoFilesPatch(oldName, newName, oldContent, pair.after, "", "", {
    context: 3,
  });
}

function colorizeLine(line: string, colors: Colors): string {
  if (line.startsWith("+++") || line.startsWith("---")) {
    return colors.wrap("bold", line);
  }
  if (line.startsWith("@@")) return colors.wrap("dim", line);
  if (line.startsWith("+")) return colors.wrap("green", line);
  if (line.startsWith("-")) return colors.wrap("red", line);
  return line;
}
