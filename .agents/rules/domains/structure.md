# Domain Package Structure

```
packages/domains/<name>/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts          # re-exports model + use-cases for the default subpath
    ├── model/            # Valibot schemas + InferOutput types
    │   ├── index.ts
    │   └── <entity>.ts
    ├── operations/       # pure functions over the model (Result-returning)
    │   ├── index.ts
    │   └── <verb>.ts
    ├── ports/            # interfaces describing required IO
    │   ├── index.ts
    │   └── <port>.ts
    ├── use-cases/        # compositions of operations + ports
    │   ├── index.ts
    │   └── <verb>.ts
    └── fixtures.ts       # factories for tests / Storybook
```

## `package.json` template

```jsonc
{
  "name": "@repo/<name>",
  "type": "module",
  "private": true,
  "exports": {
    ".":           { "import": "./src/index.ts",            "types": "./src/index.ts" },
    "./model":     { "import": "./src/model/index.ts",      "types": "./src/model/index.ts" },
    "./operations":{ "import": "./src/operations/index.ts", "types": "./src/operations/index.ts" },
    "./ports":     { "import": "./src/ports/index.ts",      "types": "./src/ports/index.ts" },
    "./use-cases": { "import": "./src/use-cases/index.ts",  "types": "./src/use-cases/index.ts" },
    "./fixtures":  { "import": "./src/fixtures.ts",         "types": "./src/fixtures.ts" }
  },
  "dependencies": {
    "@repo/std": "workspace:"
  },
  "devDependencies": {
    "@repo/tsconfig": "workspace:",
    "@repo/types":    "workspace:",
    "@types/bun":     "catalog:"
  },
  "peerDependencies": {
    "typescript": "catalog:"
  }
}
```

## `tsconfig.json` template

```jsonc
{
  "extends": "@repo/tsconfig/bun.tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "types": ["@repo/types/reset"],
    "paths": { "~/*": ["./src/*"] }
  },
  "include": ["src/**/*"]
}
```

## Folder rules

- **`model/`** — schema is the source of truth. Type alias is always `type X = schema.InferOutput<typeof XSchema>`; never declared independently. Validators (`brand`, `pipe`, `minLength`) live next to the schema.
- **`operations/`** — pure, synchronous, no IO. Total/partial functions over model values. Errors as `Result<T, E>` with a discriminated `E`.
- **`ports/`** — interfaces only. Method signatures return `Promise<Result<T, E>>` for fallible IO; `Promise<T>` is reserved for infallible IO (e.g. `Clock.now()`). No default implementations.
- **`use-cases/`** — accept ports as a typed dependency object (first arg) and a typed input (second arg). Always async. Compose `operations` + `ports` and return `Promise<Result<T, E>>`.
- **`fixtures.ts`** — `aThing(overrides?: Partial<Thing>) => Thing` factories. Provide one factory per entity. Fixtures must produce values that pass their schema.
- **`policies/`** — *opt-in* subpath that publishes the domain's role definitions and rule contributions for `@repo/authz`. Only this subpath may import `@repo/authz/ability`. The domain core (`model`, `operations`, `ports`, `use-cases`) stays authz-free so apps that don't authorize via CASL tree-shake it away.

## Type helpers

Generic type utilities (`ArrayValues`, `Simplify`, `LiteralUnion`, `Tagged`, `PartialDeep`, `Merge`, …) come from `@repo/types` — never re-implement them inside a domain. See [`shared/types.md`](../shared/types.md) for the full catalog and anti-patterns. In particular, **role / status / action enums** must use the const-tuple + `ArrayValues` pattern documented there — `(typeof xs)[number]` is forbidden.
