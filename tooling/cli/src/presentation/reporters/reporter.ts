import type { CheckResult } from "~/domain/doctor/check";

export type ReportFormat = "text" | "json";

export interface Reporter {
  readonly format: ReportFormat;
  render(results: readonly CheckResult[]): string;
}
