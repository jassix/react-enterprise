// Unit tests for `bunCheck` (runtime section).
//
// Covers:
//   - engines.bun absent                                         -> ok
//   - engines.bun satisfied (minimum well below current)          -> ok
//   - engines.bun not satisfied (minimum far above current)       -> fail
//   - engines.bun exactly equal to current version                -> ok
//   - detail / fix strings are populated as the report expects

import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { bunCheck } from "~/checks/bun";
import { runCheck } from "~/core/runner";
import { cleanupRoots, makeScopedRoot } from "../fixtures";

describe("bunCheck", () => {
  const roots: string[] = [];

  beforeEach(() => {
    roots.length = 0;
  });

  afterEach(async () => {
    await cleanupRoots(roots);
  });

  test("ok when no engines.bun constraint is declared", async () => {
    const root = await makeScopedRoot(roots);

    const results = await runCheck(bunCheck, { root });

    expect(results).toHaveLength(1);
    const [result] = results;
    expect(result?.status).toBe("ok");
    expect(result?.section).toBe("runtime");
    expect(result?.name).toBe("bun");
    if (result?.status === "ok") {
      expect(result.detail).toContain(Bun.version);
      expect(result.detail).toContain("no engines.bun constraint");
    }
  });

  test("ok when current bun satisfies a lenient constraint", async () => {
    const root = await makeScopedRoot(roots, { bun: ">=0.1.0" });

    const results = await runCheck(bunCheck, { root });

    expect(results).toHaveLength(1);
    const [result] = results;
    expect(result?.status).toBe("ok");
    if (result?.status === "ok") {
      expect(result.detail).toContain(Bun.version);
      expect(result.detail).toContain(">=0.1.0");
    }
  });

  test("ok when constraint matches current bun exactly", async () => {
    const root = await makeScopedRoot(roots, { bun: Bun.version });

    const results = await runCheck(bunCheck, { root });

    expect(results[0]?.status).toBe("ok");
  });

  test("fail when current bun is below a very high minimum", async () => {
    const root = await makeScopedRoot(roots, { bun: ">=999.0.0" });

    const results = await runCheck(bunCheck, { root });

    expect(results).toHaveLength(1);
    const [result] = results;
    expect(result?.status).toBe("fail");
    if (result?.status === "fail") {
      expect(result.detail).toContain(Bun.version);
      expect(result.detail).toContain("999.0.0");
      // fail results always include an actionable fix
      expect(result.fix.length).toBeGreaterThan(0);
    }
  });
});
