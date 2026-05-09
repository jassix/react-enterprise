import { summarize } from "~/domain/doctor/check";
import type { Reporter } from "~/presentation/reporters/reporter";

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
