# @lume/blocks

Composed, opinionated UI patterns built from `@lume/primitives` + `@lume/foundation`.

Blocks are higher-order components that bundle multiple primitives into ready-to-use patterns (e.g., auth forms, dashboard headers, empty states, settings panels). They are domain-agnostic but layout-opinionated — drop-in surfaces that an app can use directly or customize via props.

## Conventions

- Compose primitives; never reach past them into Ark UI directly.
- Consume tokens via recipes from `@lume/foundation`; no ad-hoc hex/px values.
- Colocate a `*.stories.tsx` next to each block for the `@lume/system` catalog.
- Keep blocks headless of data — accept callbacks/values as props, don't fetch.
