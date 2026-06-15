import { useMemo, useState } from "react";

import { subject } from "@repo/authz/ability";
import { Button } from "@lume/primitives";
import { aDraftInvoice } from "@repo/billing/fixtures";
import type { Invoice } from "@repo/billing/model";
import { invoiceTotal } from "@repo/billing/operations";
import { issueInvoice, voidInvoice } from "@repo/billing/use-cases";

import { inMemoryInvoiceRepository, logNotifier, systemClock } from "@/shared/api/billing";
import { makeBillingPolicy, useAbility } from "@/shared/auth";

type BillingError = { kind: string; reason?: string };

function seedInvoices(): Invoice[] {
  return [
    aDraftInvoice({ id: "inv_draft", customerId: "cus_1" }),
    aDraftInvoice({
      id: "inv_issued",
      customerId: "cus_1",
      status: "issued",
      issuedAt: systemClock.now(),
    }),
    aDraftInvoice({ id: "inv_paid", customerId: "cus_1", status: "paid" }),
  ];
}

function formatTotal(invoice: Invoice): string {
  const total = invoiceTotal(invoice);
  if (total.isErr()) return "—";
  const money = total.unwrap();
  return `${money.amount} ${money.currency}`;
}

export function BillingPage() {
  const ability = useAbility();
  const [{ repo, seed }] = useState(() => {
    const seed = seedInvoices();
    return { repo: inMemoryInvoiceRepository(seed), seed };
  });
  const [invoices, setInvoices] = useState<Invoice[]>(seed);
  const [message, setMessage] = useState<string | null>(null);

  // The policy port is derived from the same ability that gates the buttons.
  const policy = useMemo(() => makeBillingPolicy(ability), [ability]);

  function apply(invoice: Invoice) {
    setInvoices((prev) => prev.map((i) => (i.id === invoice.id ? invoice : i)));
    setMessage(`✓ ${invoice.id} → ${invoice.status}`);
  }

  function report(error: BillingError) {
    setMessage(`✗ ${error.kind}${error.reason ? `: ${error.reason}` : ""}`);
  }

  async function onIssue(id: string) {
    const result = await issueInvoice(
      { repo, clock: systemClock, policy, notifier: logNotifier },
      { invoiceId: id },
    );
    if (result.isOk()) apply(result.unwrap());
    else report(result.unwrapErr());
  }

  async function onVoid(id: string) {
    const result = await voidInvoice({ repo, policy }, { invoiceId: id });
    if (result.isOk()) apply(result.unwrap());
    else report(result.unwrapErr());
  }

  return (
    <main>
      <h1>Billing</h1>
      <p>
        Demo actor is a <code>billing-admin</code>. The <strong>Void</strong> action is hidden for
        paid invoices by the <code>deny void paid</code> rule; issuing a non-draft invoice is
        rejected by the use-case.
      </p>
      {message ? <p>{message}</p> : null}
      <table>
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            const tagged = subject("billing.invoice", invoice);
            return (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.status}</td>
                <td>{formatTotal(invoice)}</td>
                <td>
                  {ability.can("issue", tagged) ? (
                    <Button
                      variant="default"
                      onClick={() => {
                        void onIssue(invoice.id);
                      }}
                    >
                      Issue
                    </Button>
                  ) : null}
                  {ability.can("void", tagged) ? (
                    <Button
                      variant="default"
                      onClick={() => {
                        void onVoid(invoice.id);
                      }}
                    >
                      Void
                    </Button>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
