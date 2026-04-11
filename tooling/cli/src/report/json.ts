import { summarize } from "~/core/runner";
import type { Reporter } from "./reporter";

export function createJsonReporter(): Reporter {
	return {
		format: "json",
		render(results) {
			return JSON.stringify(
				{
					summary: summarize(results),
					results,
				},
				null,
				2,
			);
		},
	};
}
