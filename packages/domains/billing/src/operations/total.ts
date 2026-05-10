import { Err, Ok, type Result } from "@repo/std/result";

import type { Currency, Invoice, LineItem, Money } from "~/model";

export type TotalError = {
  kind: "currency-mismatch";
  expected: Currency;
  got: Currency;
};

export function lineItemTotal(item: LineItem): Money {
  return {
    amount: item.unitPrice.amount * item.quantity,
    currency: item.unitPrice.currency,
  };
}

export function invoiceTotal(invoice: Invoice): Result<Money, TotalError> {
  let amount = 0;
  for (const item of invoice.items) {
    if (item.unitPrice.currency !== invoice.currency) {
      return Err({
        kind: "currency-mismatch",
        expected: invoice.currency,
        got: item.unitPrice.currency,
      });
    }
    amount += item.unitPrice.amount * item.quantity;
  }
  return Ok({ amount, currency: invoice.currency });
}
