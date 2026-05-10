import { Err, Ok, type Result } from "@repo/std/result";
import * as v from "@repo/std/schema";

export const componentSpecSources = ["shadcn", "url"] as const;

export const ComponentSpecSchema = v.union([
  v.object({
    source: v.literal("shadcn"),
    name: v.string(),
    url: v.pipe(v.string(), v.url()),
  }),
  v.object({
    source: v.literal("url"),
    url: v.pipe(v.string(), v.url()),
  }),
]);

export type ComponentSpec = v.InferOutput<typeof ComponentSpecSchema>;

export type SpecParseError =
  | { readonly kind: "empty" }
  | { readonly kind: "unrecognized"; readonly input: string }
  | { readonly kind: "invalid-name"; readonly input: string };

const NAME_RE = /^[a-z0-9][a-z0-9-]*$/i;

const SHADCN_BASE = "https://ui.shadcn.com/r/styles/default";

export function parseSpec(input: string): Result<ComponentSpec, SpecParseError> {
  const trimmed = input.trim();
  if (trimmed.length === 0) return Err({ kind: "empty" });

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    if (!trimmed.endsWith(".json")) {
      return Err({ kind: "unrecognized", input });
    }
    return Ok({ source: "url", url: trimmed });
  }

  const name = extractShadcnName(trimmed);
  if (name === null) return Err({ kind: "unrecognized", input });
  if (!isValidComponentName(name)) return Err({ kind: "invalid-name", input });

  return Ok({
    source: "shadcn",
    name,
    url: `${SHADCN_BASE}/${name}.json`,
  });
}

export function componentName(spec: ComponentSpec): string {
  if (spec.source === "shadcn") return spec.name;
  const last = spec.url.split("/").pop() ?? spec.url;
  return last.replace(/\.json$/, "");
}

function extractShadcnName(input: string): string | null {
  if (input.startsWith("shadcn:")) return input.slice("shadcn:".length);
  if (input.startsWith("@shadcn/")) return input.slice("@shadcn/".length);
  return null;
}

function isValidComponentName(name: string): boolean {
  if (name.length === 0) return false;
  if (name.includes("/") || name.includes("..")) return false;
  if (/\s/.test(name)) return false;
  return NAME_RE.test(name);
}
