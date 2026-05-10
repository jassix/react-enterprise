import { Err, Ok, type Result } from "@repo/std/result";
import type {
  ComponentRegistry,
  RegistryError,
} from "~/application/ports/component-registry";
import type { Fetcher } from "~/application/ports/fetcher";
import type { ComponentSpec } from "~/domain/component-spec";
import { parseRegistryItem, type RegistryItem } from "~/domain/registry-item";

export class ShadcnHttpRegistry implements ComponentRegistry {
  constructor(private readonly fetcher: Fetcher) {}

  async resolve(spec: ComponentSpec): Promise<Result<RegistryItem, RegistryError>> {
    const url = spec.url;

    let res;
    try {
      res = await this.fetcher.get(url);
    } catch (cause) {
      return Err({ kind: "transport", cause });
    }

    if (res.status === 404) return Err({ kind: "not-found", spec: url });
    if (!res.ok) {
      return Err({
        kind: "transport",
        status: res.status,
        cause: res.body.slice(0, 500),
      });
    }

    let json: unknown;
    try {
      json = JSON.parse(res.body);
    } catch (cause) {
      return Err({
        kind: "invalid-payload",
        messages: [`response was not valid JSON: ${(cause as Error).message ?? "unknown"}`],
      });
    }

    const parsed = parseRegistryItem(json);
    if (parsed.isErr()) {
      const err = parsed.unwrapErr();
      const messages =
        err.kind === "schema"
          ? err.issues
          : [`invalid registry payload: ${(err.cause as Error)?.message ?? String(err.cause)}`];
      return Err({ kind: "invalid-payload", messages });
    }
    return Ok(parsed.unwrap());
  }
}
