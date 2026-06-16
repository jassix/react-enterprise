# Tooling Commands

## Package manager — Bun

```bash
bun install        # install all workspace dependencies
bun add <pkg>      # add runtime dependency
bun add -d <pkg>   # add dev dependency
```

## Task runner — Turbo

```bash
turbo run build         # build all packages
turbo run dev           # start dev servers (persistent, no cache)
turbo run lint          # lint all packages
turbo run check-types   # type-check all packages
```

## Linting & formatting — Oxc

```bash
turbo run lint               # per-package, type-aware (the canonical command)
oxlint -c .oxlintrc.json .   # root/pre-commit path (syntax-only, no type info)
oxfmt --write .              # format
oxfmt --check .              # verify formatting (CI)
```

### oxlint policy

- **Maximal categories**: `correctness`, `suspicious`, `perf`, `pedantic`, and
  `style` are all `error`. `nursery` is off; `restriction` is curated, not a
  blanket category.
- **Type-aware** runs per package via the package `lint` script
  (`oxlint --type-aware .`, powered by `oxlint-tsgolint`, which reads the
  package's `tsconfig.json`). It keeps the high-value bug-catchers
  (`no-floating-promises`, `no-misused-promises`, `await-thenable`,
  `no-deprecated`, `prefer-nullish-coalescing`) and disables the famously-noisy
  ones (`strict-boolean-expressions`, `no-unsafe-*`, `require-await`). The
  pre-commit hook lints staged files from the root **without** type info (no
  single tsconfig there); full type-aware enforcement is `turbo run lint` + CI.
  Type-aware requires baseUrl-free tsconfigs (tsgo dropped `baseUrl`).
- **Curated disabled-list** (`base.oxlintrc.json`): rules are turned off only
  when they contradict the codebase's idioms (named exports, FP factories like
  `Ok`/`Some`, prop-spreading primitives, intentional `cause` catch names) or
  the strict tsconfig (`no-useless-return` vs `noImplicitReturns`,
  `no-useless-undefined`). Each entry carries a one-line reason.
- **Two oxlint gotchas** baked into the configs:
  1. `plugins` *overwrites* the default set, so each tier lists the full set.
  2. `ignorePatterns` is **not inherited via `extends`** — it must live in each
     directly-invoked config (the root config and any package config that owns
     generated output). Patterns are gitignore-style bare names
     (`styled-system`, `gen`, `luma`), **not** `**/...` globs.

### Per-package configs

Every source package has its own `.oxlintrc.json` extending a preset — `react`
(browser + react/jsx-a11y/react-perf) or `bun` (node + Bun global) — and a
`"lint": "oxlint --type-aware ."` script. Tests and Storybook files get
overrides (hooks-in-render, demo data, Bun-test promise patterns).

## PandaCSS codegen

```bash
panda codegen   # regenerate styled-system; run from @lume/foundation after token/recipe changes
```
