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
  // Add the Dubai number here; the footer and contact page show it once set.
  dubaiPhone: "",
  dubaiPhoneDisplay: "",
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

/** Add future products here; navigation, footer and the company page list them. */
export const products = [
  {
    id: "pos",
    name: "Aestrox POS",
    shortName: "Point of sale",
    href: "/products/pos" as const,
    audience: "for cafés and restaurants",
    /** A real capture from public/product, shown on the company page. */
    image: "menu" as const,
    description:
      "Orders, kitchen tickets, tables, receipts and daily reports for cafés and restaurants, on the web and Android.",
  },
];

/** What every Aestrox POS workspace includes today. Keep in step with the product. */
export const posFeatures = [
  "Takeaway, dine-in and table orders",
  "Sizes, add-ons and kitchen notes",
  "Kitchen tickets and kitchen screen",
  "Receipts with CGST and SGST",
  "Transactions, reprints and reversals",
  "Sales dashboard",
  "Menu, prices and availability",
  "Team roles and multiple locations",
  "Web and Android",
];

/** The features page and the AI assistant both read these. Keep them true to the product. */
export const posFeatureAreas = [
  {
    label: "Ordering",
    title: "Build an order at the pace of service.",
    copy: "Tap items to add them, change quantities and keep the bill moving. Save an order to finish later or go straight to checkout.",
    points: [
      "Takeaway, dine-in and table orders",
      "Token or guest name on each order",
      "Search by name or initials",
      "Keyboard shortcuts at the counter",
    ],
  },
  {
    label: "Sizes & add-ons",
    title: "Make every order theirs.",
    copy: "Sizes, spice levels and extras are one tap each, with prices and tax worked out for you.",
    points: [
      "Sizes with their own prices",
      "Required and optional choices",
      "Add-ons and kitchen notes",
    ],
  },
  {
    label: "Kitchen",
    title: "Orders reach the kitchen as tickets.",
    copy: "Your kitchen screen shows new, preparing and ready tickets. Print a ticket whenever the kitchen needs paper.",
    points: [
      "Tickets when an order is sent",
      "New, preparing, ready to serve",
      "Cancellations marked in red",
    ],
  },
  {
    label: "Tables",
    title: "Run the floor from the counter.",
    copy: "Group tables by area, see who is seated and for how long, and open the bill for any table.",
    points: [
      "Indoor and outdoor areas",
      "Free and occupied at a glance",
      "Bill so far on each table",
    ],
  },
  {
    label: "Payments & receipts",
    title: "Keep the details within reach.",
    copy: "Record payments taken through your existing card machine or UPI. Aestrox is not a payment gateway; your team confirms each payment before recording it.",
    points: [
      "Cash, card and UPI",
      "Numbered receipts with CGST and SGST",
      "Find, reprint or reverse a sale",
      "58 mm, 80 mm and A4 layouts",
    ],
  },
  {
    label: "Reports",
    title: "Keep an eye on the day.",
    copy: "Your dashboard brings together sales, orders and your average bill, compared with yesterday.",
    points: ["Sales by hour", "Busiest hour of the day", "Payment and order type mix"],
  },
  {
    label: "Menu",
    title: "Keep what you serve up to date.",
    copy: "Manage categories, prices and GST rates. Switch an item off when it runs out and back on when it returns.",
    points: [
      "Categories, sizes and add-ons",
      "GST rate per item",
      "Drag to reorder",
      "Photos or icons",
    ],
  },
  {
    label: "Team",
    title: "The right access for the right people.",
    copy: "Invite your team, choose their role and connect them to the locations they work in.",
    points: [
      "Owner, cashier, waiter and kitchen roles",
      "Access by location",
      "Pause access without losing history",
    ],
  },
] as const;

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
