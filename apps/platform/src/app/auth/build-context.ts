import { defineAbilityFor } from "@repo/authz/ability";
import type { AppAbility } from "@repo/authz/ability";
import type { Actor } from "@repo/authz/model";
import type { BillingPolicy } from "@repo/billing/ports";

import { makeBillingPolicy } from "@/shared/auth";

import { policyStore } from "./policy-store";

export interface RequestContext {
  actor: Actor;
  ability: AppAbility;
  billingPolicy: BillingPolicy;
}

// Per-request composition root: load rules once, build one Ability, derive the
// domain policy ports from it. The same ability is provided to the React tree.
export async function buildRequestContext(actor: Actor): Promise<RequestContext> {
  const stored = await policyStore.rulesFor(actor);
  const rules = stored.unwrap();
  const ability = defineAbilityFor(actor, rules);
  return { actor, ability, billingPolicy: makeBillingPolicy(ability) };
}
