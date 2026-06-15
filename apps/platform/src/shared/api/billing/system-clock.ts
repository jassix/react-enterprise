import type { Clock } from "@repo/billing/ports";

export const systemClock: Clock = {
  now: () => new Date(),
};
