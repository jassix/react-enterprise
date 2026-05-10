import type { Result } from "@repo/std/result";

import type { Rule } from "../ability";
import type { Actor } from "../model";

export type PolicyStoreError = { kind: "transport"; cause: unknown };

export interface PolicyStore {
  rulesFor(actor: Actor): Promise<Result<readonly Rule[], PolicyStoreError>>;
}
