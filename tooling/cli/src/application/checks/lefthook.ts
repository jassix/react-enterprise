import type { CheckContext, CheckRunner } from "~/application/checks/context";
import { fail, ok, warn } from "~/domain/doctor/check";
import type { CheckOutcome } from "~/domain/doctor/check";
import { join } from "~/domain/path";

async function checkPreCommit(ctx: CheckContext): Promise<CheckOutcome> {
  const path = join(ctx.root, ".git", "hooks", "pre-commit");
  if (!(await ctx.fs.exists(path))) {
    return fail(
      "pre-commit",
      ".git/hooks/pre-commit not installed",
      "run `bun x lefthook install`",
    );
  }
  const body = await ctx.fs.read(path);
  if (!body.includes("lefthook")) {
    return warn(
      "pre-commit",
      "pre-commit hook exists but does not reference lefthook",
      "run `bun x lefthook install` to install managed hooks",
    );
  }
  return ok("pre-commit", "lefthook pre-commit installed");
}

async function checkLefthookBinary(ctx: CheckContext): Promise<CheckOutcome> {
  if (await ctx.shell.which("lefthook")) {
    return ok("lefthook binary", "on PATH");
  }
  if (await ctx.fs.exists(join(ctx.root, "node_modules", ".bin", "lefthook"))) {
    return ok("lefthook binary", "node_modules/.bin/lefthook");
  }
  return warn(
    "lefthook binary",
    "not found on PATH or in node_modules/.bin",
    "add lefthook as a devDependency or install globally",
  );
}

export const lefthookCheck: CheckRunner = {
  id: "lefthook",
  section: "lefthook",
  async run(ctx: CheckContext): Promise<CheckOutcome[]> {
    return [await checkPreCommit(ctx), await checkLefthookBinary(ctx)];
  },
};
