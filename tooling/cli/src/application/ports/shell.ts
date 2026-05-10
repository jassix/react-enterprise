export interface ShellCommand {
  readonly argv: readonly string[];
  readonly cwd: string;
  readonly stdin?: string;
}

export interface ShellResult {
  readonly exitCode: number;
}

export interface ShellCaptureResult {
  readonly exitCode: number;
  readonly stdout: string;
  readonly stderr: string;
}

export interface Shell {
  run(cmd: ShellCommand): Promise<ShellResult>;
  // Like `run`, but captures stdout and stderr instead of inheriting/ignoring.
  runCapture(cmd: ShellCommand): Promise<ShellCaptureResult>;
  which(bin: string): Promise<string | undefined>;
  runtimeVersion(): string;
}
