import type { Shell, ShellCommand, ShellResult } from "~/application/ports/shell";

export class BunShell implements Shell {
  async run(cmd: ShellCommand): Promise<ShellResult> {
    const proc = Bun.spawn({
      cmd: [...cmd.argv],
      cwd: cmd.cwd,
      stdout: "ignore",
      stderr: "ignore",
    });
    const exitCode = await proc.exited;
    return { exitCode };
  }

  async which(bin: string): Promise<string | undefined> {
    const out = Bun.which(bin);
    return out ?? undefined;
  }

  runtimeVersion(): string {
    return Bun.version;
  }
}
