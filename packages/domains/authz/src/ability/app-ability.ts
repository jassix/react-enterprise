import type { MongoAbility, MongoQuery, RawRuleOf } from "@casl/ability";

import type { Action } from "../model/action";
import type { SubjectType } from "../model/subject-type";

export type Conditions = MongoQuery<Record<string, unknown>>;

export type AppAbility = MongoAbility<[Action, SubjectType], Conditions>;

export type Rule = RawRuleOf<AppAbility>;
