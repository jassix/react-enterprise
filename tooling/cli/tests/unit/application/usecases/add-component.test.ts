import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { Err, Ok } from "@repo/std/result";
import {
  addComponent,
  type AddComponentDeps,
} from "~/application/usecases/add-component";
import type { ComponentRegistry } from "~/application/ports/component-registry";
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
import type { ComponentSpec } from "~/domain/component-spec";
import { join } from "~/domain/path";
import type { RegistryItem } from "~/domain/registry-item";
import type { SourceFile } from "~/domain/refinement-context";
import { BunFileSystem } from "~/infrastructure/file-system/bun";
import { cleanupRoots, makeScopedRoot, writeText } from "@tests/unit/fixtures";

const SHADCN_BUTTON_SPEC: ComponentSpec = {
  source: "shadcn",
  name: "button",
  url: "https://ui.shadcn.com/r/styles/default/button.json",
};

const REGISTRY_BUTTON: RegistryItem = {
  name: "button",
  type: "registry:ui",
  files: [
    {
      path: "components/ui/button.tsx",
      type: "registry:ui",
      content: `import { cva } from "class-variance-authority";\nexport const Button = () => null;`,
    },
  ],
};

const REFINED_BUTTON: SourceFile = {
  path: "packages/ui/primitives/src/ui/buttons/button/button.tsx",
  content: `import { button } from "@lume/foundation/recipes";
import { css } from "@lume/foundation/css";

export interface ButtonProps {}
export const Button = (_props: ButtonProps) => null;
`,
};

function makeFakeRegistry(item: RegistryItem): ComponentRegistry {
  return {
    async resolve() {
      return Ok(item);
    },
  };
}

function makeCannedRefiner(files: readonly SourceFile[]): Refiner {
  return {
    async refine() {
      return Ok({ files });
    },
  };
}

function makeFailingRegistry(): ComponentRegistry {
  return {
    async resolve() {
      return Err({ kind: "not-found", spec: "shadcn:button" });
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

const ALWAYS_GENERATE = async () => "generate" as const;

describe("addComponent", () => {
  const roots: string[] = [];
  beforeEach(() => {
    roots.length = 0;
  });
  afterEach(async () => {
    await cleanupRoots(roots);
  });

  test("dry-run produces a diff and writes nothing", async () => {
    const root = await makeScopedRoot(roots);
    const fs = new BunFileSystem();
    const deps: AddComponentDeps = {
      registry: makeFakeRegistry(REGISTRY_BUTTON),
      refiner: makeCannedRefiner([REFINED_BUTTON]),
      introspector: makeFakeIntrospector(root),
      fs,
      shell: makeFakeShell(),
      resolveRecipeMode: ALWAYS_GENERATE,
    };

    const result = await addComponent(deps, {
      spec: SHADCN_BUTTON_SPEC,
      rootDir: root,
      options: { dryRun: true, runCodegen: false, refine: true },
    });

    expect(result.isOk()).toBe(true);
    const outcome = result.unwrap();
    expect(outcome.diff).not.toBeNull();
    expect(outcome.diff!.length).toBeGreaterThan(0);
    expect(outcome.applied).toBeNull();
    const buttonPath = join(
      root,
      "packages/ui/primitives/src/ui/buttons/button/button.tsx",
    );
    expect(await fs.exists(buttonPath)).toBe(false);
  });

  test("writes file and updates barrel on real apply", async () => {
    const root = await makeScopedRoot(roots);
    const fs = new BunFileSystem();
    const deps: AddComponentDeps = {
      registry: makeFakeRegistry(REGISTRY_BUTTON),
      refiner: makeCannedRefiner([REFINED_BUTTON]),
      introspector: makeFakeIntrospector(root),
      fs,
      shell: makeFakeShell(),
      resolveRecipeMode: ALWAYS_GENERATE,
    };

    const result = await addComponent(deps, {
      spec: SHADCN_BUTTON_SPEC,
      rootDir: root,
      options: { dryRun: false, runCodegen: false, refine: true },
    });

    expect(result.isOk()).toBe(true);
    const outcome = result.unwrap();
    expect(outcome.applied).not.toBeNull();
    expect(outcome.applied!.written).toContain(
      "packages/ui/primitives/src/ui/buttons/button/button.tsx",
    );

    const written = await fs.read(
      join(root, "packages/ui/primitives/src/ui/buttons/button/button.tsx"),
    );
    expect(written).toContain("export const Button");

    const barrel = await fs.read(join(root, "packages/ui/primitives/src/index.ts"));
    expect(barrel).toContain(`export { Button } from "./ui/buttons/button/button";`);
    expect(barrel).toContain(
      `export type { ButtonProps } from "./ui/buttons/button/button";`,
    );
  });

  test("propagates registry errors", async () => {
    const root = await makeScopedRoot(roots);
    const fs = new BunFileSystem();
    const deps: AddComponentDeps = {
      registry: makeFailingRegistry(),
      refiner: makeCannedRefiner([REFINED_BUTTON]),
      introspector: makeFakeIntrospector(root),
      fs,
      shell: makeFakeShell(),
      resolveRecipeMode: ALWAYS_GENERATE,
    };

    const result = await addComponent(deps, {
      spec: SHADCN_BUTTON_SPEC,
      rootDir: root,
      options: { dryRun: false, runCodegen: false, refine: true },
    });

    expect(result.isErr()).toBe(true);
    const err = result.unwrapErr();
    expect(err.kind).toBe("registry");
  });

  test("aborts when recipe resolver returns 'abort'", async () => {
    const root = await makeScopedRoot(roots);
    const fs = new BunFileSystem();
    const deps: AddComponentDeps = {
      registry: makeFakeRegistry(REGISTRY_BUTTON),
      refiner: makeCannedRefiner([REFINED_BUTTON]),
      introspector: makeFakeIntrospector(root),
      fs,
      shell: makeFakeShell(),
      resolveRecipeMode: async () => "abort" as const,
    };

    const result = await addComponent(deps, {
      spec: SHADCN_BUTTON_SPEC,
      rootDir: root,
      options: { dryRun: false, runCodegen: false, refine: true },
    });

    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr().kind).toBe("cancelled");
  });

  test("places blocks under packages/ui/blocks", async () => {
    const root = await makeScopedRoot(roots);
    const fs = new BunFileSystem();

    const blockItem: RegistryItem = {
      name: "dashboard-01",
      type: "registry:block",
      files: [
        {
          path: "components/dashboard.tsx",
          type: "registry:block",
          content: `export const Dashboard = () => null;`,
        },
      ],
    };
    const refined: SourceFile = {
      path: "packages/ui/blocks/src/dashboard-01/dashboard-01.tsx",
      content: `import { css } from "@lume/foundation/css";\nexport interface Dashboard01Props {}\nexport const Dashboard01 = (_p: Dashboard01Props) => null;\n`,
    };

    const blockSpec: ComponentSpec = {
      source: "shadcn",
      name: "dashboard-01",
      url: "https://ui.shadcn.com/r/styles/default/dashboard-01.json",
    };

    const deps: AddComponentDeps = {
      registry: makeFakeRegistry(blockItem),
      refiner: makeCannedRefiner([refined]),
      introspector: makeFakeIntrospector(root),
      fs,
      shell: makeFakeShell(),
      resolveRecipeMode: async () => "inline" as const,
    };

    const result = await addComponent(deps, {
      spec: blockSpec,
      rootDir: root,
      options: { dryRun: false, runCodegen: false, refine: true },
    });

    if (result.isErr()) {
      throw new Error(`expected ok, got ${JSON.stringify(result.unwrapErr())}`);
    }
    const outcome = result.unwrap();
    expect(outcome.target.kind).toBe("block");
    expect(
      await fs.exists(
        join(root, "packages/ui/blocks/src/dashboard-01/dashboard-01.tsx"),
      ),
    ).toBe(true);
    const blocksBarrel = await fs.read(
      join(root, "packages/ui/blocks/src/index.ts"),
    );
    expect(blocksBarrel).toContain(`export { Dashboard01 }`);
  });

  test("preserves a pre-existing barrel preamble when adding a new entry", async () => {
    const root = await makeScopedRoot(roots);
    const fs = new BunFileSystem();
    await writeText(
      root,
      "packages/ui/primitives/src/index.ts",
      `// generated — keep alphabetised\n\nexport { Zebra } from "./ui/data-display/zebra/zebra";\n`,
    );

    const deps: AddComponentDeps = {
      registry: makeFakeRegistry(REGISTRY_BUTTON),
      refiner: makeCannedRefiner([REFINED_BUTTON]),
      introspector: makeFakeIntrospector(root),
      fs,
      shell: makeFakeShell(),
      resolveRecipeMode: ALWAYS_GENERATE,
    };

    const result = await addComponent(deps, {
      spec: SHADCN_BUTTON_SPEC,
      rootDir: root,
      options: { dryRun: false, runCodegen: false, refine: true },
    });
    expect(result.isOk()).toBe(true);
    const barrel = await fs.read(join(root, "packages/ui/primitives/src/index.ts"));
    expect(barrel.startsWith("// generated")).toBe(true);
    expect(barrel).toContain(`export { Button } from "./ui/buttons/button/button";`);
    expect(barrel).toContain(`export { Zebra } from "./ui/data-display/zebra/zebra";`);
  });
});
