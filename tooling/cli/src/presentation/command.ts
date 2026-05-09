export interface Command {
  readonly name: string;
  readonly summary: string;
  run(argv: readonly string[]): Promise<number>;
}
