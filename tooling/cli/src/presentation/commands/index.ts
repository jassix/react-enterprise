import type { Command } from "~/presentation/command";
import { createAdaptCommand } from "~/presentation/commands/adapt";
import { createAddCommand } from "~/presentation/commands/add";
import { createDoctorCommand } from "~/presentation/commands/doctor";
import { createHelpCommand } from "~/presentation/commands/help";
import { createInitCommand } from "~/presentation/commands/init";
import { createRefineCommand } from "~/presentation/commands/refine";
import type { CommandDeps } from "~/presentation/deps";

export function createDefaultCommands(deps: CommandDeps): readonly Command[] {
  const commandsRef: Command[] = [];
  const helpCommand = createHelpCommand(() => commandsRef, deps.prompter);
  commandsRef.push(
    createDoctorCommand({
      fs: deps.fs,
      shell: deps.shell,
      locator: deps.locator,
      output: deps.output,
      prompter: deps.prompter,
    }),
    createInitCommand(deps),
    createAddCommand(deps),
    createRefineCommand(deps),
    createAdaptCommand(deps.prompter),
    helpCommand,
  );
  return commandsRef;
}
