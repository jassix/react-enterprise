import { rule, type Rule } from "../ability";
import type { Actor } from "../model";

export function defineBaseRulesFor(actor: Actor): readonly Rule[] {
  const rules: Rule[] = [];

  for (const role of actor.roles) {
    if (role === "admin") {
      rules.push(rule("allow", "manage", "all"));
    } else if (role === "member") {
      rules.push(rule("allow", "read", "all"));
    }
    // "guest" intentionally has no rules — default-deny applies.
  }

  return rules;
}
