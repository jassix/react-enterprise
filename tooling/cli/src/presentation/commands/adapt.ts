import type { Prompter } from "~/application/ports/prompter";
import { createColors } from "~/infrastructure/colors";
import type { Command } from "~/presentation/command";

export function createAdaptCommand(prompter: Prompter): Command {
  return {
    name: "adapt",
    summary: "rebrand this template for your project (scope, CLI name, docs)",
    async run() {
      const c = createColors();
      const bold = (t: string) => c.wrap("bold", t);
      const dim = (t: string) => c.wrap("dim", t);
      const cyan = (t: string) => c.wrap("cyan", t);
      const green = (t: string) => c.wrap("green", t);

      prompter.intro(`${cyan(bold("repo adapt"))}  ${dim("rebrand the template")}`);

      prompter.note(
        `${dim("Ships with")} ${cyan("@repo/*")} ${dim("and")} ${cyan("`repo`")} ${dim("as placeholders.")}\nSwap them for your org's scope and CLI name.`,
        "What this does",
      );

      prompter.log.step("Pick your new scope and CLI name");
      prompter.note(`Example: ${cyan("@acme")}   ${cyan("acme")}`, "1 — Choose names");

      prompter.log.step("Run the rebrand skill via Claude Code");
      prompter.note(
        [
          `${green("$")} claude "Use the rebrand skill. Scope: @acme. CLI: acme."`,
          "",
          dim("Or from an interactive Claude Code session:"),
          `${cyan(">")} /rebrand @acme acme`,
          "",
          dim("Renames scopes, tsconfig extends, CLI branding, docs,"),
          dim("and regenerates the lockfile via `bun install`."),
        ].join("\n"),
        "2 — Run skill",
      );

      prompter.log.step("Verify the rebrand");
      prompter.note(
        [
          `${green("$")} bun run check-types`,
          `${green("$")} bun run lint`,
          `${green("$")} bun --filter @acme/cli doctor`,
        ].join("\n"),
        "3 — Verify",
      );

      prompter.log.step("Commit and self-destruct the skill");
      prompter.note(
        [
          `${green("$")} git commit -am "chore: rebrand template to @acme"`,
          `${green("$")} rm -rf .agents/skills/rebrand .claude/skills/rebrand`,
        ].join("\n"),
        "4 — Commit",
      );

      prompter.outro(`${dim("→ Runbook:")} ${cyan(".agents/skills/rebrand/SKILL.md")}`);
      return 0;
    },
  };
}
