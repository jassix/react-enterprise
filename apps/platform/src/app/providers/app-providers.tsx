import type { ReactNode } from "react";

import { demoAbility } from "@/app/auth";
import { AbilityProvider } from "@/shared/auth";

export function AppProviders({ children }: { children: ReactNode }) {
  return <AbilityProvider value={demoAbility}>{children}</AbilityProvider>;
}
