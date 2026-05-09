import { match } from "@repo/std/match";
import { type CheckResult, type CheckSection, SECTIONS, summarize } from "~/domain/doctor/check";
import { type ColorKey, type Colors, createColors } from "~/infrastructure/colors";
import type { Reporter } from "~/presentation/reporters/reporter";

interface Glyph {
  glyph: string;
  color: ColorKey;
}

function glyphFor(result: CheckResult): Glyph {
  return match(result)
    .with({ status: "ok" }, () => ({ glyph: "✓", color: "green" as ColorKey }))
    .with({ status: "warn" }, () => ({ glyph: "⚠", color: "yellow" as ColorKey }))
    .with({ status: "fail" }, () => ({ glyph: "✗", color: "red" as ColorKey }))
    .exhaustive();
}

function groupBySection(results: readonly CheckResult[]): Map<CheckSection, CheckResult[]> {
  const grouped = new Map<CheckSection, CheckResult[]>();
  for (const r of results) {
    const arr = grouped.get(r.section) ?? [];
    arr.push(r);
    grouped.set(r.section, arr);
  }
  return grouped;
}

function renderResult(result: CheckResult, colors: Colors): string[] {
  const sym = glyphFor(result);
  const detail =
    result.status === "ok"
      ? result.detail
        ? ` ${colors.wrap("dim", result.detail)}`
        : ""
      : ` ${result.detail}`;
  const lines = [`  ${colors.wrap(sym.color, sym.glyph)} ${result.name}${detail}`];
  if (result.status !== "ok" && result.fix) {
    lines.push(`    ${colors.wrap("dim", `→ ${result.fix}`)}`);
  }
  return lines;
}

function renderSummary(results: readonly CheckResult[], colors: Colors): string {
  const counts = summarize(results);
  const failPart =
    counts.fail > 0
      ? colors.wrap("red", `${counts.fail} failed`)
      : colors.wrap("dim", `${counts.fail} failed`);
  const warnWord = counts.warn === 1 ? "warning" : "warnings";
  const warnPart =
    counts.warn > 0
      ? colors.wrap("yellow", `${counts.warn} ${warnWord}`)
      : colors.wrap("dim", `${counts.warn} ${warnWord}`);
  const okPart = colors.wrap("green", `${counts.ok} ok`);
  return `${failPart} · ${warnPart} · ${okPart}`;
}

export function createTerminalReporter(colors: Colors = createColors()): Reporter {
  return {
    format: "text",
    render(results) {
      const lines: string[] = [];
      lines.push(colors.wrap("bold", colors.wrap("cyan", "repo doctor")));
      lines.push(colors.wrap("dim", "────────────"));

      const grouped = groupBySection(results);
      for (const section of SECTIONS) {
        const items = grouped.get(section);
        if (!items || items.length === 0) continue;
        lines.push("");
        lines.push(colors.wrap("bold", section));
        for (const item of items) {
          for (const line of renderResult(item, colors)) lines.push(line);
        }
      }

      lines.push("");
      lines.push(renderSummary(results, colors));
      return lines.join("\n");
    },
  };
}
