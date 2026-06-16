import { describe, expect, test } from "bun:test";
import { validateOutput } from "~/application/refinement/validate-output";
import type { FileSystem } from "~/application/ports/file-system";
import type { RefinerOutput } from "~/application/ports/refiner";
import type {
  Shell,
  ShellCaptureResult,
  ShellCommand,
  ShellResult,
} from "~/application/ports/shell";
import type { RefinementContext } from "~/domain/refinement-context";

interface FakeShellOptions {
  readonly captureExitCode?: number;
  readonly captureStdout?: string;
  readonly captureStderr?: string;
}

function makeFakeShell(opts: FakeShellOptions = {}): Shell {
  return {
    async run(_cmd: ShellCommand): Promise<ShellResult> {
      return { exitCode: 0 };
    },
    async runCapture(_cmd: ShellCommand): Promise<ShellCaptureResult> {
      return {
        exitCode: opts.captureExitCode ?? 0,
        stdout: opts.captureStdout ?? "",
        stderr: opts.captureStderr ?? "",
      };
    },
    async which() {
      return undefined;
    },
    runtimeVersion(): string {
      return "test";
    },
  };
}

function makeFakeFs(): FileSystem {
  const store = new Map<string, string>();
  return {
    async read(p: string): Promise<string> {
      return store.get(p) ?? "";
    },
    async readJson<T>(p: string): Promise<T> {
      return JSON.parse(store.get(p) ?? "{}") as T;
    },
    async write(p: string, content: string): Promise<void> {
      store.set(p, content);
    },
    async exists(p: string): Promise<boolean> {
      return store.has(p);
    },
    async removeDir(): Promise<void> {
      // no-op
    },
    async copyDir(): Promise<void> {
      // no-op
    },
    async *glob(): AsyncIterable<string> {
      // no-op
    },
    async readSymlink(): Promise<string | null> {
      return null;
    },
  };
}

function makeContext(overrides: Partial<RefinementContext> = {}): RefinementContext {
  return {
    rules: [],
    recipes: [],
    semanticTokens: [],
    categories: [],
    iconNames: [],
    exemplar: { path: "exemplar.tsx", content: "" },
    source: [],
    target: {
      kind: "primitive",
      category: "buttons",
      absDir: "/abs/packages/ui/primitives/src/ui/buttons/button",
      componentName: "button",
    },
    recipeMode: "matched",
    ...overrides,
  };
}

const cleanPrimitive = `import { button } from "@lume/foundation/recipes";
import { css } from "@lume/foundation/css";

export const Button = () => null;
`;

describe("validateOutput", () => {
  test("returns Ok when all checks pass", async () => {
    const output: RefinerOutput = {
      files: [
        {
          path: "packages/ui/primitives/src/ui/buttons/button/button.tsx",
          content: cleanPrimitive,
        },
      ],
    };
    const result = await validateOutput(
      { fs: makeFakeFs(), shell: makeFakeShell({ captureExitCode: 0 }) },
      output,
      makeContext(),
      "/repo",
    );
    expect(result.isOk()).toBe(true);
  });

  test("flags forbidden imports", async () => {
    const output: RefinerOutput = {
      files: [
        {
          path: "packages/ui/primitives/src/ui/buttons/button/button.tsx",
          content: `import { cva } from "class-variance-authority";\nimport { cn } from "clsx";\nimport { button } from "@lume/foundation/recipes";\nimport { css } from "@lume/foundation/css";\nexport const Button = () => null;`,
        },
      ],
    };
    const result = await validateOutput(
      { fs: makeFakeFs(), shell: makeFakeShell() },
      output,
      makeContext(),
      "/repo",
    );
    expect(result.isErr()).toBe(true);
    const { messages } = result.unwrapErr();
    expect(messages.some((m) => m.includes("class-variance-authority"))).toBe(true);
    expect(messages.some((m) => m.includes("clsx"))).toBe(true);
  });

  test("flags forbidden @radix-ui/* prefix", async () => {
    const output: RefinerOutput = {
      files: [
        {
          path: "packages/ui/primitives/src/ui/buttons/button/button.tsx",
          content: `import * as Dialog from "@radix-ui/react-dialog";\nimport { button } from "@lume/foundation/recipes";\nimport { css } from "@lume/foundation/css";\nexport const X = () => null;`,
        },
      ],
    };
    const result = await validateOutput(
      { fs: makeFakeFs(), shell: makeFakeShell() },
      output,
      makeContext(),
      "/repo",
    );
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr().messages.some((m) => m.includes("@radix-ui/react-dialog"))).toBe(
      true,
    );
  });

  test("flags missing required imports for primitives", async () => {
    const output: RefinerOutput = {
      files: [
        {
          path: "packages/ui/primitives/src/ui/buttons/button/button.tsx",
          content: `export const Button = () => null;`,
        },
      ],
    };
    const result = await validateOutput(
      { fs: makeFakeFs(), shell: makeFakeShell() },
      output,
      makeContext(),
      "/repo",
    );
    expect(result.isErr()).toBe(true);
    const { messages } = result.unwrapErr();
    expect(messages.some((m) => m.includes("@lume/foundation/recipes"))).toBe(true);
    expect(messages.some((m) => m.includes("@lume/foundation/css"))).toBe(true);
  });

  test("inline mode does not require @lume/foundation/recipes import", async () => {
    const output: RefinerOutput = {
      files: [
        {
          path: "packages/ui/primitives/src/ui/buttons/button/button.tsx",
          content: `import { css } from "@lume/foundation/css";\nexport const Button = () => null;`,
        },
      ],
    };
    const result = await validateOutput(
      { fs: makeFakeFs(), shell: makeFakeShell() },
      output,
      makeContext({ recipeMode: "inline" }),
      "/repo",
    );
    expect(result.isOk()).toBe(true);
  });

  test("surfaces tsc failure messages when REPO_REFINE_TSCHECK=1", async () => {
    const previous = process.env.REPO_REFINE_TSCHECK;
    process.env.REPO_REFINE_TSCHECK = "1";
    try {
      const output: RefinerOutput = {
        files: [
          {
            path: "packages/ui/primitives/src/ui/buttons/button/button.tsx",
            content: cleanPrimitive,
          },
        ],
      };
      const result = await validateOutput(
        {
          fs: makeFakeFs(),
          shell: makeFakeShell({
            captureExitCode: 1,
            captureStderr: "button.tsx(3,1): error TS2304: Cannot find name 'foo'.",
          }),
        },
        output,
        makeContext(),
        "/repo",
      );
      expect(result.isErr()).toBe(true);
      expect(result.unwrapErr().messages.some((m) => m.includes("Cannot find name"))).toBe(true);
    } finally {
      if (previous === undefined) delete process.env.REPO_REFINE_TSCHECK;
      else process.env.REPO_REFINE_TSCHECK = previous;
    }
  });
});
