import { Glob } from "bun";
import { access } from "node:fs/promises";
import type { FileSystem } from "~/application/ports/file-system";

export class BunFileSystem implements FileSystem {
  async read(absPath: string): Promise<string> {
    return Bun.file(absPath).text();
  }

  async readJson<T>(absPath: string): Promise<T> {
    return (await Bun.file(absPath).json()) as T;
  }

  async write(absPath: string, content: string): Promise<void> {
    await Bun.write(absPath, content);
  }

  async exists(absPath: string): Promise<boolean> {
    try {
      await access(absPath);
      return true;
    } catch {
      return false;
    }
  }

  async removeDir(absPath: string): Promise<void> {
    await Bun.$`rm -rf ${absPath}`.quiet().nothrow();
  }

  async copyDir(srcAbs: string, dstAbs: string): Promise<void> {
    await Bun.$`mkdir -p ${dstAbs}`.quiet();
    await Bun.$`cp -R ${srcAbs} ${dstAbs}`.quiet();
  }

  glob(absDir: string, pattern: string): AsyncIterable<string> {
    const glob = new Glob(pattern);
    return glob.scan({ cwd: absDir, onlyFiles: true, dot: true });
  }

  async readSymlink(absPath: string): Promise<string | null> {
    try {
      const out = await Bun.$`readlink ${absPath}`.quiet().text();
      const trimmed = out.replace(/\n$/, "");
      return trimmed.length === 0 ? null : trimmed;
    } catch {
      return null;
    }
  }
}
