import { createFileRoute } from "@tanstack/react-router";
import { FeaturesPage, pageHead } from "@/components/product-pages";
export const Route = createFileRoute("/features")({
  head: () =>
    pageHead(
      "Inside Aestrox POS",
      "Explore the ordering, menu, transactions, reporting and team workspace in Aestrox POS.",
      "/features",
    ),
  component: FeaturesPage,
});
