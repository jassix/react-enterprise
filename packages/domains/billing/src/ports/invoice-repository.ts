import type { Option, Result } from "@repo/std/result";

import type { Invoice, InvoiceId } from "../model";

export type RepositoryError =
  | { kind: "conflict"; reason: string }
  | { kind: "transport"; cause: unknown };

export interface InvoiceRepository {
  findById(id: InvoiceId): Promise<Result<Option<Invoice>, RepositoryError>>;
  save(invoice: Invoice): Promise<Result<Invoice, RepositoryError>>;
}
