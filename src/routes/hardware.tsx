import { createFileRoute } from "@tanstack/react-router";
import { HardwarePage, pageHead } from "@/components/product-pages";
export const Route = createFileRoute("/hardware")({
  head: () =>
    pageHead(
      "Devices & printing",
      "Discuss your Aestrox device and printer setup, including 58mm, 80mm and A4 receipt layouts.",
      "/hardware",
    ),
  component: HardwarePage,
});
