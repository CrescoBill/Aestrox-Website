import { createFileRoute } from "@tanstack/react-router";
import { ContactPage, pageHead } from "@/components/product-pages";
export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(
      "Contact Aestrox",
      "Speak to Aestrox about your business. Book a demo, request pricing or ask about your setup.",
      "/contact",
    ),
  component: ContactPage,
});
