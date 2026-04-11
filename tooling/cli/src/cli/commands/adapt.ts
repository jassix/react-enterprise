import { createColors } from "~/report/colors";
import type { Command } from "../command";

function renderGuide(): string {
  const c = createColors();
  const bold = (t: string) => c.wrap("bold", t);
  const dim = (t: string) => c.wrap("dim", t);
  const cyan = (t: string) => c.wrap("cyan", t);
  const yellow = (t: string) => c.wrap("yellow", t);
  const green = (t: string) => c.wrap("green", t);

  const indent = (t: string) => `  ${t}`;
  const step = (n: number, title: string) =>
    indent(`${yellow(bold(`━━ ${n} ━━`))}  ${bold(title)}`);
  const body = (t: string) => indent(`    ${dim(t)}`);
  const code = (t: string) => indent(`    ${green("$")} ${t}`);
  const prompt = (t: string) => indent(`    ${cyan(">")} ${t}`);

  return [
    "",
    indent(cyan(bold("repo adapt"))),
    indent(dim("Rebrand this template for your project.")),
    "",
    indent(
      `${dim("Ships with")} ${cyan("@repo/*")} ${dim("and")} ${cyan("`repo`")} ${dim("as placeholders — adapt them to your org.")}`,
    ),
    "",
    step(1, "Pick your new scope and CLI name"),
    "",
    body(`Example:  ${cyan("@acme")}   ${cyan("acme")}`),
    "",
    step(2, "Run the rebrand skill via Claude Code"),
    "",
    code(`claude "Use the rebrand skill. Scope: @acme. CLI: acme."`),
    "",
    body("Or from an interactive Claude Code session:"),
    "",
    prompt("/rebrand @acme acme"),
    "",
    body("Renames scopes, tsconfig extends, CLI branding, docs,"),
    body("and regenerates the lockfile via `bun install`."),
    "",
    step(3, "Verify"),
    "",
    code("bun run check-types"),
    code("bun run lint"),
    code("bun --filter @acme/cli doctor"),
    "",
    step(4, "Commit and self-destruct"),
    "",
    code(`git commit -am "chore: rebrand template to @acme"`),
    code("rm -rf .agents/skills/rebrand .claude/skills/rebrand"),
    "",
    indent(dim("────────────────────────────────────────────")),
    "",
    indent(`${dim("→ Runbook:")} ${cyan(".agents/skills/rebrand/SKILL.md")}`),
    "",
  ].join("\n");
}

export const adaptCommand: Command = {
  name: "adapt",
  summary: "rebrand this template for your project (scope, CLI name, docs)",
  async run() {
    process.stdout.write(`${renderGuide()}\n`);
    return 0;
  },
};
