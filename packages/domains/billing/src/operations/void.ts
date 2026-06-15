import { Err, Ok, type Result } from "@repo/std/result";

import type { Invoice, InvoiceStatus } from "~/model";

export type VoidError = { kind: "not-voidable"; status: InvoiceStatus };

export function voidInvoice(invoice: Invoice): Result<Invoice, VoidError> {
  if (invoice.status === "paid" || invoice.status === "void") {
    return Err({ kind: "not-voidable", status: invoice.status });
  }
  return Ok({ ...invoice, status: "void" });
}
