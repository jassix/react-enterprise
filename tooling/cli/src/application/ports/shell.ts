export interface ShellCommand {
  readonly argv: readonly string[];
  readonly cwd: string;
}

export interface ShellResult {
  readonly exitCode: number;
}

export interface Shell {
  run(cmd: ShellCommand): Promise<ShellResult>;
  which(bin: string): Promise<string | undefined>;
  runtimeVersion(): string;
}
