import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { join } from "~/domain/path";
import { BunFileSystem } from "~/infrastructure/file-system/bun";
import { DiskTemplateLoader } from "~/infrastructure/template-loader/disk";
import { cleanupRoots, makeTempRoot, writeText } from "@tests/unit/fixtures";

describe("DiskTemplateLoader.load", () => {
  const roots: string[] = [];
  const loader = new DiskTemplateLoader(new BunFileSystem());

  beforeEach(() => {
    roots.length = 0;
  });

  afterEach(async () => {
    await cleanupRoots(roots);
  });

  async function newRoot(): Promise<string> {
    const r = await makeTempRoot();
    roots.push(r);
    return r;
  }

  test("substitutes {{token}} occurrences", async () => {
    const dir = await newRoot();
    await writeText(dir, "README.md.tpl", "# {{name}}-sdk\n\nGenerated for {{name}}.\n");
    const out = await loader.load(dir, { name: "petstore" });
    expect(out.get("README.md")).toBe("# petstore-sdk\n\nGenerated for petstore.\n");
  });

  test("strips .tpl and .placeholder suffixes", async () => {
    const dir = await newRoot();
    await writeText(dir, "config.ts.tpl", "x");
    await writeText(dir, "openapi/spec.yml.placeholder", "y");
    await writeText(dir, "static.txt", "z");
    const out = await loader.load(dir, {});
    expect(out.has("config.ts")).toBe(true);
    expect(out.has("openapi/spec.yml")).toBe(true);
    expect(out.has("static.txt")).toBe(true);
    expect(out.has("config.ts.tpl")).toBe(false);
  });

  test("ignores template.json manifest", async () => {
    const dir = await newRoot();
    await writeText(dir, "template.json", `{"id":"x"}`);
    await writeText(dir, "real.txt", "ok");
    const out = await loader.load(dir, {});
    expect(out.has("template.json")).toBe(false);
    expect(out.has("real.txt")).toBe(true);
  });

  test("walks nested directories", async () => {
    const dir = await newRoot();
    await writeText(dir, "a.txt", "1");
    await writeText(dir, "nested/b.txt", "2");
    await writeText(dir, "nested/deep/c.txt", "3");
    const out = await loader.load(dir, {});
    expect(out.size).toBe(3);
    expect(out.get("nested/deep/c.txt")).toBe("3");
  });

  test("includes dotfiles", async () => {
    const dir = await newRoot();
    await writeText(dir, ".oxlintrc.json.tpl", `{"name":"{{name}}"}`);
    const out = await loader.load(dir, { name: "x" });
    expect(out.get(".oxlintrc.json")).toBe(`{"name":"x"}`);
  });

  test("returns empty map for empty directory", async () => {
    const dir = await newRoot();
    const out = await loader.load(dir, {});
    expect(out.size).toBe(0);
  });

  test("missing token leaves placeholder verbatim", async () => {
    const dir = await newRoot();
    await writeText(dir, "f.txt", "hello {{name}} {{missing}}");
    const out = await loader.load(dir, { name: "world" });
    expect(out.get("f.txt")).toBe("hello world {{missing}}");
  });
});

describe("DiskTemplateLoader (path handling)", () => {
  test("preserves forward-slash relative paths", () => {
    expect(join("a", "b", "c")).toBe("a/b/c");
  });
});
