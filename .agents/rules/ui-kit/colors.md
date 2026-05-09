# Color System

23 base colors with 12-step Radix-style scales.

## Base palette

```
accent, neutral, mauve, slate, gray
red, tomato, crimson, pink, purple, violet, indigo
blue, sky, cyan, teal, mint
green, jade, lime
yellow, amber, orange
```

Each color exposes `light` and `dark` variants, each with 12 steps.

## Step semantics

| Steps | Purpose |
|-------|---------|
| 1–2   | Page / app background |
| 3–5   | Interactive component backgrounds (rest, hover, pressed) |
| 6–8   | Borders and separators |
| 9–10  | Solid backgrounds (filled buttons, selected states) |
| 11–12 | Text (low-contrast → high-contrast) |

## Rule

Reach for **semantic** tokens first ([semantic-tokens.md](./semantic-tokens.md)). Use a base color directly only when introducing a new semantic mapping.
