import type { FileSystem } from "~/application/ports/file-system";
import type { MonorepoLocator } from "~/application/ports/monorepo-locator";
import { dirname, join } from "~/domain/path";

export class WalkMonorepoLocator implements MonorepoLocator {
  constructor(private readonly fs: FileSystem) {}

  async locate(start: string): Promise<string> {
    let dir = start;
    while (true) {
      const pkgPath = join(dir, "package.json");
      if (await this.fs.exists(pkgPath)) {
        const pkg = JSON.parse(await this.fs.read(pkgPath)) as { workspaces?: unknown };
        if (pkg.workspaces) return dir;
      }
      const parent = dirname(dir);
      if (parent === dir) {
        throw new Error(
          `could not find monorepo root (no package.json with "workspaces") from ${start}`,
        );
      }
      dir = parent;
    }
  }
}
