import logo from "@/assets/aestrox-logo-clean.png";
import { site } from "./site";

// Public, verifiable company facts only. Do not add fictional ratings, prices,
// offices or a SearchAction for a search feature that does not exist.
export const companyStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.origin}/#organization`,
      name: site.name,
      url: site.origin,
      logo: new URL(logo, site.origin).href,
      description:
        "Business software from Aestrox, including point of sale for cafés and restaurants.",
      email: site.email,
      telephone: site.phone,
      sameAs: site.socials.map((social) => social.url),
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: site.phone,
          email: site.email,
          areaServed: "IN",
        },
        {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: site.irelandPhone,
          email: site.email,
          areaServed: "IE",
        },
        { "@type": "ContactPoint", contactType: "customer support", email: site.supportEmail },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${site.origin}/#website`,
      name: site.name,
      url: site.origin,
      inLanguage: "en",
      publisher: { "@id": `${site.origin}/#organization` },
    },
  ],
};
