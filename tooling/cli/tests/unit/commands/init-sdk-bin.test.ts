import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { join } from "~/domain/path";
import { BunFileSystem } from "~/infrastructure/file-system/bun";
import { WalkMonorepoLocator } from "~/infrastructure/monorepo-locator/walk";
import { cleanupRoots, makeTempRoot, writeJson } from "@tests/unit/fixtures";

async function findCliWorkspaceRoot(): Promise<string> {
  const locator = new WalkMonorepoLocator(new BunFileSystem());
  return locator.locate(process.cwd());
}

async function bootstrapRoot(roots: string[]): Promise<string> {
  const root = await makeTempRoot();
  roots.push(root);
  await writeJson(root, "package.json", {
    name: "bin-e2e-root",
    private: true,
    workspaces: { packages: ["packages/sdk/*"] },
  });
  const realRoot = await findCliWorkspaceRoot();
  await Bun.$`mkdir -p ${join(root, "tooling")}`.quiet();
  await Bun.$`cp -R ${join(realRoot, "tooling/templates")} ${join(root, "tooling/templates")}`.quiet();
  return root;
}

async function binPath(): Promise<string> {
  const realRoot = await findCliWorkspaceRoot();
  return join(realRoot, "tooling/cli/src/index.ts");
}

describe("repo bin e2e", () => {
  const roots: string[] = [];
  beforeEach(() => {
    roots.length = 0;
  });
  afterEach(async () => {
    await cleanupRoots(roots);
  });

  test("`init sdk` scaffolds package via spawned bin", async () => {
    const root = await bootstrapRoot(roots);
    const proc = Bun.spawn(
      ["bun", await binPath(), "init", "sdk", "myapi", "--plugins=ts", "--no-install", "--yes"],
      { cwd: root, stdout: "pipe", stderr: "pipe" },
    );
    const exitCode = await proc.exited;
    expect(exitCode).toBe(0);

    const targetDir = join(root, "packages/sdk/myapi");
    expect(await Bun.file(join(targetDir, "package.json")).exists()).toBe(true);
    expect(await Bun.file(join(targetDir, "kubb.config.ts")).exists()).toBe(true);
    expect(await Bun.file(join(targetDir, "openapi/spec.yml")).exists()).toBe(true);

    const pkg = (await Bun.file(join(targetDir, "package.json")).json()) as {
      name: string;
      devDependencies: Record<string, string>;
    };
    expect(pkg.name).toBe("@repo/myapi-sdk");
    expect(pkg.devDependencies["@kubb/plugin-ts"]).toBeDefined();
    expect(pkg.devDependencies["@kubb/plugin-zod"]).toBeUndefined();
  }, 15000);

  test("non-zero exit on unknown preset", async () => {
    const root = await bootstrapRoot(roots);
    const proc = Bun.spawn(
      ["bun", await binPath(), "init", "sdk", "x", "--preset=nope", "--yes", "--no-install"],
      { cwd: root, stdout: "pipe", stderr: "pipe" },
    );
    const exitCode = await proc.exited;
    expect(exitCode).toBe(1);
    const stderr = await new Response(proc.stderr).text();
    expect(stderr).toContain(`unknown preset "nope"`);
  }, 15000);

  test("non-zero exit on duplicate target dir", async () => {
    const root = await bootstrapRoot(roots);
    await writeJson(root, "packages/sdk/dup/package.json", { name: "@repo/dup-sdk" });
    const proc = Bun.spawn(
      ["bun", await binPath(), "init", "sdk", "dup", "--no-install", "--yes"],
      { cwd: root, stdout: "pipe", stderr: "pipe" },
    );
    const exitCode = await proc.exited;
    expect(exitCode).toBe(1);
    const stderr = await new Response(proc.stderr).text();
    expect(stderr).toContain("already exists");
  }, 15000);
});
