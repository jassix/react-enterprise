import { createMongoAbility } from "@casl/ability";

import type { Action } from "../model/action";
import type { Actor } from "../model";
import type { SubjectType } from "../model/subject-type";
import type { AppAbility, Rule } from "./app-ability";

export function defineAbilityFor(_actor: Actor, rules: readonly Rule[]): AppAbility {
  return createMongoAbility<AppAbility>(rules as Rule[]);
}

export function rule(
  effect: "allow" | "deny",
  action: Action | Action[] | "manage",
  subject: SubjectType | SubjectType[] | "all",
  conditions?: Record<string, unknown>,
  reason?: string,
): Rule {
  return {
    action,
    subject,
    ...(conditions ? { conditions } : {}),
    ...(effect === "deny" ? { inverted: true } : {}),
    ...(reason ? { reason } : {}),
  } as Rule;
}
