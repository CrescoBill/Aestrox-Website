import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { pageHead } from "@/components/product-pages";
export const Route = createFileRoute("/thanks")({
  head: () => ({
    ...pageHead("Thank you", "Your Aestrox enquiry has been received.", "/thanks"),
    meta: [{ title: "Thank you | Aestrox" }, { name: "robots", content: "noindex" }],
  }),
  component: () => (
    <main id="main" className="route-state">
      <span className="success-symbol">
        <Check />
      </span>
      <h1>Thanks for getting in touch.</h1>
      <p>
        If you’ve just submitted an enquiry, our team will respond using the details you shared.
      </p>
      <Link className="button button-primary" to="/">
        Back to Aestrox
      </Link>
    </main>
  ),
});
