import { subject } from "@repo/authz/ability";
import type { AppAbility } from "@repo/authz/ability";
import type { Invoice } from "@repo/billing/model";
import type { BillingPolicy, Forbidden } from "@repo/billing/ports";
import { Err, Ok } from "@repo/std/result";
import type { Result } from "@repo/std/result";

// Adapts the one shared Ability into the BillingPolicy port the domain expects.
// The same Ability instance backs <Can> in the UI and these checks in use-cases.
export function makeBillingPolicy(ability: AppAbility): BillingPolicy {
  return {
    canIssue: (invoice) => check(ability, "issue", invoice),
    canVoid: (invoice) => check(ability, "void", invoice),
  };
}

function check(
  ability: AppAbility,
  action: "issue" | "void",
  invoice: Invoice,
): Result<void, Forbidden> {
  const tagged = subject("billing.invoice", invoice);
  if (ability.can(action, tagged)) return Ok(undefined);
  return Err({
    kind: "forbidden",
    reason: ability.relevantRuleFor(action, tagged)?.reason ?? "no rule allows this action",
  });
}
