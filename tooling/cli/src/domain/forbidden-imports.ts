import type { ArrayValues } from "@repo/types";

export const forbiddenModules = [
  "class-variance-authority",
  "clsx",
  "tailwind-merge",
  "lucide-react",
  "@/lib/utils",
] as const;

export type ForbiddenModule = ArrayValues<typeof forbiddenModules>;

export const forbiddenModulePrefixes = ["@radix-ui/"] as const;

export const requiredPrimitiveImports = ["@lume/foundation/recipes"] as const;

export const requiredPrimitiveStylingImports = [
  "@lume/foundation/css",
  "@lume/foundation/jsx",
] as const;
