import type { Command } from "./command";

const HELP_ALIASES = new Set(["help", "--help", "-h"]);

function findCommand(commands: readonly Command[], name: string): Command | undefined {
  if (HELP_ALIASES.has(name)) return commands.find((c) => c.name === "help");
  return commands.find((c) => c.name === name);
}

function writeUnknown(name: string, commands: readonly Command[]): void {
  const available = commands.map((c) => c.name).join(", ");
  process.stderr.write(`unknown command: ${name}\n\navailable: ${available}\n`);
}

export async function runCli(
  argv: readonly string[],
  commands: readonly Command[],
): Promise<number> {
  const [name, ...rest] = argv;

  if (!name) {
    const help = commands.find((c) => c.name === "help");
    if (help) await help.run(rest);
    return 1;
  }

  const command = findCommand(commands, name);
  if (!command) {
    writeUnknown(name, commands);
    return 1;
  }

  return command.run(rest);
}
