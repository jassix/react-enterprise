// Test fixture helpers for CLI checks.
//
// Provides:
//   - tmpdir-backed roots that never touch real repo state
//   - per-test cleanup via `makeScopedRoot`
//   - file / directory / symlink builders
//   - higher-level builders (writeMcpConfig, writeSkillsLock, materializeSkill)
//
// All helpers write only under a tmpdir returned by `makeTempRoot`. This
// module uses only Bun APIs (Bun.$, Bun.write) — no `node:*` imports.

import { faker } from "@faker-js/faker";
import { dirname, join } from "~/util/path";

export async function makeTempRoot(): Promise<string> {
	// `mktemp -d` is POSIX and honors $TMPDIR on macOS / Linux, which is
	// all we care about for this monorepo. The output is a newline-terminated
	// absolute path to a fresh unique directory.
	const out = await Bun.$`mktemp -d`.quiet().text();
	const root = out.replace(/\n$/, "");
	// Tag the dir with a faker suffix so concurrent tests produce readable
	// names if they ever leak. Rename via `mv` so we stay inside Bun APIs.
	const tagged = `${root}-repo-cli-${faker.string.alphanumeric(8)}`;
	await Bun.$`mv ${root} ${tagged}`.quiet();
	return tagged;
}

/**
 * Create a tmpdir root with a minimal root package.json already written, and
 * register it for cleanup via the supplied tracker. Intended for use from a
 * `beforeEach` + `afterEach` pair so every test is independent and self-cleaning.
 */
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

export async function writeJson(
	root: string,
	relPath: string,
	data: unknown,
): Promise<void> {
	const abs = join(root, relPath);
	await ensureDir(dirname(abs));
	await Bun.write(abs, JSON.stringify(data, null, 2));
}

export async function writeText(
	root: string,
	relPath: string,
	text: string,
): Promise<void> {
	const abs = join(root, relPath);
	await ensureDir(dirname(abs));
	await Bun.write(abs, text);
}

export async function makeDir(root: string, relPath: string): Promise<void> {
	await ensureDir(join(root, relPath));
}

export async function makeSymlink(
	root: string,
	relLink: string,
	target: string,
): Promise<void> {
	const linkAbs = join(root, relLink);
	await ensureDir(dirname(linkAbs));
	await Bun.$`ln -s ${target} ${linkAbs}`.quiet();
}

export async function writeRootPackage(
	root: string,
	engines?: { bun?: string },
): Promise<void> {
	await writeJson(root, "package.json", {
		name: "test-root",
		private: true,
		workspaces: { packages: ["packages/*"] },
		engines,
	});
}

// ---------- higher level builders ----------

export interface McpServerSpec {
	command: string;
	args?: string[];
}

export interface McpConfigSpec {
	mcpServers: Record<string, McpServerSpec>;
}

/**
 * Write an MCP config JSON file at a tmpdir-relative path.
 */
export async function writeMcpConfig(
	root: string,
	relPath: string,
	config: McpConfigSpec,
): Promise<void> {
	await writeJson(root, relPath, config);
}

/**
 * Build an MCP config that uses `command: "ls"` for every server so that
 * `Bun.which(cmd)` resolves on any Unix host (the check exercises PATH
 * resolution, which we do not want to fail under test).
 */
export function mcpConfigWith(serverNames: string[]): McpConfigSpec {
	return {
		mcpServers: Object.fromEntries(
			serverNames.map((name) => [name, { command: "ls", args: [name] }]),
		),
	};
}

export interface SkillsLockSpec {
	version: 1;
	skills: Record<
		string,
		{ source: string; sourceType: string; computedHash: string }
	>;
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
					computedHash: faker.string.hexadecimal({ length: 64, casing: "lower" })
						.slice(2),
				},
			]),
		),
	};
}

export async function materializeSkill(
	root: string,
	name: string,
): Promise<void> {
	await writeText(root, `.agents/skills/${name}/SKILL.md`, `# ${name}\n`);
}

export async function installSkillSymlink(
	root: string,
	name: string,
): Promise<void> {
	await makeSymlink(root, `.claude/skills/${name}`, `../../.agents/skills/${name}`);
}
