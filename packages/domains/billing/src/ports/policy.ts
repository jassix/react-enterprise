import type { Result } from "@repo/std/result";

import type { Invoice } from "~/model";

export type Forbidden = { kind: "forbidden"; reason: string };

export interface BillingPolicy {
  canIssue(invoice: Invoice): Result<void, Forbidden>;
  canVoid(invoice: Invoice): Result<void, Forbidden>;
}
