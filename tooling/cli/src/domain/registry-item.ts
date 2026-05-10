import { Err, Ok, type Result } from "@repo/std/result";
import * as v from "@repo/std/schema";
import type { ArrayValues } from "@repo/types";

export const registryItemTypes = [
  "registry:ui",
  "registry:block",
  "registry:component",
  "registry:hook",
  "registry:page",
] as const;

export type RegistryItemType = ArrayValues<typeof registryItemTypes>;

const RegistryItemTypeSchema = v.picklist(registryItemTypes);

const RegistryFileSchema = v.object({
  path: v.string(),
  type: RegistryItemTypeSchema,
  content: v.string(),
  target: v.optional(v.string()),
});

const CssVarsSchema = v.object({
  light: v.optional(v.record(v.string(), v.string())),
  dark: v.optional(v.record(v.string(), v.string())),
});

export const RegistryItemSchema = v.object({
  name: v.string(),
  type: RegistryItemTypeSchema,
  title: v.optional(v.string()),
  description: v.optional(v.string()),
  dependencies: v.optional(v.array(v.string())),
  devDependencies: v.optional(v.array(v.string())),
  registryDependencies: v.optional(v.array(v.string())),
  files: v.array(RegistryFileSchema),
  cssVars: v.optional(CssVarsSchema),
});

export type RegistryItem = v.InferOutput<typeof RegistryItemSchema>;
export type RegistryFile = v.InferOutput<typeof RegistryFileSchema>;

export type RegistryItemParseError =
  | { readonly kind: "invalid-json"; readonly cause: unknown }
  | { readonly kind: "schema"; readonly issues: readonly string[] };

export function parseRegistryItem(
  json: unknown,
): Result<RegistryItem, RegistryItemParseError> {
  const parsed = v.safeParse(RegistryItemSchema, json);
  if (!parsed.success) {
    return Err({
      kind: "schema",
      issues: parsed.issues.map((i) => i.message),
    });
  }
  return Ok(parsed.output);
}

export function isUiOrComponent(type: RegistryItemType): boolean {
  return type === "registry:ui" || type === "registry:component";
}

export function isBlock(type: RegistryItemType): boolean {
  return type === "registry:block" || type === "registry:page";
}
