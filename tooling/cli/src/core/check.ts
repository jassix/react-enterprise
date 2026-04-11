export type CheckSection =
	| "runtime"
	| "skills.sh"
	| "mcp"
	| "lefthook"
	| "tooling";

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

export interface CheckContext {
	readonly root: string;
}

export interface Check {
	readonly id: string;
	readonly section: CheckSection;
	run(ctx: CheckContext): Promise<CheckOutcome[]>;
}

export const ok = (name: string, detail?: string): CheckOutcome =>
	detail === undefined
		? { status: "ok", name }
		: { status: "ok", name, detail };

export const warn = (
	name: string,
	detail: string,
	fix?: string,
): CheckOutcome =>
	fix === undefined
		? { status: "warn", name, detail }
		: { status: "warn", name, detail, fix };

export const fail = (
	name: string,
	detail: string,
	fix: string,
): CheckOutcome => ({ status: "fail", name, detail, fix });
