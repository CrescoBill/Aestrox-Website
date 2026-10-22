import { createFileRoute } from "@tanstack/react-router";
import { PricingPage, pageHead } from "@/components/product-pages";
export const Route = createFileRoute("/pricing")({
  head: () =>
    pageHead(
      "Plans & pricing",
      "Monthly or annual billing for Aestrox POS. Contact our team for a quote for your business.",
      "/pricing",
    ),
  component: PricingPage,
});
