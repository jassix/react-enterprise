import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { resolveSpec } from "~/application/usecases/sdk/resolve-spec";
import { join } from "~/domain/path";
import { BunFetcher } from "~/infrastructure/fetcher/bun";
import { BunFileSystem } from "~/infrastructure/file-system/bun";
import { DiskTemplateLoader } from "~/infrastructure/template-loader/disk";
import { cleanupRoots, makeTempRoot, writeText } from "@tests/unit/fixtures";

const PLACEHOLDER_DIR = `${process.cwd().replace(/\/tooling\/cli$/, "")}/tooling/templates/sdk/kubb`;

function realDeps() {
  const fs = new BunFileSystem();
  return {
    fs,
    fetcher: new BunFetcher(),
    templateLoader: new DiskTemplateLoader(fs),
  };
}

describe("resolveSpec — file source", () => {
  const roots: string[] = [];
  beforeEach(() => {
    roots.length = 0;
  });
  afterEach(async () => {
    await cleanupRoots(roots);
  });

  test("reads .yml file and preserves filename", async () => {
    const root = await makeTempRoot();
    roots.push(root);
    await writeText(root, "specs/petstore.yml", "openapi: 3.1.0\n");
    const out = await resolveSpec(
      {
        source: { kind: "file", path: "specs/petstore.yml" },
        cwd: root,
        placeholderDir: PLACEHOLDER_DIR,
        templateName: "test",
      },
      realDeps(),
    );
    expect(out.filename).toBe("petstore.yml");
    expect(out.content).toBe("openapi: 3.1.0\n");
  });

  test("normalises .yaml → .yml", async () => {
    const root = await makeTempRoot();
    roots.push(root);
    await writeText(root, "specs/api.yaml", "openapi: 3.1.0\n");
    const out = await resolveSpec(
      {
        source: { kind: "file", path: "specs/api.yaml" },
        cwd: root,
        placeholderDir: PLACEHOLDER_DIR,
        templateName: "test",
      },
      realDeps(),
    );
    expect(out.filename).toBe("api.yml");
  });

  test("falls back to spec.yml when extension unknown", async () => {
    const root = await makeTempRoot();
    roots.push(root);
    await writeText(root, "specs/pet.txt", "openapi: 3.1.0\n");
    const out = await resolveSpec(
      {
        source: { kind: "file", path: "specs/pet.txt" },
        cwd: root,
        placeholderDir: PLACEHOLDER_DIR,
        templateName: "test",
      },
      realDeps(),
    );
    expect(out.filename).toBe("spec.yml");
  });

  test("throws when file missing", async () => {
    const root = await makeTempRoot();
    roots.push(root);
    await expect(
      resolveSpec(
        {
          source: { kind: "file", path: "nope.yml" },
          cwd: root,
          placeholderDir: PLACEHOLDER_DIR,
          templateName: "test",
        },
        realDeps(),
      ),
    ).rejects.toThrow(/spec file not found/);
  });

  test("accepts absolute paths", async () => {
    const root = await makeTempRoot();
    roots.push(root);
    await writeText(root, "specs/petstore.yml", "x");
    const out = await resolveSpec(
      {
        source: { kind: "file", path: join(root, "specs/petstore.yml") },
        cwd: "/this/should/be/ignored",
        placeholderDir: PLACEHOLDER_DIR,
        templateName: "test",
      },
      realDeps(),
    );
    expect(out.content).toBe("x");
  });
});

describe("resolveSpec — URL source", () => {
  let server: ReturnType<typeof Bun.serve> | undefined;
  let port = 0;

  const startServer = (handler: (req: Request) => Response | Promise<Response>): void => {
    server = Bun.serve({ port: 0, fetch: handler });
    port = server.port ?? 0;
  };

  afterEach(() => {
    server?.stop(true);
    server = undefined;
  });

  test("fetches yml content and uses URL basename as filename", async () => {
    startServer((req) => {
      if (new URL(req.url).pathname === "/api/petstore.yml") {
        return new Response("openapi: 3.1.0\n", {
          headers: { "content-type": "application/yaml" },
        });
      }
      return new Response("not found", { status: 404 });
    });
    const out = await resolveSpec(
      {
        source: { kind: "url", url: `http://127.0.0.1:${port}/api/petstore.yml` },
        cwd: process.cwd(),
        placeholderDir: PLACEHOLDER_DIR,
        templateName: "test",
      },
      realDeps(),
    );
    expect(out.filename).toBe("petstore.yml");
    expect(out.content).toBe("openapi: 3.1.0\n");
  });

  test("derives .json filename from content-type when URL is bare", async () => {
    startServer(
      () =>
        new Response(`{"openapi":"3.1.0"}`, {
          headers: { "content-type": "application/json" },
        }),
    );
    const out = await resolveSpec(
      {
        source: { kind: "url", url: `http://127.0.0.1:${port}/openapi` },
        cwd: process.cwd(),
        placeholderDir: PLACEHOLDER_DIR,
        templateName: "test",
      },
      realDeps(),
    );
    expect(out.filename).toBe("spec.json");
  });

  test("strips query string when picking filename", async () => {
    startServer(
      () =>
        new Response("openapi: 3.1.0\n", {
          headers: { "content-type": "application/yaml" },
        }),
    );
    const out = await resolveSpec(
      {
        source: { kind: "url", url: `http://127.0.0.1:${port}/v2/spec.yml?ver=1` },
        cwd: process.cwd(),
        placeholderDir: PLACEHOLDER_DIR,
        templateName: "test",
      },
      realDeps(),
    );
    expect(out.filename).toBe("spec.yml");
  });

  test("throws on non-2xx response", async () => {
    startServer(() => new Response("nope", { status: 500 }));
    await expect(
      resolveSpec(
        {
          source: { kind: "url", url: `http://127.0.0.1:${port}/spec.yml` },
          cwd: process.cwd(),
          placeholderDir: PLACEHOLDER_DIR,
          templateName: "test",
        },
        realDeps(),
      ),
    ).rejects.toThrow(/status 500/);
  });
});

describe("resolveSpec — placeholder", () => {
  test("loads bundled placeholder spec", async () => {
    const out = await resolveSpec(
      {
        source: { kind: "placeholder" },
        cwd: process.cwd(),
        placeholderDir: PLACEHOLDER_DIR,
        templateName: "demo",
      },
      realDeps(),
    );
    expect(out.filename).toBe("spec.yml");
    expect(out.content).toContain("openapi: 3.1.0");
    expect(out.content).toContain("demo SDK");
  });
});
