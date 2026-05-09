# Bun Catalogs

Centralize external package versions in `package.json` catalogs and reference them via the `catalog:` protocol.

## Defining catalogs

```json
{
  "workspaces": {
    "catalog": {
      "@types/bun": "^1.3.6",
      "typescript": "5.9.2"
    },
    "catalogs": {
      "std": {
        "oxide.ts": "^1.1.0",
        "remeda": "^2.33.4",
        "ts-pattern": "^5.9.0",
        "valibot": "^1.2.0"
      },
      "react": {
        "react": "^19.0.0",
        "@types/react": "^19.0.0"
      },
      "ui": {
        "@pandacss/dev": "^1.8.1",
        "@ark-ui/react": "^5.30.0"
      }
    }
  }
}
```

## Using catalogs in package.json

```json
{
  "dependencies": {
    "remeda": "catalog:std",
    "react": "catalog:react",
    "typescript": "catalog:"
  }
}
```

## Rules

- Bumping a version should happen **once** in the catalog, never per-package.
- A new external dependency goes in the most relevant named catalog — create one if the domain is new.
- The unnamed `catalog` is for cross-cutting tooling (TypeScript, `@types/bun`).
