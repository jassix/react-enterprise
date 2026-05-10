import { describe, expect, test } from "bun:test";
import {
  colorizeUnifiedDiff,
  computeUnifiedDiff,
  type FilePair,
} from "~/application/refinement/compute-diff";
import { createColors } from "~/infrastructure/colors";

describe("computeUnifiedDiff", () => {
  test("emits + and - lines for changed file", () => {
    const pairs: FilePair[] = [
      { path: "a.ts", before: "const a = 1\n", after: "const a = 2\n" },
    ];
    const diff = computeUnifiedDiff(pairs);
    expect(diff).toContain("-const a = 1");
    expect(diff).toContain("+const a = 2");
  });

  test("labels new files when before is null", () => {
    const pairs: FilePair[] = [
      { path: "new.ts", before: null, after: "export const x = 1\n" },
    ];
    const diff = computeUnifiedDiff(pairs);
    expect(diff).toContain("(new file)");
    expect(diff).toContain("+export const x = 1");
  });

  test("concatenates multiple pairs", () => {
    const pairs: FilePair[] = [
      { path: "a.ts", before: "old\n", after: "new\n" },
      { path: "b.ts", before: null, after: "added\n" },
    ];
    const diff = computeUnifiedDiff(pairs);
    expect(diff).toContain("a.ts");
    expect(diff).toContain("b.ts");
  });
});

describe("colorizeUnifiedDiff", () => {
  test("wraps + lines green when colors enabled", () => {
    const colors = createColors(true);
    const diff = "+added\n-removed\n@@ -1,1 +1,1 @@\n";
    const out = colorizeUnifiedDiff(diff, colors);
    expect(out).toContain("\x1b[32m+added");
    expect(out).toContain("\x1b[31m-removed");
    expect(out).toContain("\x1b[2m@@");
  });

  test("returns input unchanged when colors disabled", () => {
    const colors = createColors(false);
    const diff = "+added\n-removed\n";
    expect(colorizeUnifiedDiff(diff, colors)).toBe(diff);
  });
});
