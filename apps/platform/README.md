# @repo/platform

Main React application. Built with **TanStack Start** (Vite + Nitro, file-based
routing, SSR-capable) following **Feature-Sliced Design v2.1**.

## Run

```bash
bun --filter @repo/platform dev        # http://localhost:3000
bun --filter @repo/platform build      # production build → .output/
bun --filter @repo/platform start      # serve the built app via Nitro
bun --filter @repo/platform check-types
```

## Layout

```
src/
  routes/     # TanStack Start file-based router (thin wrappers only)
  router.tsx  # router instance factory
  client.tsx  # browser hydration entry
  app/        # FSD app layer — providers, global styles
  pages/      # FSD pages layer — actual page components
  shared/     # FSD shared layer — config, lib (UI lives in @lume/primitives)
```

`routes/*.tsx` files import a page component from `@/pages/<slice>` and
do nothing else — keep all UI, data, and state inside the FSD page slice.

Add `widgets/`, `features/`, `entities/` only when code is genuinely reused
across 2+ pages and the team agrees it's worth extracting.
