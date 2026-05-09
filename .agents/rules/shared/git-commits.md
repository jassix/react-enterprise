# Git Commit Conventions

Commits are enforced by **commitlint** with the conventional commits spec.

```
<type>(<scope>): <description>
```

## Types

`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`

## Scope

Optional package name — e.g. `std`, `ui`, `foundation`, `primitives`, `platform`.

## Examples

```
feat(ui): add Combobox primitive with multi-select
fix(std): handle empty input in pipe()
refactor(foundation): collapse alert recipe into slot recipe
chore: bump turbo to 2.x
```

Keep the description in the imperative mood, lowercase, no trailing period.
