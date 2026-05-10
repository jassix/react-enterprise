import { Err, Ok, type Result } from "@repo/std/result";
import * as v from "@repo/std/schema";
import {
  emptyRegistryConfig,
  resolveRegistryUrl,
  type RegistryConfig,
} from "~/domain/registry-config";

export const componentSpecSources = ["shadcn", "registry", "url"] as const;

export const ComponentSpecSchema = v.union([
  v.object({
    source: v.literal("shadcn"),
    name: v.string(),
    url: v.pipe(v.string(), v.url()),
  }),
  v.object({
    source: v.literal("registry"),
    namespace: v.string(),
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
  | { readonly kind: "unknown-namespace"; readonly namespace: string; readonly known: readonly string[] }
  | { readonly kind: "invalid-name"; readonly input: string };

const NAME_RE = /^[a-z0-9][a-z0-9-]*$/i;

const SHADCN_BASE = "https://ui.shadcn.com/r/styles/default";

export function parseSpec(
  input: string,
  registries: RegistryConfig = emptyRegistryConfig,
): Result<ComponentSpec, SpecParseError> {
  const trimmed = input.trim();
  if (trimmed.length === 0) return Err({ kind: "empty" });

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    if (!trimmed.endsWith(".json")) {
      return Err({ kind: "unrecognized", input });
    }
    return Ok({ source: "url", url: trimmed });
  }

  if (trimmed.startsWith("@") && trimmed.includes("/")) {
    const slash = trimmed.indexOf("/");
    const namespace = trimmed.slice(0, slash);
    const name = trimmed.slice(slash + 1);
    if (!isValidComponentName(name)) return Err({ kind: "invalid-name", input });
    if (namespace === "@shadcn") {
      return Ok({ source: "shadcn", name, url: `${SHADCN_BASE}/${name}.json` });
    }
    const url = resolveRegistryUrl(registries, namespace, name);
    if (url === null) {
      return Err({
        kind: "unknown-namespace",
        namespace,
        known: Object.keys(registries.registries),
      });
    }
    return Ok({ source: "registry", namespace, name, url });
  }

  if (trimmed.startsWith("shadcn:")) {
    const name = trimmed.slice("shadcn:".length);
    if (!isValidComponentName(name)) return Err({ kind: "invalid-name", input });
    return Ok({ source: "shadcn", name, url: `${SHADCN_BASE}/${name}.json` });
  }

  return Err({ kind: "unrecognized", input });
}

export function componentName(spec: ComponentSpec): string {
  if (spec.source === "shadcn" || spec.source === "registry") return spec.name;
  const last = spec.url.split("/").pop() ?? spec.url;
  return last.replace(/\.json$/, "");
}

function isValidComponentName(name: string): boolean {
  if (name.length === 0) return false;
  if (name.includes("/") || name.includes("..")) return false;
  if (/\s/.test(name)) return false;
  return NAME_RE.test(name);
}
