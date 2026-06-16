import { defaultChecks } from "~/application/checks";
import type { CheckContext } from "~/application/checks/context";
import type { FileSystem } from "~/application/ports/file-system";
import type { MonorepoLocator } from "~/application/ports/monorepo-locator";
import type { Output } from "~/application/ports/output";
import type { Prompter } from "~/application/ports/prompter";
import type { Shell } from "~/application/ports/shell";
import { runChecks } from "~/application/usecases/doctor/run-checks";
import { SECTIONS, summarize, toExitCode } from "~/domain/doctor/check";
import type { CheckResult, CheckSection } from "~/domain/doctor/check";
import { createColors } from "~/infrastructure/colors";
import type { Command } from "~/presentation/command";
import { parseDoctorFormat } from "~/presentation/parsers/doctor-args";
import { createJsonReporter } from "~/presentation/reporters/json";

export interface DoctorCommandDeps {
  readonly fs: FileSystem;
  readonly shell: Shell;
  readonly locator: MonorepoLocator;
  readonly output: Output;
  readonly prompter: Prompter;
}

export function createDoctorCommand(deps: DoctorCommandDeps): Command {
  return {
    name: "doctor",
    summary: "check skills.sh, MCP, lefthook and tooling are healthy",
    async run(argv) {
      const root = await deps.locator.locate(process.cwd());
      const ctx: CheckContext = { root, fs: deps.fs, shell: deps.shell, locator: deps.locator };
      const results = await runChecks(defaultChecks, ctx);

      if (parseDoctorFormat(argv) === "json") {
        deps.output.writeOut(`${createJsonReporter().render(results)}\n`);
        return toExitCode(results);
      }

      renderClack(deps.prompter, results);
      return toExitCode(results);
    },
  };
}

function renderClack(prompter: Prompter, results: readonly CheckResult[]): void {
  const c = createColors();
  const bold = (t: string) => c.wrap("bold", t);
  const dim = (t: string) => c.wrap("dim", t);
  const cyan = (t: string) => c.wrap("cyan", t);

  prompter.intro(`${cyan(bold("repo doctor"))}  ${dim("environment health")}`);

  const grouped = groupBy(results);
  for (const section of SECTIONS) {
    const items = grouped.get(section);
    if (!items || items.length === 0) continue;
    prompter.note(items.map((item) => formatRow(item)).join("\n"), section);
  }

  prompter.outro(formatSummary(results));
}

function groupBy(results: readonly CheckResult[]): Map<CheckSection, CheckResult[]> {
  const out = new Map<CheckSection, CheckResult[]>();
  for (const r of results) {
    const arr = out.get(r.section) ?? [];
    arr.push(r);
    out.set(r.section, arr);
  }
  return out;
}

function formatRow(result: CheckResult): string {
  const c = createColors();
  const dim = (t: string) => c.wrap("dim", t);
  const sym = symbolFor(result);
  const detail =
    result.status === "ok" ? (result.detail ? ` ${dim(result.detail)}` : "") : ` ${result.detail}`;
  const head = `${sym} ${result.name}${detail}`;
  if (result.status !== "ok" && result.fix) {
    return `${head}\n  ${dim(`→ ${result.fix}`)}`;
  }
  return head;
}

function symbolFor(result: CheckResult): string {
  const c = createColors();
  if (result.status === "ok") return c.wrap("green", "✓");
  if (result.status === "warn") return c.wrap("yellow", "⚠");
  return c.wrap("red", "✗");
}

function formatSummary(results: readonly CheckResult[]): string {
  const c = createColors();
  const dim = (t: string) => c.wrap("dim", t);
  const counts = summarize(results);
  const failPart =
    counts.fail > 0 ? c.wrap("red", `${counts.fail} failed`) : dim(`${counts.fail} failed`);
  const warnWord = counts.warn === 1 ? "warning" : "warnings";
  const warnPart =
    counts.warn > 0
      ? c.wrap("yellow", `${counts.warn} ${warnWord}`)
      : dim(`${counts.warn} ${warnWord}`);
  const okPart = c.wrap("green", `${counts.ok} ok`);
  return `${failPart} · ${warnPart} · ${okPart}`;
}
