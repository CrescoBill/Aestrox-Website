import { Link } from "@tanstack/react-router";
import { legal } from "@/data/legal";
import { PageIntro } from "./product-pages";

export function LegalPage({ kind }: { kind: keyof typeof legal }) {
  const document = legal[kind];
  return (
    <main id="main">
      <PageIntro label="Aestrox" title={document.title} copy={document.intro} />
      <section className="section">
        <div className="container legal-layout">
          <nav className="legal-nav" aria-label="Legal information">
            <Link to="/privacy" activeProps={{ "aria-current": "page" }}>
              Privacy policy
            </Link>
            <Link to="/terms" activeProps={{ "aria-current": "page" }}>
              Terms of use
            </Link>
            <Link to="/cookies" activeProps={{ "aria-current": "page" }}>
              Cookies
            </Link>
          </nav>
          <div className="legal-copy">
            {document.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
            <p className="legal-updated">Last updated: 22 October 2026</p>
          </div>
        </div>
      </section>
    </main>
  );
}
