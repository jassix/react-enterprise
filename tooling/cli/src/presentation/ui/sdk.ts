import { isCancelled } from "~/application/ports/prompter";
import type { Prompter } from "~/application/ports/prompter";
import type { SdkPlan } from "~/domain/sdk/plan";
import type { SpecSource } from "~/domain/sdk/spec-source";
import { createColors } from "~/infrastructure/colors";

const c = createColors();
const bold = (s: string) => c.wrap("bold", s);
const dim = (s: string) => c.wrap("dim", s);
const cyan = (s: string) => c.wrap("cyan", s);
const green = (s: string) => c.wrap("green", s);

export function showIntro(prompter: Prompter): void {
  prompter.intro(`${cyan(bold("◆ repo init sdk"))} ${dim("• scaffold a new SDK package")}`);
}

export async function showPlanSummary(prompter: Prompter, plan: SdkPlan): Promise<boolean> {
  prompter.note(formatPlan(plan), "Plan");
  const ok = await prompter.confirm({
    message: "Proceed with these settings?",
    initialValue: true,
  });
  if (isCancelled(ok)) return false;
  return ok;
}

export interface OutroOptions {
  readonly plan: SdkPlan;
  readonly fileCount: number;
}

export function showOutro(prompter: Prompter, opts: OutroOptions): void {
  const next: string[] = [`cd packages/sdk/${opts.plan.name}`];
  if (!opts.plan.install) next.push("bun install");
  if (!opts.plan.generate) next.push(`bun --filter @repo/${opts.plan.name}-sdk generate`);
  next.push(`bun --filter @repo/${opts.plan.name}-sdk lint`);

  prompter.note(next.map((cmd) => `${dim("$")} ${cmd}`).join("\n"), "Next steps");
  prompter.outro(
    `${green(bold("✓ done"))}  ${dim(`${opts.fileCount} files written to`)} packages/sdk/${opts.plan.name}`,
  );
}

export function nonInteractiveHint(): string {
  const example =
    "  bun repo init sdk myapi \\\n" +
    "    --spec=./specs/myapi.yml \\\n" +
    "    --plugins=ts,client,react-query \\\n" +
    "    --yes";
  return [
    "stdin is not a TTY and required arguments are missing.",
    "",
    "Pass --yes plus the relevant flags to run non-interactively, e.g.:",
    "",
    example,
  ].join("\n");
}

function formatPlan(plan: SdkPlan): string {
  const rows: readonly (readonly [string, string])[] = [
    ["package", `@repo/${plan.name}-sdk`],
    ["preset", plan.preset],
    ["spec", formatSpec(plan.spec)],
    ["plugins", plan.plugins.length > 0 ? plan.plugins.join(", ") : dim("(none)")],
    ["install", plan.install ? "yes" : dim("no")],
    ["generate", plan.generate ? "yes" : dim("no")],
  ];
  const labelWidth = Math.max(...rows.map(([label]) => label.length));
  return rows.map(([label, value]) => `${dim(label.padEnd(labelWidth))}  ${value}`).join("\n");
}

function formatSpec(spec: SpecSource): string {
  if (spec.kind === "file") return `${dim("file")} ${spec.path}`;
  if (spec.kind === "url") return `${dim("url")}  ${spec.url}`;
  return dim("placeholder (fill in later)");
}
