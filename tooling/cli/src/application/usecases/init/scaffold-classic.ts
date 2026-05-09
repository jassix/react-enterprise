import { match } from "@repo/std/match";

export type ClassicScaffoldType = "app" | "package" | "tooling";

export interface ClassicScaffoldPlan {
  readonly relDir: string;
  readonly files: ReadonlyMap<string, string>;
}

export function planClassicScaffold(type: ClassicScaffoldType, name: string): ClassicScaffoldPlan {
  return match(type)
    .with("app", () => ({
      relDir: `apps/${name}`,
      files: classicFiles(name, "app"),
    }))
    .with("package", () => ({
      relDir: `packages/${name}`,
      files: classicFiles(name, "package"),
    }))
    .with("tooling", () => ({
      relDir: `tooling/${name}`,
      files: classicFiles(name, "tooling"),
    }))
    .exhaustive();
}

function classicFiles(name: string, type: ClassicScaffoldType): ReadonlyMap<string, string> {
  return new Map([
    ["package.json", type === "app" ? appPackageJson(name) : libPackageJson(name)],
    ["tsconfig.json", TSCONFIG],
    ["src/index.ts", SRC_INDEX],
    ["README.md", readme(name, type)],
  ]);
}

function appPackageJson(name: string): string {
  return `${JSON.stringify(
    {
      name: `@repo/${name}`,
      private: true,
      type: "module",
      scripts: {
        dev: "bun run src/index.ts",
        "check-types": "tsc --noEmit",
      },
      devDependencies: {
        "@repo/tsconfig": "workspace:",
        "@repo/types": "workspace:",
        "@types/bun": "catalog:",
      },
      peerDependencies: {
        typescript: "catalog:",
      },
    },
    null,
    2,
  )}\n`;
}

function libPackageJson(name: string): string {
  return `${JSON.stringify(
    {
      name: `@repo/${name}`,
      type: "module",
      exports: {
        ".": { import: "./src/index.ts", types: "./src/index.ts" },
      },
      scripts: {
        "check-types": "tsc --noEmit",
      },
      devDependencies: {
        "@repo/tsconfig": "workspace:",
        "@repo/types": "workspace:",
        "@types/bun": "catalog:",
      },
      peerDependencies: {
        typescript: "catalog:",
      },
    },
    null,
    2,
  )}\n`;
}

const TSCONFIG = `${JSON.stringify(
  {
    extends: "@repo/tsconfig/bun.tsconfig.json",
    compilerOptions: {
      baseUrl: ".",
      types: ["@repo/types/reset"],
      paths: { "~/*": ["./src/*"] },
    },
    include: ["src/**/*"],
  },
  null,
  2,
)}\n`;

const SRC_INDEX = "export {};\n";

function readme(name: string, type: ClassicScaffoldType): string {
  return `# @repo/${name}\n\nScaffolded ${type}. Edit \`src/index.ts\` to start.\n`;
}
