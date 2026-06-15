import { createFileRoute } from "@tanstack/react-router";

import { BillingPage } from "@/pages/billing";

export const Route = createFileRoute("/billing")({
  component: BillingPage,
});
