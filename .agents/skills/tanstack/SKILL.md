---
name: tanstack
description: TanStack libraries — Start (full-stack React: server functions, middleware, SSR, auth, deployment), Query (server-state caching, mutations, infinite lists, optimistic updates), Table (headless logic for sorting, filtering, pagination, grouping, selection, virtualization). Triggers on imports from `@tanstack/react-start`, `@tanstack/react-query`, or `@tanstack/react-table`, or any task involving server functions, route loaders, request middleware, hydration, cached data fetching, server-state synchronization, data tables, or datagrids.
---

## Overview

This skill bundles three TanStack libraries that frequently coexist:

| Library | Package | Solves | Reference |
|---------|---------|--------|-----------|
| **Start** | `@tanstack/react-start` | Full-stack patterns: server functions, request/function middleware, SSR & hydration, auth & sessions, deployment adapters | [`start/`](./start/) |
| **Query** | `@tanstack/react-query` (v5) | Server-state caching, deduplication, refetching, mutations, optimistic updates, infinite lists, prefetching, SSR hydration | [`query.md`](./query.md) |
| **Table** | `@tanstack/react-table` (v8) | Headless data-grid logic: sorting, filtering, pagination, grouping, expanding, row selection, column pinning/visibility/resizing, virtualization | [`table.md`](./table.md) |

They share design philosophy (headless, framework-agnostic, options-object APIs) but no runtime code. A typical full-stack screen wires Start (route + server fn) → Query (cache the result) → Table (render & manipulate).

## When to load which reference

Read **`start/`** rules when the task involves:
- `createServerFn`, `useServerFn`, server function input validation, error handling
- Request middleware (`createMiddleware`), auth middleware, context propagation
- Route loaders, `beforeLoad`, route protection
- SSR streaming, hydration safety, prerendering / ISR
- API routes (`createAPIFileRoute`)
- Environment functions, deployment adapters, `.functions.ts` file separation

Read **`query.md`** when the task involves:
- `useQuery` / `useMutation` / `useInfiniteQuery` / `useSuspenseQuery` / `useQueries`
- `queryOptions` / `mutationOptions` factories
- Query keys, invalidation, prefetching, optimistic updates, `setQueryData`
- `QueryClient` / `QueryClientProvider` setup, SSR hydration via `<HydrationBoundary>`
- Files matching `**/api/queries/*.query.ts`, `**/api/mutations/*.mutation.ts`

Read **`table.md`** when the task involves:
- `useReactTable`, `createColumnHelper`, `flexRender`
- Column definitions, row models (`getCoreRowModel`, `getSortedRowModel`, …)
- Sorting, filtering, pagination, grouping, expanding, row selection, column pinning/visibility/resizing
- Server-side mode (`manualSorting` / `manualFiltering` / `manualPagination`)
- Integration with `@tanstack/react-virtual` for virtualization

Read **multiple** when wiring a server-side data table: a Start route loader hands off to a `useQuery` (Query), whose result feeds `useReactTable` in `manual*` mode (Table). All three keys/state must stay in sync.

## Critical rules (load these even if not reading the full reference)

These rules cause the most pain when violated and are easy to forget.

### 1. Use `createServerFn` for server-side logic

Don't reach for raw `fetch` + `/api/*` when a typed RPC will do. Server functions give you input validation, automatic serialization, and code-splitting (server code never reaches the client bundle).

```tsx
export const createPost = createServerFn({ method: "POST" })
  .inputValidator(createPostSchema)
  .handler(async ({ data }) => db.posts.create({ data }));
```

Full pattern + GET/POST guidance: [`start/sf-create-server-fn.md`](./start/sf-create-server-fn.md). Always validate inputs: [`start/sf-input-validation.md`](./start/sf-input-validation.md).

### 2. Memoize `data` and `columns` for `useReactTable`

New references on every render cause infinite re-renders. This is the #1 reported `react-table` bug.

```tsx
// WRONG — new array every render
const table = useReactTable({
  data: query.data?.results,
  columns: [{ accessorKey: "name" }],
});

// CORRECT
const columns = useMemo(() => [...], []);
const data = useMemo(() => query.data?.results ?? [], [query.data]);
const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
```

When the data source is a `useQuery`, fall back to a stable empty array while loading — passing `undefined` will throw inside `useReactTable`.

### 3. Use the `queryOptions` / `mutationOptions` factory pattern

Repo convention: every query/mutation is a factory function. **Never** pass `{ queryKey, queryFn }` inline to `useQuery`.

```tsx
// entities/user/api/queries/users.query.ts
export const usersQueryOptions = (filters: { role?: string }) =>
  queryOptions({
    queryKey: ["users", { filters }],
    queryFn: () => api.users.list(filters),
    staleTime: 60_000,
  });

// In components — and in prefetch/invalidate calls
const { data } = useQuery(usersQueryOptions({ role: "admin" }));
queryClient.prefetchQuery(usersQueryOptions({ role: "admin" }));
queryClient.invalidateQueries({ queryKey: ["users"] });
```

Co-locate factories under `<slice>/api/queries/` and `<slice>/api/mutations/` per FSD. Keys are array-based and hierarchical: `["users"]`, `["users", { filters }]`, `["users", "detail", id]`.

### 4. `placeholderData` ≠ `initialData`

For pagination "keep previous data" UX, use `placeholderData: (prev) => prev`. `initialData` is treated as **fresh** and bypasses the initial fetch — exactly the wrong behavior for paginated lists.

```tsx
useQuery({
  queryKey: ["todos", page],
  queryFn: () => fetchTodos(page),
  placeholderData: (prev) => prev,   // keeps previous page visible during fetch
  // initialData: prev,              // marks data as already-fresh; no fetch fires
});
```

### 5. Server functions need explicit auth — `beforeLoad` is not enough

A protected route stops navigation, but server functions can be called directly via RPC. Always re-verify auth inside the handler (or via a function middleware).

See [`start/auth-route-protection.md`](./start/auth-route-protection.md) and [`start/auth-session-management.md`](./start/auth-session-management.md).

## Decision shortcuts

- **Need server-only logic from a component or loader?** → `createServerFn` (Start). See [`start/sf-create-server-fn.md`](./start/sf-create-server-fn.md).
- **Need `data`, want it cached on the client?** → `useQuery` (or `useSuspenseQuery` inside a `Suspense` boundary).
- **Need to write/POST/PATCH?** → `useMutation`. Don't forget `invalidateQueries` (or `setQueryData`) in `onSuccess`/`onSettled`.
- **List too long for the DOM?** → `useReactTable` + `useVirtualizer` from `@tanstack/react-virtual`. See `table.md` → "Virtualization Integration".
- **Backend already paginates / sorts / filters?** → table in `manual*` mode, query keyed on `[entity, { sort, filter, page }]`. Both libs stay in sync because the query key changes drive the refetch.
- **Need row data on hover before navigating?** → `queryClient.prefetchQuery(<options factory>)`.
- **Server component / route loader?** → `queryClient.ensureQueryData(<options factory>)` then `<HydrationBoundary state={dehydrate(queryClient)}>`. Hydration safety: [`start/ssr-hydration-safety.md`](./start/ssr-hydration-safety.md).
- **Cross-cutting concern (logging, request context, auth)?** → request middleware. See [`start/mw-request-middleware.md`](./start/mw-request-middleware.md).

## Cross-cutting gotcha checklist

Before shipping anything that uses these libs:

- [ ] **Start**: every server function validates input ([`start/sf-input-validation.md`](./start/sf-input-validation.md)).
- [ ] **Start**: secrets and DB clients live in `.server.ts` / `.functions.ts` files only ([`start/file-separation.md`](./start/file-separation.md)).
- [ ] **Start**: SSR-rendered output matches client output — no `Date.now()`, `Math.random()`, or `typeof window` branches at render time ([`start/ssr-hydration-safety.md`](./start/ssr-hydration-safety.md)).
- [ ] **Query**: keys are arrays and include every parameter that affects the result (filters, IDs, page).
- [ ] **Query**: mutations either `invalidateQueries` or `setQueryData` on success — silent staleness is the most common bug.
- [ ] **Query**: optimistic updates `cancelQueries` first, snapshot via `getQueryData`, return the snapshot in `onMutate`, restore in `onError`.
- [ ] **Query**: tests use a fresh `QueryClient` per test with `retry: false` and `gcTime: Infinity`.
- [ ] **Table**: `data` and `columns` are memoized (or stable references).
- [ ] **Table**: server-side mode omits `getSortedRowModel` / `getFilteredRowModel` / `getPaginationRowModel` — including them double-processes already-server-sorted data.

## Start rule index

Detail rules live under [`start/`](./start/), grouped by prefix:

### Server functions (`sf-`)
- [`sf-create-server-fn`](./start/sf-create-server-fn.md) — use `createServerFn` for server-side logic
- [`sf-input-validation`](./start/sf-input-validation.md) — always validate inputs

### Middleware (`mw-`)
- [`mw-request-middleware`](./start/mw-request-middleware.md) — request middleware for cross-cutting concerns

### Authentication (`auth-`)
- [`auth-session-management`](./start/auth-session-management.md) — secure session handling
- [`auth-route-protection`](./start/auth-route-protection.md) — protect routes via `beforeLoad`

### SSR (`ssr-`)
- [`ssr-hydration-safety`](./start/ssr-hydration-safety.md) — prevent hydration mismatches
- [`ssr-streaming`](./start/ssr-streaming.md) — streaming SSR for faster TTFB
- [`ssr-prerender`](./start/ssr-prerender.md) — static prerendering and ISR

### API routes (`api-`)
- [`api-routes`](./start/api-routes.md) — when to expose an API route vs a server fn

### Errors (`err-`)
- [`err-server-errors`](./start/err-server-errors.md) — handle server function errors

### Environment (`env-`)
- [`env-functions`](./start/env-functions.md) — environment functions for configuration

### File organization (`file-`)
- [`file-separation`](./start/file-separation.md) — separate server and client code

### Deployment (`deploy-`)
- [`deploy-adapters`](./start/deploy-adapters.md) — choose the right deployment adapter

For Query / Table specifics, open [`query.md`](./query.md) or [`table.md`](./table.md).
