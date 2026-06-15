import * as v from "@repo/std/schema";
import type { CheckContext, CheckRunner } from "~/application/checks/context";
import { fail, ok, warn } from "~/domain/doctor/check";
import type { CheckOutcome } from "~/domain/doctor/check";
import { join, resolve } from "~/domain/path";

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

async function cliOutcome(ctx: CheckContext): Promise<CheckOutcome> {
  const bin = await ctx.shell.which("skills");
  if (bin) return ok("skills CLI", `found at ${bin}`);
  return fail("skills CLI", "not found on PATH", "install from https://skills.sh");
}

type LockState =
  | { kind: "missing" }
  | { kind: "invalid"; detail: string }
  | { kind: "ok"; lock: SkillsLock };

async function loadLock(ctx: CheckContext): Promise<LockState> {
  const lockPath = join(ctx.root, "skills-lock.json");
  if (!(await ctx.fs.exists(lockPath))) return { kind: "missing" };
  const parsed = v.safeParse(SkillsLockSchema, await ctx.fs.readJson<unknown>(lockPath));
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
  return ok("skills-lock.json", `valid (${Object.keys(state.lock.skills).length} skills)`);
}

async function materializationOutcome(
  ctx: CheckContext,
  skillNames: readonly string[],
): Promise<CheckOutcome> {
  const agentsDir = join(ctx.root, ".agents", "skills");
  const missing: string[] = [];
  for (const name of skillNames) {
    if (await ctx.fs.exists(join(agentsDir, name, "SKILL.md"))) continue;
    if (!(await ctx.fs.exists(join(agentsDir, name, "skill.md")))) missing.push(name);
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
  ctx: CheckContext,
  skillNames: readonly string[],
): Promise<CheckOutcome> {
  const claudeSkillsDir = join(ctx.root, ".claude", "skills");
  const agentsDir = join(ctx.root, ".agents", "skills");
  const broken: string[] = [];
  for (const name of skillNames) {
    const linkPath = join(claudeSkillsDir, name);
    const target = await ctx.fs.readSymlink(linkPath);
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

export const skillsCheck: CheckRunner = {
  id: "skills",
  section: "skills.sh",
  async run(ctx: CheckContext): Promise<CheckOutcome[]> {
    const outcomes: CheckOutcome[] = [await cliOutcome(ctx)];

    const lockState = await loadLock(ctx);
    outcomes.push(lockOutcome(lockState));
    if (lockState.kind !== "ok") return outcomes;

    const names = Object.keys(lockState.lock.skills);
    outcomes.push(await materializationOutcome(ctx, names));
    outcomes.push(await symlinksOutcome(ctx, names));
    return outcomes;
  },
};
