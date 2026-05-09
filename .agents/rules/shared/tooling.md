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
oxlint -c .oxlintrc.json .   # lint
oxfmt --write .              # format
oxfmt --check .              # verify formatting (CI)
```

## PandaCSS codegen

```bash
panda codegen   # regenerate styled-system; run from @lume/foundation after token/recipe changes
```
