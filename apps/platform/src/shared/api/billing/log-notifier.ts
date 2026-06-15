import type { Notifier } from "@repo/billing/ports";
import { Ok } from "@repo/std/result";

// Minimal Notifier adapter. In a real app this is the boundary where billing's
// vocabulary is translated to another domain's (e.g. @repo/notifications), per
// the worked example in .agents/rules/domains/cross-domain.md.
export const logNotifier: Notifier = {
  async invoiceIssued(invoice) {
    console.info(`[notify] invoice ${invoice.id} issued`);
    return Ok(undefined);
  },
};
