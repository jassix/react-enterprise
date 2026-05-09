# ts-pattern — `@repo/std/match`

Exhaustive, type-safe pattern matching.

```typescript
import { match, P } from "@repo/std/match";

const getMessage = (status: Status) =>
  match(status)
    .with({ type: "loading" }, () => "Loading...")
    .with({ type: "error", code: P.number }, ({ code }) => `Error ${code}`)
    .with({ type: "success", data: P.select() }, (data) => `Got ${data}`)
    .exhaustive();
```

## Rules

- Always finish with `.exhaustive()` so missing variants become type errors.
- Use `P.select()` to extract values rather than re-destructuring inside the handler.
- Prefer `match` over chained `if/else` or `switch` whenever branching on a discriminated union.
