import { Err, Ok, type Result } from "@repo/std/result";
import * as v from "@repo/std/schema";

export const RegistryConfigSchema = v.object({
  registries: v.record(v.string(), v.pipe(v.string(), v.url())),
});

export type RegistryConfig = v.InferOutput<typeof RegistryConfigSchema>;

export type RegistryConfigParseError = {
  readonly kind: "invalid-payload";
  readonly messages: readonly string[];
};

export type RegistryEntryError =
  | { readonly kind: "invalid-namespace"; readonly namespace: string }
  | { readonly kind: "missing-placeholder"; readonly url: string }
  | { readonly kind: "invalid-url"; readonly url: string };

const NAMESPACE_RE = /^@[a-z0-9][a-z0-9-]*$/i;
const PLACEHOLDER = "{name}";

export const emptyRegistryConfig: RegistryConfig = { registries: {} };

export function parseRegistryConfig(
  json: unknown,
): Result<RegistryConfig, RegistryConfigParseError> {
  const r = v.safeParse(RegistryConfigSchema, json);
  if (r.success) return Ok(r.output);
  return Err({
    kind: "invalid-payload",
    messages: r.issues.map((i) => i.message),
  });
}

export function validateRegistryEntry(
  namespace: string,
  urlTemplate: string,
): Result<void, RegistryEntryError> {
  if (!NAMESPACE_RE.test(namespace)) {
    return Err({ kind: "invalid-namespace", namespace });
  }
  if (!urlTemplate.includes(PLACEHOLDER)) {
    return Err({ kind: "missing-placeholder", url: urlTemplate });
  }
  const probe = urlTemplate.replace(PLACEHOLDER, "_probe_");
  try {
    new URL(probe);
  } catch {
    return Err({ kind: "invalid-url", url: urlTemplate });
  }
  return Ok(undefined);
}

export function resolveRegistryUrl(
  config: RegistryConfig,
  namespace: string,
  name: string,
): string | null {
  const template = config.registries[namespace];
  if (!template) return null;
  return template.replaceAll(PLACEHOLDER, name);
}

export function listNamespaces(config: RegistryConfig): readonly string[] {
  return Object.keys(config.registries).sort();
}
