import { Err, Ok } from "@repo/std/result";
import type { Result } from "@repo/std/result";
import * as v from "@repo/std/schema";
import type { RegistryConfig } from "~/domain/registry-config";

export const RemoteRegistrySchema = v.object({
  name: v.pipe(v.string(), v.regex(/^@[a-z0-9][a-z0-9-]*$/i)),
  url: v.pipe(v.string(), v.url()),
  homepage: v.optional(v.string()),
  description: v.optional(v.string()),
});

export const RemoteCatalogSchema = v.array(RemoteRegistrySchema);

export type RemoteRegistry = v.InferOutput<typeof RemoteRegistrySchema>;
export type RemoteCatalog = readonly RemoteRegistry[];

export type RemoteCatalogParseError = {
  readonly kind: "invalid-payload";
  readonly messages: readonly string[];
};

export function parseRemoteCatalog(json: unknown): Result<RemoteCatalog, RemoteCatalogParseError> {
  const r = v.safeParse(RemoteCatalogSchema, json);
  if (r.success) return Ok(r.output);
  return Err({ kind: "invalid-payload", messages: r.issues.map((i) => i.message) });
}

export function mergeWithCatalog(local: RegistryConfig, catalog: RemoteCatalog): RegistryConfig {
  const merged: Record<string, string> = {};
  for (const entry of catalog) {
    if (!entry.url.includes("{name}")) continue;
    merged[entry.name] = entry.url;
  }
  for (const [ns, url] of Object.entries(local.registries)) {
    merged[ns] = url;
  }
  return { registries: merged };
}

export function searchCatalog(catalog: RemoteCatalog, query: string): readonly RemoteRegistry[] {
  const q = query.trim().toLowerCase();
  if (q.length === 0) return catalog;
  return catalog.filter((entry) => {
    if (entry.name.toLowerCase().includes(q)) return true;
    if (entry.description?.toLowerCase().includes(q)) return true;
    if (entry.homepage?.toLowerCase().includes(q)) return true;
    return false;
  });
}
