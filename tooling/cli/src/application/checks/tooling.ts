import type { CheckContext, CheckRunner } from "~/application/checks/context";
import { type CheckOutcome, fail, ok, warn } from "~/domain/doctor/check";
import { join } from "~/domain/path";

const REQUIRED_BINS = ["oxlint", "oxfmt", "turbo"] as const;

async function binOutcome(ctx: CheckContext, bin: string): Promise<CheckOutcome> {
  if (await ctx.fs.exists(join(ctx.root, "node_modules", ".bin", bin))) {
    return ok(bin, `node_modules/.bin/${bin}`);
  }
  if (await ctx.shell.which(bin)) return ok(bin, "on PATH");
  return fail(bin, "not found in node_modules/.bin or on PATH", "run `bun install` at repo root");
}

async function pandaOutcome(ctx: CheckContext): Promise<CheckOutcome> {
  const marker = join(ctx.root, "packages", "ui", "foundation", "styled-system", "package.json");
  if (await ctx.fs.exists(marker)) {
    return ok("panda codegen", "styled-system generated");
  }
  return warn(
    "panda codegen",
    "styled-system output missing at packages/ui/foundation/styled-system",
    "run `bun --filter @lume/foundation panda codegen`",
  );
}

export const toolingCheck: CheckRunner = {
  id: "tooling",
  section: "tooling",
  async run(ctx: CheckContext): Promise<CheckOutcome[]> {
    const outcomes: CheckOutcome[] = [];
    for (const bin of REQUIRED_BINS) {
      outcomes.push(await binOutcome(ctx, bin));
    }
    outcomes.push(await pandaOutcome(ctx));
    return outcomes;
  },
};
