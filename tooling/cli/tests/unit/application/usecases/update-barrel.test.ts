import { describe, expect, test } from "bun:test";
import {
  appendRecipeExport,
  insertNamedExport,
  insertWildcardExport,
  updateBarrel,
} from "~/application/usecases/update-barrel";
import type { FileSystem } from "~/application/ports/file-system";

function makeFakeFs(initial: Record<string, string> = {}): {
  readonly fs: FileSystem;
  readonly store: Map<string, string>;
} {
  const store = new Map<string, string>(Object.entries(initial));
  const fs: FileSystem = {
    async read(p) {
      return store.get(p) ?? "";
    },
    async readJson<T>(p: string): Promise<T> {
      return JSON.parse(store.get(p) ?? "{}") as T;
    },
    async write(p, content) {
      store.set(p, content);
    },
    async exists(p) {
      return store.has(p);
    },
    async removeDir() {},
    async copyDir() {},
    async *glob(): AsyncIterable<string> {},
    async readSymlink() {
      return null;
    },
  };
  return { fs, store };
}

describe("insertNamedExport", () => {
  test("inserts into empty content", () => {
    const out = insertNamedExport("", {
      componentName: "Button",
      importPath: "./ui/buttons/button/button",
      hasTypeExport: true,
    });
    expect(out).toContain(`export { Button } from "./ui/buttons/button/button";`);
    expect(out).toContain(`export type { ButtonProps } from "./ui/buttons/button/button";`);
  });

  test("is idempotent for identical entry", () => {
    const initial = `export { Button } from "./ui/buttons/button/button";\nexport type { ButtonProps } from "./ui/buttons/button/button";\n`;
    const out = insertNamedExport(initial, {
      componentName: "Button",
      importPath: "./ui/buttons/button/button",
      hasTypeExport: true,
    });
    expect(out).toBe(initial);
  });

  test("alphabetically sorts inserted entries", () => {
    const initial = `export { Zebra } from "./ui/data-display/zebra/zebra";\nexport type { ZebraProps } from "./ui/data-display/zebra/zebra";\n`;
    const out = insertNamedExport(initial, {
      componentName: "Alpha",
      importPath: "./ui/data-display/alpha/alpha",
      hasTypeExport: true,
    });
    const lines = out.trim().split("\n");
    expect(lines[0]).toBe(`export { Alpha } from "./ui/data-display/alpha/alpha";`);
  });

  test("preserves preamble (file-level comments)", () => {
    const initial = `// generated barrel — keep alphabetised\n\nexport { Z } from "./z";\n`;
    const out = insertNamedExport(initial, {
      componentName: "A",
      importPath: "./a",
      hasTypeExport: false,
    });
    expect(out.startsWith("// generated barrel")).toBe(true);
    expect(out).toContain(`export { A } from "./a";`);
  });

  test("upgrades a non-typed entry when hasTypeExport flips to true", () => {
    const initial = `export { Foo } from "./foo";\n`;
    const out = insertNamedExport(initial, {
      componentName: "Foo",
      importPath: "./foo",
      hasTypeExport: true,
    });
    expect(out).toContain(`export type { FooProps } from "./foo";`);
  });
});

describe("insertWildcardExport", () => {
  test("inserts and sorts", () => {
    const initial = `export * from "./zebra/zebra.recipe";\n`;
    const out = insertWildcardExport(initial, "alpha");
    const lines = out.trim().split("\n");
    expect(lines[0]).toBe(`export * from "./alpha/alpha.recipe";`);
    expect(lines[1]).toBe(`export * from "./zebra/zebra.recipe";`);
  });

  test("idempotent for existing entry", () => {
    const initial = `export * from "./button/button.recipe";\n`;
    const out = insertWildcardExport(initial, "button");
    expect(out).toBe(initial);
  });
});

describe("updateBarrel use-case (with fake fs)", () => {
  test("creates new barrel file when missing", async () => {
    const { fs, store } = makeFakeFs();
    const result = await updateBarrel(fs, {
      barrelPath: "/abs/index.ts",
      componentName: "Button",
      importPath: "./ui/buttons/button/button",
      hasTypeExport: true,
    });
    expect(result.isOk()).toBe(true);
    expect(result.unwrap().inserted).toBe(true);
    expect(store.get("/abs/index.ts")).toContain(`export { Button }`);
  });

  test("returns inserted=false when no change", async () => {
    const existing = `export { Button } from "./ui/buttons/button/button";\nexport type { ButtonProps } from "./ui/buttons/button/button";\n`;
    const { fs } = makeFakeFs({ "/abs/index.ts": existing });
    const result = await updateBarrel(fs, {
      barrelPath: "/abs/index.ts",
      componentName: "Button",
      importPath: "./ui/buttons/button/button",
      hasTypeExport: true,
    });
    expect(result.isOk()).toBe(true);
    expect(result.unwrap().inserted).toBe(false);
  });
});

describe("appendRecipeExport", () => {
  test("creates file with first recipe", async () => {
    const { fs, store } = makeFakeFs();
    const result = await appendRecipeExport(fs, {
      indexPath: "/abs/recipes/index.ts",
      recipeName: "button",
    });
    expect(result.isOk()).toBe(true);
    expect(store.get("/abs/recipes/index.ts")).toContain(`export * from "./button/button.recipe";`);
  });
});
