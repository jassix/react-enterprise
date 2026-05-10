import type { Result } from "@repo/std/result";
import type { ComponentSpec } from "~/domain/component-spec";
import type { RegistryItem } from "~/domain/registry-item";

export type RegistryError =
  | { readonly kind: "not-found"; readonly spec: string }
  | { readonly kind: "transport"; readonly status?: number; readonly cause: unknown }
  | { readonly kind: "invalid-payload"; readonly messages: readonly string[] };

export interface ComponentRegistry {
  resolve(spec: ComponentSpec): Promise<Result<RegistryItem, RegistryError>>;
}
