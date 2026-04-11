import type { Command } from "../command";

export function createHelpCommand(commands: () => readonly Command[]): Command {
	return {
		name: "help",
		summary: "show this message",
		async run() {
			const list = commands()
				.map((c) => `  ${c.name.padEnd(10)} ${c.summary}`)
				.join("\n");
			process.stdout.write(
				`repo — monorepo CLI\n\nusage:\n  repo <command>\n\ncommands:\n${list}\n`,
			);
			return 0;
		},
	};
}
