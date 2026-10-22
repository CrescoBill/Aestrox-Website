/** Public brand/product configuration. Never put credentials in this module. */
export const site = {
  name: "Aestrox",
  origin: "https://aestrox.com",
  posUrl: "https://pos.aestrox.com",
  email: "hello@aestrox.com",
  supportEmail: "contact@aestrox.com",
  phone: "+918921868300",
  phoneDisplay: "+91 89218 68300",
  irelandPhone: "+353894243991",
  irelandPhoneDisplay: "+353 89 424 3991",
  trialDays: 14,
  locations: ["Mangalore, India", "Dubai, UAE", "Dublin, Ireland"],
  socials: [
    { label: "Instagram", url: "https://www.instagram.com/aestrox.pos/" },
    { label: "Facebook", url: "https://www.facebook.com/aestrox.pos/" },
    { label: "LinkedIn", url: "https://www.linkedin.com/company/aestrox/" },
  ],
  // Set the published Play Store URL here. Until then the action requests access.
  androidStoreUrl: "",
} as const;

/** Add future products here; the company shell doesn't depend on a single POS. */
export const products = [
  {
    id: "pos",
    name: "Aestrox POS",
    shortName: "Point of sale",
    href: "/products/pos" as const,
    description: "Point of sale for cafés and restaurants.",
  },
];

export const posFeatures = [
  "Orders and billing",
  "Menu, variants and modifiers",
  "Receipt printing",
  "Transactions and daily reporting",
  "Team roles and access",
  "Organisation and location management",
];

export const faqs = [
  {
    question: "What is Aestrox?",
    answer:
      "Aestrox builds software for the everyday work of running a business. Our first product, Aestrox POS, brings ordering, billing and business oversight into one workspace for cafés and restaurants.",
  },
  {
    question: "Can I see it with my own business in mind?",
    answer:
      "Yes. Request a demo and tell us a little about your business. We can walk through your menu, service style and existing setup before you decide.",
  },
  {
    question: "What devices can I use?",
    answer:
      "You can use Aestrox POS on computers, tablets and phones. Contact us to check your device and printer setup before buying hardware.",
  },
  {
    question: "How does pricing work?",
    answer:
      "We offer monthly and annual billing options, with a 14-day free trial. Contact our team for a quote for your business and locations. We will confirm your subscription terms before you start.",
  },
  {
    question: "How do I start the free trial?",
    answer:
      "Select Start your free trial and share your business details. Our team will contact you to set up your 14-day trial and help you get started. Submitting the form does not create a paid subscription.",
  },
  {
    question: "Can I use my existing printer?",
    answer:
      "Often, but compatibility needs to be checked. Browser printing uses the printer options available on your device. Direct thermal printing depends on your setup and supported adapters. Send us the printer model and connection type so we can help you check it.",
  },
  {
    question: "Does Aestrox process card or UPI payments?",
    answer:
      "You can record cash, card or UPI payments received through your existing payment setup. Aestrox does not currently process payments or automatically verify them with your bank. Your team confirms payment before recording it.",
  },
  {
    question: "Can my team work across more than one location?",
    answer:
      "Yes. Team access is linked to organisations and locations, and members can switch between the businesses they have permission to access. We can help you plan your setup during onboarding.",
  },
  {
    question: "How do I get help after getting started?",
    answer: `Contact ${site.supportEmail} for product support. For a new setup, a demo or a pricing question, use ${site.email} or call our India sales number ${site.phoneDisplay}.`,
  },
];

export type EnquiryKind = "trial" | "demo" | "pricing" | "android" | "contact";
export type BillingPeriod = "Monthly" | "Annual";
export type Enquiry = { kind: EnquiryKind; billingPeriod?: BillingPeriod };
