import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { pageHead } from "@/components/product-pages";
import { legal } from "@/data/legal";
export const Route = createFileRoute("/cookies")({
  head: () => pageHead(legal.cookies.title, legal.cookies.intro, "/cookies"),
  component: () => <LegalPage kind="cookies" />,
});
