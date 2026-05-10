import { Err, Ok, type Result } from "@repo/std/result";
import type { RefinerOutput } from "~/application/ports/refiner";
import type { SourceFile } from "~/domain/refinement-context";

export type ParseRefinerOutputError = {
  readonly kind: "no-files" | "duplicate-path" | "absolute-path" | "traversal";
  readonly messages: readonly string[];
};

const FILE_BLOCK_RE =
  /\/\/\s*FILE:\s*(?<path>\S[^\r\n]*?)\s*\r?\n+\s*```(?:tsx|ts|jsx|js)?\s*\r?\n(?<content>[\s\S]*?)\r?\n```/g;

const FILE_BLOCK_INSIDE_RE =
  /```(?:tsx|ts|jsx|js)?\s*\r?\n\/\/\s*FILE:\s*(?<path>\S[^\r\n]*?)\s*\r?\n(?<content>[\s\S]*?)\r?\n```/g;

const NOTES_RE = /\/\/\s*NOTES:\s*\r?\n([\s\S]*?)(?:$|\n\s*\/\/\s*FILE:)/;

export function parseRefinerOutput(
  raw: string,
): Result<RefinerOutput, ParseRefinerOutputError> {
  const files: SourceFile[] = [];
  const seenPaths = new Set<string>();
  const duplicates: string[] = [];
  const absolute: string[] = [];
  const traversal: string[] = [];

  const collect = (re: RegExp): void => {
    for (const match of raw.matchAll(re)) {
      const groups = match.groups;
      if (!groups) continue;
      const path = groups.path?.trim() ?? "";
      const content = groups.content ?? "";
      if (path.length === 0) continue;

      if (path.startsWith("/")) {
        absolute.push(path);
        continue;
      }
      if (path.split("/").some((seg) => seg === "..")) {
        traversal.push(path);
        continue;
      }
      if (seenPaths.has(path)) {
        duplicates.push(path);
        continue;
      }
      seenPaths.add(path);
      files.push({ path, content: stripFileMarkers(content) });
    }
  };

  collect(FILE_BLOCK_RE);
  if (files.length === 0 && absolute.length === 0 && traversal.length === 0) {
    collect(FILE_BLOCK_INSIDE_RE);
  }

  if (absolute.length > 0) {
    return Err({
      kind: "absolute-path",
      messages: absolute.map((p) => `absolute path not allowed: ${p}`),
    });
  }
  if (traversal.length > 0) {
    return Err({
      kind: "traversal",
      messages: traversal.map((p) => `path traversal not allowed: ${p}`),
    });
  }
  if (duplicates.length > 0) {
    return Err({
      kind: "duplicate-path",
      messages: duplicates.map((p) => `duplicate file path emitted: ${p}`),
    });
  }
  if (files.length === 0) {
    return Err({
      kind: "no-files",
      messages: ["no `// FILE: <path>` blocks found in refiner output"],
    });
  }

  const notes = extractNotes(raw);
  return Ok(notes ? { files, notes } : { files });
}

export function stripFileMarkers(content: string): string {
  return content.replace(/^\s*\/\/\s*FILE:\s*\S[^\r\n]*\r?\n/, "");
}

function extractNotes(raw: string): readonly string[] | undefined {
  const m = raw.match(NOTES_RE);
  if (!m) return undefined;
  const lines = (m[1] ?? "")
    .split(/\r?\n/)
    .map((l) => l.replace(/^\s*\/\/\s?/, "").trim())
    .filter((l) => l.length > 0);
  return lines.length > 0 ? lines : undefined;
}
