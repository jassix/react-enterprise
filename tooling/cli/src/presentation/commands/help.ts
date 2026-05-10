import type { Prompter } from "~/application/ports/prompter";
import { createColors } from "~/infrastructure/colors";
import type { Command } from "~/presentation/command";

interface ExampleEntry {
  readonly cmd: string;
  readonly hint: string;
}

const EXAMPLES: readonly ExampleEntry[] = [
  { cmd: "repo add shadcn:button", hint: "fetch + refine a shadcn component" },
  { cmd: "repo add --dry-run shadcn:dialog", hint: "preview placement and diff" },
  { cmd: "repo refine packages/ui/primitives/.../foo.tsx", hint: "refine local component(s)" },
  { cmd: "repo init sdk petstore --spec=./specs/petstore.yml", hint: "scaffold an OpenAPI SDK" },
  { cmd: "repo doctor", hint: "verify environment health" },
];

export function createHelpCommand(commands: () => readonly Command[], prompter: Prompter): Command {
  return {
    name: "help",
    summary: "show this message",
    async run() {
      const c = createColors();
      const bold = (t: string) => c.wrap("bold", t);
      const dim = (t: string) => c.wrap("dim", t);
      const cyan = (t: string) => c.wrap("cyan", t);
      const green = (t: string) => c.wrap("green", t);

      const list = commands();
      const cmdWidth = Math.max(...list.map((cmd) => cmd.name.length));
      const exampleWidth = Math.max(...EXAMPLES.map((ex) => ex.cmd.length));

      prompter.intro(`${cyan(bold("repo"))}  ${dim("monorepo CLI")}`);

      prompter.note(dim("repo <command> [flags]"), "Usage");

      prompter.note(
        list.map((cmd) => `${cyan(bold(cmd.name.padEnd(cmdWidth)))}   ${cmd.summary}`).join("\n"),
        "Commands",
      );

      prompter.note(
        EXAMPLES.map((ex) => `${green("$")} ${ex.cmd.padEnd(exampleWidth)}   ${dim(ex.hint)}`).join(
          "\n",
        ),
        "Examples",
      );

      prompter.outro(
        `${dim("New here?")} run ${cyan("repo doctor")} ${dim("then")} ${cyan("repo init")}`,
      );
      return 0;
    },
  };
}
