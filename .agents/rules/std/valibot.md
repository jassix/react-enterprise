# Valibot — `@repo/std/schema`

Type-safe schema definitions for runtime validation at system boundaries.

```typescript
import schema, { object, string, number, email, parse } from "@repo/std/schema";

const UserSchema = object({
  name: string(),
  email: string([email()]),
  age: number(),
});

type User = schema.InferOutput<typeof UserSchema>;

const user = parse(UserSchema, data);
```

## Rules

- Define a schema for any value crossing a runtime boundary: HTTP responses, form submissions, `localStorage`, URL params, env vars.
- Derive the TypeScript type from the schema with `schema.InferOutput` — never declare them separately.
- Validate at the boundary, then trust the typed value internally.
