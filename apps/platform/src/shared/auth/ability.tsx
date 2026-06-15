import { AbilityProvider, useAbility as useCaslAbility } from "@casl/react";

import type { AppAbility } from "@repo/authz/ability";

export { AbilityProvider };

// Typed wrapper around @casl/react's context hook so consumers get AppAbility.
export function useAbility(): AppAbility {
  return useCaslAbility<AppAbility>();
}
