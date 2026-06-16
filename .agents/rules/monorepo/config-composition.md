# Config Composition (3-Tier)

```
tooling/config/   →   Root config   →   Package config
(base configs)        (extends)         (extends)
```

Each package extends a shared config — never inlines a full config.

## TypeScript

```jsonc
// tooling/config/typescript/base.tsconfig.json
{ "compilerOptions": { "strict": true, /* ... */ } }

// tooling/config/typescript/react.tsconfig.json
{
  "extends": "./base.tsconfig.json",
  "compilerOptions": { "jsx": "react-jsx" }
}

// packages/ui/primitives/tsconfig.json
{ "extends": "@repo/tsconfig/react.tsconfig.json" }
```

## Oxlint

```
tooling/config/oxlint/base.oxlintrc.json   — categories + curated disabled-list
tooling/config/oxlint/react.oxlintrc.json  — React preset (extends base)
tooling/config/oxlint/bun.oxlintrc.json    — Node/Bun preset (extends base)
.oxlintrc.json                              — root config (extends react), pre-commit
<pkg>/.oxlintrc.json                         — per package, extends bun|react preset
```

Each source package extends the matching preset and runs `oxlint --type-aware .`.
Two caveats are baked in (see [`../shared/tooling.md`](../shared/tooling.md)):
`plugins` *overwrites* (each tier lists the full set), and `ignorePatterns` is
**not inherited via `extends`** (it lives in each directly-invoked config).

## Rule

If you need a one-off compiler/linter setting, ask whether it belongs in the **shared preset** instead. Per-package overrides are a code smell — they signal a missing preset.
