import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { pageHead } from "@/components/product-pages";
import { legal } from "@/data/legal";
export const Route = createFileRoute("/privacy")({
  head: () => pageHead(legal.privacy.title, legal.privacy.intro, "/privacy"),
  component: () => <LegalPage kind="privacy" />,
});
