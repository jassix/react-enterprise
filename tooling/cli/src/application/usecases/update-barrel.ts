import { Err, Ok } from "@repo/std/result";
import type { Result } from "@repo/std/result";
import type { FileSystem } from "~/application/ports/file-system";

export interface UpdateBarrelInput {
  readonly barrelPath: string;
  readonly componentName: string;
  readonly importPath: string;
  readonly hasTypeExport: boolean;
}

export type UpdateBarrelError = { readonly kind: "io"; readonly cause: unknown };

export interface UpdateBarrelOutcome {
  readonly inserted: boolean;
}

export async function updateBarrel(
  fs: FileSystem,
  input: UpdateBarrelInput,
): Promise<Result<UpdateBarrelOutcome, UpdateBarrelError>> {
  let existing = "";
  try {
    if (await fs.exists(input.barrelPath)) {
      existing = await fs.read(input.barrelPath);
    }
  } catch (error) {
    return Err({ kind: "io", cause: error });
  }

  const next = insertNamedExport(existing, {
    componentName: input.componentName,
    importPath: input.importPath,
    hasTypeExport: input.hasTypeExport,
  });

  if (next === existing) return Ok({ inserted: false });

  try {
    await fs.write(input.barrelPath, next);
  } catch (error) {
    return Err({ kind: "io", cause: error });
  }
  return Ok({ inserted: true });
}

export interface AppendRecipeExportInput {
  readonly indexPath: string;
  readonly recipeName: string;
}

export async function appendRecipeExport(
  fs: FileSystem,
  input: AppendRecipeExportInput,
): Promise<Result<UpdateBarrelOutcome, UpdateBarrelError>> {
  let existing = "";
  try {
    if (await fs.exists(input.indexPath)) {
      existing = await fs.read(input.indexPath);
    }
  } catch (error) {
    return Err({ kind: "io", cause: error });
  }

  const next = insertWildcardExport(existing, input.recipeName);
  if (next === existing) return Ok({ inserted: false });

  try {
    await fs.write(input.indexPath, next);
  } catch (error) {
    return Err({ kind: "io", cause: error });
  }
  return Ok({ inserted: true });
}

interface NamedExport {
  readonly componentName: string;
  readonly importPath: string;
  readonly hasTypeExport: boolean;
}

interface ParsedExport {
  readonly componentName: string;
  readonly importPath: string;
  readonly value: string;
  readonly type: string | null;
}

const NAMED_EXPORT_RE =
  /^export\s+\{\s*([A-Za-z_][A-Za-z0-9_]*)\s*\}\s+from\s+["']([^"']+)["'];?\s*$/;
const TYPE_EXPORT_RE =
  /^export\s+type\s+\{\s*([A-Za-z_][A-Za-z0-9_]*)\s*\}\s+from\s+["']([^"']+)["'];?\s*$/;

export function insertNamedExport(content: string, entry: NamedExport): string {
  const lines = content.length === 0 ? [] : content.split(/\r?\n/);
  const parsed = parseNamedExports(lines);

  const already = parsed.find(
    (p) =>
      p.componentName === entry.componentName &&
      p.importPath === entry.importPath &&
      (entry.hasTypeExport ? p.type === `${entry.componentName}Props` : true),
  );
  if (already) return content;

  const filtered = parsed.filter((p) => p.componentName !== entry.componentName);

  filtered.push({
    componentName: entry.componentName,
    importPath: entry.importPath,
    value: `export { ${entry.componentName} } from "${entry.importPath}";`,
    type: entry.hasTypeExport ? `${entry.componentName}Props` : null,
  });

  filtered.sort((a, b) => a.componentName.localeCompare(b.componentName));

  const rendered: string[] = [];
  for (const p of filtered) {
    rendered.push(p.value);
    if (p.type) {
      rendered.push(`export type { ${p.type} } from "${p.importPath}";`);
    }
  }

  const preamble = collectPreamble(lines);
  const body = rendered.join("\n");
  const out = preamble.length > 0 ? `${preamble.join("\n")}\n\n${body}\n` : `${body}\n`;
  return out;
}

const WILDCARD_RE = /^export\s+\*\s+from\s+["']([^"']+)["'];?\s*$/;

export function insertWildcardExport(content: string, recipeName: string): string {
  const importPath = `./${recipeName}/${recipeName}.recipe`;
  const expected = `export * from "${importPath}";`;
  const lines = content.length === 0 ? [] : content.split(/\r?\n/);

  const existing: { importPath: string; line: string }[] = [];
  const preamble: string[] = [];
  let bodyStarted = false;

  for (const raw of lines) {
    const trimmed = raw.trim();
    if (trimmed.length === 0) continue;
    const m = trimmed.match(WILDCARD_RE);
    if (m && m[1]) {
      bodyStarted = true;
      existing.push({ importPath: m[1], line: trimmed });
    } else if (!bodyStarted) {
      preamble.push(raw);
    }
  }

  if (existing.some((e) => e.importPath === importPath)) return content;

  existing.push({ importPath, line: expected });
  existing.sort((a, b) => a.importPath.localeCompare(b.importPath));

  const body = existing.map((e) => e.line).join("\n");
  return preamble.length > 0 ? `${preamble.join("\n")}\n\n${body}\n` : `${body}\n`;
}

function parseNamedExports(lines: readonly string[]): ParsedExport[] {
  const valueByKey = new Map<
    string,
    { componentName: string; importPath: string; value: string }
  >();
  const typeByKey = new Map<string, string>();

  for (const raw of lines) {
    const trimmed = raw.trim();
    if (trimmed.length === 0) continue;
    const named = trimmed.match(NAMED_EXPORT_RE);
    if (named && named[1] && named[2]) {
      const key = `${named[1]}::${named[2]}`;
      valueByKey.set(key, {
        componentName: named[1],
        importPath: named[2],
        value: trimmed,
      });
      continue;
    }
    const typed = trimmed.match(TYPE_EXPORT_RE);
    if (typed && typed[1] && typed[2]) {
      const componentName = typed[1].replace(/Props$/, "");
      const key = `${componentName}::${typed[2]}`;
      typeByKey.set(key, typed[1]);
    }
  }

  const out: ParsedExport[] = [];
  for (const [key, val] of valueByKey) {
    out.push({
      componentName: val.componentName,
      importPath: val.importPath,
      value: val.value,
      type: typeByKey.get(key) ?? null,
    });
  }
  return out;
}

function collectPreamble(lines: readonly string[]): readonly string[] {
  const out: string[] = [];
  for (const raw of lines) {
    const trimmed = raw.trim();
    if (trimmed.length === 0) continue;
    if (
      NAMED_EXPORT_RE.test(trimmed) ||
      TYPE_EXPORT_RE.test(trimmed) ||
      WILDCARD_RE.test(trimmed)
    ) {
      continue;
    }
    out.push(raw);
  }
  return out;
}
