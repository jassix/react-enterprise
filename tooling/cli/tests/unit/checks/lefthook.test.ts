import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { lefthookCheck } from "~/application/checks/lefthook";
import { runCheck } from "~/application/usecases/doctor/run-checks";
import type { CheckResult } from "~/domain/doctor/check";
import { cleanupRoots, makeCheckContext, makeScopedRoot, writeText } from "@tests/unit/fixtures";

const originalPath = process.env.PATH;

function findByName(results: CheckResult[], name: string): CheckResult | undefined {
  return results.find((r) => r.name === name);
}

describe("lefthookCheck", () => {
  const roots: string[] = [];

  beforeEach(() => {
    roots.length = 0;
    process.env.PATH = "";
  });

  afterEach(async () => {
    process.env.PATH = originalPath;
    await cleanupRoots(roots);
  });

  describe("pre-commit hook", () => {
    test("fails when pre-commit hook is missing", async () => {
      const root = await makeScopedRoot(roots);

      const results = await runCheck(lefthookCheck, makeCheckContext(root));

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

      const results = await runCheck(lefthookCheck, makeCheckContext(root));

      const pre = findByName(results, "pre-commit");
      expect(pre?.status).toBe("warn");
      if (pre?.status === "warn") {
        expect(pre.detail).toContain("does not reference lefthook");
      }
    });

    test("ok when pre-commit references lefthook", async () => {
      const root = await makeScopedRoot(roots);
      await writeText(root, ".git/hooks/pre-commit", "#!/bin/sh\nlefthook run pre-commit\n");

      const results = await runCheck(lefthookCheck, makeCheckContext(root));

      const pre = findByName(results, "pre-commit");
      expect(pre?.status).toBe("ok");
    });
  });

  describe("lefthook binary", () => {
    test("warns when not on PATH and not in node_modules/.bin", async () => {
      const root = await makeScopedRoot(roots);

      const results = await runCheck(lefthookCheck, makeCheckContext(root));

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

      const results = await runCheck(lefthookCheck, makeCheckContext(root));

      const bin = findByName(results, "lefthook binary");
      expect(bin?.status).toBe("ok");
      if (bin?.status === "ok") {
        expect(bin.detail).toContain("node_modules/.bin");
      }
    });
  });
});
