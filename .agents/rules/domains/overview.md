# Domains — Overview

A **domain package** captures business semantics in a framework-agnostic, reusable form. Each domain is a separate workspace package living under `packages/domains/<name>` and published internally as `@repo/<name>`.

A package belongs in `domains/` if **all** of the following are true:

1. It models a bounded business concept (billing, auth, catalog, ...).
2. It is — or will plausibly become — consumed by **more than one** `apps/*` package, or needs to be unit-tested without the surrounding app.
3. It does **not** depend on a UI framework, an HTTP client, or any other concrete IO. All side-effects live behind ports.

If any of those is false, keep the code inside the consuming `apps/*` package. Do not create a domain "just in case" — promote when a real second consumer or testing pain appears.

## Conventions

1. **No React, no fetch, no storage.** A domain package never imports `react`, `@tanstack/*`, `axios`, `localStorage`, etc. Side-effects live behind **ports** (TS interfaces); apps provide adapters.
2. **Schema-first model.** Every domain type is defined as a Valibot schema (`@repo/std/schema`); the TS type is derived via `schema.InferOutput`. Never declare the type and the schema separately.
3. **Result over throw.** Operations and use-cases that can fail in expected ways return `Result<T, E>` from `@repo/std/result`. Reserve `throw` for invariant violations.
4. **Subpath exports only.** A domain package exposes its public surface through subpaths — `@repo/<name>/model`, `@repo/<name>/use-cases`, `@repo/<name>/ports`, `@repo/<name>/fixtures` — never a single barrel.
5. **One package per domain.** Sibling domains do **not** import from each other directly. If `@repo/billing` needs `User`, it depends on `@repo/auth` explicitly via `package.json`, or the shared concept is extracted to `@repo/types`.
6. **Fixtures are public API.** Each domain ships factory functions in `fixtures.ts` so apps and tests build valid sample data without re-implementing it.

## Key files

- `packages/domains/<name>/src/model/` — Valibot schemas + inferred types.
- `packages/domains/<name>/src/operations/` — pure functions over the model.
- `packages/domains/<name>/src/ports/` — interfaces describing required IO.
- `packages/domains/<name>/src/use-cases/` — orchestrations that compose operations + ports.
- `packages/domains/<name>/src/fixtures.ts` — factories for tests and Storybook.
- `packages/domains/billing/` — canonical reference implementation.

## Detail rules

- [Domain package structure](./structure.md)
- [Ports and adapters](./ports.md)
- [Cross-domain dependencies](./cross-domain.md)
