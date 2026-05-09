export interface TaskSpec {
  readonly title: string;
  run(): Promise<string | void>;
}

export interface TaskRunner {
  runSequential(tasks: readonly TaskSpec[]): Promise<void>;
}
