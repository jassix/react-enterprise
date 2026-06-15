# @repo/pokeapi-sdk

A **generated** TypeScript client for the [PokeAPI](https://pokeapi.co/), built
with [Kubb](https://kubb.dev/) from `openapi/spec.yml`. It is a self-contained
reference for the SDK-generation workflow — no app in this template consumes it
yet.

## Regenerate

```bash
bun --filter @repo/pokeapi-sdk generate   # kubb generate
```

Output lands in `src/gen/` (git-ignored) and is re-exported through subpaths:

| Import | Contents |
|---|---|
| `@repo/pokeapi-sdk` | barrel (everything) |
| `@repo/pokeapi-sdk/models` | TS types |
| `@repo/pokeapi-sdk/clients` | fetch clients |
| `@repo/pokeapi-sdk/hooks` | React Query hooks |
| `@repo/pokeapi-sdk/zod` | Zod schemas |
| `@repo/pokeapi-sdk/mocks` / `/msw` | faker mocks + MSW handlers |

The plugin set (ts, client, react-query, zod, faker, msw, cypress) is
configured in `kubb.config.ts`. Swap the spec and rerun to target a different
API.
