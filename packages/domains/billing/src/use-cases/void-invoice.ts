import { match } from "@repo/std/match";
import { Err, Ok, type Result } from "@repo/std/result";

import type { Invoice, InvoiceId, InvoiceStatus } from "~/model";
import { voidInvoice as applyVoid } from "~/operations";
import type { BillingPolicy, InvoiceRepository, RepositoryError } from "~/ports";

export interface VoidInvoiceDeps {
  repo: InvoiceRepository;
  policy: BillingPolicy;
}

export type VoidInvoiceError =
  | { kind: "forbidden"; reason: string }
  | { kind: "not-found"; id: InvoiceId }
  | { kind: "not-voidable"; status: InvoiceStatus }
  | { kind: "transport"; cause: unknown };

export async function voidInvoice(
  deps: VoidInvoiceDeps,
  input: { invoiceId: InvoiceId },
): Promise<Result<Invoice, VoidInvoiceError>> {
  const found = await deps.repo.findById(input.invoiceId);
  if (found.isErr()) return Err(asVoidError(found.unwrapErr()));

  const maybeInvoice = found.unwrap();
  if (maybeInvoice.isNone()) {
    return Err({ kind: "not-found", id: input.invoiceId });
  }

  const invoice = maybeInvoice.unwrap();

  const allowed = deps.policy.canVoid(invoice);
  if (allowed.isErr()) {
    return Err({ kind: "forbidden", reason: allowed.unwrapErr().reason });
  }

  const voided = applyVoid(invoice);
  if (voided.isErr()) return Err(voided.unwrapErr());

  const saved = await deps.repo.save(voided.unwrap());
  if (saved.isErr()) return Err(asVoidError(saved.unwrapErr()));

  return Ok(saved.unwrap());
}

function asVoidError(error: RepositoryError): VoidInvoiceError {
  return match(error)
    .with({ kind: "transport" }, (e) => ({
      kind: "transport" as const,
      cause: e.cause,
    }))
    .with({ kind: "conflict" }, (e) => ({
      kind: "transport" as const,
      cause: e.reason,
    }))
    .exhaustive();
}
