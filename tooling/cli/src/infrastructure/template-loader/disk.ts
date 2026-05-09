import type { FileSystem } from "~/application/ports/file-system";
import type { TemplateLoader, TemplateVars } from "~/application/ports/template-loader";

const SUFFIX_STRIP = [".tpl", ".placeholder"] as const;
const MANIFEST = "template.json";

export class DiskTemplateLoader implements TemplateLoader {
  constructor(private readonly fs: FileSystem) {}

  async load(absDir: string, vars: TemplateVars): Promise<ReadonlyMap<string, string>> {
    const out = new Map<string, string>();
    for await (const rel of this.fs.glob(absDir, "**/*")) {
      if (rel === MANIFEST) continue;
      const raw = await this.fs.read(`${absDir}/${rel}`);
      out.set(stripSuffix(rel), applyVars(raw, vars));
    }
    return out;
  }
}

function stripSuffix(rel: string): string {
  for (const suffix of SUFFIX_STRIP) {
    if (rel.endsWith(suffix)) return rel.slice(0, -suffix.length);
  }
  return rel;
}

function applyVars(raw: string, vars: TemplateVars): string {
  let out = raw;
  for (const [key, value] of Object.entries(vars)) {
    out = out.replaceAll(`{{${key}}}`, value);
  }
  return out;
}
