import type { FileSystem } from "~/application/ports/file-system";
import type { MonorepoLocator } from "~/application/ports/monorepo-locator";
import type { Shell } from "~/application/ports/shell";
import type { CheckOutcome, CheckSection } from "~/domain/doctor/check";

export interface CheckContext {
  readonly root: string;
  readonly fs: FileSystem;
  readonly shell: Shell;
  readonly locator: MonorepoLocator;
}

export interface CheckRunner {
  readonly id: string;
  readonly section: CheckSection;
  run(ctx: CheckContext): Promise<CheckOutcome[]>;
}
