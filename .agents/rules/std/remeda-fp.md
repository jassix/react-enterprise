# Remeda FP — `@repo/std/fp`

Pipe-based composition for data transformation.

```typescript
import { pipe, map, filter, groupBy, sortBy, unique } from "@repo/std/fp";

const result = pipe(
  users,
  filter((u) => u.active),
  map((u) => u.name),
  sortBy((name) => name),
  unique(),
);
```

## Rules

- Prefer `pipe` over method chaining or imperative loops for any non-trivial transformation.
- Each step should be a single responsibility (one `map`, one `filter`, one `sortBy`).
- Reach for Remeda before writing a hand-rolled reducer.
