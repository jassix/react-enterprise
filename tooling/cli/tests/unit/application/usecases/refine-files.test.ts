import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { Ok } from "@repo/std/result";
import { refineFiles } from "~/application/usecases/refine-files";
import type { RefineFilesDeps } from "~/application/usecases/refine-files";
import type {
  DesignSystemIntrospector,
  DesignSystemSnapshot,
} from "~/application/ports/design-system-introspector";
import type { Refiner } from "~/application/ports/refiner";
import type {
  Shell,
  ShellCaptureResult,
  ShellCommand,
  ShellResult,
} from "~/application/ports/shell";
import { join } from "~/domain/path";
import type { SourceFile } from "~/domain/refinement-context";
import { BunFileSystem } from "~/infrastructure/file-system/bun";
import { cleanupRoots, makeScopedRoot, writeText } from "@tests/unit/fixtures";

function makeCannedRefiner(files: readonly SourceFile[]): Refiner {
  return {
    async refine() {
      return Ok({ files });
    },
  };
}

function makeFakeIntrospector(rootDir: string): DesignSystemIntrospector {
  return {
    async snapshot(): Promise<DesignSystemSnapshot> {
      return {
        recipes: [],
        semanticTokens: [],
        categories: ["buttons", "forms", "overlays", "data-display"],
        iconNames: [],
        exemplarPath: join(rootDir, "exemplar.tsx"),
        primitivesRoot: join(rootDir, "packages/ui/primitives"),
        blocksRoot: join(rootDir, "packages/ui/blocks"),
        foundationRoot: join(rootDir, "packages/ui/foundation"),
      };
    },
  };
}

function makeFakeShell(): Shell {
  return {
    async run(_cmd: ShellCommand): Promise<ShellResult> {
      return { exitCode: 0 };
    },
    async runCapture(_cmd: ShellCommand): Promise<ShellCaptureResult> {
      return { exitCode: 0, stdout: "", stderr: "" };
    },
    async which() {
      return undefined;
    },
    runtimeVersion(): string {
      return "test";
    },
  };
}

const REFINED: SourceFile = {
  path: "packages/ui/primitives/src/ui/forms/combobox/combobox.tsx",
  content: `import { combobox } from "@lume/foundation/recipes";
import { css } from "@lume/foundation/css";

export interface ComboboxProps {}
export const Combobox = (_p: ComboboxProps) => null;
`,
};

describe("refineFiles", () => {
  const roots: string[] = [];
  beforeEach(() => {
    roots.length = 0;
  });
  afterEach(async () => {
    await cleanupRoots(roots);
  });

  test("dry-run produces a diff and writes nothing", async () => {
    const root = await makeScopedRoot(roots);
    const filePath = "packages/ui/primitives/src/ui/forms/combobox/combobox.tsx";
    await writeText(root, filePath, "// legacy\nimport clsx from 'clsx';\n");

    const fs = new BunFileSystem();
    const deps: RefineFilesDeps = {
      refiner: makeCannedRefiner([REFINED]),
      introspector: makeFakeIntrospector(root),
      fs,
      shell: makeFakeShell(),
    };

    const result = await refineFiles(deps, {
      files: [join(root, filePath)],
      rootDir: root,
      options: { dryRun: true, runCodegen: false, recipeMode: "matched" },
    });

    expect(result.isOk()).toBe(true);
    const outcome = result.unwrap();
    expect(outcome.diff).not.toBeNull();
    expect(outcome.applied).toBeNull();
  });

  test("infers placement from existing file path and applies", async () => {
    const root = await makeScopedRoot(roots);
    const filePath = "packages/ui/primitives/src/ui/forms/combobox/combobox.tsx";
    await writeText(root, filePath, "// legacy\nimport clsx from 'clsx';\n");

    const fs = new BunFileSystem();
    const deps: RefineFilesDeps = {
      refiner: makeCannedRefiner([REFINED]),
      introspector: makeFakeIntrospector(root),
      fs,
      shell: makeFakeShell(),
    };

    const result = await refineFiles(deps, {
      files: [join(root, filePath)],
      rootDir: root,
      options: { dryRun: false, runCodegen: false, recipeMode: "matched" },
    });

    expect(result.isOk()).toBe(true);
    const outcome = result.unwrap();
    expect(outcome.applied).not.toBeNull();
    expect(outcome.applied!.written).toContain(REFINED.path);

    const written = await fs.read(join(root, REFINED.path));
    expect(written).toContain("export const Combobox");

    const barrel = await fs.read(join(root, "packages/ui/primitives/src/index.ts"));
    expect(barrel).toContain(`export { Combobox } from "./ui/forms/combobox/combobox";`);
  });

  test("returns missing-file when input does not exist", async () => {
    const root = await makeScopedRoot(roots);
    const fs = new BunFileSystem();
    const deps: RefineFilesDeps = {
      refiner: makeCannedRefiner([REFINED]),
      introspector: makeFakeIntrospector(root),
      fs,
      shell: makeFakeShell(),
    };
    const result = await refineFiles(deps, {
      files: [join(root, "does/not/exist.tsx")],
      rootDir: root,
      options: { dryRun: true, runCodegen: false, recipeMode: "matched" },
    });
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr().kind).toBe("missing-file");
  });

  test("returns unresolved-placement when path doesn't fit conventions", async () => {
    const root = await makeScopedRoot(roots);
    await writeText(root, "scratch/foo.tsx", "// hi\n");
    const fs = new BunFileSystem();
    const deps: RefineFilesDeps = {
      refiner: makeCannedRefiner([REFINED]),
      introspector: makeFakeIntrospector(root),
      fs,
      shell: makeFakeShell(),
    };
    const result = await refineFiles(deps, {
      files: [join(root, "scratch/foo.tsx")],
      rootDir: root,
      options: { dryRun: true, runCodegen: false, recipeMode: "matched" },
    });
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr().kind).toBe("unresolved-placement");
  });
});
