import type { ArrayValues } from "@repo/types";

export const billingRoles = ["billing-admin", "billing-customer"] as const;

export type BillingRole = ArrayValues<typeof billingRoles>;

export function isBillingRole(role: string): role is BillingRole {
  return (billingRoles as readonly string[]).includes(role);
}
