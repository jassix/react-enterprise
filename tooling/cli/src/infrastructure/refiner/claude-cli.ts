import { Err, Ok } from "@repo/std/result";
import type { Result } from "@repo/std/result";
import type { Refiner, RefinerError, RefinerOutput } from "~/application/ports/refiner";
import type { Shell } from "~/application/ports/shell";
import { buildPrompt } from "~/application/refinement/build-prompt";
import { parseRefinerOutput } from "~/application/refinement/parse-refiner-output";
import type { RefinementContext } from "~/domain/refinement-context";

export class ClaudeCliRefiner implements Refiner {
  constructor(private readonly shell: Shell) {}

  async refine(context: RefinementContext): Promise<Result<RefinerOutput, RefinerError>> {
    const claudeBin = await this.shell.which("claude");
    if (!claudeBin) {
      return Err({
        kind: "unavailable",
        reason: "`claude` CLI not on PATH. Install Claude Code: https://claude.com/claude-code",
      });
    }

    const { system, user } = buildPrompt(context);

    let result;
    try {
      result = await this.shell.runCapture({
        argv: ["claude", "-p", "--append-system-prompt", system],
        cwd: process.cwd(),
        stdin: user,
      });
    } catch (error) {
      return Err({ kind: "transport", cause: error });
    }

    if (result.exitCode !== 0) {
      const detail = result.stderr.trim().length > 0 ? result.stderr : result.stdout;
      return Err({
        kind: "transport",
        cause: `claude exited with code ${result.exitCode}: ${detail.slice(0, 1000)}`,
      });
    }

    const parsed = parseRefinerOutput(result.stdout);
    if (parsed.isErr()) {
      return Err({ kind: "invalid-output", messages: parsed.unwrapErr().messages });
    }
    return Ok(parsed.unwrap());
  }
}
