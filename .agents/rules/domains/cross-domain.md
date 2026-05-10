# Cross-Domain Dependencies

The `packages/domains/*` glob does not enforce isolation by itself — discipline does. The single rule:

> **A domain may depend on another domain only by listing it explicitly in `package.json`.**

No "shortcut" deep imports across siblings. No re-exporting one domain's model from another. Turbo's dependency graph and Bun workspaces will reflect the link, which is exactly what you want for cache invalidation, CI scoping, and visibility.

## Decision tree

When domain `A` needs something from domain `B`:

1. **Is the thing a generic primitive** (Money, EmailAddress, Pagination)?
   → Move it to `@repo/types` or a new shared package; both domains depend on the shared package.

2. **Is the thing a stable, narrow piece of `B`'s public API** (e.g. `UserId`, `UserSchema`)?
   → `A`'s `package.json` adds `"@repo/B": "workspace:"` and imports from `@repo/B/model`. Document the link in `A`'s README.

3. **Does `A` need to *call* `B`'s use-case** (e.g. billing wants to send a notification)?
   → Define a port in `A` (`Notifier`). The `apps/*` layer wires `B`'s use-case into the port. `A` never imports from `B` directly.

Option 3 is preferred whenever the dependency is **behavioural** — it keeps domains independently testable and replaceable.

## What is forbidden

- Importing from `@repo/B/use-cases` inside `@repo/A`.
- Importing from `@repo/B/ports` inside `@repo/A`.
- Importing from `~/...` paths that resolve into another domain.
- Cyclic dependencies between domains. If you reach for one, the bounded contexts are wrong — split or merge instead.

## What `apps/*` may do

The application layer is the only place that knows about the full set of domains. It:

- imports `use-cases` from any domain it needs,
- builds adapters for each port,
- composes use-cases of one domain into the adapter of another (option 3 above),
- owns transactions / cross-domain coordination.

Cross-domain orchestration **always** happens in `apps/*`, never inside `packages/domains/*`.

## Worked example: billing wants to notify, notifications wants to stay independent

Suppose `@repo/billing` should send an email when an invoice is issued, and the email-sending logic lives in `@repo/notifications`. The wrong fix is `import { sendEmail } from "@repo/notifications/use-cases"` inside billing — that hard-couples two contexts, makes billing untestable in isolation, and forces a rebuild of billing whenever notifications change.

The right fix is in three layers.

### 1. Billing declares the requirement as a port

Billing has no idea what "notifications" are. It only knows: *something* must be told when an invoice transitions to issued.

```ts
// packages/domains/billing/src/ports/notifier.ts
import type { Result } from "@repo/std/result";
import type { Invoice } from "~/model";

export type NotifyError = { kind: "transport"; cause: unknown };

export interface Notifier {
  invoiceIssued(invoice: Invoice): Promise<Result<void, NotifyError>>;
}
```

The use-case calls the port at the right moment and propagates failure into its own error union:

```ts
// inside issueInvoice
const saved = await deps.repo.save(issued);
if (saved.isErr()) return Err(asIssueError(saved.unwrapErr()));

const notified = await deps.notifier.invoiceIssued(saved.unwrap());
if (notified.isErr()) return Err({ kind: "notify-failed", cause: notified.unwrapErr().cause });

return Ok(saved.unwrap());
```

### 2. Notifications exposes its own use-case

Notifications has no idea what an "invoice" is. It speaks its own vocabulary (recipient, template, payload) and ships its own use-case + ports.

```ts
// packages/domains/notifications/src/use-cases/send-email.ts
export async function sendEmail(
  deps: SendEmailDeps,
  input: { to: EmailAddress; template: TemplateId; data: unknown },
): Promise<Result<void, SendEmailError>> { /* ... */ }
```

### 3. The `apps/*` layer wires them together

The adapter is the only place that imports both domains. It does the *translation* between billing's vocabulary and notifications' vocabulary.

```ts
// apps/platform/src/billing/notifier-adapter.ts
import type { Notifier } from "@repo/billing/ports";
import { invoiceTotal } from "@repo/billing/operations";
import { sendEmail } from "@repo/notifications/use-cases";
import { mailTransport } from "../notifications/mail-transport";
import { lookupCustomerEmail } from "../auth/customer-email";

export const billingNotifier: Notifier = {
  async invoiceIssued(invoice) {
    const total = invoiceTotal(invoice).unwrap();
    const result = await sendEmail(
      { transport: mailTransport },
      {
        to: await lookupCustomerEmail(invoice.customerId),
        template: "invoice-issued",
        data: { id: invoice.id, amount: total.amount, currency: total.currency },
      },
    );
    return result.mapErr((cause) => ({ kind: "transport", cause }));
  },
};

// composition root
import { issueInvoice } from "@repo/billing/use-cases";
const result = await issueInvoice(
  { repo: invoiceRepo, clock: systemClock, notifier: billingNotifier },
  { invoiceId },
);
```

### What this buys

- `@repo/billing` builds and tests **without `@repo/notifications` installed** — its `package.json` has no notification dependency.
- Replacing email with Slack means writing a new adapter — billing is unchanged.
- The translation logic ("invoice → email payload") lives where it belongs: at the boundary between two contexts, owned by the application that orchestrates them.

## Authorization (RBAC / ABAC)

Authorization lives at `packages/domains/authz` and is built on **[CASL](https://casl.js.org/)**. CASL is a strategic choice — its types and `Ability` are re-exported by `@repo/authz/ability`. We do **not** wrap CASL behind a custom decision API: doing so would block the use of `@casl/react` in the UI and force us to maintain a parallel engine.

What `@repo/authz` adds on top of CASL:

| | Why |
|---|---|
| `Action` union (`"read" \| "create" \| "issue" \| ...`) | One project-wide vocabulary; lets `<Can I="…">` autocomplete |
| `SubjectType` union (`"billing.invoice" \| "auth.user" \| ...`) | Domain-namespaced resource types; same autocomplete benefit |
| `AppAbility = MongoAbility<[Action, SubjectType]>` | A single typed ability for the whole app |
| `defineAbilityFor(actor, rules)` factory | One canonical place to build the ability per request |
| `subject(type, value)` re-export | Type-narrowed to our `SubjectType` |
| `PolicyStore.rulesFor(actor)` port | Loads per-actor rules from anywhere (DB, JSON, hard-coded) |

### Two hard rules

> **1. Domains do not import `@repo/authz`.** Only `apps/*` does. Domains depend on a domain-local policy port (e.g. `BillingPolicy`).

> **2. The CASL `Ability` is built once per request and shared.** The same instance backs the domain port (`BillingPolicy.canIssue`) and the React tree (`<AbilityProvider value={ability}>`). Never build a second ability for the UI.

### Action / subject naming

- **Action** is a short verb: `"read"`, `"create"`, `"issue"`, `"void"`. CASL's `"manage"` = any action.
- **SubjectType** is `<domain>.<resource>`: `"billing.invoice"`, `"auth.user"`. CASL's `"all"` = any subject.
- Adding a new action/subject = one PR to `@repo/authz/model`. This is intentional friction — it forces a thought about where the new permission belongs.

### Domain side: thin port, no CASL

```ts
// packages/domains/billing/src/ports/policy.ts
import type { Result } from "@repo/std/result";
import type { Invoice } from "~/model";

export type Forbidden = { kind: "forbidden"; reason: string };

export interface BillingPolicy {
  canIssue(invoice: Invoice): Result<void, Forbidden>;
  canVoid(invoice: Invoice): Result<void, Forbidden>;
}
```

Note: **sync** and **no `actorId`** parameter. The actor is baked into the ability at build time, so per-call checks are pure boolean queries with no IO. The use-case calls the port at the start of issueInvoice, before any state mutation.

### App side: composition root builds one ability

```ts
// apps/platform/src/auth/build-context.ts
import {
  defineAbilityFor,
  subject,
  type AppAbility,
} from "@repo/authz/ability";
import type { Actor } from "@repo/authz/model";
import type { BillingPolicy } from "@repo/billing/ports";
import type { Invoice } from "@repo/billing/model";
import { Err, Ok } from "@repo/std/result";

import { policyStore } from "./policy-store";

export async function buildRequestContext(actor: Actor) {
  const rules = (await policyStore.rulesFor(actor)).unwrap();
  const ability = defineAbilityFor(actor, rules);

  const billingPolicy: BillingPolicy = {
    canIssue: (invoice) => check(ability, "issue", invoice),
    canVoid:  (invoice) => check(ability, "void",  invoice),
  };

  return { ability, billingPolicy };
}

function check(ability: AppAbility, action: "issue" | "void", invoice: Invoice) {
  const tagged = subject("billing.invoice", invoice);
  if (ability.can(action, tagged)) return Ok(undefined);
  return Err({
    kind: "forbidden" as const,
    reason: ability.relevantRuleFor(action, tagged)?.reason ?? "no rule allows this action",
  });
}
```

### Backend uses the policy; UI uses the ability — same instance

```tsx
// backend route handler
const { billingPolicy } = await buildRequestContext(actor);
const result = await issueInvoice(
  { repo, clock, policy: billingPolicy },
  { invoiceId },
);

// React tree
<AbilityProvider value={ability}>
  <App />
</AbilityProvider>

// component
import { Can } from "@casl/react";
import { subject } from "@repo/authz/ability";

<Can I="issue" a={subject("billing.invoice", invoice)}>
  <IssueButton onClick={...} />
</Can>
```

The `<Can>` and the backend's `policy.canIssue(invoice)` consult the same `Ability`. There is one source of truth per request — load rules once, build ability once, use everywhere.

### Roles and rule contributions

Roles split into two layers:

- **Base roles** (`admin`, `member`, `guest`) live in `@repo/authz/model` — cross-cutting, no domain knowledge.
- **Domain roles** (`billing-admin`, `billing-customer`, `auth-moderator`, …) live in **each domain's `policies/` subpath** (e.g. `@repo/billing/policies`).

Both layers declare their roles using the **const-tuple + `ArrayValues<typeof xs>` pattern** from [`shared/types.md`](../shared/types.md) — never as a free-standing union. This keeps the runtime list and the type union in lock-step and ships a free type-guard.

Every domain that participates in authorization ships a single function `defineXxxRulesFor(actor: Actor): readonly Rule[]` from its `policies/` bundle. This is the **only** subpath of a domain that may import `@repo/authz` — the domain's core (`use-cases`, `model`, `ports`) stays authz-free and tree-shakes the dependency away when an app doesn't import `policies`.

```ts
// packages/domains/billing/src/policies/rules.ts
import { rule, type Rule } from "@repo/authz/ability";
import type { Actor } from "@repo/authz/model";

export function defineBillingRulesFor(actor: Actor): readonly Rule[] {
  const rules: Rule[] = [];

  for (const role of actor.roles) {
    if (role === "billing-admin") {
      rules.push(rule("allow", "manage", "billing.invoice"));
    } else if (role === "billing-customer") {
      rules.push(
        rule("allow", "read",  "billing.invoice", { customerId: actor.id }),
        rule("allow", "issue", "billing.invoice", { customerId: actor.id, status: "draft" }),
      );
    }
  }
  rules.push(
    rule("deny", "void", "billing.invoice", { status: "paid" }, "paid invoices are immutable"),
  );

  return rules;
}
```

Use the `rule()` helper from `@repo/authz/ability` — it returns rule-as-data (CASL's `RawRuleOf<AppAbility>`) and bypasses the strict-typing of `AbilityBuilder.can()` that fights subjects-as-strings. CASL still validates the conditions structurally at evaluation time.

### App composition: stack the bundles

The composition root in `apps/*` stitches `defineBaseRulesFor` (from authz) with each domain's rules definer using `inMemoryPolicyStore`:

```ts
// apps/platform/src/auth/policy-store.ts
import { defineBaseRulesFor, inMemoryPolicyStore } from "@repo/authz/policies";
import { defineBillingRulesFor } from "@repo/billing/policies";

export const policyStore = inMemoryPolicyStore([
  defineBaseRulesFor,
  defineBillingRulesFor,
  // defineAuthRulesFor, defineCatalogRulesFor, ...
]);
```

The order matters only when rules overlap — CASL applies them in sequence, and `deny` always wins. A DB-backed `PolicyStore` substitutes for `inMemoryPolicyStore` when rules need to come from a database; the per-domain `defineXxxRulesFor` functions stay as the canonical "in-memory" definition.

### Default base permissions

| Role | Rules |
|---|---|
| `admin` | `manage` `all` — full access to every action on every subject |
| `member` | `read` `all` — read-only across the app |
| `guest` | (none — default-deny applies) |

Domain roles add **on top** of base roles. An actor with `roles: ["member", "billing-customer"]` gets read access to everything *plus* the customer-specific billing rules.

### What we sacrifice — and why it's the right trade

- **Engine swappability.** Replacing CASL with Cedar / OPA is now a project, not a one-package change. In practice no one does this swap; CASL is mature and fits the JS ecosystem.
- **Authz-side error abstraction.** `Forbidden` is defined per-domain (in each policy port), not centrally. That is a feature: each domain owns the shape of its own authorization failures.

### Why instance-level checks belong in the use-case, not in middleware

Coarse-grained "can this user hit `/billing` at all?" can live in HTTP middleware (and *should* — it's the cheapest check). But "can this user void *this* invoice given its `status` and `customerId`?" needs the resource — and the resource is loaded by the use-case. Putting the check in middleware forces a duplicate load (or leaks resource-loading into HTTP layer). Putting it in the use-case behind a sync port keeps the loading where it belongs and the policy where it belongs.
