import { createFileRoute } from "@tanstack/react-router";
import { AboutPage, pageHead } from "@/components/product-pages";
export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      "About Aestrox",
      "Software for the people behind the business. Meet Aestrox and our team locations in India, UAE and Ireland.",
      "/about",
    ),
  component: AboutPage,
});
