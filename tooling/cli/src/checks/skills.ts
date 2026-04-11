import * as v from "@repo/std/schema";
import { join, resolve } from "~/util/path";
import {
	type Check,
	type CheckContext,
	type CheckOutcome,
	fail,
	ok,
	warn,
} from "~/core/check";

const SkillEntrySchema = v.object({
	source: v.string(),
	sourceType: v.string(),
	computedHash: v.string(),
});

const SkillsLockSchema = v.object({
	version: v.literal(1),
	skills: v.record(v.string(), SkillEntrySchema),
});

type SkillsLock = v.InferOutput<typeof SkillsLockSchema>;

// Bun has no native `readlink` equivalent, so shell out to POSIX `readlink`
// which returns the raw target (not followed) and exits non-zero if the path
// is missing or not a symlink. `Bun.$` is the Bun-native way to invoke it.
async function readSymlinkTarget(linkPath: string): Promise<string | null> {
	try {
		const out = await Bun.$`readlink ${linkPath}`.quiet().text();
		const trimmed = out.replace(/\n$/, "");
		return trimmed.length === 0 ? null : trimmed;
	} catch {
		return null;
	}
}

function cliOutcome(): CheckOutcome {
	const bin = Bun.which("skills");
	if (bin) return ok("skills CLI", `found at ${bin}`);
	return fail(
		"skills CLI",
		"not found on PATH",
		"install from https://skills.sh",
	);
}

type LockState =
	| { kind: "missing" }
	| { kind: "invalid"; detail: string }
	| { kind: "ok"; lock: SkillsLock };

async function loadLock(root: string): Promise<LockState> {
	const file = Bun.file(join(root, "skills-lock.json"));
	if (!(await file.exists())) return { kind: "missing" };
	const parsed = v.safeParse(SkillsLockSchema, await file.json());
	if (!parsed.success) {
		return {
			kind: "invalid",
			detail: parsed.issues.map((i) => i.message).join("; "),
		};
	}
	return { kind: "ok", lock: parsed.output };
}

function lockOutcome(state: LockState): CheckOutcome {
	if (state.kind === "missing") {
		return fail(
			"skills-lock.json",
			"missing at repo root",
			"run `skills sync` or commit a skills-lock.json",
		);
	}
	if (state.kind === "invalid") {
		return fail(
			"skills-lock.json",
			`invalid schema: ${state.detail}`,
			"regenerate via `skills sync`",
		);
	}
	return ok(
		"skills-lock.json",
		`valid (${Object.keys(state.lock.skills).length} skills)`,
	);
}

async function materializationOutcome(
	root: string,
	skillNames: readonly string[],
): Promise<CheckOutcome> {
	const agentsDir = join(root, ".agents", "skills");
	const missing: string[] = [];
	for (const name of skillNames) {
		const upper = Bun.file(join(agentsDir, name, "SKILL.md"));
		if (await upper.exists()) continue;
		const lower = Bun.file(join(agentsDir, name, "skill.md"));
		if (!(await lower.exists())) missing.push(name);
	}
	const total = skillNames.length;
	if (missing.length === 0) {
		return ok("downloaded", `${total}/${total} skills present in .agents/skills/`);
	}
	return warn(
		"downloaded",
		`${missing.length}/${total} skills missing: ${missing.slice(0, 5).join(", ")}${missing.length > 5 ? "…" : ""}`,
		"run `skills sync` to materialize missing skills",
	);
}

async function symlinksOutcome(
	root: string,
	skillNames: readonly string[],
): Promise<CheckOutcome> {
	const claudeSkillsDir = join(root, ".claude", "skills");
	const agentsDir = join(root, ".agents", "skills");
	const broken: string[] = [];
	for (const name of skillNames) {
		const linkPath = join(claudeSkillsDir, name);
		const target = await readSymlinkTarget(linkPath);
		if (target === null) {
			broken.push(name);
			continue;
		}
		const resolved = resolve(claudeSkillsDir, target);
		if (!resolved.startsWith(agentsDir)) broken.push(`${name} -> ${target}`);
	}
	const total = skillNames.length;
	if (broken.length === 0) {
		return ok("symlinks", `${total}/${total} symlinks resolved in .claude/skills/`);
	}
	return warn(
		"symlinks",
		`${broken.length} broken symlink(s): ${broken.slice(0, 5).join(", ")}${broken.length > 5 ? "…" : ""}`,
		"re-run `skills sync` to recreate symlinks",
	);
}

export const skillsCheck: Check = {
	id: "skills",
	section: "skills.sh",
	async run(ctx: CheckContext): Promise<CheckOutcome[]> {
		const outcomes: CheckOutcome[] = [cliOutcome()];

		const lockState = await loadLock(ctx.root);
		outcomes.push(lockOutcome(lockState));
		if (lockState.kind !== "ok") return outcomes;

		const names = Object.keys(lockState.lock.skills);
		outcomes.push(await materializationOutcome(ctx.root, names));
		outcomes.push(await symlinksOutcome(ctx.root, names));
		return outcomes;
	},
};
