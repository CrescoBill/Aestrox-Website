import { createFileRoute } from "@tanstack/react-router";
import { BillingPage, pageHead } from "@/components/product-pages";
export const Route = createFileRoute("/products/pos")({
  head: () =>
    pageHead(
      "Aestrox POS | Restaurant & Café Billing Software",
      "Point of sale for your counter, your team and your business. Explore Aestrox POS on the web and Android.",
      "/products/pos",
    ),
  component: BillingPage,
});
