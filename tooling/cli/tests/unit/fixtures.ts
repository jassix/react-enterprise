import { faker } from "@faker-js/faker";
import type { CheckContext } from "~/application/checks/context";
import { dirname, join } from "~/domain/path";
import { BunFetcher } from "~/infrastructure/fetcher/bun";
import { BunFileSystem } from "~/infrastructure/file-system/bun";
import { WalkMonorepoLocator } from "~/infrastructure/monorepo-locator/walk";
import { ProcessOutput } from "~/infrastructure/output/process";
import { ClackPrompter } from "~/infrastructure/prompter/clack";
import { BunShell } from "~/infrastructure/shell/bun";
import { ClackTaskRunner } from "~/infrastructure/task-runner/clack";
import { DiskTemplateLoader } from "~/infrastructure/template-loader/disk";
import type { CommandDeps } from "~/presentation/deps";

export async function makeTempRoot(): Promise<string> {
  const out = await Bun.$`mktemp -d`.quiet().text();
  const root = out.replace(/\n$/, "");
  const tagged = `${root}-repo-cli-${faker.string.alphanumeric(8)}`;
  await Bun.$`mv ${root} ${tagged}`.quiet();
  return tagged;
}

export async function makeScopedRoot(
  tracker: string[],
  engines?: { bun?: string },
): Promise<string> {
  const root = await makeTempRoot();
  tracker.push(root);
  await writeRootPackage(root, engines);
  return root;
}

export async function cleanupRoots(tracker: string[]): Promise<void> {
  while (tracker.length > 0) {
    const root = tracker.pop();
    if (!root) continue;
    await Bun.$`rm -rf ${root}`.quiet();
  }
}

async function ensureDir(absDir: string): Promise<void> {
  await Bun.$`mkdir -p ${absDir}`.quiet();
}

export async function writeJson(root: string, relPath: string, data: unknown): Promise<void> {
  const abs = join(root, relPath);
  await ensureDir(dirname(abs));
  await Bun.write(abs, JSON.stringify(data, null, 2));
}

export async function writeText(root: string, relPath: string, text: string): Promise<void> {
  const abs = join(root, relPath);
  await ensureDir(dirname(abs));
  await Bun.write(abs, text);
}

export async function makeDir(root: string, relPath: string): Promise<void> {
  await ensureDir(join(root, relPath));
}

export async function makeSymlink(root: string, relLink: string, target: string): Promise<void> {
  const linkAbs = join(root, relLink);
  await ensureDir(dirname(linkAbs));
  await Bun.$`ln -s ${target} ${linkAbs}`.quiet();
}

export async function writeRootPackage(root: string, engines?: { bun?: string }): Promise<void> {
  await writeJson(root, "package.json", {
    name: "test-root",
    private: true,
    workspaces: { packages: ["packages/*"] },
    engines,
  });
}

export interface McpServerSpec {
  command: string;
  args?: string[];
}

export interface McpConfigSpec {
  mcpServers: Record<string, McpServerSpec>;
}

export async function writeMcpConfig(
  root: string,
  relPath: string,
  config: McpConfigSpec,
): Promise<void> {
  await writeJson(root, relPath, config);
}

export function mcpConfigWith(serverNames: string[]): McpConfigSpec {
  return {
    mcpServers: Object.fromEntries(
      serverNames.map((name) => [name, { command: "ls", args: [name] }]),
    ),
  };
}

export interface SkillsLockSpec {
  version: 1;
  skills: Record<string, { source: string; sourceType: string; computedHash: string }>;
}

export function buildSkillsLock(skillNames: string[]): SkillsLockSpec {
  return {
    version: 1,
    skills: Object.fromEntries(
      skillNames.map((name) => [
        name,
        {
          source: `${faker.internet.username()}/${name}`,
          sourceType: "github",
          computedHash: faker.string.hexadecimal({ length: 64, casing: "lower" }).slice(2),
        },
      ]),
    ),
  };
}

export async function materializeSkill(root: string, name: string): Promise<void> {
  await writeText(root, `.agents/skills/${name}/SKILL.md`, `# ${name}\n`);
}

export async function installSkillSymlink(root: string, name: string): Promise<void> {
  await makeSymlink(root, `.claude/skills/${name}`, `../../.agents/skills/${name}`);
}

export function makeCheckContext(root: string): CheckContext {
  const fs = new BunFileSystem();
  const shell = new BunShell();
  const locator = new WalkMonorepoLocator(fs);
  return { root, fs, shell, locator };
}

export function makeRealDeps(): CommandDeps {
  const fs = new BunFileSystem();
  const shell = new BunShell();
  const fetcher = new BunFetcher();
  const prompter = new ClackPrompter();
  const taskRunner = new ClackTaskRunner();
  const locator = new WalkMonorepoLocator(fs);
  const templateLoader = new DiskTemplateLoader(fs);
  const output = new ProcessOutput();
  return { fs, shell, fetcher, prompter, taskRunner, locator, templateLoader, output };
}
