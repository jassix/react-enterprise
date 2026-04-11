import { dirname, join } from "~/util/path";

export async function findMonorepoRoot(startDir: string): Promise<string> {
	let dir = startDir;
	while (true) {
		const pkgPath = join(dir, "package.json");
		const file = Bun.file(pkgPath);
		if (await file.exists()) {
			const pkg = (await file.json()) as { workspaces?: unknown };
			if (pkg.workspaces) return dir;
		}
		const parent = dirname(dir);
		if (parent === dir) {
			throw new Error(
				`could not find monorepo root (no package.json with "workspaces") from ${startDir}`,
			);
		}
		dir = parent;
	}
}
