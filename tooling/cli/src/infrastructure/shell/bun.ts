import type {
  Shell,
  ShellCaptureResult,
  ShellCommand,
  ShellResult,
} from "~/application/ports/shell";

export class BunShell implements Shell {
  async run(cmd: ShellCommand): Promise<ShellResult> {
    const proc = Bun.spawn({
      cmd: [...cmd.argv],
      cwd: cmd.cwd,
      stdin: cmd.stdin !== undefined ? new TextEncoder().encode(cmd.stdin) : undefined,
      stdout: "ignore",
      stderr: "ignore",
    });
    const exitCode = await proc.exited;
    return { exitCode };
  }

  async runCapture(cmd: ShellCommand): Promise<ShellCaptureResult> {
    const proc = Bun.spawn({
      cmd: [...cmd.argv],
      cwd: cmd.cwd,
      stdin: cmd.stdin !== undefined ? new TextEncoder().encode(cmd.stdin) : undefined,
      stdout: "pipe",
      stderr: "pipe",
    });
    const [stdout, stderr, exitCode] = await Promise.all([
      new Response(proc.stdout).text(),
      new Response(proc.stderr).text(),
      proc.exited,
    ]);
    return { exitCode, stdout, stderr };
  }

  async which(bin: string): Promise<string | undefined> {
    const out = Bun.which(bin, { PATH: process.env.PATH ?? "" });
    return out ?? undefined;
  }

  runtimeVersion(): string {
    return Bun.version;
  }
}
