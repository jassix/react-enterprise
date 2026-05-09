export interface FileSystem {
  read(absPath: string): Promise<string>;
  readJson<T>(absPath: string): Promise<T>;
  write(absPath: string, content: string): Promise<void>;
  exists(absPath: string): Promise<boolean>;
  removeDir(absPath: string): Promise<void>;
  copyDir(srcAbs: string, dstAbs: string): Promise<void>;
  glob(absDir: string, pattern: string): AsyncIterable<string>;
  readSymlink(absPath: string): Promise<string | null>;
}
