# `@repo/std` — Overview

Functional programming utilities re-exported through focused subpaths.

## Subpaths

- `@repo/std/fp` — Remeda data-pipeline helpers
- `@repo/std/match` — ts-pattern exhaustive matching
- `@repo/std/result` — oxide.ts Result/Option
- `@repo/std/schema` — Valibot runtime schemas

## Conventions

1. Use subpath imports (`@repo/std/fp`), never the barrel.
2. Prefer `pipe` over method chaining.
3. Use `Result<T, E>` for fallible operations instead of `throw`.
4. Use `Option<T>` for nullable values that need explicit handling.
5. Define a Valibot schema next to any type that crosses a runtime boundary.

## Key files

- `packages/std/src/fp.ts` — Remeda re-exports
- `packages/std/src/match.ts` — ts-pattern re-exports
- `packages/std/src/result.ts` — oxide.ts re-exports
- `packages/std/src/schema.ts` — Valibot re-exports
- `packages/std/package.json` — subpath `exports` configuration

## Detail rules

- [Remeda FP utilities](./remeda-fp.md)
- [ts-pattern matching](./ts-pattern.md)
- [Result / Option](./result-option.md)
- [Valibot validation](./valibot.md)
