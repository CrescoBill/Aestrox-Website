import { createFileRoute } from "@tanstack/react-router";
import { IntegrationsPage, pageHead } from "@/components/product-pages";
export const Route = createFileRoute("/integrations")({
  head: () =>
    pageHead(
      "Your wider setup",
      "Discuss the tools and connections your business needs with Aestrox.",
      "/integrations",
    ),
  component: IntegrationsPage,
});
