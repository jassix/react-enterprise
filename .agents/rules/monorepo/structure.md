# Repo Structure

```
apps/                          # Application packages
├── platform/                  # Main React app (TanStack Start)
├── docs/                      # Documentation site
└── web/                       # Additional web app

packages/
├── std/                       # @repo/std    — FP utilities
├── types/                     # @repo/types  — shared types
├── ui/
│   ├── foundation/            # @lume/foundation — design tokens / recipes
│   └── primitives/            # @lume/primitives — React components
├── sdk/
│   └── pokeapi/               # @repo/pokeapi-sdk — generated API client
└── domains/                   # framework-agnostic business domains
    └── billing/               # @repo/billing — reference implementation

tooling/
└── config/
    ├── typescript/            # @repo/tsconfig — shared TS configs
    └── oxlint/                # shared lint configs
```

Workspace globs in the root `package.json` cover `packages/*`, `packages/ui/*`, `packages/sdk/*`, and `packages/domains/*`. Adding a new grouping folder requires a matching glob.

## Where new code goes

- **A reusable runtime util** → `packages/std` (or a new `@repo/*` package if non-functional).
- **A shared TypeScript type** → `packages/types`.
- **A design token / recipe** → `packages/ui/foundation`.
- **A React component** → `packages/ui/primitives`.
- **A generated API client** → `packages/sdk/<name>`.
- **A bounded business domain** (model + use-cases, no framework) → `packages/domains/<name>`. See [`../domains/overview.md`](../domains/overview.md) for the promotion criteria.
- **App-specific code** → the relevant `apps/*` package; do not promote prematurely.
