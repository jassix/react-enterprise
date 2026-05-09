import { match } from "@repo/std/match";
import type { Fetcher } from "~/application/ports/fetcher";
import type { FileSystem } from "~/application/ports/file-system";
import type { TemplateLoader } from "~/application/ports/template-loader";
import { resolve } from "~/domain/path";
import type { SpecSource } from "~/domain/sdk/spec-source";

export interface ResolvedSpec {
  readonly filename: string;
  readonly content: string;
}

export interface ResolveSpecDeps {
  readonly fs: FileSystem;
  readonly fetcher: Fetcher;
  readonly templateLoader: TemplateLoader;
}

export interface ResolveSpecRequest {
  readonly source: SpecSource;
  readonly cwd: string;
  readonly placeholderDir: string;
  readonly templateName: string;
}

export async function resolveSpec(
  req: ResolveSpecRequest,
  deps: ResolveSpecDeps,
): Promise<ResolvedSpec> {
  return match(req.source)
    .with({ kind: "file" }, async ({ path }) => {
      const abs = path.startsWith("/") ? path : resolve(req.cwd, path);
      if (!(await deps.fs.exists(abs))) {
        throw new Error(`spec file not found: ${abs}`);
      }
      const content = await deps.fs.read(abs);
      return { filename: pickLocalFilename(abs), content };
    })
    .with({ kind: "url" }, async ({ url }) => {
      let response: Awaited<ReturnType<Fetcher["get"]>>;
      try {
        response = await deps.fetcher.get(url);
      } catch (err) {
        throw new Error(
          `failed to fetch spec from ${url}: ${err instanceof Error ? err.message : String(err)}`,
        );
      }
      if (!response.ok) {
        throw new Error(`spec URL responded with status ${response.status}: ${url}`);
      }
      return {
        filename: pickRemoteFilename(url, response.contentType),
        content: response.body,
      };
    })
    .with({ kind: "placeholder" }, async () => {
      const files = await deps.templateLoader.load(req.placeholderDir, {
        name: req.templateName,
      });
      const entry = files.get("openapi/spec.yml") ?? files.get("openapi/spec.yaml");
      if (!entry) {
        throw new Error(
          `placeholder spec missing in template ${req.placeholderDir} — expected openapi/spec.yml`,
        );
      }
      return { filename: "spec.yml", content: entry };
    })
    .exhaustive();
}

function pickLocalFilename(abs: string): string {
  const base = basename(abs);
  if (/\.(ya?ml|json)$/i.test(base)) {
    if (base.endsWith(".yaml")) return base.replace(/\.yaml$/, ".yml");
    return base;
  }
  return "spec.yml";
}

function pickRemoteFilename(url: string, contentType: string | null): string {
  const base = basename(stripQuery(url));
  if (/\.(ya?ml|json)$/i.test(base)) {
    if (base.endsWith(".yaml")) return base.replace(/\.yaml$/, ".yml");
    return base;
  }
  if (contentType) {
    const lower = contentType.toLowerCase();
    if (lower.includes("yaml")) return "spec.yml";
    if (lower.includes("json")) return "spec.json";
  }
  return "spec.yml";
}

function basename(path: string): string {
  const idx = path.lastIndexOf("/");
  return idx === -1 ? path : path.slice(idx + 1);
}

function stripQuery(url: string): string {
  const q = url.indexOf("?");
  const u = q === -1 ? url : url.slice(0, q);
  const h = u.indexOf("#");
  return h === -1 ? u : u.slice(0, h);
}
