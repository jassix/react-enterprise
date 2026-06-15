# Ports and Adapters

A **port** is a TypeScript interface a domain depends on. An **adapter** is the implementation of that interface — it lives in the consumer (`apps/*`), not in the domain. This is the boundary that lets a domain stay framework-agnostic.

## Defining a port

```ts
import type { Result, Option } from "@repo/std/result";
import type { Invoice, InvoiceId } from "../model";

export type RepositoryError =
  | { kind: "not-found" }
  | { kind: "conflict"; reason: string }
  | { kind: "transport"; cause: unknown };

export interface InvoiceRepository {
  findById(id: InvoiceId): Promise<Result<Option<Invoice>, RepositoryError>>;
  save(invoice: Invoice):  Promise<Result<Invoice, RepositoryError>>;
}
```

## Consuming a port in a use-case

```ts
export interface IssueInvoiceDeps {
  repo: InvoiceRepository;
  clock: Clock;
}

export async function issueInvoice(
  deps: IssueInvoiceDeps,
  input: { invoiceId: InvoiceId },
): Promise<Result<Invoice, IssueInvoiceError>> { /* ... */ }
```

The dependency object is the **only** way IO enters the use-case. No module-level singletons, no imports from `apps/*`.

## Writing an adapter (in `apps/*`)

```ts
// apps/platform/src/shared/api/billing/invoice-repository.ts
import type { InvoiceRepository } from "@repo/billing/ports";
import { InvoiceSchema } from "@repo/billing/model";
import { parse } from "@repo/std/schema";
import { Err, Ok, Some, None } from "@repo/std/result";

export const httpInvoiceRepository: InvoiceRepository = {
  async findById(id) {
    const res = await fetch(`/api/invoices/${id}`);
    if (res.status === 404) return Ok(None);
    if (!res.ok) return Err({ kind: "transport", cause: res.statusText });
    return Ok(Some(parse(InvoiceSchema, await res.json())));
  },
  async save(invoice) {
    const res = await fetch(`/api/invoices/${invoice.id}`, {
      method: "PUT",
      body: JSON.stringify(invoice),
    });
    if (!res.ok) return Err({ kind: "transport", cause: res.statusText });
    return Ok(parse(InvoiceSchema, await res.json()));
  },
};
```

## Rules

- A port returns `Promise<Result<T, E>>` whenever the operation can fail outside of programmer error.
- The error type `E` is a domain-defined discriminated union — never `Error`, never `unknown`.
- The adapter parses untrusted input with the domain's Valibot schema *before* returning it. Once a value is past the boundary, it is trusted.
- Tests inject in-memory adapters (often built from `fixtures.ts`) — never mock the port via a mocking library.
- A port lives in exactly one domain. If two domains need the same port, the abstraction is too generic — promote the underlying capability to `@repo/std` or a new shared package instead.
