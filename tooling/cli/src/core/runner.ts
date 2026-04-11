import type { Check, CheckContext, CheckResult, CheckStatus } from "./check";

export async function runCheck(
	check: Check,
	ctx: CheckContext,
): Promise<CheckResult[]> {
	const outcomes = await check.run(ctx);
	return outcomes.map((outcome) => ({ ...outcome, section: check.section }));
}

export async function runChecks(
	checks: readonly Check[],
	ctx: CheckContext,
): Promise<CheckResult[]> {
	const groups = await Promise.all(checks.map((check) => runCheck(check, ctx)));
	return groups.flat();
}

export type Summary = Record<CheckStatus, number>;

export function summarize(results: readonly CheckResult[]): Summary {
	const summary: Summary = { ok: 0, warn: 0, fail: 0 };
	for (const result of results) summary[result.status] += 1;
	return summary;
}

export function toExitCode(results: readonly CheckResult[]): 0 | 1 {
	return results.some((result) => result.status === "fail") ? 1 : 0;
}
