import { createFileRoute } from "@tanstack/react-router";
import { BillingPage, pageHead } from "@/components/product-pages";
export const Route = createFileRoute("/billing")({
  head: () =>
    pageHead(
      "Orders & billing",
      "Explore the Aestrox POS sample ordering and billing workspace.",
      "/billing",
    ),
  component: BillingPage,
});
