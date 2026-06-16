import type { FileSystem } from "~/application/ports/file-system";
import type { Output } from "~/application/ports/output";
import type { Shell } from "~/application/ports/shell";
import type { TaskRunner } from "~/application/ports/task-runner";
import { join } from "~/domain/path";
import type { SdkPlan } from "~/domain/sdk/plan";

export interface ScaffoldSdkRequest {
  readonly plan: SdkPlan;
  readonly root: string;
  readonly files: ReadonlyMap<string, string>;
}

export interface ScaffoldSdkDeps {
  readonly fs: FileSystem;
  readonly shell: Shell;
  readonly taskRunner: TaskRunner;
  readonly output: Output;
}

export interface ScaffoldSdkResult {
  readonly targetDir: string;
  readonly fileCount: number;
}

export async function scaffoldSdk(
  req: ScaffoldSdkRequest,
  deps: ScaffoldSdkDeps,
): Promise<ScaffoldSdkResult> {
  const targetDir = join(req.root, "packages/sdk", req.plan.name);

  if (await deps.fs.exists(join(targetDir, "package.json"))) {
    throw new Error(`packages/sdk/${req.plan.name} already exists`);
  }

  const tasks: Parameters<TaskRunner["runSequential"]>[0][number][] = [
    {
      title: `Scaffolding @repo/${req.plan.name}-sdk`,
      run: async () => {
        try {
          for (const [rel, content] of req.files) {
            await deps.fs.write(join(targetDir, rel), content);
          }
        } catch (error) {
          await deps.fs.removeDir(targetDir);
          throw error;
        }
        return `Wrote ${req.files.size} files`;
      },
    },
  ];

  if (req.plan.install) {
    tasks.push({
      title: "Installing dependencies",
      run: async () => {
        const result = await deps.shell.run({
          argv: ["bun", "install"],
          cwd: req.root,
        });
        if (result.exitCode !== 0) {
          throw new Error(`bun install exited with code ${result.exitCode}`);
        }
        return "Installed";
      },
    });
  }

  if (req.plan.generate) {
    const filterArg = `@repo/${req.plan.name}-sdk`;
    tasks.push({
      title: "Generating SDK from OpenAPI spec",
      run: async () => {
        const result = await deps.shell.run({
          argv: ["bun", "--filter", filterArg, "generate"],
          cwd: req.root,
        });
        if (result.exitCode !== 0) {
          throw new Error(`kubb generate exited with code ${result.exitCode}`);
        }
        return "Generated";
      },
    });
  }

  await deps.taskRunner.runSequential(tasks);

  return { targetDir, fileCount: req.files.size };
}
