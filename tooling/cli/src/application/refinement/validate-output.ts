import { Err, Ok } from "@repo/std/result";
import type { Result } from "@repo/std/result";
import type { FileSystem } from "~/application/ports/file-system";
import type { RefinerOutput } from "~/application/ports/refiner";
import type { Shell } from "~/application/ports/shell";
import {
  forbiddenModulePrefixes,
  forbiddenModules,
  requiredPrimitiveImports,
  requiredPrimitiveStylingImports,
} from "~/domain/forbidden-imports";
import { dirname, join } from "~/domain/path";
import type { RefinementContext, SourceFile } from "~/domain/refinement-context";

export interface ValidateOutputDeps {
  readonly fs: FileSystem;
  readonly shell: Shell;
}

export interface ValidationFailure {
  readonly messages: readonly string[];
}

export async function validateOutput(
  deps: ValidateOutputDeps,
  output: RefinerOutput,
  context: RefinementContext,
  rootDir: string,
): Promise<Result<void, ValidationFailure>> {
  const messages: string[] = [];

  for (const file of output.files) {
    messages.push(...scanForbiddenImports(file));
    if (isPrimitiveOrBlock(file.path)) {
      messages.push(...scanRequiredImports(file, context.recipeMode === "inline"));
    }
    messages.push(...scanIconPolicy(file));
  }

  if (messages.length > 0) return Err({ messages });

  if (process.env.REPO_REFINE_TSCHECK === "1") {
    const tsResult = await runTypeCheck(deps, output, rootDir);
    if (tsResult.kind === "fail") {
      return Err({ messages: tsResult.messages });
    }
  }

  return Ok(undefined);
}

const IMPORT_RE = /import\s+(?:[\s\S]*?)\s+from\s+["']([^"']+)["']/g;
const REQUIRE_RE = /require\(\s*["']([^"']+)["']\s*\)/g;
const SIDE_EFFECT_IMPORT_RE = /import\s+["']([^"']+)["']/g;

function scanForbiddenImports(file: SourceFile): string[] {
  const out: string[] = [];
  for (const mod of extractModules(file.content)) {
    if ((forbiddenModules as readonly string[]).includes(mod)) {
      out.push(`${file.path}: forbidden import '${mod}'`);
      continue;
    }
    for (const prefix of forbiddenModulePrefixes) {
      if (mod.startsWith(prefix)) {
        out.push(`${file.path}: forbidden import '${mod}' (matches '${prefix}*')`);
        break;
      }
    }
  }
  return out;
}

function scanRequiredImports(file: SourceFile, allowInline: boolean): string[] {
  const out: string[] = [];
  const modules = new Set(extractModules(file.content));

  if (!allowInline) {
    for (const required of requiredPrimitiveImports) {
      if (!modules.has(required)) {
        out.push(`${file.path}: missing required import '${required}'`);
      }
    }
  }

  const hasStyling = requiredPrimitiveStylingImports.some((m) => modules.has(m));
  if (!hasStyling) {
    out.push(
      `${file.path}: must import from one of [${requiredPrimitiveStylingImports.join(", ")}]`,
    );
  }
  return out;
}

const ICON_REF_RE = /<([A-Z][A-Za-z0-9]*Icon)\b/g;

function scanIconPolicy(file: SourceFile): string[] {
  const out: string[] = [];
  const modules = new Set(extractModules(file.content));
  if (modules.has("lucide-react")) {
    return out;
  }
  for (const match of file.content.matchAll(ICON_REF_RE)) {
    const name = match[1];
    if (name && name !== "Icon") {
      out.push(
        `${file.path}: warning — '<${name}>' should be replaced with '<Icon name="..."/>' from @lume/primitives`,
      );
    }
  }
  return out;
}

function extractModules(content: string): string[] {
  const found: string[] = [];
  for (const m of content.matchAll(IMPORT_RE)) {
    if (m[1]) found.push(m[1]);
  }
  for (const m of content.matchAll(SIDE_EFFECT_IMPORT_RE)) {
    if (m[1]) found.push(m[1]);
  }
  for (const m of content.matchAll(REQUIRE_RE)) {
    if (m[1]) found.push(m[1]);
  }
  return found;
}

function isPrimitiveOrBlock(path: string): boolean {
  return (
    path.startsWith("packages/ui/primitives/src/ui/") || path.startsWith("packages/ui/blocks/src/")
  );
}

interface TypeCheckResult {
  readonly kind: "ok" | "fail";
  readonly messages: readonly string[];
}

async function runTypeCheck(
  deps: ValidateOutputDeps,
  output: RefinerOutput,
  rootDir: string,
): Promise<TypeCheckResult> {
  const id = randomId();
  const tmpDir = join(rootDir, "node_modules", ".cache", "repo-cli", `refine-${id}`);

  try {
    for (const file of output.files) {
      const abs = join(tmpDir, file.path);
      await ensureDir(deps, dirname(abs));
      await deps.fs.write(abs, file.content);
    }

    const tsconfig = {
      extends: join(rootDir, "tooling/config/typescript/react.tsconfig.json"),
      compilerOptions: {
        noEmit: true,
        skipLibCheck: true,
        ignoreDeprecations: "6.0",
        paths: {
          "@lume/foundation/*": [join(rootDir, "packages/ui/foundation/src/*")],
          "@lume/primitives": [join(rootDir, "packages/ui/primitives/src/index.ts")],
          "@lume/primitives/*": [join(rootDir, "packages/ui/primitives/src/*")],
          "@repo/std/*": [join(rootDir, "packages/std/src/*")],
          "@repo/std": [join(rootDir, "packages/std/src/index.ts")],
        },
      },
      include: output.files.map((f) => join(tmpDir, f.path)),
    };
    await deps.fs.write(join(tmpDir, "tsconfig.json"), JSON.stringify(tsconfig, null, 2));

    const result = await deps.shell.runCapture({
      argv: ["bun", "x", "tsc", "--noEmit", "-p", tmpDir],
      cwd: rootDir,
    });

    if (result.exitCode === 0) {
      return { kind: "ok", messages: [] };
    }
    const combined = `${result.stdout}\n${result.stderr}`.trim();
    const messages =
      combined.length > 0
        ? combined.split(/\r?\n/).filter((l) => l.trim().length > 0)
        : [`tsc exited with code ${result.exitCode}`];
    return { kind: "fail", messages };
  } finally {
    await deps.fs.removeDir(tmpDir);
  }
}

async function ensureDir(deps: ValidateOutputDeps, absDir: string): Promise<void> {
  await deps.shell.run({ argv: ["mkdir", "-p", absDir], cwd: "/" });
}

function randomId(): string {
  return Math.random().toString(36).slice(2, 10);
}
