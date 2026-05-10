# Rules

Domain-grouped engineering rules for this monorepo. AGENTS.md is the entry point and links here for detail.

## Shared

Rules that apply to all code in the repo.

- [Code comments](./shared/comments.md)
- [Imports](./shared/imports.md)
- [Types](./shared/types.md)
- [Tooling commands](./shared/tooling.md)
- [Git commits](./shared/git-commits.md)

## STD — `@repo/std`

- [Overview, conventions, key files](./std/overview.md)
- [Remeda FP utilities](./std/remeda-fp.md)
- [ts-pattern matching](./std/ts-pattern.md)
- [Result / Option](./std/result-option.md)
- [Valibot schemas](./std/valibot.md)

## UI-Kit — `@lume/foundation` + `@lume/primitives`

- [Overview, conventions, key files](./ui-kit/overview.md)
- [Color system](./ui-kit/colors.md)
- [Semantic tokens](./ui-kit/semantic-tokens.md)
- [Design tokens](./ui-kit/design-tokens.md)
- [Recipes](./ui-kit/recipes.md)
- [Component architecture](./ui-kit/component-architecture.md)

## Domains — `packages/domains/*`

- [Overview, conventions, key files](./domains/overview.md)
- [Domain package structure](./domains/structure.md)
- [Ports and adapters](./domains/ports.md)
- [Cross-domain dependencies](./domains/cross-domain.md)

## Monorepo

- [Overview, conventions, key files](./monorepo/overview.md)
- [Repo structure](./monorepo/structure.md)
- [Bun catalogs](./monorepo/catalogs.md)
- [Turbo tasks](./monorepo/turbo.md)
- [Config composition](./monorepo/config-composition.md)
- [Creating new packages](./monorepo/new-packages.md)
