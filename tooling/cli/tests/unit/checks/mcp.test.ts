// Unit tests for `mcpCheck`.
//
// Covers:
//   - all three expected MCP configs missing                -> per-file warn, no consistency/commands rows
//   - some configs missing, some present                    -> warn on missing, ok on present
//   - invalid JSON parse error                              -> fail for that file
//   - schema-invalid JSON (missing mcpServers)              -> fail for that file
//   - all three configs consistent                          -> consistency ok
//   - drift between configs                                 -> consistency warn with drift details
//   - server command missing from PATH                      -> server commands fail
//   - all server commands resolvable                        -> server commands ok
//   - empty mcpServers across all configs                   -> no server-commands row emitted

import { faker } from "@faker-js/faker";
import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { mcpCheck } from "~/checks/mcp";
import type { CheckResult } from "~/core/check";
import { runCheck } from "~/core/runner";
import {
  cleanupRoots,
  makeScopedRoot,
  mcpConfigWith,
  writeJson,
  writeMcpConfig,
  writeText,
} from "../fixtures";

const originalPath = process.env.PATH;

function findByName(results: CheckResult[], name: string): CheckResult | undefined {
  return results.find((r) => r.name === name);
}

function findEndsWith(results: CheckResult[], suffix: string): CheckResult | undefined {
  return results.find((r) => r.name.endsWith(suffix));
}

async function seedAllConfigs(root: string, serverNames: string[]): Promise<void> {
  const config = mcpConfigWith(serverNames);
  await writeMcpConfig(root, ".mcp.json", config);
  await writeMcpConfig(root, ".cursor/mcp.json", config);
  await writeMcpConfig(root, ".codex/mcp.json", config);
}

describe("mcpCheck", () => {
  const roots: string[] = [];

  beforeEach(() => {
    roots.length = 0;
    // `mcpConfigWith` uses `ls` as the server command so that PATH
    // resolution is portable. Constrain PATH to the system bin dirs so the
    // test does not depend on whatever lives on the developer's PATH.
    process.env.PATH = "/bin:/usr/bin:/usr/local/bin";
  });

  afterEach(async () => {
    process.env.PATH = originalPath;
    await cleanupRoots(roots);
  });

  test("warns for each missing config when no MCP configs exist", async () => {
    const root = await makeScopedRoot(roots);

    const results = await runCheck(mcpCheck, { root });

    const mcpJson = findEndsWith(results, ".mcp.json");
    const cursor = findEndsWith(results, "cursor/mcp.json");
    const codex = findEndsWith(results, "codex/mcp.json");
    expect(mcpJson?.status).toBe("warn");
    expect(cursor?.status).toBe("warn");
    expect(codex?.status).toBe("warn");
    // With zero configs loaded, the check should not emit a consistency
    // row or a server-commands row.
    expect(findByName(results, "consistency")).toBeUndefined();
    expect(findByName(results, "server commands")).toBeUndefined();
  });

  test("warns on the missing file but ok on the present ones", async () => {
    const root = await makeScopedRoot(roots);
    const servers = [faker.hacker.noun(), faker.hacker.noun()];
    const config = mcpConfigWith(servers);
    await writeMcpConfig(root, ".mcp.json", config);
    await writeMcpConfig(root, ".cursor/mcp.json", config);

    const results = await runCheck(mcpCheck, { root });

    expect(findEndsWith(results, ".mcp.json")?.status).toBe("ok");
    expect(findEndsWith(results, "cursor/mcp.json")?.status).toBe("ok");
    expect(findEndsWith(results, "codex/mcp.json")?.status).toBe("warn");
  });

  test("fails on a config file that is not valid JSON", async () => {
    const root = await makeScopedRoot(roots);
    await writeText(root, ".mcp.json", "{ not json");
    await seedAllConfigs(root, ["a", "b"]);
    // Overwrite .mcp.json after seeding so the other two stay valid
    await writeText(root, ".mcp.json", "{ not json");

    const results = await runCheck(mcpCheck, { root });

    const mcpJson = findEndsWith(results, ".mcp.json");
    expect(mcpJson?.status).toBe("fail");
    if (mcpJson?.status === "fail") {
      expect(mcpJson.detail).toContain("failed to parse");
    }
  });

  test("fails on a config missing the mcpServers field", async () => {
    const root = await makeScopedRoot(roots);
    await writeJson(root, ".mcp.json", { servers: {} });
    await writeMcpConfig(root, ".cursor/mcp.json", mcpConfigWith(["a"]));
    await writeMcpConfig(root, ".codex/mcp.json", mcpConfigWith(["a"]));

    const results = await runCheck(mcpCheck, { root });

    const mcpJson = findEndsWith(results, ".mcp.json");
    expect(mcpJson?.status).toBe("fail");
  });

  test("consistency is ok when all three configs match", async () => {
    const root = await makeScopedRoot(roots);
    const servers = [faker.hacker.noun(), faker.hacker.noun()];
    await seedAllConfigs(root, servers);

    const results = await runCheck(mcpCheck, { root });

    const consistency = findByName(results, "consistency");
    expect(consistency?.status).toBe("ok");
    if (consistency?.status === "ok") {
      expect(consistency.detail).toContain("3");
    }
  });

  test("consistency warns and names drifted files when servers diverge", async () => {
    const root = await makeScopedRoot(roots);
    const fullConfig = mcpConfigWith(["alpha", "beta"]);
    const partialConfig = mcpConfigWith(["alpha"]);
    await writeMcpConfig(root, ".mcp.json", fullConfig);
    await writeMcpConfig(root, ".cursor/mcp.json", partialConfig);
    await writeMcpConfig(root, ".codex/mcp.json", fullConfig);

    const results = await runCheck(mcpCheck, { root });

    const consistency = findByName(results, "consistency");
    expect(consistency?.status).toBe("warn");
    if (consistency?.status === "warn") {
      expect(consistency.detail).toContain("cursor/mcp.json");
      expect(consistency.detail).toContain("beta");
    }
  });

  test("fails when a configured server command is not on PATH", async () => {
    const root = await makeScopedRoot(roots);
    const ghostCommand = `ghost-${faker.string.alphanumeric(12)}`;
    const config = {
      mcpServers: {
        ghost: { command: ghostCommand },
      },
    };
    await writeMcpConfig(root, ".mcp.json", config);
    await writeMcpConfig(root, ".cursor/mcp.json", config);
    await writeMcpConfig(root, ".codex/mcp.json", config);

    const results = await runCheck(mcpCheck, { root });

    const cmds = findByName(results, "server commands");
    expect(cmds?.status).toBe("fail");
    if (cmds?.status === "fail") {
      expect(cmds.detail).toContain(ghostCommand);
      expect(cmds.fix.length).toBeGreaterThan(0);
    }
  });

  test("ok server commands row when every command resolves", async () => {
    const root = await makeScopedRoot(roots);
    // mcpConfigWith uses `ls`, which is on our constrained PATH.
    await seedAllConfigs(root, ["alpha", "beta"]);

    const results = await runCheck(mcpCheck, { root });

    const cmds = findByName(results, "server commands");
    expect(cmds?.status).toBe("ok");
  });

  test("no server-commands row when every config has an empty mcpServers map", async () => {
    const root = await makeScopedRoot(roots);
    const emptyConfig = { mcpServers: {} };
    await writeMcpConfig(root, ".mcp.json", emptyConfig);
    await writeMcpConfig(root, ".cursor/mcp.json", emptyConfig);
    await writeMcpConfig(root, ".codex/mcp.json", emptyConfig);

    const results = await runCheck(mcpCheck, { root });

    expect(findByName(results, "server commands")).toBeUndefined();
  });
});
