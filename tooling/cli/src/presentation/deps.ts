import type { ComponentRegistry } from "~/application/ports/component-registry";
import type { DesignSystemIntrospector } from "~/application/ports/design-system-introspector";
import type { Fetcher } from "~/application/ports/fetcher";
import type { FileSystem } from "~/application/ports/file-system";
import type { MonorepoLocator } from "~/application/ports/monorepo-locator";
import type { Output } from "~/application/ports/output";
import type { Prompter } from "~/application/ports/prompter";
import type { Refiner } from "~/application/ports/refiner";
import type { Shell } from "~/application/ports/shell";
import type { TaskRunner } from "~/application/ports/task-runner";
import type { TemplateLoader } from "~/application/ports/template-loader";

export interface CommandDeps {
  readonly fs: FileSystem;
  readonly shell: Shell;
  readonly fetcher: Fetcher;
  readonly prompter: Prompter;
  readonly taskRunner: TaskRunner;
  readonly locator: MonorepoLocator;
  readonly templateLoader: TemplateLoader;
  readonly output: Output;
  readonly registry: ComponentRegistry;
  readonly refiner: Refiner;
  readonly introspector: DesignSystemIntrospector;
}
