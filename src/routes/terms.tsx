import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { pageHead } from "@/components/product-pages";
import { legal } from "@/data/legal";
export const Route = createFileRoute("/terms")({
  head: () => pageHead(legal.terms.title, legal.terms.intro, "/terms"),
  component: () => <LegalPage kind="terms" />,
});
