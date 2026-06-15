import type { Result } from "@repo/std/result";

import type { Invoice } from "~/model";

export type NotifyError = { kind: "transport"; cause: unknown };

export interface Notifier {
  invoiceIssued(invoice: Invoice): Promise<Result<void, NotifyError>>;
}
