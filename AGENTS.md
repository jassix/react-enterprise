# Agents

This document defines specialized agents for this React monorepo. Each agent has domain expertise and should be consulted for tasks within their scope.

---

## Shared Best Practices

### Import Conventions

```typescript
// Workspace dependencies - use workspace: protocol
"@myorg/std": "workspace:"
"@lume/foundation": "workspace:"

// Catalog dependencies - use catalog: protocol for version management
"remeda": "catalog:std"
"@ark-ui/react": "catalog:ui"
"react": "catalog:react"

// Default catalog (no name)
"typescript": "catalog:"
"@types/bun": "catalog:"

// Subpath imports - prefer specific subpaths over barrel imports
import { pipe, map } from "@myorg/std/fp";       // Good
import { match } from "@myorg/std/match";        // Good
import { Result, Ok, Err } from "@myorg/std/result";
import * as std from "@myorg/std";               // Avoid - barrel import
```

### Type Conventions

```typescript
// Use @myorg/types for shared type definitions
import type { Prettify, Nullable } from "@myorg/types";

// Component props pattern - extend HTMLStyledProps with ComponentProps
interface ButtonProps
  extends
    Omit<HTMLStyledProps<"button">, keyof ComponentProps<"button">>,
    ComponentProps<"button"> {
  variant?: "solid" | "outline" | "ghost" | "link";
}
```

### Tooling Commands

```bash
# Package manager
bun install                    # Install dependencies
bun add <pkg>                  # Add dependency
bun add -d <pkg>               # Add dev dependency

# Task runner
turbo run build                # Build all packages
turbo run dev                  # Start dev servers
turbo run lint                 # Lint all packages
turbo run check-types          # Type check all packages

# Linting & formatting
oxlint -c .oxlintrc.json .     # Lint with oxlint
oxfmt --write .                # Format with oxfmt
oxfmt --check .                # Check formatting

# PandaCSS (in @lume/foundation)
panda codegen                  # Generate styled-system
```

### Git Commit Conventions

Commits are enforced by commitlint with conventional commits:

```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore
Scope: optional package name (std, ui, foundation, etc.)
```

---

## STD Agent

**Scope**: `@myorg/std` - functional programming utilities

### Expertise

#### Remeda FP Utilities (`@myorg/std/fp`)

Functional programming utilities for data transformation using pipe-based composition.

```typescript
import { pipe, map, filter, groupBy, sortBy, unique } from "@myorg/std/fp";

// Prefer pipe over method chaining
const result = pipe(
  users,
  filter((u) => u.active),
  map((u) => u.name),
  sortBy((name) => name),
  unique(),
);
```

#### ts-pattern Matching (`@myorg/std/match`)

Exhaustive pattern matching for type-safe branching.

```typescript
import { match, P } from "@myorg/std/match";

const getMessage = (status: Status) =>
  match(status)
    .with({ type: "loading" }, () => "Loading...")
    .with({ type: "error", code: P.number }, ({ code }) => `Error ${code}`)
    .with({ type: "success", data: P.select() }, (data) => `Got ${data}`)
    .exhaustive();
```

#### oxide.ts Result/Option (`@myorg/std/result`)

Error handling without throwing exceptions - use for fallible operations.

```typescript
import { Result, Ok, Err, Option, Some, None } from "@myorg/std/result";

// Return Result for operations that can fail
function parseJson<T>(str: string): Result<T, Error> {
  try {
    return Ok(JSON.parse(str));
  } catch (e) {
    return Err(e instanceof Error ? e : new Error(String(e)));
  }
}

// Chain operations with map/andThen
const result = parseJson<User>(input)
  .map((user) => user.name)
  .mapErr((e) => new ValidationError(e.message));
```

#### Valibot Validation (`@myorg/std/schema`)

Type-safe schema definitions for runtime validation.

```typescript
import schema, { object, string, number, email, parse } from "@myorg/std/schema";

const UserSchema = object({
  name: string(),
  email: string([email()]),
  age: number(),
});

type User = schema.InferOutput<typeof UserSchema>;

// Validate at runtime
const user = parse(UserSchema, data);
```

### Key Files

- `packages/std/src/fp.ts` - Remeda re-exports
- `packages/std/src/match.ts` - ts-pattern re-exports
- `packages/std/src/result.ts` - oxide.ts re-exports
- `packages/std/src/schema.ts` - Valibot re-exports
- `packages/std/package.json` - Subpath exports configuration

### Conventions

1. Use subpath imports (`@myorg/std/fp`) over barrel imports
2. Prefer `pipe` over method chaining for data transformations
3. Use `Result<T, E>` for fallible operations instead of throwing
4. Use `Option<T>` for nullable values that need explicit handling
5. Define schemas alongside types for runtime validation

---

## UI-Kit Agent

**Scope**: `@lume/foundation` + `@lume/primitives` - PandaCSS design system

### Expertise

#### Color System

23 base colors with 12-step scales (Radix-style):

```
accent, neutral, mauve, slate, gray
red, tomato, crimson, pink, purple, violet, indigo
blue, sky, cyan, teal, mint
green, jade, lime
yellow, amber, orange
```

Each color has light/dark variants with 12 steps:

- Steps 1-2: Background
- Steps 3-5: Interactive backgrounds
- Steps 6-8: Borders
- Steps 9-10: Solid backgrounds
- Steps 11-12: Text

#### Semantic Tokens

```typescript
// Semantic color tokens - prefer over raw colors
colors.interactive.base       // Primary interactive color
colors.interactive.hover      // Hover state
colors.critical.DEFAULT       // Error/danger states
colors.positive.DEFAULT       // Success states
colors.caution.DEFAULT        // Warning states
colors.info.DEFAULT           // Informational states

// Surface tokens
colors.surface.subtle         // Subtle background
colors.surface.muted          // Muted background

// Border tokens
colors.border.DEFAULT         // Default border
colors.border.critical        // Error border

// Dark mode - automatic via _dark condition
{
  base: {
    value: "{colors.accent.light.9}",
    _dark: "{colors.accent.dark.9}",
  }
}
```

#### Token System

```typescript
// Spacing: xs(4px), sm(8px), md(12px), lg(16px), xl(24px), 2xl(32px)
paddingX: "{spacing.md}";

// Sizes: xs, sm, md, lg, xl (for component heights)
height: "{sizes.md}";

// Typography
fontFamily: "{fonts.body}";
fontSize: "{fontSizes.md}";
fontWeight: "{fontWeights.medium}";
lineHeight: "{lineHeight.tight}";

// Animation
transition: "all {durations.fast} {easings.easeInOut}";
// Easings: linear, easeIn, easeOut, easeInOut, spring, bounce, emphasized
// Durations: fast, normal, slow

// Radii
borderRadius: "{radii.md}";
```

#### Recipe Patterns

```typescript
import { defineRecipe, defineSlotRecipe } from "@pandacss/dev";

// Single-element recipe
export const buttonRecipe = defineRecipe({
  className: "button",
  base: {
    display: "inline-flex",
    // Use token references
    gap: "{spacing.sm}",
    transition: "all {durations.fast} {easings.easeInOut}",
    // Pseudo-states with underscore prefix
    _disabled: { opacity: "0.5", cursor: "not-allowed" },
    _focusVisible: { ring: "2px solid", ringColor: "{colors.focus.ring}" },
  },
  variants: {
    variant: {
      solid: { bg: "{colors.interactive.base}", color: "white" },
      outline: { bg: "transparent", border: "1px solid {colors.border.DEFAULT}" },
    },
    size: {
      sm: { height: "{sizes.sm}", fontSize: "{fontSizes.sm}" },
      md: { height: "{sizes.md}", fontSize: "{fontSizes.md}" },
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
  // Compound variants for specific combinations
  compoundVariants: [
    {
      variant: "outline",
      intent: "critical",
      css: { color: "{colors.critical.text}", borderColor: "{colors.border.critical}" },
    },
  ],
});

// Multi-slot recipe for complex components
export const dialogRecipe = defineSlotRecipe({
  className: "dialog",
  slots: ["root", "backdrop", "container", "content", "header", "body", "footer"],
  base: {
    backdrop: { position: "fixed", inset: 0 },
    content: { borderRadius: "{radii.lg}", bg: "{colors.surface.DEFAULT}" },
  },
  variants: {
    size: {
      sm: { content: { maxWidth: "400px" } },
      md: { content: { maxWidth: "600px" } },
    },
  },
});
```

#### Component Architecture

Components combine Ark UI primitives with PandaCSS styling:

```typescript
import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { button } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";

export interface ButtonProps
  extends
    Omit<HTMLStyledProps<"button">, keyof ComponentProps<"button">>,
    ComponentProps<"button"> {
  variant?: "solid" | "outline" | "ghost" | "link";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const Button: FC<ButtonProps> = ({
  variant,
  size,
  ref,
  ...props
}) => {
  // Split CSS props from DOM props
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.button
      ref={ref}
      {...restProps}
      // Compose recipe + ad-hoc styles + className
      className={cx(
        button({ variant, size }),
        css(cssProps),
        props.className,
      )}
    />
  );
};
```

### Key Files

- `packages/ui/foundation/src/tokens/` - Base design tokens
- `packages/ui/foundation/src/semantic/colors/` - Semantic color mapping
- `packages/ui/foundation/src/recipes/` - Component recipes
- `packages/ui/foundation/src/animations/` - Duration and easing tokens
- `packages/ui/primitives/src/ui/buttons/button/button.tsx` - Component pattern example

### Conventions

1. Always use token references in recipes (`"{spacing.md}"` not `"12px"`)
2. Prefer semantic colors over base colors (`colors.interactive.base` not `colors.accent.light.9`)
3. Include `_dark` variants for semantic tokens
4. Use `ark.element` factory for polymorphic elements
5. Split CSS props with `splitCssProps` for style overrides
6. Compose styles with `cx(recipe(), css(cssProps), className)`
7. Run `panda codegen` after modifying tokens/recipes

---

## Monorepo Agent

**Scope**: Workspace orchestration and tooling

### Expertise

#### Package Relationships

```
apps/                          # Application packages
├── platform/                  # Main React app (TanStack Start)
├── docs/                      # Documentation site
└── web/                       # Additional web app

packages/
├── std/                       # @myorg/std - FP utilities
├── types/                     # @myorg/types - Shared types
└── ui/
    ├── foundation/            # @lume/foundation - Design tokens/recipes
    └── primitives/            # @lume/primitives - React components

tooling/
└── config/
    ├── typescript/            # @myorg/tsconfig - TS configs
    └── oxlint/                # Lint configurations
```

#### Bun Catalogs

Version management via `package.json` catalogs:

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

Usage in package.json:

```json
{
  "dependencies": {
    "remeda": "catalog:std", // From std catalog
    "react": "catalog:react", // From react catalog
    "typescript": "catalog:" // From default catalog
  }
}
```

#### Turbo Tasks

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": { "dependsOn": ["^lint"] },
    "check-types": { "dependsOn": ["^check-types"] },
    "dev": { "cache": false, "persistent": true }
  }
}
```

#### Config Composition (3-tier pattern)

```
tooling/config/   →   Root config   →   Package config
(base configs)        (extends)         (extends)
```

**TypeScript example:**

```json
// tooling/config/typescript/base.tsconfig.json - Base config
{ "compilerOptions": { "strict": true, ... } }

// tooling/config/typescript/react.tsconfig.json - React preset
{ "extends": "./base.tsconfig.json", "compilerOptions": { "jsx": "react-jsx" } }

// packages/ui/primitives/tsconfig.json - Package config
{ "extends": "@myorg/tsconfig/react.tsconfig.json" }
```

**Oxlint example:**

```json
// tooling/config/oxlint/base.oxlintrc.json - Base rules
// tooling/config/oxlint/react.oxlintrc.json - React rules (extends base)
// .oxlintrc.json - Root config (extends react)
```

#### Creating New Packages

1. Create package directory in appropriate location
2. Add `package.json` with workspace dependencies:

```json
{
  "name": "@myorg/new-package",
  "type": "module",
  "exports": {
    ".": { "import": "./src/index.ts", "types": "./src/index.ts" }
  },
  "dependencies": {
    "@myorg/std": "workspace:"
  },
  "devDependencies": {
    "@myorg/tsconfig": "workspace:",
    "@types/bun": "catalog:"
  },
  "peerDependencies": {
    "typescript": "catalog:"
  }
}
```

3. Create `tsconfig.json` extending shared config:

```json
{
  "extends": "@myorg/tsconfig/bun.tsconfig.json",
  "compilerOptions": { "rootDir": "src", "outDir": "dist" },
  "include": ["src/**/*"]
}
```

4. Run `bun install` to link workspace packages

### Key Files

- `package.json` - Workspace definition and catalogs
- `turbo.json` - Task configuration
- `.config/lefthook.yaml` - Git hooks (commitlint, cspell, oxlint, oxfmt)
- `tooling/config/typescript/` - TypeScript configurations
- `tooling/config/oxlint/` - Lint configurations
- `.oxlintrc.json` - Root lint config
- `.oxfmtrc.json` - Root format config

### Conventions

1. Use `workspace:` protocol for internal dependencies
2. Use `catalog:` protocol for external dependencies with shared versions
3. Extend shared configs rather than duplicating settings
4. Add new packages to appropriate `workspaces.packages` glob
5. Follow conventional commits (enforced by commitlint)
6. Run `bun packages:sort` to keep package.json sorted
