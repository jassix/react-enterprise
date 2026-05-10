import { rule, type Rule } from "@repo/authz/ability";
import type { Actor } from "@repo/authz/model";

export function defineBillingRulesFor(actor: Actor): readonly Rule[] {
  const rules: Rule[] = [];

  for (const role of actor.roles) {
    if (role === "billing-admin") {
      rules.push(rule("allow", "manage", "billing.invoice"));
    } else if (role === "billing-customer") {
      rules.push(
        rule("allow", "read", "billing.invoice", { customerId: actor.id }),
        rule("allow", "issue", "billing.invoice", {
          customerId: actor.id,
          status: "draft",
        }),
      );
    }
  }

  rules.push(
    rule("deny", "void", "billing.invoice", { status: "paid" }, "paid invoices are immutable"),
  );

  return rules;
}
