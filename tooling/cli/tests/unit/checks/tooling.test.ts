import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { toolingCheck } from "~/application/checks/tooling";
import { runCheck } from "~/application/usecases/doctor/run-checks";
import type { CheckResult } from "~/domain/doctor/check";
import {
  cleanupRoots,
  makeCheckContext,
  makeScopedRoot,
  writeJson,
  writeText,
} from "@tests/unit/fixtures";

const REQUIRED_BINS = ["oxlint", "oxfmt", "turbo"] as const;
const originalPath = process.env.PATH;

function findByName(results: CheckResult[], name: string): CheckResult | undefined {
  return results.find((r) => r.name === name);
}

async function writeLocalBin(root: string, bin: string): Promise<void> {
  await writeText(root, `node_modules/.bin/${bin}`, "#!/bin/sh\nexit 0\n");
}

async function writePandaMarker(root: string): Promise<void> {
  await writeJson(root, "packages/ui/foundation/styled-system/package.json", {
    name: "styled-system",
  });
}

describe("toolingCheck", () => {
  const roots: string[] = [];

  beforeEach(() => {
    roots.length = 0;
    process.env.PATH = "";
  });

  afterEach(async () => {
    process.env.PATH = originalPath;
    await cleanupRoots(roots);
  });

  test("fails per missing bin and warns when panda codegen marker is absent", async () => {
    const root = await makeScopedRoot(roots);

    const results = await runCheck(toolingCheck, makeCheckContext(root));

    for (const bin of REQUIRED_BINS) {
      const result = findByName(results, bin);
      expect(result?.status).toBe("fail");
      if (result?.status === "fail") {
        expect(result.fix).toContain("bun install");
      }
    }

    const panda = findByName(results, "panda codegen");
    expect(panda?.status).toBe("warn");
    if (panda?.status === "warn") {
      expect(panda.detail).toContain("styled-system");
      expect(panda.fix).toContain("panda codegen");
    }
  });

  test("all ok when every bin is in node_modules/.bin and panda output exists", async () => {
    const root = await makeScopedRoot(roots);
    for (const bin of REQUIRED_BINS) await writeLocalBin(root, bin);
    await writePandaMarker(root);

    const results = await runCheck(toolingCheck, makeCheckContext(root));

    expect(results.filter((r) => r.status === "fail")).toHaveLength(0);
    for (const bin of REQUIRED_BINS) {
      const result = findByName(results, bin);
      expect(result?.status).toBe("ok");
      if (result?.status === "ok") {
        expect(result.detail).toContain("node_modules/.bin");
      }
    }
    expect(findByName(results, "panda codegen")?.status).toBe("ok");
  });

  test("targets only the missing bin as a failure", async () => {
    const root = await makeScopedRoot(roots);
    await writeLocalBin(root, "oxlint");
    await writeLocalBin(root, "oxfmt");
    await writePandaMarker(root);

    const results = await runCheck(toolingCheck, makeCheckContext(root));

    expect(findByName(results, "oxlint")?.status).toBe("ok");
    expect(findByName(results, "oxfmt")?.status).toBe("ok");
    expect(findByName(results, "turbo")?.status).toBe("fail");
    expect(findByName(results, "panda codegen")?.status).toBe("ok");
  });
});
