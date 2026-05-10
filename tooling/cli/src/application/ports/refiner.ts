import type { Result } from "@repo/std/result";
import type { RefinementContext, SourceFile } from "~/domain/refinement-context";

export interface RefinerOutput {
  readonly files: readonly SourceFile[];
  readonly notes?: readonly string[];
}

export type RefinerError =
  | { readonly kind: "transport"; readonly cause: unknown }
  | { readonly kind: "unavailable"; readonly reason: string }
  | { readonly kind: "invalid-output"; readonly messages: readonly string[] }
  | { readonly kind: "cancelled" };

export interface Refiner {
  refine(context: RefinementContext): Promise<Result<RefinerOutput, RefinerError>>;
}
