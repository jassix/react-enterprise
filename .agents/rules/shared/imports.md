# Import Conventions

## Workspace vs catalog protocols

```jsonc
// package.json
{
  "dependencies": {
    // Internal workspace packages — use workspace: protocol
    "@repo/std": "workspace:",
    "@lume/foundation": "workspace:",

    // External packages — use catalog: protocol for centralized version management
    "remeda": "catalog:std",        // named catalog
    "@ark-ui/react": "catalog:ui",  // named catalog
    "react": "catalog:react",       // named catalog
    "typescript": "catalog:",       // default catalog (no name)
    "@types/bun": "catalog:"
  }
}
```

## Subpath imports over barrels

Prefer specific subpath imports — they keep tree-shaking effective and signal intent.

```typescript
// Good — specific subpaths
import { pipe, map } from "@repo/std/fp";
import { match } from "@repo/std/match";
import { Result, Ok, Err } from "@repo/std/result";

// Avoid — barrel import
import * as std from "@repo/std";
```
