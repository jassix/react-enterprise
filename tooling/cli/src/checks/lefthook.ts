import { join } from "~/util/path";
import {
	type Check,
	type CheckContext,
	type CheckOutcome,
	fail,
	ok,
	warn,
} from "~/core/check";

async function checkPreCommit(root: string): Promise<CheckOutcome> {
	const path = join(root, ".git", "hooks", "pre-commit");
	const file = Bun.file(path);
	if (!(await file.exists())) {
		return fail(
			"pre-commit",
			".git/hooks/pre-commit not installed",
			"run `bun x lefthook install`",
		);
	}
	const body = await file.text();
	if (!body.includes("lefthook")) {
		return warn(
			"pre-commit",
			"pre-commit hook exists but does not reference lefthook",
			"run `bun x lefthook install` to install managed hooks",
		);
	}
	return ok("pre-commit", "lefthook pre-commit installed");
}

async function checkLefthookBinary(root: string): Promise<CheckOutcome> {
	if (Bun.which("lefthook")) {
		return ok("lefthook binary", "on PATH");
	}
	const local = Bun.file(join(root, "node_modules", ".bin", "lefthook"));
	if (await local.exists()) {
		return ok("lefthook binary", "node_modules/.bin/lefthook");
	}
	return warn(
		"lefthook binary",
		"not found on PATH or in node_modules/.bin",
		"add lefthook as a devDependency or install globally",
	);
}

export const lefthookCheck: Check = {
	id: "lefthook",
	section: "lefthook",
	async run(ctx: CheckContext): Promise<CheckOutcome[]> {
		return [
			await checkPreCommit(ctx.root),
			await checkLefthookBinary(ctx.root),
		];
	},
};
