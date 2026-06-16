import { match } from "@repo/std/match";
import { createJsonReporter } from "~/presentation/reporters/json";
import type { Reporter, ReportFormat } from "~/presentation/reporters/reporter";
import { createTerminalReporter } from "~/presentation/reporters/terminal";

export function createReporter(format: ReportFormat): Reporter {
  return match(format)
    .with("text", () => createTerminalReporter())
    .with("json", () => createJsonReporter())
    .exhaustive();
}

export type { ReportFormat, Reporter };
