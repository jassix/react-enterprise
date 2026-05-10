import { describe, expect, test } from "bun:test";
import {
  parseRefinerOutput,
  stripFileMarkers,
} from "~/application/refinement/parse-refiner-output";

const tsx = (path: string, body: string): string =>
  `// FILE: ${path}\n\`\`\`tsx\n${body}\n\`\`\``;

describe("parseRefinerOutput", () => {
  test("extracts a single file block", () => {
    const result = parseRefinerOutput(tsx("packages/ui/primitives/src/ui/x/x.tsx", "export const X = () => null"));
    expect(result.isOk()).toBe(true);
    const out = result.unwrap();
    expect(out.files).toHaveLength(1);
    expect(out.files[0]?.path).toBe("packages/ui/primitives/src/ui/x/x.tsx");
    expect(out.files[0]?.content).toContain("export const X");
  });

  test("extracts multiple file blocks", () => {
    const raw = [
      tsx("a.tsx", "const a = 1"),
      tsx("b.tsx", "const b = 2"),
    ].join("\n\n");
    const result = parseRefinerOutput(raw);
    expect(result.isOk()).toBe(true);
    expect(result.unwrap().files).toHaveLength(2);
  });

  test("no markers returns no-files", () => {
    const result = parseRefinerOutput("just chatter, no fenced blocks");
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr().kind).toBe("no-files");
  });

  test("duplicate paths are reported", () => {
    const raw = [tsx("same.tsx", "1"), tsx("same.tsx", "2")].join("\n\n");
    const result = parseRefinerOutput(raw);
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr().kind).toBe("duplicate-path");
  });

  test("absolute paths are rejected", () => {
    const result = parseRefinerOutput(tsx("/etc/passwd.tsx", "x"));
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr().kind).toBe("absolute-path");
  });

  test("paths with .. are rejected", () => {
    const result = parseRefinerOutput(tsx("../../escape.tsx", "x"));
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr().kind).toBe("traversal");
  });

  test("tolerates surrounding chatter", () => {
    const raw = [
      "Here is your refined output:",
      "",
      tsx("a.tsx", "const a = 1"),
      "",
      "Let me know if you need adjustments.",
    ].join("\n");
    const result = parseRefinerOutput(raw);
    expect(result.isOk()).toBe(true);
  });

  test("supports ts and js fences", () => {
    const result = parseRefinerOutput(
      "// FILE: a.ts\n```ts\nexport const a = 1\n```\n\n// FILE: b.js\n```js\nmodule.exports = 1\n```",
    );
    expect(result.isOk()).toBe(true);
    expect(result.unwrap().files).toHaveLength(2);
  });

  test("extracts notes when present", () => {
    const raw = `${tsx("a.tsx", "1")}\n\n// NOTES:\n// First note\n// Second note`;
    const result = parseRefinerOutput(raw);
    expect(result.isOk()).toBe(true);
    const notes = result.unwrap().notes;
    expect(notes).toBeDefined();
    expect(notes).toContain("First note");
    expect(notes).toContain("Second note");
  });
});

describe("stripFileMarkers", () => {
  test("removes a leading // FILE: line", () => {
    expect(stripFileMarkers("// FILE: x.ts\nbody\n")).toBe("body\n");
  });

  test("leaves content alone when no marker", () => {
    expect(stripFileMarkers("body\n")).toBe("body\n");
  });
});
