# @myorg/oxlint

Shared oxlint and oxfmt configurations for the monorepo.

## Configurations

### Linting (oxlint)

- **base.oxlintrc.json** - Base rules for all packages (TypeScript, unicorn, import, oxc plugins)
- **react.oxlintrc.json** - React-specific rules (extends base, adds react, jsx-a11y plugins)
- **bun.oxlintrc.json** - Bun/Node-specific rules (extends base, adds Bun globals)

### Formatting (oxfmt)

- **base.oxfmtrc.json** - Formatter configuration (tabs, single quotes, no semicolons)

## Usage

### Root Configuration

Create `.oxlintrc.json` in your project root:

```json
{
  "extends": ["./node_modules/@myorg/oxlint/base.oxlintrc.json"]
}
```

Create `.oxfmtrc.json` in your project root:

```json
{
  "extends": "./node_modules/@myorg/oxlint/base.oxfmtrc.json"
}
```

### Package-Specific Configuration

For React packages, extend the react config:

```json
{
  "extends": ["./node_modules/@myorg/oxlint/react.oxlintrc.json"]
}
```

For Bun/Node packages, extend the bun config:

```json
{
  "extends": ["./node_modules/@myorg/oxlint/bun.oxlintrc.json"]
}
```

## Commands

```bash
# Lint
bunx oxlint .

# Format check
bunx oxfmt --check .

# Format write
bunx oxfmt --write .
```
