# Design Tokens

Always reference tokens — never hardcode values in recipes or components.

## Spacing

```
xs = 4px,  sm = 8px,  md = 12px,  lg = 16px,  xl = 24px,  2xl = 32px
```

```typescript
paddingX: "{spacing.md}";
```

## Sizes

`xs`, `sm`, `md`, `lg`, `xl` — used for component heights.

```typescript
height: "{sizes.md}";
```

## Typography

```typescript
fontFamily: "{fonts.body}";
fontSize: "{fontSizes.md}";
fontWeight: "{fontWeights.medium}";
lineHeight: "{lineHeight.tight}";
```

## Animation

```typescript
transition: "all {durations.fast} {easings.easeInOut}";
```

- **Easings**: `linear`, `easeIn`, `easeOut`, `easeInOut`, `spring`, `bounce`, `emphasized`
- **Durations**: `fast`, `normal`, `slow`

## Radii

```typescript
borderRadius: "{radii.md}";
```

## Rule

Token reference syntax is `"{namespace.token}"`. If a needed value is missing from the token system, **add it to the token definitions** rather than hardcoding inline.
