import { createFileRoute, Link } from "@tanstack/react-router";
export const Route = createFileRoute("/404")({
  head: () => ({
    meta: [{ title: "Page not found | Aestrox" }, { name: "robots", content: "noindex" }],
  }),
  component: () => (
    <main id="main" className="route-state">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>Check the address or return to our homepage.</p>
      <Link to="/" className="button button-primary">
        Back to Aestrox
      </Link>
    </main>
  ),
});
