import { join } from "~/util/path";
import {
	type Check,
	type CheckContext,
	type CheckOutcome,
	fail,
	ok,
	warn,
} from "~/core/check";

const REQUIRED_BINS = ["oxlint", "oxfmt", "turbo"] as const;

async function binOutcome(root: string, bin: string): Promise<CheckOutcome> {
	const local = Bun.file(join(root, "node_modules", ".bin", bin));
	if (await local.exists()) return ok(bin, `node_modules/.bin/${bin}`);
	if (Bun.which(bin)) return ok(bin, "on PATH");
	return fail(
		bin,
		"not found in node_modules/.bin or on PATH",
		"run `bun install` at repo root",
	);
}

async function pandaOutcome(root: string): Promise<CheckOutcome> {
	const marker = Bun.file(
		join(root, "packages", "ui", "foundation", "styled-system", "package.json"),
	);
	if (await marker.exists()) {
		return ok("panda codegen", "styled-system generated");
	}
	return warn(
		"panda codegen",
		"styled-system output missing at packages/ui/foundation/styled-system",
		"run `bun --filter @lume/foundation panda codegen`",
	);
}

export const toolingCheck: Check = {
	id: "tooling",
	section: "tooling",
	async run(ctx: CheckContext): Promise<CheckOutcome[]> {
		const outcomes: CheckOutcome[] = [];
		for (const bin of REQUIRED_BINS) {
			outcomes.push(await binOutcome(ctx.root, bin));
		}
		outcomes.push(await pandaOutcome(ctx.root));
		return outcomes;
	},
};
