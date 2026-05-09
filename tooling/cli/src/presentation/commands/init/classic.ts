import { planClassicScaffold } from "~/application/usecases/init/scaffold-classic";
import { join } from "~/domain/path";
import { createColors } from "~/infrastructure/colors";
import type { CommandDeps } from "~/presentation/deps";
import { parseClassicInitArgs } from "~/presentation/parsers/init-args";
import { renderError } from "~/presentation/ui/format-error";

export async function runInitClassic(
  argv: readonly string[],
  root: string,
  deps: CommandDeps,
): Promise<number> {
  const parsed = parseClassicInitArgs(argv);
  if ("error" in parsed) return renderError(deps.output, parsed.error);

  const c = createColors();
  const bold = (t: string) => c.wrap("bold", t);
  const dim = (t: string) => c.wrap("dim", t);
  const cyan = (t: string) => c.wrap("cyan", t);
  const green = (t: string) => c.wrap("green", t);

  const plan = planClassicScaffold(parsed.type, parsed.name);
  const targetDir = join(root, plan.relDir);

  if (await deps.fs.exists(join(targetDir, "package.json"))) {
    return renderError(deps.output, `${plan.relDir} already exists`);
  }

  deps.prompter.intro(`${cyan(bold("repo init"))}  ${dim(`→ ${plan.relDir}`)}`);

  const tasks: Array<Parameters<typeof deps.taskRunner.runSequential>[0][number]> = [
    {
      title: `Scaffolding @repo/${parsed.name}`,
      run: async () => {
        try {
          for (const [rel, content] of plan.files) {
            await deps.fs.write(join(targetDir, rel), content);
          }
        } catch (err) {
          await deps.fs.removeDir(targetDir);
          throw err;
        }
        return `Wrote ${plan.files.size} files`;
      },
    },
  ];

  if (!parsed.skipInstall) {
    tasks.push({
      title: "Installing dependencies",
      run: async () => {
        const result = await deps.shell.run({ argv: ["bun", "install"], cwd: root });
        if (result.exitCode !== 0) {
          throw new Error(`bun install exited with code ${result.exitCode}`);
        }
        return "Installed";
      },
    });
  }

  try {
    await deps.taskRunner.runSequential(tasks);
  } catch (err) {
    return renderError(deps.output, err instanceof Error ? err.message : String(err));
  }

  if (parsed.skipInstall) deps.prompter.log.info("Skipped bun install (--no-install)");

  deps.prompter.outro(`${green(bold("✓ done"))}  ${dim(`@repo/${parsed.name}`)}`);
  return 0;
}
