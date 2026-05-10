import type {
  DesignSystemIntrospector,
  DesignSystemSnapshot,
} from "~/application/ports/design-system-introspector";
import type { FileSystem } from "~/application/ports/file-system";
import { join } from "~/domain/path";
import type {
  RecipeDescriptor,
  SemanticTokenGroup,
} from "~/domain/refinement-context";

export class DiskIntrospector implements DesignSystemIntrospector {
  constructor(private readonly fs: FileSystem) {}

  async snapshot(rootDir: string): Promise<DesignSystemSnapshot> {
    const foundationRoot = join(rootDir, "packages/ui/foundation");
    const primitivesRoot = join(rootDir, "packages/ui/primitives");
    const blocksRoot = join(rootDir, "packages/ui/blocks");

    const [recipes, semanticTokens, categories, iconNames] = await Promise.all([
      this.collectRecipes(foundationRoot),
      this.collectSemanticTokens(foundationRoot),
      this.collectCategories(primitivesRoot),
      this.collectIconNames(primitivesRoot),
    ]);

    return {
      recipes,
      semanticTokens,
      categories,
      iconNames,
      exemplarPath: join(primitivesRoot, "src/ui/buttons/button/button.tsx"),
      primitivesRoot,
      blocksRoot,
      foundationRoot,
    };
  }

  private async collectRecipes(foundationRoot: string): Promise<readonly RecipeDescriptor[]> {
    const recipesDir = join(foundationRoot, "src/recipes");
    if (!(await this.fs.exists(recipesDir))) return [];

    const out: RecipeDescriptor[] = [];
    const seen = new Set<string>();

    for await (const rel of this.fs.glob(recipesDir, "**/*.recipe.ts")) {
      if (seen.has(rel)) continue;
      seen.add(rel);

      const abs = join(recipesDir, rel);
      let content: string;
      try {
        content = await this.fs.read(abs);
      } catch {
        continue;
      }

      const desc = parseRecipeFile(rel, content);
      if (desc) out.push(desc);
    }

    out.sort((a, b) => a.name.localeCompare(b.name));
    return out;
  }

  private async collectSemanticTokens(
    foundationRoot: string,
  ): Promise<readonly SemanticTokenGroup[]> {
    const colorsDir = join(foundationRoot, "src/semantic/colors");
    if (!(await this.fs.exists(colorsDir))) return [];

    const out: SemanticTokenGroup[] = [];
    for await (const rel of this.fs.glob(colorsDir, "*.ts")) {
      if (rel === "index.ts") continue;
      const group = rel.replace(/\.ts$/, "");
      let content: string;
      try {
        content = await this.fs.read(join(colorsDir, rel));
      } catch {
        continue;
      }
      const tokens = extractTopLevelKeys(content);
      if (tokens.length > 0) out.push({ group, tokens });
    }

    out.sort((a, b) => a.group.localeCompare(b.group));
    return out;
  }

  private async collectCategories(primitivesRoot: string): Promise<readonly string[]> {
    const uiDir = join(primitivesRoot, "src/ui");
    if (!(await this.fs.exists(uiDir))) return [];

    const dirs = new Set<string>();
    for await (const rel of this.fs.glob(uiDir, "*/**/*.tsx")) {
      const top = rel.split("/")[0];
      if (top) dirs.add(top);
    }
    return [...dirs].sort();
  }

  private async collectIconNames(primitivesRoot: string): Promise<readonly string[]> {
    const candidates = [
      "src/ui/data-display/icon/icon.tsx",
      "src/ui/data-display/icon/index.ts",
    ];
    for (const rel of candidates) {
      const abs = join(primitivesRoot, rel);
      if (!(await this.fs.exists(abs))) continue;
      let content: string;
      try {
        content = await this.fs.read(abs);
      } catch {
        continue;
      }
      const names = extractIconNames(content);
      if (names.length > 0) return names;
    }
    return [];
  }
}

const CLASS_NAME_RE = /className:\s*"([^"]+)"/;
const SLOTS_RE = /slots:\s*\[([^\]]+)\]/;
const VARIANTS_RE = /variants:\s*\{([\s\S]*)/;

export function parseRecipeFile(rel: string, content: string): RecipeDescriptor | null {
  const className = content.match(CLASS_NAME_RE)?.[1];
  if (!className) return null;

  const slotsMatch = content.match(SLOTS_RE);
  const slots = slotsMatch
    ? slotsMatch[1]
        ?.split(",")
        .map((s) => s.replace(/['"]/g, "").trim())
        .filter((s) => s.length > 0)
    : undefined;

  const variantsBody = content.match(VARIANTS_RE)?.[1];
  const variantKeys = variantsBody ? extractVariantKeys(variantsBody) : [];

  const baseName = rel.split("/").pop()?.replace(/\.recipe\.ts$/, "") ?? className;

  return {
    name: baseName,
    className,
    ...(slots && slots.length > 0 ? { slots } : {}),
    variantKeys,
  };
}

function extractVariantKeys(body: string): readonly string[] {
  const keys: string[] = [];
  let depth = 0;
  let i = 0;
  let lineStart = true;
  while (i < body.length) {
    const ch = body[i];
    if (ch === "{") {
      depth++;
      i++;
      lineStart = false;
      continue;
    }
    if (ch === "}") {
      if (depth === 0) break;
      depth--;
      i++;
      lineStart = depth === 0;
      continue;
    }
    if (depth === 0 && lineStart && ch && /[A-Za-z_]/.test(ch)) {
      const slice = body.slice(i);
      const m = slice.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*:/);
      if (m && m[1]) {
        keys.push(m[1]);
        i += m[0].length;
        lineStart = false;
        continue;
      }
    }
    if (ch === "\n" || ch === ",") {
      lineStart = true;
    } else if (ch && !/\s/.test(ch)) {
      lineStart = false;
    }
    i++;
  }
  return keys;
}

function extractTopLevelKeys(content: string): readonly string[] {
  const exportMatch = content.match(/export\s+const\s+\w+\s*=\s*\{([\s\S]*)\}\s*as\s+const/);
  const body = exportMatch?.[1];
  if (!body) return [];

  const keys: string[] = [];
  let depth = 0;
  let i = 0;
  let lineStart = true;
  while (i < body.length) {
    const ch = body[i];
    if (ch === "{") {
      depth++;
      i++;
      lineStart = false;
      continue;
    }
    if (ch === "}") {
      if (depth > 0) depth--;
      i++;
      lineStart = depth === 0;
      continue;
    }
    if (depth === 0 && lineStart && ch && /[A-Za-z_]/.test(ch)) {
      const slice = body.slice(i);
      const m = slice.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*:/);
      if (m && m[1]) {
        keys.push(m[1]);
        i += m[0].length;
        lineStart = false;
        continue;
      }
    }
    if (ch === "\n" || ch === ",") {
      lineStart = true;
    } else if (ch && !/\s/.test(ch)) {
      lineStart = false;
    }
    i++;
  }
  return keys;
}

const NAME_UNION_RE = /name\??:\s*("[^"]+"(?:\s*\|\s*"[^"]+")+)/;
const NAME_TUPLE_RE = /export\s+const\s+iconNames\s*=\s*\[([^\]]+)\]\s*as\s+const/;

export function extractIconNames(content: string): readonly string[] {
  const tupleMatch = content.match(NAME_TUPLE_RE);
  if (tupleMatch?.[1]) {
    return tupleMatch[1]
      .split(",")
      .map((s) => s.replace(/['"]/g, "").trim())
      .filter((s) => s.length > 0);
  }

  const unionMatch = content.match(NAME_UNION_RE);
  if (unionMatch?.[1]) {
    return unionMatch[1]
      .split("|")
      .map((s) => s.replace(/['"]/g, "").trim())
      .filter((s) => s.length > 0);
  }

  return [];
}
