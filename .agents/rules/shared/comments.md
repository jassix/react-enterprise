# Code Comments

Default to writing **no comments**. Code, names, and types should be self-explanatory.

## When a comment IS warranted

Only when a reader cannot recover the intent from the code alone:

- **Non-trivial algorithms** — e.g. cycle detection, custom diffing, hand-rolled parsers, bit-twiddling, numeric stability tricks.
- **Hidden invariants** — preconditions enforced elsewhere, ordering requirements, or state machines whose transitions are not obvious.
- **Workarounds** — link the upstream issue / browser bug / spec quirk being worked around.
- **Surprising performance choices** — e.g. "manual loop avoids allocator pressure on hot path", with a benchmark reference.
- **Public API contract** — JSDoc on exported functions/types when the signature alone does not communicate semantics or units.

## When a comment is NOT warranted

- Restating what the code does (`// increment counter` over `counter++`).
- Section dividers (`// --- helpers ---`) — use modules / files instead.
- Change history (`// added by X for ticket Y`) — that belongs in git.
- TODO/FIXME without an issue link — file a ticket instead.
- Type information already expressed by the type system.
- "Why" comments that just rephrase the function name.

## Style

- Prefer short single-line comments; no decorative banners.
- Write full sentences with a period when explaining reasoning.
- Place the comment immediately above the line(s) it explains, not at end-of-line, except for trailing units (`// ms`, `// bytes`).
- Keep comments truthful: if the code changes, update or remove the comment in the same diff.
