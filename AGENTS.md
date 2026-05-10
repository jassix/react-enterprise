# Agents

This document defines specialized agents for this React monorepo. Each agent has domain expertise and should be consulted for tasks within their scope.

Detailed engineering rules live in [`.agents/rules/`](./.agents/rules/) — grouped by domain. See [`.agents/rules/README.md`](./.agents/rules/README.md) for the full index.

---

## Shared Best Practices

Apply to all code in the repo.

- [Code comments](./.agents/rules/shared/comments.md) — write comments only for non-obvious logic (algorithms, hidden invariants, workarounds).
- [Imports](./.agents/rules/shared/imports.md) — `workspace:` and `catalog:` protocols, subpath imports.
- [Types](./.agents/rules/shared/types.md) — `@repo/types` and component prop pattern.
- [Tooling commands](./.agents/rules/shared/tooling.md) — Bun, Turbo, Oxlint/Oxfmt, PandaCSS.
- [Git commits](./.agents/rules/shared/git-commits.md) — conventional commits.

---

## STD Agent

**Scope**: `@repo/std` — functional programming utilities.

See [`.agents/rules/std/overview.md`](./.agents/rules/std/overview.md) for conventions and key files.

- [Remeda FP](./.agents/rules/std/remeda-fp.md) — `pipe`-based data transformation.
- [ts-pattern](./.agents/rules/std/ts-pattern.md) — exhaustive matching.
- [Result / Option](./.agents/rules/std/result-option.md) — error handling without exceptions.
- [Valibot](./.agents/rules/std/valibot.md) — runtime schema validation.

---

## UI-Kit Agent

**Scope**: `@lume/foundation` + `@lume/primitives` — PandaCSS design system.

See [`.agents/rules/ui-kit/overview.md`](./.agents/rules/ui-kit/overview.md) for conventions and key files.

- [Color system](./.agents/rules/ui-kit/colors.md) — base palette and 12-step scales.
- [Semantic tokens](./.agents/rules/ui-kit/semantic-tokens.md) — intent-based color aliases with `_dark` variants.
- [Design tokens](./.agents/rules/ui-kit/design-tokens.md) — spacing, sizes, typography, animation, radii.
- [Recipes](./.agents/rules/ui-kit/recipes.md) — `defineRecipe` and `defineSlotRecipe` patterns.
- [Component architecture](./.agents/rules/ui-kit/component-architecture.md) — Ark UI + recipe composition.

---

## Domains Agent

**Scope**: `packages/domains/*` — framework-agnostic business domains (e.g. `@repo/billing`).

See [`.agents/rules/domains/overview.md`](./.agents/rules/domains/overview.md) for conventions and key files.

- [Domain package structure](./.agents/rules/domains/structure.md) — `model/`, `operations/`, `ports/`, `use-cases/`, `fixtures.ts`.
- [Ports and adapters](./.agents/rules/domains/ports.md) — keep IO behind interfaces; adapters live in `apps/*`.
- [Cross-domain dependencies](./.agents/rules/domains/cross-domain.md) — explicit `package.json` links only; orchestration belongs to `apps/*`.

---

## Monorepo Agent

**Scope**: Workspace orchestration and tooling.

See [`.agents/rules/monorepo/overview.md`](./.agents/rules/monorepo/overview.md) for conventions and key files.

- [Repo structure](./.agents/rules/monorepo/structure.md) — `apps/`, `packages/`, `tooling/`.
- [Bun catalogs](./.agents/rules/monorepo/catalogs.md) — centralized version management.
- [Turbo tasks](./.agents/rules/monorepo/turbo.md) — pipeline configuration.
- [Config composition](./.agents/rules/monorepo/config-composition.md) — 3-tier shared configs.
- [New packages](./.agents/rules/monorepo/new-packages.md) — creation checklist.
