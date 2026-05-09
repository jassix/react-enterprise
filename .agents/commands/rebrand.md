---
description: Rebrand this template — rename the `@repo/*` scope and the `repo` CLI bin to your organization's names.
argument-hint: "[@new-scope] [new-cli-name]"
---

# /rebrand

One-shot command for turning this template into a real project. The template ships with `@repo/*` as the package scope and `repo` as the CLI bin name — both are placeholders meant to be replaced on first use.

**Delete this command after running it** (Step 7). It has no repeat use in a single project.

---

## Step 1 — Gather inputs

Positional arguments may be supplied on invocation:

- `$1` — new package scope (e.g. `@acme`)
- `$2` — new CLI bin name (e.g. `acme`)

If either is missing, ask the user. Required values:

1. **New package scope** — e.g. `@acme`. Must start with `@`, lowercase, URL-safe. This replaces `@repo`.
2. **New CLI bin name** — e.g. `acme`. Lowercase, no spaces. This replaces the `repo` binary and all `repo <command>` help text. Often the same word as the scope without the `@`.
3. **(Optional) Company display name** — e.g. `Acme Corp`. Only used if the user wants it inserted into READMEs or a root description field.

Confirm the three values back to the user in one line before doing anything else. Do not proceed if the user hasn't answered.

---

## Step 2 — Verify template state

Before editing, confirm the template is in its expected starting state:

```bash
rg '@repo' --glob '!bun.lock' --glob '!.agents/commands/rebrand.md' -l | head -5
rg '\brepo\b' tooling/cli/src/cli/commands/help.ts
```

Both should return matches. If they don't, the template has already been rebranded — stop and ask the user whether they want a second rebrand or aborted the first one.

---

## Step 3 — Rename the package scope `@repo/*` → `@<new-scope>/*`

Edit these files and replace every `@repo/` with `@<new-scope>/`. Use the Edit tool with `replace_all: true`:

**package.json files (name + deps + bin + scripts):**

- `package.json` (root — scripts only)
- `packages/std/package.json`
- `packages/ui/foundation/package.json`
- `tooling/cli/package.json`
- `tooling/config/typescript/package.json`
- `tooling/config/oxlint/package.json`
- `tooling/types/package.json`

**tsconfig files (`extends` + `types`):**

- `packages/std/tsconfig.json`
- `packages/ui/foundation/tsconfig.json`
- `tooling/cli/tsconfig.json`
- `tooling/types/tsconfig.json`

**Lint configs:**

- `.oxlintrc.json`
- `.oxfmtrc.json`

**CLI source (import statements):**

- `tooling/cli/src/checks/skills.ts`
- `tooling/cli/src/checks/mcp.ts`
- `tooling/cli/src/report/index.ts`
- `tooling/cli/src/report/terminal.ts`

**Docs:**

- `AGENTS.md`
- `packages/std/README.md`
- `tooling/config/oxlint/README.md`
- `.claude/agents/tester.md`

Leave the `@lume/*` scope alone — that's the design system, a separate brand from the repo scope.

---

## Step 4 — Rename the CLI bin `repo` → `<new-cli-name>`

These are string-literal changes, not scope changes:

1. **`tooling/cli/package.json`** — `"bin": { "repo": "./src/index.ts" }` → `"bin": { "<new-cli-name>": "./src/index.ts" }`
2. **`tooling/cli/src/cli/commands/help.ts`** — `"repo — monorepo CLI"` → `"<new-cli-name> — monorepo CLI"`, `"repo <command>"` → `"<new-cli-name> <command>"`
3. **`tooling/cli/src/report/terminal.ts`** — `"repo doctor"` → `"<new-cli-name> doctor"`
4. **`tooling/cli/src/cli/commands/adapt.ts`** — every `repo adapt` in the `GUIDE` constant
5. **`tooling/cli/tests/unit/fixtures.ts`** — `"repo-cli-"` → `"<new-cli-name>-cli-"`
6. **Root `package.json`** — `"doctor": "bun --filter @repo/cli doctor"` and `"adapt": "bun --filter @repo/cli adapt"` already got the scope rename in step 3; no further change needed here unless you want to rename the script keys themselves (usually not).

Be careful: `repo` is also an English word. Only replace it in these specific files. Do **not** run a blind ripgrep replace of `\brepo\b` across the repo.

---

## Step 5 — Regenerate the lockfile

```bash
bun install
```

This rewrites `bun.lock` with the new scope. Do not hand-edit `bun.lock`.

---

## Step 6 — Verify

```bash
# No stragglers (these should all be empty)
rg '@repo' --glob '!bun.lock' --glob '!.agents/commands/rebrand.md'
rg '\brepo\b' tooling/cli/

# Types and lint pass
bun run check-types
bun run lint

# CLI runs under the new name
bun --filter @<new-scope>/cli doctor
bun --filter @<new-scope>/cli adapt
```

If anything fails, fix it before moving on. Do not proceed to step 7 with a broken build.

---

## Step 7 — Self-destruct

This command exists only to run once. Delete it:

```bash
rm .agents/commands/rebrand.md
rm .claude/commands/rebrand.md
```

Also remove the `adapt` command from the CLI if the user no longer wants it (optional — some teams keep it for documentation):

- Delete `tooling/cli/src/cli/commands/adapt.ts`
- Remove the `adaptCommand` import and entry from `tooling/cli/src/cli/commands/index.ts`
- Remove the `adapt` script from the root `package.json`

---

## Step 8 — Commit

```bash
git add -A
git commit -m "chore: rebrand template to @<new-scope>"
```

One commit, clean diff. Done.
