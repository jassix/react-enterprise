import { match } from "@repo/std/match";
import { Err, Ok } from "@repo/std/result";
import type { Result } from "@repo/std/result";

import type { Invoice, InvoiceId, InvoiceStatus } from "../model";
import { invoiceTotal } from "../operations";
import type { BillingPolicy, Clock, InvoiceRepository, Notifier, RepositoryError } from "../ports";

export interface IssueInvoiceDeps {
  repo: InvoiceRepository;
  clock: Clock;
  policy: BillingPolicy;
  notifier: Notifier;
}

export type IssueInvoiceError =
  | { kind: "forbidden"; reason: string }
  | { kind: "not-found"; id: InvoiceId }
  | { kind: "not-draft"; status: InvoiceStatus }
  | { kind: "empty"; id: InvoiceId }
  | { kind: "currency-mismatch"; expected: string; got: string }
  | { kind: "notify-failed"; cause: unknown }
  | { kind: "transport"; cause: unknown };

export async function issueInvoice(
  deps: IssueInvoiceDeps,
  input: { invoiceId: InvoiceId },
): Promise<Result<Invoice, IssueInvoiceError>> {
  const found = await deps.repo.findById(input.invoiceId);
  if (found.isErr()) return Err(asIssueError(found.unwrapErr()));

  const maybeInvoice = found.unwrap();
  if (maybeInvoice.isNone()) {
    return Err({ kind: "not-found", id: input.invoiceId });
  }

  const invoice = maybeInvoice.unwrap();

  const allowed = deps.policy.canIssue(invoice);
  if (allowed.isErr()) {
    return Err({ kind: "forbidden", reason: allowed.unwrapErr().reason });
  }

  if (invoice.status !== "draft") {
    return Err({ kind: "not-draft", status: invoice.status });
  }
  if (invoice.items.length === 0) {
    return Err({ kind: "empty", id: invoice.id });
  }

  const total = invoiceTotal(invoice);
  if (total.isErr()) return Err(total.unwrapErr());

  const issued: Invoice = {
    ...invoice,
    status: "issued",
    issuedAt: deps.clock.now(),
  };

  const saved = await deps.repo.save(issued);
  if (saved.isErr()) return Err(asIssueError(saved.unwrapErr()));

  const notified = await deps.notifier.invoiceIssued(saved.unwrap());
  if (notified.isErr()) {
    return Err({ kind: "notify-failed", cause: notified.unwrapErr().cause });
  }

  return Ok(saved.unwrap());
}

function asIssueError(error: RepositoryError): IssueInvoiceError {
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
