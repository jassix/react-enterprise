# Monorepo — Overview

Workspace orchestration: Bun workspaces + Turbo + shared tooling configs.

## Conventions

1. Use the `workspace:` protocol for internal dependencies.
2. Use the `catalog:` protocol for external dependencies with shared versions.
3. Extend shared configs (`@repo/tsconfig`, oxlint base) — never duplicate compiler/linter settings per package.
4. Add new packages to the appropriate glob in `workspaces.packages`.
5. Follow conventional commits (enforced by commitlint).
6. Run `bun run format` (oxfmt) to keep `package.json` keys and all source formatted.

## Key files

- `package.json` — workspace definition and catalogs
- `turbo.json` — task pipeline configuration
- `.config/lefthook.yaml` — git hooks (commitlint, cspell, oxlint, oxfmt)
- `tooling/config/typescript/` — shared TypeScript configs
- `tooling/config/oxlint/` — shared lint configs
- `.oxlintrc.json` — root lint config
- `.oxfmtrc.json` — root format config

## Detail rules

- [Repo structure](./structure.md)
- [Bun catalogs](./catalogs.md)
- [Turbo tasks](./turbo.md)
- [Config composition](./config-composition.md)
- [Creating new packages](./new-packages.md)
