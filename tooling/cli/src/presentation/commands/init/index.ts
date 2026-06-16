import { join } from "~/domain/path";
import type { Command } from "~/presentation/command";
import { runInitClassic } from "~/presentation/commands/init/classic";
import { runInitSdk } from "~/presentation/commands/init/sdk";
import type { CommandDeps } from "~/presentation/deps";
import { renderError } from "~/presentation/ui/format-error";

const FOREIGN_LOCKS = ["package-lock.json", "pnpm-lock.yaml", "yarn.lock"] as const;

export function createInitCommand(deps: CommandDeps): Command {
  return {
    name: "init",
    summary: "scaffold a new app, package, tooling entry, or SDK",
    async run(argv) {
      let root: string;
      try {
        root = await deps.locator.locate(process.cwd());
      } catch (error) {
        return renderError(deps.output, error instanceof Error ? error.message : String(error));
      }

      for (const lock of FOREIGN_LOCKS) {
        if (await deps.fs.exists(join(root, lock))) {
          return renderError(
            deps.output,
            `${lock} found at monorepo root — this repo enforces bun. Remove it and use \`bun install\`.`,
          );
        }
      }

      if (argv[0] === "sdk") {
        return runInitSdk(argv.slice(1), root, deps);
      }
      return runInitClassic(argv, root, deps);
    },
  };
}
