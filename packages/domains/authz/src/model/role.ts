import type { ArrayValues } from "@repo/types";

export const baseRoles = ["admin", "member", "guest"] as const;

export type BaseRole = ArrayValues<typeof baseRoles>;

export function isBaseRole(role: string): role is BaseRole {
  return (baseRoles as readonly string[]).includes(role);
}
