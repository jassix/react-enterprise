import { join } from "~/util/path";
import {
	type Check,
	type CheckContext,
	type CheckOutcome,
	fail,
	ok,
} from "~/core/check";

interface RootPkg {
	engines?: { bun?: string };
}

const SEMVER_RE = /^(\d+)\.(\d+)\.(\d+)/;

function parseSemver(v: string): [number, number, number] | null {
	const m = v.match(SEMVER_RE);
	if (!m) return null;
	return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function satisfiesMinimum(current: string, constraint: string): boolean {
	const stripped = constraint.replace(/^[>=~^ ]+/, "");
	const cur = parseSemver(current);
	const min = parseSemver(stripped);
	if (!cur || !min) return true;
	for (let i = 0; i < 3; i++) {
		const c = cur[i] as number;
		const m = min[i] as number;
		if (c > m) return true;
		if (c < m) return false;
	}
	return true;
}

async function readEnginesBun(root: string): Promise<string | undefined> {
	const pkg = (await Bun.file(join(root, "package.json")).json()) as RootPkg;
	return pkg.engines?.bun;
}

export const bunCheck: Check = {
	id: "bun",
	section: "runtime",
	async run(ctx: CheckContext): Promise<CheckOutcome[]> {
		const required = await readEnginesBun(ctx.root);
		const current = Bun.version;

		if (!required) {
			return [ok("bun", `bun ${current} (no engines.bun constraint)`)];
		}
		if (!satisfiesMinimum(current, required)) {
			return [
				fail(
					"bun",
					`bun ${current} does not satisfy engines.bun ${required}`,
					"upgrade bun via https://bun.sh/docs/installation",
				),
			];
		}
		return [ok("bun", `bun ${current} (engines.bun: ${required})`)];
	},
};
