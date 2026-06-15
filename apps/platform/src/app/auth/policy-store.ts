import { defineBaseRulesFor, inMemoryPolicyStore } from "@repo/authz/policies";
import { defineBillingRulesFor } from "@repo/billing/policies";

// The composition root stacks the base rules with each domain's rule definer.
// Swap inMemoryPolicyStore for a DB-backed PolicyStore to load rules per actor.
export const policyStore = inMemoryPolicyStore([defineBaseRulesFor, defineBillingRulesFor]);
