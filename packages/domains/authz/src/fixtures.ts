import type { Actor } from "./model";

export function aActor(overrides: Partial<Actor> = {}): Actor {
  return { id: "user_1", roles: ["customer"], attributes: {}, ...overrides };
}
