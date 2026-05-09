import { describe, expect, test } from "bun:test";
import { buildPackageJson } from "~/domain/sdk/package-json";
import { KUBB_VERSION, PLUGINS, REQUIRED_KUBB_PACKAGES } from "~/domain/sdk/plugin";

interface PkgJson {
  readonly name: string;
  readonly version: string;
  readonly private: boolean;
  readonly type: "module";
  readonly main: string;
  readonly scripts: Record<string, string>;
  readonly devDependencies: Record<string, string>;
  readonly peerDependencies: Record<string, string>;
}

const parse = (s: string): PkgJson => JSON.parse(s) as PkgJson;

describe("buildPackageJson", () => {
  test("uses @repo/<name>-sdk as the name", () => {
    const json = parse(buildPackageJson({ name: "petstore", plugins: [] }));
    expect(json.name).toBe("@repo/petstore-sdk");
  });

  test("always includes required kubb packages at the pinned version", () => {
    const json = parse(buildPackageJson({ name: "x", plugins: [] }));
    for (const pkg of REQUIRED_KUBB_PACKAGES) {
      expect(json.devDependencies[pkg]).toBe(KUBB_VERSION);
    }
  });

  test("includes only selected plugins as devDependencies", () => {
    const json = parse(buildPackageJson({ name: "x", plugins: ["ts", "react-query"] }));
    expect(json.devDependencies[PLUGINS.ts.npmPackage]).toBe(KUBB_VERSION);
    expect(json.devDependencies[PLUGINS["react-query"].npmPackage]).toBe(KUBB_VERSION);
    expect(json.devDependencies[PLUGINS.zod.npmPackage]).toBeUndefined();
    expect(json.devDependencies[PLUGINS.cypress.npmPackage]).toBeUndefined();
  });

  test("preserves workspace and catalog protocols", () => {
    const json = parse(buildPackageJson({ name: "x", plugins: [] }));
    expect(json.devDependencies["@repo/oxlint"]).toBe("workspace:");
    expect(json.devDependencies["@repo/tsconfig"]).toBe("workspace:");
    expect(json.devDependencies["@repo/types"]).toBe("workspace:");
    expect(json.devDependencies["@types/bun"]).toBe("catalog:");
    expect(json.peerDependencies.typescript).toBe("catalog:");
  });

  test("declares scripts including generate", () => {
    const json = parse(buildPackageJson({ name: "x", plugins: [] }));
    expect(json.scripts.generate).toBe("kubb generate");
    expect(json.scripts.lint).toContain("oxlint");
    expect(json.scripts.format).toContain("oxfmt");
  });

  test("output ends with newline (POSIX-friendly)", () => {
    const out = buildPackageJson({ name: "x", plugins: [] });
    expect(out.endsWith("\n")).toBe(true);
  });

  test("devDependencies are sorted alphabetically", () => {
    const out = buildPackageJson({
      name: "x",
      plugins: ["zod", "ts", "msw"],
    });
    const json = parse(out);
    const keys = Object.keys(json.devDependencies);
    expect(keys).toEqual([...keys].sort());
  });
});
