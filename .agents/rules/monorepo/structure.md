# Repo Structure

```
apps/                          # Application packages
├── platform/                  # Main React app (TanStack Start)
├── docs/                      # Documentation site
└── web/                       # Additional web app

packages/
├── std/                       # @repo/std    — FP utilities
├── types/                     # @repo/types  — shared types
└── ui/
    ├── foundation/            # @lume/foundation — design tokens / recipes
    └── primitives/            # @lume/primitives — React components

tooling/
└── config/
    ├── typescript/            # @repo/tsconfig — shared TS configs
    └── oxlint/                # shared lint configs
```

## Where new code goes

- **A reusable runtime util** → `packages/std` (or a new `@repo/*` package if non-functional).
- **A shared TypeScript type** → `packages/types`.
- **A design token / recipe** → `packages/ui/foundation`.
- **A React component** → `packages/ui/primitives`.
- **App-specific code** → the relevant `apps/*` package; do not promote prematurely.
