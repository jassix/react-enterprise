export type CheckSection = "runtime" | "skills.sh" | "mcp" | "lefthook" | "tooling";

export const SECTIONS: readonly CheckSection[] = [
  "runtime",
  "skills.sh",
  "mcp",
  "lefthook",
  "tooling",
];

export type CheckStatus = "ok" | "warn" | "fail";

export type CheckOutcome =
  | { status: "ok"; name: string; detail?: string }
  | { status: "warn"; name: string; detail: string; fix?: string }
  | { status: "fail"; name: string; detail: string; fix: string };

export type CheckResult = CheckOutcome & { section: CheckSection };

export const ok = (name: string, detail?: string): CheckOutcome =>
  detail === undefined ? { status: "ok", name } : { status: "ok", name, detail };

export const warn = (name: string, detail: string, fix?: string): CheckOutcome =>
  fix === undefined ? { status: "warn", name, detail } : { status: "warn", name, detail, fix };

export const fail = (name: string, detail: string, fix: string): CheckOutcome => ({
  status: "fail",
  name,
  detail,
  fix,
});

export type Summary = Record<CheckStatus, number>;

export function summarize(results: readonly CheckResult[]): Summary {
  const summary: Summary = { ok: 0, warn: 0, fail: 0 };
  for (const result of results) summary[result.status] += 1;
  return summary;
}

export function toExitCode(results: readonly CheckResult[]): 0 | 1 {
  return results.some((result) => result.status === "fail") ? 1 : 0;
}
