import { BunFetcher } from "~/infrastructure/fetcher/bun";
import { BunFileSystem } from "~/infrastructure/file-system/bun";
import { DiskIntrospector } from "~/infrastructure/introspector/disk";
import { WalkMonorepoLocator } from "~/infrastructure/monorepo-locator/walk";
import { ProcessOutput } from "~/infrastructure/output/process";
import { ClackPrompter } from "~/infrastructure/prompter/clack";
import { ClaudeCliRefiner } from "~/infrastructure/refiner/claude-cli";
import { ShadcnHttpRegistry } from "~/infrastructure/registry/shadcn-http";
import { BunShell } from "~/infrastructure/shell/bun";
import { ClackTaskRunner } from "~/infrastructure/task-runner/clack";
import { DiskTemplateLoader } from "~/infrastructure/template-loader/disk";
import type { Command } from "~/presentation/command";
import { createDefaultCommands } from "~/presentation/commands";
import type { CommandDeps } from "~/presentation/deps";

export function makeDeps(): CommandDeps {
  const fs = new BunFileSystem();
  const shell = new BunShell();
  const fetcher = new BunFetcher();
  const prompter = new ClackPrompter();
  const taskRunner = new ClackTaskRunner();
  const locator = new WalkMonorepoLocator(fs);
  const templateLoader = new DiskTemplateLoader(fs);
  const output = new ProcessOutput();
  const registry = new ShadcnHttpRegistry(fetcher);
  const refiner = new ClaudeCliRefiner(shell);
  const introspector = new DiskIntrospector(fs);
  return {
    fs,
    shell,
    fetcher,
    prompter,
    taskRunner,
    locator,
    templateLoader,
    output,
    registry,
    refiner,
    introspector,
  };
}

export function composeCli(): readonly Command[] {
  return createDefaultCommands(makeDeps());
}
