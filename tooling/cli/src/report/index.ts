import { match } from "@repo/std/match";
import { createJsonReporter } from "./json";
import type { ReportFormat, Reporter } from "./reporter";
import { createTerminalReporter } from "./terminal";

export function createReporter(format: ReportFormat): Reporter {
	return match(format)
		.with("text", () => createTerminalReporter())
		.with("json", () => createJsonReporter())
		.exhaustive();
}

export type { ReportFormat, Reporter };
