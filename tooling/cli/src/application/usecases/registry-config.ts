import { Err, Ok, type Result } from "@repo/std/result";
import type { FileSystem } from "~/application/ports/file-system";
import { join } from "~/domain/path";
import {
  emptyRegistryConfig,
  parseRegistryConfig,
  validateRegistryEntry,
  type RegistryConfig,
  type RegistryConfigParseError,
  type RegistryEntryError,
} from "~/domain/registry-config";

export const REGISTRY_CONFIG_PATH = ".repo/registries.json";

export type LoadError =
  | { readonly kind: "io"; readonly cause: unknown }
  | { readonly kind: "invalid"; readonly messages: readonly string[] };

export async function loadRegistryConfig(
  fs: FileSystem,
  rootDir: string,
): Promise<Result<RegistryConfig, LoadError>> {
  const abs = join(rootDir, REGISTRY_CONFIG_PATH);
  if (!(await fs.exists(abs))) return Ok(emptyRegistryConfig);

  let raw: string;
  try {
    raw = await fs.read(abs);
  } catch (cause) {
    return Err({ kind: "io", cause });
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch (cause) {
    return Err({ kind: "io", cause });
  }

  const parsed = parseRegistryConfig(json);
  if (parsed.isErr()) {
    const e = parsed.unwrapErr() as RegistryConfigParseError;
    return Err({ kind: "invalid", messages: e.messages });
  }
  return Ok(parsed.unwrap());
}

export async function saveRegistryConfig(
  fs: FileSystem,
  rootDir: string,
  config: RegistryConfig,
): Promise<Result<void, { kind: "io"; cause: unknown }>> {
  const abs = join(rootDir, REGISTRY_CONFIG_PATH);
  try {
    const sorted = sortNamespaces(config);
    await fs.write(abs, `${JSON.stringify(sorted, null, 2)}\n`);
    return Ok(undefined);
  } catch (cause) {
    return Err({ kind: "io", cause });
  }
}

export function addRegistry(
  config: RegistryConfig,
  namespace: string,
  urlTemplate: string,
): Result<RegistryConfig, RegistryEntryError> {
  const valid = validateRegistryEntry(namespace, urlTemplate);
  if (valid.isErr()) return Err(valid.unwrapErr());
  return Ok({
    registries: { ...config.registries, [namespace]: urlTemplate },
  });
}

export function removeRegistry(
  config: RegistryConfig,
  namespace: string,
): { readonly config: RegistryConfig; readonly removed: boolean } {
  if (!(namespace in config.registries)) {
    return { config, removed: false };
  }
  const next = { ...config.registries };
  delete next[namespace];
  return { config: { registries: next }, removed: true };
}

function sortNamespaces(config: RegistryConfig): RegistryConfig {
  const sorted: Record<string, string> = {};
  for (const key of Object.keys(config.registries).sort()) {
    const url = config.registries[key];
    if (url !== undefined) sorted[key] = url;
  }
  return { registries: sorted };
}
