# Testing

Tests run on **Bun's built-in test runner** (`bun test`). Each package that
has tests declares `"test": "bun test"`; `turbo run test` (or `bun run test`
at the root) runs them across the workspace.

## Where tests live

- Co-locate unit tests next to the code as `*.test.ts` (e.g.
  `src/use-cases/issue-invoice.test.ts`). They are picked up by `bun test` and
  type-checked by the package's `tsc --noEmit` because `include` covers `src`.
- The package's `tsconfig.json` must list `"bun"` in `compilerOptions.types`
  (alongside `@repo/types/reset`) so `bun:test` and Bun globals resolve.
- Larger suites may use a `tests/` directory; add it to `include` if so (see
  `tooling/cli`).

## How to test a domain

Domains are designed to be tested without their app. Inject **in-memory
adapters** for ports — do **not** reach for a mocking library.

- Build sample data with the domain's `fixtures.ts` factories.
- Satisfy each port with a small hand-written stub the test controls (an
  in-memory repository backed by a `Map`, a fixed `Clock`, an allow/deny
  policy, a recording notifier).
- Assert on the `Result`: `expect(result.isOk()).toBe(true)` then
  `result.unwrap()`, or `result.unwrapErr().kind` for the error variant.

`packages/domains/billing/src/use-cases/use-cases.test.ts` is the reference:
it exercises `issueInvoice`/`voidInvoice` through in-memory adapters and
covers the happy path, policy denial, not-found, and invalid-transition cases.

## Scope

- **Unit** — pure operations and use-cases (with in-memory ports). The bulk.
- **Smoke** — that a re-export package exposes its surface (see
  `packages/std/src/std.test.ts`).
- **E2E** — browser flows belong in the consuming app, not here.
