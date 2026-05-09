import type { ReportFormat } from "~/presentation/reporters/reporter";

export function parseDoctorFormat(argv: readonly string[]): ReportFormat {
  for (const arg of argv) {
    if (arg === "--json" || arg === "--format=json") return "json";
    if (arg === "--format=text") return "text";
  }
  return "text";
}
