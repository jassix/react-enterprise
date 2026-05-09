# Turbo Tasks

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint":        { "dependsOn": ["^lint"] },
    "check-types": { "dependsOn": ["^check-types"] },
    "dev":         { "cache": false, "persistent": true }
  }
}
```

## Rules

- `^build` means "build all upstream dependencies first" — keep this for any task that consumes built artifacts.
- Always declare `outputs` for cacheable tasks; tasks with no `outputs` cache stdout only.
- `dev`-style long-running tasks must set `"cache": false, "persistent": true`.
- New scripts in package.json that should run repo-wide need a matching entry in `turbo.json`.
