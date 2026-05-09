# Result / Option — `@repo/std/result`

oxide.ts re-exports for error handling without exceptions.

```typescript
import { Result, Ok, Err, Option, Some, None } from "@repo/std/result";

function parseJson<T>(str: string): Result<T, Error> {
  try {
    return Ok(JSON.parse(str));
  } catch (e) {
    return Err(e instanceof Error ? e : new Error(String(e)));
  }
}

const result = parseJson<User>(input)
  .map((user) => user.name)
  .mapErr((e) => new ValidationError(e.message));
```

## Rules

- Return `Result<T, E>` from any operation that can fail in an expected way (parsing, network, validation).
- Reserve `throw` for truly exceptional cases (programmer errors, invariant violations).
- Use `Option<T>` over `T | null | undefined` when callers must explicitly handle absence.
- Chain with `map` / `andThen` / `mapErr` rather than unwrapping early.
