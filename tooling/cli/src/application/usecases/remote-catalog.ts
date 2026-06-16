import { Err, Ok } from "@repo/std/result";
import type { Result } from "@repo/std/result";
import type { Fetcher } from "~/application/ports/fetcher";
import type { FileSystem } from "~/application/ports/file-system";
import { join } from "~/domain/path";
import { parseRemoteCatalog } from "~/domain/remote-registry";
import type { RemoteCatalog } from "~/domain/remote-registry";

export const SHADCN_CATALOG_URL = "https://ui.shadcn.com/r/registries.json";
export const CATALOG_CACHE_PATH = "node_modules/.cache/repo-cli/catalog.json";
const TTL_MS = 24 * 60 * 60 * 1000;

interface CacheEnvelope {
  readonly fetchedAt: number;
  readonly url: string;
  readonly catalog: RemoteCatalog;
}

export type CatalogError =
  | { readonly kind: "transport"; readonly status?: number; readonly cause: unknown }
  | { readonly kind: "invalid-payload"; readonly messages: readonly string[] };

export interface LoadCatalogOptions {
  readonly forceRefresh?: boolean;
}

export async function loadRemoteCatalog(
  deps: { fs: FileSystem; fetcher: Fetcher },
  rootDir: string,
  options: LoadCatalogOptions = {},
): Promise<Result<RemoteCatalog, CatalogError>> {
  const cachePath = join(rootDir, CATALOG_CACHE_PATH);

  if (!options.forceRefresh) {
    const cached = await readCache(deps.fs, cachePath);
    if (cached !== null && Date.now() - cached.fetchedAt < TTL_MS) {
      return Ok(cached.catalog);
    }
  }

  const fetched = await fetchCatalog(deps.fetcher);
  if (fetched.isErr()) {
    if (!options.forceRefresh) {
      const stale = await readCache(deps.fs, cachePath);
      if (stale !== null) return Ok(stale.catalog);
    }
    return Err(fetched.unwrapErr());
  }

  const catalog = fetched.unwrap();
  await writeCache(deps.fs, cachePath, {
    fetchedAt: Date.now(),
    url: SHADCN_CATALOG_URL,
    catalog,
  });
  return Ok(catalog);
}

export async function loadCatalogOrEmpty(
  deps: { fs: FileSystem; fetcher: Fetcher },
  rootDir: string,
): Promise<RemoteCatalog> {
  const r = await loadRemoteCatalog(deps, rootDir);
  return r.isOk() ? r.unwrap() : [];
}

async function fetchCatalog(fetcher: Fetcher): Promise<Result<RemoteCatalog, CatalogError>> {
  let response;
  try {
    response = await fetcher.get(SHADCN_CATALOG_URL);
  } catch (error) {
    return Err({ kind: "transport", cause: error });
  }
  if (!response.ok) {
    return Err({ kind: "transport", status: response.status, cause: response.body.slice(0, 500) });
  }
  let json: unknown;
  try {
    json = JSON.parse(response.body);
  } catch (error) {
    return Err({ kind: "transport", cause: error });
  }
  const parsed = parseRemoteCatalog(json);
  if (parsed.isErr()) {
    return Err({ kind: "invalid-payload", messages: parsed.unwrapErr().messages });
  }
  return Ok(parsed.unwrap());
}

async function readCache(fs: FileSystem, path: string): Promise<CacheEnvelope | null> {
  if (!(await fs.exists(path))) return null;
  try {
    const raw = await fs.read(path);
    const parsed = JSON.parse(raw) as Partial<CacheEnvelope>;
    if (typeof parsed.fetchedAt !== "number") return null;
    if (!Array.isArray(parsed.catalog)) return null;
    return parsed as CacheEnvelope;
  } catch {
    return null;
  }
}

async function writeCache(fs: FileSystem, path: string, envelope: CacheEnvelope): Promise<void> {
  try {
    await fs.write(path, `${JSON.stringify(envelope, null, 2)}\n`);
  } catch {
    /* cache miss is non-fatal */
  }
}
