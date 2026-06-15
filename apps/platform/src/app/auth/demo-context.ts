import { defineAbilityFor } from "@repo/authz/ability";
import type { AppAbility } from "@repo/authz/ability";
import type { Actor } from "@repo/authz/model";
import { defineBaseRulesFor } from "@repo/authz/policies";
import { defineBillingRulesFor } from "@repo/billing/policies";

// A fixed actor so the demo page renders without auth. The billing-admin role
// grants `manage` on billing.invoice; the deny rule still blocks voiding paid
// invoices, which is visible in the UI via <Can I="void">.
export const demoActor: Actor = {
  id: "cus_1",
  roles: ["member", "billing-admin"],
  attributes: {},
};

// Built synchronously here (rule definers are pure) for a client-only demo;
// buildRequestContext() shows the async, PolicyStore-backed path for real apps.
export const demoAbility: AppAbility = defineAbilityFor(demoActor, [
  ...defineBaseRulesFor(demoActor),
  ...defineBillingRulesFor(demoActor),
]);
