import type { Currency, Invoice, LineItem, Money } from "~/model";

export function aMoney(overrides: Partial<Money> = {}): Money {
  return { amount: 1000, currency: "USD", ...overrides };
}

export function aLineItem(overrides: Partial<LineItem> = {}): LineItem {
  return {
    id: "li_1",
    description: "Consulting",
    quantity: 1,
    unitPrice: aMoney(),
    ...overrides,
  };
}

export function aDraftInvoice(overrides: Partial<Invoice> = {}): Invoice {
  const currency: Currency = overrides.currency ?? "USD";
  return {
    id: "inv_1",
    customerId: "cus_1",
    currency,
    status: "draft",
    items: [aLineItem({ unitPrice: aMoney({ currency }) })],
    issuedAt: null,
    ...overrides,
  };
}
