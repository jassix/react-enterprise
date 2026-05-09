import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { join } from "~/domain/path";
import { runInitSdk } from "~/presentation/commands/init/sdk";
import { parseSdkArgs } from "~/presentation/parsers/sdk-args";
import { cleanupRoots, makeRealDeps, makeTempRoot, writeJson } from "@tests/unit/fixtures";

async function bootstrapRoot(roots: string[]): Promise<string> {
  const root = await makeTempRoot();
  roots.push(root);
  await writeJson(root, "package.json", {
    name: "sdk-init-test-root",
    private: true,
    workspaces: { packages: ["packages/sdk/*"] },
  });
  const realRoot = await findCliWorkspaceRoot();
  await Bun.$`mkdir -p ${join(root, "tooling")}`.quiet();
  await Bun.$`cp -R ${join(realRoot, "tooling/templates")} ${join(root, "tooling/templates")}`.quiet();
  return root;
}

async function findCliWorkspaceRoot(): Promise<string> {
  const deps = makeRealDeps();
  return deps.locator.locate(process.cwd());
}

async function readJson(absPath: string): Promise<Record<string, unknown>> {
  return JSON.parse(await Bun.file(absPath).text()) as Record<string, unknown>;
}

describe("runInitSdk (happy path, local spec)", () => {
  const roots: string[] = [];
  beforeEach(() => {
    roots.length = 0;
  });
  afterEach(async () => {
    await cleanupRoots(roots);
  });

  test("scaffolds @repo/<name>-sdk with selected plugins", async () => {
    const root = await bootstrapRoot(roots);
    const realRoot = await findCliWorkspaceRoot();
    const localSpec = join(realRoot, "tooling/templates/sdk/kubb/openapi/spec.yml.placeholder");

    const exit = await runInitSdk(
      [
        "petstore",
        "--preset=kubb",
        "--plugins=ts,client,react-query",
        `--spec=${localSpec}`,
        "--no-install",
        "--yes",
      ],
      root,
      makeRealDeps(),
    );
    expect(exit).toBe(0);

    const targetDir = join(root, "packages/sdk/petstore");
    expect(await Bun.file(join(targetDir, "package.json")).exists()).toBe(true);
    expect(await Bun.file(join(targetDir, "kubb.config.ts")).exists()).toBe(true);
    expect(await Bun.file(join(targetDir, ".oxlintrc.json")).exists()).toBe(true);
    expect(await Bun.file(join(targetDir, ".oxfmtrc.json")).exists()).toBe(true);
    expect(await Bun.file(join(targetDir, "README.md")).exists()).toBe(true);
    expect(await Bun.file(join(targetDir, "openapi/spec.yml")).exists()).toBe(true);

    const pkg = await readJson(join(targetDir, "package.json"));
    expect(pkg.name).toBe("@repo/petstore-sdk");
    const devDeps = pkg.devDependencies as Record<string, string>;
    expect(devDeps["@kubb/plugin-ts"]).toBeDefined();
    expect(devDeps["@kubb/plugin-client"]).toBeDefined();
    expect(devDeps["@kubb/plugin-react-query"]).toBeDefined();
    expect(devDeps["@kubb/plugin-zod"]).toBeUndefined();
    expect(devDeps["@kubb/plugin-cypress"]).toBeUndefined();

    const kubb = await Bun.file(join(targetDir, "kubb.config.ts")).text();
    expect(kubb).toContain(`pluginTs(`);
    expect(kubb).toContain(`pluginClient(`);
    expect(kubb).toContain(`pluginReactQuery(`);
    expect(kubb).not.toContain(`pluginZod`);
    expect(kubb).toContain(`./openapi/spec.yml`);

    const readme = await Bun.file(join(targetDir, "README.md")).text();
    expect(readme).toContain("@repo/petstore-sdk");
  });

  test("placeholder spec source uses bundled template", async () => {
    const root = await bootstrapRoot(roots);
    const exit = await runInitSdk(
      ["skipspec", "--preset=kubb", "--plugins=ts", "--no-install", "--yes"],
      root,
      makeRealDeps(),
    );
    expect(exit).toBe(0);
    const spec = await Bun.file(join(root, "packages/sdk/skipspec/openapi/spec.yml")).text();
    expect(spec).toContain("openapi: 3.1.0");
    expect(spec).toContain("skipspec SDK");
  });
});

describe("runInitSdk (URL spec)", () => {
  const roots: string[] = [];
  let server: ReturnType<typeof Bun.serve> | undefined;
  beforeEach(() => {
    roots.length = 0;
  });
  afterEach(async () => {
    await cleanupRoots(roots);
    server?.stop(true);
    server = undefined;
  });

  test("fetches remote spec, writes under detected filename", async () => {
    const root = await bootstrapRoot(roots);
    server = Bun.serve({
      port: 0,
      fetch(req) {
        if (new URL(req.url).pathname === "/v3/openapi.json") {
          return new Response(`{"openapi":"3.1.0","info":{"title":"x","version":"1"},"paths":{}}`, {
            headers: { "content-type": "application/json" },
          });
        }
        return new Response("nope", { status: 404 });
      },
    });
    const port = server.port ?? 0;

    const exit = await runInitSdk(
      [
        "petstore",
        "--preset=kubb",
        "--plugins=ts",
        `--spec=http://127.0.0.1:${port}/v3/openapi.json`,
        "--no-install",
        "--yes",
      ],
      root,
      makeRealDeps(),
    );
    expect(exit).toBe(0);

    const specPath = join(root, "packages/sdk/petstore/openapi/openapi.json");
    expect(await Bun.file(specPath).exists()).toBe(true);
    const content = await Bun.file(specPath).text();
    expect(content).toContain(`"openapi":"3.1.0"`);

    const kubb = await Bun.file(join(root, "packages/sdk/petstore/kubb.config.ts")).text();
    expect(kubb).toContain(`./openapi/openapi.json`);
  });
});

describe("runInitSdk (negative paths)", () => {
  const roots: string[] = [];
  beforeEach(() => {
    roots.length = 0;
  });
  afterEach(async () => {
    await cleanupRoots(roots);
  });

  test("refuses to overwrite existing packages/sdk/<name>", async () => {
    const root = await bootstrapRoot(roots);
    await writeJson(root, "packages/sdk/dup/package.json", { name: "@repo/dup-sdk" });
    const exit = await runInitSdk(
      ["dup", "--preset=kubb", "--plugins=ts", "--no-install", "--yes"],
      root,
      makeRealDeps(),
    );
    expect(exit).toBe(1);
  });

  test("--generate without --install fails fast", async () => {
    const root = await bootstrapRoot(roots);
    const exit = await runInitSdk(
      ["x", "--preset=kubb", "--plugins=ts", "--no-install", "--generate", "--yes"],
      root,
      makeRealDeps(),
    );
    expect(exit).toBe(1);
  });
});

describe("parseSdkArgs", () => {
  test("parses name + preset + plugins + spec + flags", () => {
    const out = parseSdkArgs([
      "petstore",
      "--preset=kubb",
      "--plugins=ts,client,react-query",
      "--spec=./specs/petstore.yml",
      "--no-install",
      "--yes",
    ]);
    if ("error" in out) throw new Error(`unexpected error: ${out.error}`);
    expect(out.name).toBe("petstore");
    expect(out.preset).toBe("kubb");
    expect(out.plugins).toEqual(["ts", "client", "react-query"]);
    expect(out.spec).toEqual({ kind: "file", path: "./specs/petstore.yml" });
    expect(out.install).toBe(false);
    expect(out.yes).toBe(true);
  });

  test("treats https URL as url-source", () => {
    const out = parseSdkArgs([
      "petstore",
      "--spec=https://petstore3.swagger.io/api/v3/openapi.json",
      "--yes",
    ]);
    if ("error" in out) throw new Error(`unexpected error: ${out.error}`);
    expect(out.spec).toEqual({
      kind: "url",
      url: "https://petstore3.swagger.io/api/v3/openapi.json",
    });
  });

  test("rejects invalid name", () => {
    const out = parseSdkArgs(["BadName"]);
    expect("error" in out).toBe(true);
  });

  test("rejects unknown preset", () => {
    const out = parseSdkArgs(["x", "--preset=bogus"]);
    expect("error" in out).toBe(true);
  });

  test("rejects unknown plugin id", () => {
    const out = parseSdkArgs(["x", "--plugins=ts,nope"]);
    expect("error" in out).toBe(true);
  });

  test("rejects unknown flag", () => {
    const out = parseSdkArgs(["x", "--what"]);
    expect("error" in out).toBe(true);
  });

  test("allows missing name (interactive fallback)", () => {
    const out = parseSdkArgs([]);
    if ("error" in out) throw new Error(`unexpected error: ${out.error}`);
    expect(out.name).toBeUndefined();
  });
});
