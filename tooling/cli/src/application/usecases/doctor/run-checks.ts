import type { CheckContext, CheckRunner } from "~/application/checks/context";
import type { CheckResult } from "~/domain/doctor/check";

export async function runCheck(check: CheckRunner, ctx: CheckContext): Promise<CheckResult[]> {
  const outcomes = await check.run(ctx);
  return outcomes.map((outcome) => Object.assign(outcome, { section: check.section }));
}

export async function runChecks(
  checks: readonly CheckRunner[],
  ctx: CheckContext,
): Promise<CheckResult[]> {
  const groups = await Promise.all(checks.map((check) => runCheck(check, ctx)));
  return groups.flat();
}
