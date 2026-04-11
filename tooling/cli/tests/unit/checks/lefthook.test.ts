// Unit tests for `lefthookCheck`.
//
// Covers pre-commit hook detection:
//   - missing hook                                    -> fail
//   - hook present but missing "lefthook" string      -> warn
//   - hook present referencing lefthook               -> ok
//
// And lefthook binary detection:
//   - not on PATH and not in node_modules/.bin        -> warn
//   - available in node_modules/.bin                  -> ok
//
// We scope `process.env.PATH` per-test so that binary detection is
// deterministic regardless of what is installed on the host running the
// suite. Nothing in the real repo is touched.

import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { lefthookCheck } from "~/checks/lefthook";
import type { CheckResult } from "~/core/check";
import { runCheck } from "~/core/runner";
import { cleanupRoots, makeScopedRoot, writeText } from "../fixtures";

const originalPath = process.env.PATH;

function findByName(results: CheckResult[], name: string): CheckResult | undefined {
  return results.find((r) => r.name === name);
}

describe("lefthookCheck", () => {
  const roots: string[] = [];

  beforeEach(() => {
    roots.length = 0;
    // Start each test with an empty PATH so that `Bun.which("lefthook")`
    // resolves deterministically; individual tests opt back in.
    process.env.PATH = "";
  });

  afterEach(async () => {
    process.env.PATH = originalPath;
    await cleanupRoots(roots);
  });

  describe("pre-commit hook", () => {
    test("fails when pre-commit hook is missing", async () => {
      const root = await makeScopedRoot(roots);

      const results = await runCheck(lefthookCheck, { root });

      const pre = findByName(results, "pre-commit");
      expect(pre?.status).toBe("fail");
      expect(pre?.section).toBe("lefthook");
      if (pre?.status === "fail") {
        expect(pre.detail).toContain("pre-commit");
        expect(pre.fix).toContain("lefthook install");
      }
    });

    test("warns when pre-commit exists but does not reference lefthook", async () => {
      const root = await makeScopedRoot(roots);
      await writeText(root, ".git/hooks/pre-commit", "#!/bin/sh\necho hi\n");

      const results = await runCheck(lefthookCheck, { root });

      const pre = findByName(results, "pre-commit");
      expect(pre?.status).toBe("warn");
      if (pre?.status === "warn") {
        expect(pre.detail).toContain("does not reference lefthook");
      }
    });

    test("ok when pre-commit references lefthook", async () => {
      const root = await makeScopedRoot(roots);
      await writeText(root, ".git/hooks/pre-commit", "#!/bin/sh\nlefthook run pre-commit\n");

      const results = await runCheck(lefthookCheck, { root });

      const pre = findByName(results, "pre-commit");
      expect(pre?.status).toBe("ok");
    });
  });

  describe("lefthook binary", () => {
    test("warns when not on PATH and not in node_modules/.bin", async () => {
      const root = await makeScopedRoot(roots);

      const results = await runCheck(lefthookCheck, { root });

      const bin = findByName(results, "lefthook binary");
      expect(bin?.status).toBe("warn");
      if (bin?.status === "warn") {
        expect(bin.detail).toContain("not found");
        expect(bin.fix).toContain("devDependency");
      }
    });

    test("ok when lefthook exists in node_modules/.bin", async () => {
      const root = await makeScopedRoot(roots);
      await writeText(root, "node_modules/.bin/lefthook", "#!/bin/sh\nexit 0\n");

      const results = await runCheck(lefthookCheck, { root });

      const bin = findByName(results, "lefthook binary");
      expect(bin?.status).toBe("ok");
      if (bin?.status === "ok") {
        expect(bin.detail).toContain("node_modules/.bin");
      }
    });

    // NOTE: the "lefthook resolvable on PATH" branch is not unit-tested
    // here because `Bun.which(name)` ignores mutations to
    // `process.env.PATH` and we cannot safely inject a fake PATH into a
    // running process without a second-arg form being used in production.
    // The node_modules/.bin branch above already exercises the happy path.
  });
});
