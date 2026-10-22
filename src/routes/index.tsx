import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";
import { pageHead } from "@/components/product-pages";
export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Aestrox | Business Software & Restaurant POS",
      "Business software from Aestrox. Explore our POS for cafés and restaurants, manage your counter and team, and start a 14-day free trial.",
      "/",
    ),
  component: HomePage,
});
