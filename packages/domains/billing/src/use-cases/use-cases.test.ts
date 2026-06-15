import { describe, expect, test } from "bun:test";

import { Err, None, Ok, Some } from "@repo/std/result";

import { aDraftInvoice } from "../fixtures";
import type { Invoice } from "../model";
import type { BillingPolicy, Clock, InvoiceRepository, Notifier } from "../ports";
import { issueInvoice } from "./issue-invoice";
import { voidInvoice } from "./void-invoice";

// In-memory adapters built from fixtures — the pattern from
// .agents/rules/domains/ports.md. No mocking library: ports are satisfied with
// small hand-written stubs the test controls.

function inMemoryRepo(seed: readonly Invoice[] = []): InvoiceRepository & { saved: Invoice[] } {
  const store = new Map(seed.map((i) => [i.id, i]));
  const saved: Invoice[] = [];
  return {
    saved,
    async findById(id) {
      const found = store.get(id);
      return Ok(found ? Some(found) : None);
    },
    async save(invoice) {
      store.set(invoice.id, invoice);
      saved.push(invoice);
      return Ok(invoice);
    },
  };
}

const fixedClock: Clock = { now: () => new Date("2026-01-01T00:00:00Z") };
const allowAll: BillingPolicy = { canIssue: () => Ok(undefined), canVoid: () => Ok(undefined) };
const denyAll: BillingPolicy = {
  canIssue: () => Err({ kind: "forbidden", reason: "nope" }),
  canVoid: () => Err({ kind: "forbidden", reason: "nope" }),
};

function recordingNotifier(): Notifier & { calls: Invoice[] } {
  const calls: Invoice[] = [];
  return {
    calls,
    async invoiceIssued(invoice) {
      calls.push(invoice);
      return Ok(undefined);
    },
  };
}

describe("issueInvoice", () => {
  test("issues a draft invoice and notifies", async () => {
    const repo = inMemoryRepo([aDraftInvoice({ id: "inv_1" })]);
    const notifier = recordingNotifier();

    const result = await issueInvoice(
      { repo, clock: fixedClock, policy: allowAll, notifier },
      { invoiceId: "inv_1" },
    );

    expect(result.isOk()).toBe(true);
    expect(result.unwrap().status).toBe("issued");
    expect(notifier.calls).toHaveLength(1);
  });

  test("is forbidden when the policy denies", async () => {
    const repo = inMemoryRepo([aDraftInvoice({ id: "inv_1" })]);

    const result = await issueInvoice(
      { repo, clock: fixedClock, policy: denyAll, notifier: recordingNotifier() },
      { invoiceId: "inv_1" },
    );

    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr().kind).toBe("forbidden");
  });

  test("fails when the invoice is not found", async () => {
    const result = await issueInvoice(
      { repo: inMemoryRepo(), clock: fixedClock, policy: allowAll, notifier: recordingNotifier() },
      { invoiceId: "missing" },
    );

    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr().kind).toBe("not-found");
  });

  test("rejects a non-draft invoice", async () => {
    const repo = inMemoryRepo([aDraftInvoice({ id: "inv_1", status: "issued" })]);

    const result = await issueInvoice(
      { repo, clock: fixedClock, policy: allowAll, notifier: recordingNotifier() },
      { invoiceId: "inv_1" },
    );

    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr().kind).toBe("not-draft");
  });
});

describe("voidInvoice", () => {
  test("voids an issued invoice", async () => {
    const repo = inMemoryRepo([aDraftInvoice({ id: "inv_1", status: "issued" })]);

    const result = await voidInvoice({ repo, policy: allowAll }, { invoiceId: "inv_1" });

    expect(result.isOk()).toBe(true);
    expect(result.unwrap().status).toBe("void");
  });

  test("cannot void a paid invoice", async () => {
    const repo = inMemoryRepo([aDraftInvoice({ id: "inv_1", status: "paid" })]);

    const result = await voidInvoice({ repo, policy: allowAll }, { invoiceId: "inv_1" });

    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr().kind).toBe("not-voidable");
  });

  test("is forbidden when the policy denies", async () => {
    const repo = inMemoryRepo([aDraftInvoice({ id: "inv_1", status: "issued" })]);

    const result = await voidInvoice({ repo, policy: denyAll }, { invoiceId: "inv_1" });

    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr().kind).toBe("forbidden");
  });
});
