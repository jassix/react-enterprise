import { Ok } from "@repo/std/result";

import type { Rule } from "../ability";
import type { Actor } from "../model";
import type { PolicyStore } from "../ports";

export type RuleDefiner = (actor: Actor) => readonly Rule[];

export function inMemoryPolicyStore(definers: readonly RuleDefiner[]): PolicyStore {
  return {
    async rulesFor(actor) {
      const all: Rule[] = [];
      for (const definer of definers) all.push(...definer(actor));
      return Ok(all);
    },
  };
}
