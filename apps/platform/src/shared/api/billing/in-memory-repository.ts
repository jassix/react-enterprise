import type { Invoice } from "@repo/billing/model";
import type { InvoiceRepository } from "@repo/billing/ports";
import { None, Ok, Some } from "@repo/std/result";

// In-memory adapter for the InvoiceRepository port. An app would swap this for
// an HTTP/DB adapter (see .agents/rules/domains/ports.md) without touching the
// domain. Tests inject the same adapter instead of mocking the port.
export function inMemoryInvoiceRepository(seed: readonly Invoice[] = []): InvoiceRepository {
  const store = new Map<string, Invoice>();
  for (const invoice of seed) store.set(invoice.id, invoice);

  return {
    async findById(id) {
      const found = store.get(id);
      return Ok(found ? Some(found) : None);
    },
    async save(invoice) {
      store.set(invoice.id, invoice);
      return Ok(invoice);
    },
  };
}
