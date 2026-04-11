import { defaultChecks } from "~/checks";
import { runChecks, toExitCode } from "~/core/runner";
import { findMonorepoRoot } from "~/env/monorepo";
import { createReporter, type ReportFormat } from "~/report";
import type { Command } from "../command";

function parseFormat(argv: readonly string[]): ReportFormat {
  for (const arg of argv) {
    if (arg === "--json" || arg === "--format=json") return "json";
    if (arg === "--format=text") return "text";
  }
  return "text";
}

export const doctorCommand: Command = {
  name: "doctor",
  summary: "check skills.sh, MCP, lefthook and tooling are healthy",
  async run(argv) {
    const root = await findMonorepoRoot(process.cwd());
    const results = await runChecks(defaultChecks, { root });

    const reporter = createReporter(parseFormat(argv));
    process.stdout.write(reporter.render(results) + "\n");
    return toExitCode(results);
  },
};
