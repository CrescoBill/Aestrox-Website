import { site } from "./site";
type Section = { title: string; paragraphs: string[] };
type LegalDocument = { title: string; intro: string; sections: Section[] };
export const legal: Record<"privacy" | "terms" | "cookies", LegalDocument> = {
  privacy: {
    title: "Privacy policy",
    intro:
      "How Aestrox handles information when you visit this website, contact our team or use the website assistant.",
    sections: [
      {
        title: "Who we are",
        paragraphs: [
          `Aestrox provides business software and operates this website. Our team is based in Mangalore, India; Dubai, UAE; and Dublin, Ireland. For privacy questions, contact ${site.email}.`,
          "This policy covers our company website and sales enquiries. If your business uses Aestrox POS, the applicable service agreement and product privacy information also apply. Your business remains responsible for the customer and staff information it enters into the product.",
        ],
      },
      {
        title: "Information you share",
        paragraphs: [
          "When you send an enquiry, we receive your name, email address, business name, and any optional phone number or message. We also receive the type of enquiry, selected billing period where relevant, and your permission to respond.",
          "If you use the AI assistant, your message and a limited amount of recent conversation context are sent to our server and then to Groq to generate a reply. Please do not include passwords, payment-card information, API keys, or confidential customer or staff records.",
          "Our hosting provider may process technical information such as IP addresses, requested pages, device/browser information and timestamps to serve the website, prevent abuse and diagnose errors.",
        ],
      },
      {
        title: "Why we use this information",
        paragraphs: [
          "We use enquiry information to respond to you, discuss a requested demo or quotation, and help with your setup. We use assistant messages to answer the question you ask. We use technical information to operate and protect the website.",
          "Where data protection law requires a legal basis, processing may be necessary to take steps at your request before entering a contract, pursue our legitimate interests in responding to business enquiries and keeping the website secure, comply with a legal obligation, or act on your consent where consent is required. An enquiry is not an automatic subscription to marketing emails.",
        ],
      },
      {
        title: "Service providers and sharing",
        paragraphs: [
          "The website is hosted on Netlify. Netlify Forms processes enquiry submissions and makes them available to our team. Notifications may be sent to the email destinations we configure. The website assistant uses a Netlify Function and Groq to generate responses.",
          "We share information with providers only where needed to operate these services, respond to you or meet applicable obligations. We do not sell enquiry information. We may disclose information when required by law or when necessary to protect legal rights and prevent abuse.",
          "Provider processing may occur outside your country, including outside the European Economic Area. Where required by applicable law, international transfers must be covered by appropriate safeguards. Contact us for information about the safeguards relevant to your enquiry.",
        ],
      },
      {
        title: "How long information is kept",
        paragraphs: [
          "Enquiry records are retained for as long as needed to respond, manage the resulting business relationship, resolve disputes and meet applicable record-keeping obligations. We assess retention based on the purpose of the record rather than keeping every enquiry indefinitely.",
          "This website keeps the assistant conversation in page memory, not in a persistent browser history or an Aestrox chat database. Reloading the page clears that local conversation. Netlify and Groq may separately process requests and technical data under their own service terms and retention settings. Closing the chat does not delete records already processed by those providers.",
        ],
      },
      {
        title: "Your choices and rights",
        paragraphs: [
          `Depending on applicable law, you may request access, correction, erasure, restriction, portability or object to certain processing. Where processing relies on consent, you can withdraw it without affecting earlier lawful processing. Write to ${site.email}; we may need to verify your identity.`,
          "You can choose not to use the assistant or submit a form, and contact us by email or phone instead. You may also raise a complaint with the relevant data protection authority, including the Irish Data Protection Commission where applicable.",
        ],
      },
      {
        title: "Cookies and security",
        paragraphs: [
          "We do not add advertising trackers or analytics cookies in this version of the website. Fonts and product assets are served by this site. Social links take you to another service only when you choose to open them. See our Cookies page for more detail.",
          "We use measures such as encrypted connections, restricted server credentials and request limits to protect the website. No internet service can guarantee absolute security.",
        ],
      },
      {
        title: "Updates and contact",
        paragraphs: [
          `We may update this policy when our services or practices change. The date below identifies this version. For questions or a privacy request, email ${site.email}.`,
        ],
      },
    ],
  },
  terms: {
    title: "Terms of use",
    intro: "These terms explain the use of the Aestrox website and its public demonstrations.",
    sections: [
      {
        title: "About this website",
        paragraphs: [
          "This website is operated by Aestrox and introduces our company and products. You may use it to learn about our products, explore sample interactions and contact our team. Please use it lawfully and respect other people’s rights.",
          `You can reach us at ${site.email}. Our team locations are Mangalore, India; Dubai, UAE; and Dublin, Ireland.`,
        ],
      },
      {
        title: "Product information and enquiries",
        paragraphs: [
          "Website descriptions provide an overview, not a promise that every configuration, device or third-party integration is supported. Confirm your requirements with our team before purchasing software or hardware.",
          "Submitting an enquiry, requesting a demo, or choosing a monthly or annual billing preference does not create a paid subscription or binding quotation. Scope, pricing, billing, renewal, cancellation, support and other service terms are agreed separately. These website terms do not replace your Aestrox product agreement.",
        ],
      },
      {
        title: "Demonstrations and assistant",
        paragraphs: [
          "Interactive product previews use fictional sample data. They do not create orders in your business, collect payments or process a real transaction.",
          "The website assistant is an AI system, not a person or an account-management service. Its answers may be incomplete or inaccurate. It cannot access your business account, send an enquiry for you, book a confirmed appointment or make a binding commitment. Confirm important product, pricing and compatibility questions with our team.",
        ],
      },
      {
        title: "Acceptable use",
        paragraphs: [
          "Do not attempt to compromise the site, bypass request limits, extract credentials, introduce malicious code or interfere with service for other visitors. Do not send unlawful content or personal information you are not entitled to share.",
          "Please do not submit confidential customer records, payment-card information, passwords or API keys through the enquiry form or assistant.",
        ],
      },
      {
        title: "Our content",
        paragraphs: [
          "Aestrox branding, original website content and software demonstrations belong to Aestrox or the relevant rights holders. You may view and share links to public pages. Other use of protected content requires permission unless the law permits it.",
          "Third-party names or marks remain the property of their respective owners. A reference to a device, platform or service does not imply endorsement or a partnership.",
        ],
      },
      {
        title: "External services and availability",
        paragraphs: [
          "Links to social networks, app stores or other services are provided for convenience. Those services have their own terms and privacy practices. We do not control their content or availability.",
          "We may update or temporarily interrupt the website for maintenance or security. We aim to keep information useful and accurate, but website content alone should not be relied on for legal, tax or financial advice. Nothing in these terms excludes rights or responsibilities that cannot lawfully be excluded.",
        ],
      },
      {
        title: "Changes and questions",
        paragraphs: [
          `We may revise these website terms as the site changes. Contact ${site.email} if you have a question about using the website or need to discuss a product agreement.`,
        ],
      },
    ],
  },
  cookies: {
    title: "Cookies & local storage",
    intro: "A straightforward explanation of what this website stores on your device.",
    sections: [
      {
        title: "No advertising cookies by default",
        paragraphs: [
          "This version of the Aestrox website does not install advertising pixels or third-party analytics trackers. We do not load embedded social feeds or external font services. A cookie-consent banner is not used to imply that tracking is taking place when it is not.",
        ],
      },
      {
        title: "Temporary page state",
        paragraphs: [
          "The sample order, pricing selection, form values and assistant conversation are held in page memory. The website does not intentionally save them to localStorage or a persistent chat database. Reloading the page resets this temporary state.",
          "Our page navigation uses sessionStorage to remember scroll positions within your browser tab. This supports back and forward navigation and is not used for advertising or profiling.",
          "The hosting platform may use security mechanisms and process technical request data needed to provide and protect the site. Our Privacy policy explains the information processed when you send an enquiry or ask the assistant a question.",
        ],
      },
      {
        title: "Other Aestrox services",
        paragraphs: [
          "Logging in to Aestrox POS opens a separate service at pos.aestrox.com. Its authentication and device preferences may require storage that is not used by this marketing website. External social networks and app stores also operate under their own policies.",
        ],
      },
      {
        title: "Your controls",
        paragraphs: [
          `You can manage cookies and site storage in your browser settings. If we add optional tracking in future, we will update this notice and obtain consent where required before enabling it. Questions can be sent to ${site.email}.`,
        ],
      },
    ],
  },
};
