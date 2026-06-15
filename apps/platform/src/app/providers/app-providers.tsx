import type { ReactNode } from "react";

import { ThemeProvider } from "@lume/primitives";

import { demoAbility } from "@/app/auth";
import { AbilityProvider } from "@/shared/auth";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light">
      <AbilityProvider value={demoAbility}>{children}</AbilityProvider>
    </ThemeProvider>
  );
}
