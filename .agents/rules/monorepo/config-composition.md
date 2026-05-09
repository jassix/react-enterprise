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
tooling/config/oxlint/base.oxlintrc.json   — base rules
tooling/config/oxlint/react.oxlintrc.json  — React rules (extends base)
.oxlintrc.json                              — root config (extends react)
```

## Rule

If you need a one-off compiler/linter setting, ask whether it belongs in the **shared preset** instead. Per-package overrides are a code smell — they signal a missing preset.
