# Type Conventions

## `@repo/types` is the only place for type utilities

`@repo/types` (located at `tooling/types/`) re-exports the entirety of [`type-fest`](https://github.com/sindresorhus/type-fest) under our own scope. **Always check it before hand-rolling a generic type helper.** Re-implementing what already exists fragments the codebase and loses out on documented, well-tested behaviour.

```ts
import type {
  ArrayValues,
  LiteralUnion,
  Merge,
  PartialDeep,
  ReadonlyDeep,
  RequireAtLeastOne,
  SetOptional,
  SetRequired,
  Simplify,
  Tagged,
  TupleToUnion,
  ValueOf,
} from "@repo/types";
```

The full export list is in `tooling/types/src/index.d.ts`.

## Anti-patterns and their replacements

| Hand-rolled / native | Use instead | Why |
|---|---|---|
| `(typeof xs)[number]` over `as const` | `ArrayValues<typeof xs>` | Stricter — enforces `readonly unknown[]`. Fails compile if `xs` isn't a tuple instead of silently producing `never`/`boolean` |
| `T \| (string & {})` (literal-with-completion hack) | `LiteralUnion<KnownLiterals, string>` | Same intent, named, documented |
| `T & {}` (object flatten hack) | `Simplify<T>` | Idiomatic; works on intersections and computed types |
| Hand-rolled brand: `string & { __brand: "X" }` | `Tagged<string, "X">` | Plus `UnwrapTagged`, `Opaque` for stricter variants |
| `Partial<T>` for nested | `PartialDeep<T>` | Recursive, correctly handles arrays/maps |
| `Readonly<T>` for nested | `ReadonlyDeep<T>` | Same |
| `T & U` followed by manual key conflict resolution | `Merge<T, U>` | Right-side wins on conflicting keys; flattened |
| Make one field optional manually | `SetOptional<T, "key">` | Self-documenting |
| Make one field required manually | `SetRequired<T, "key">` | Same |
| `T[keyof T]` for value union | `ValueOf<T>` | Same intent, named |
| Either-or input shapes via union | `RequireAtLeastOne<T, "a" \| "b">` | Encodes "at least one of these" without 2^n unions |
| `Record<string, unknown>` for "any object" | `UnknownRecord` | Same shape, named |
| `T extends unknown[] ? T[number] : never` | `TupleToUnion<T>` | Defensive variant of `ArrayValues` |
| `T extends Promise<infer U> ? U : T` | `AsyncReturnType<T>` / `Awaited<T>` | First for fn returns, second built-in for raw promises |

## When `@repo/types` doesn't have it

If you need a type utility that is **truly new** (not just a renamed type-fest one):

1. Search `tooling/types/src/extra/` first — names sometimes don't match what you'd expect.
2. If still missing, add it to `tooling/types/src/extra/<name>.d.ts` with a JSDoc block matching the type-fest style, and re-export from `index.d.ts`.
3. Never declare a generic type helper inside a feature package.

Domain-specific types (`Invoice`, `BillingPolicy`, …) are **not** generic helpers and stay in their owning package.

## Component prop pattern

Extend `HTMLStyledProps` (style props from PandaCSS) intersected with React's `ComponentProps` for the underlying element:

```ts
interface ButtonProps
  extends Omit<HTMLStyledProps<"button">, keyof ComponentProps<"button">>,
    ComponentProps<"button"> {
  variant?: "solid" | "outline" | "ghost" | "link";
}
```

The `Omit<..., keyof ComponentProps<"button">>` resolves the overlap between styled-system props and native React props in favor of React's typings.

## Enum-as-const-tuple pattern

For closed sets of string literals (roles, statuses, action types, …) use a `const` tuple paired with `ArrayValues` and a type-guard. The tuple is the runtime source of truth; the type derives from it:

```ts
import type { ArrayValues } from "@repo/types";

export const baseRoles = ["admin", "member", "guest"] as const;
export type BaseRole = ArrayValues<typeof baseRoles>;

export function isBaseRole(role: string): role is BaseRole {
  return (baseRoles as readonly string[]).includes(role);
}
```

This pattern keeps the literal list in **one place**, gives autocomplete on the union, exposes a runtime-iterable list (for UI dropdowns, validation, etc.), and ships a free type-guard. **Never** declare the union and the tuple separately — they will drift.
