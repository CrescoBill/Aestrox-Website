import { site } from "./site";
type Section = { title: string; paragraphs: string[] };
type LegalDocument = { title: string; intro: string; sections: Section[] };
export const legal: Record<"privacy" | "terms" | "cookies", LegalDocument> = {
  privacy: {
    title: "Privacy policy",
    intro:
      "How Aestrox collects, uses and protects information when you use Aestrox POS and our other products, our apps and this website, or contact our team.",
    sections: [
      {
        title: "Who we are",
        paragraphs: [
          `Aestrox provides business software, including Aestrox POS for cafés and restaurants on the web and Android. Our team is based in Mangalore, India; Dubai, UAE; and Dublin, Ireland. For privacy questions, contact ${site.email}.`,
          "This policy applies to our products, our apps, this website, and the enquiries and support requests you send us. If your business has a separate service agreement with us, that agreement also applies.",
        ],
      },
      {
        title: "Your business and its data",
        paragraphs: [
          "When a business uses Aestrox, the business decides what information goes into its workspace, such as staff accounts, menus, orders and notes. We handle that information on the business's behalf and follow its instructions and our agreement with it. The business is responsible for having the right to use that information and for telling its staff and customers how it is used.",
          "For account, subscription, support and enquiry information, Aestrox decides how the information is used, as described in this policy.",
        ],
      },
      {
        title: "Information we collect",
        paragraphs: [
          "Account information: the name, email address and role of each person with access, and the business and locations they can use. Passwords are never visible to our team.",
          "Business information: business and location names, address and contact details, tax registration and tax rates, menu items, prices, add-ons and menu photos.",
          "Sales records: orders and their items, notes and table or reference labels added by staff, kitchen tickets, receipts including the name of the staff member who issued them, the payment method and any payment reference staff record, cancellations and refunds, and the reports built from these records.",
          "Activity records: which account made important changes, such as editing the menu, issuing a receipt or reversing a sale, and when.",
          "Printer and device information: printer settings and print history needed to send receipts and kitchen tickets. The Android app asks for Bluetooth, nearby device, network and notification permissions only to connect to your printers and show printing status.",
          "Subscription and contact details: your plan, billing period, billing contact, and messages you send to our team, including website enquiries and questions to the website assistant.",
          "Technical information: IP address, device and browser type, request times and error details, used to run the services, keep them secure and fix problems.",
        ],
      },
      {
        title: "Payments",
        paragraphs: [
          "Aestrox POS does not process card or UPI payments and does not collect card numbers. Payments are taken with your own terminal or payment provider, and staff record the result in Aestrox.",
        ],
      },
      {
        title: "How we use information",
        paragraphs: [
          "We use information to provide our products: setting up accounts, sending invitations and service emails, calculating totals and taxes, issuing receipts, printing, building reports and keeping each business's records available to the people it authorises.",
          "We also use it to provide support, manage subscriptions, respond to enquiries, keep our services secure, prevent misuse, fix problems and improve our products. We do not sell personal information, and we do not use the information a business enters about its customers for advertising.",
          "Where data protection law requires a legal basis, we rely on performing our contract with your business or taking steps you asked for before one, our legitimate interests in running and securing our services and responding to enquiries, compliance with legal obligations, or your consent where consent is required. An enquiry is not a subscription to marketing emails.",
        ],
      },
      {
        title: "Who can see your information",
        paragraphs: [
          "Within a business, access depends on the role and locations the owner gives each person. One business cannot see another business's data.",
          "Our team accesses a business's data only when needed to provide support it asks for, keep the services secure, or meet a legal obligation.",
          "We use trusted service providers for hosting, data storage, sign-in, email delivery and the website assistant. They process information only to provide those services to us. We may also disclose information when the law requires it or to protect people, rights and property.",
          "Some providers may process information outside your country, including outside the European Economic Area. Where the law requires it, we use appropriate safeguards for these transfers. Contact us for details.",
        ],
      },
      {
        title: "How long we keep information",
        paragraphs: [
          "We keep a business's information while its account is active. Issued receipts cannot be edited; corrections are recorded as a separate reversal so the history stays complete. Financial records are kept for as long as the account is active and as tax and accounting rules require.",
          "When an account closes, the business can ask us for a copy of its records first. We then delete or anonymise the information within a reasonable period, unless the law requires us to keep it.",
          "Enquiries are kept as long as needed to respond, manage the resulting relationship and meet record-keeping obligations. Website assistant conversations are not saved to an account and clear when you reload the page. The service that generates replies may keep messages for a limited time for security under its own terms.",
        ],
      },
      {
        title: "Security",
        paragraphs: [
          "We protect information with secure sign-in, role-based access, separation between businesses, encrypted connections and records of important actions. No online service can guarantee absolute security.",
          "Please give each staff member their own account, keep sign-in details private, and do not share passwords or payment card details with the website assistant or in enquiries.",
        ],
      },
      {
        title: "Your choices and rights",
        paragraphs: [
          `Depending on applicable law, you may ask to access, correct, erase, restrict or receive a copy of your information, or object to certain uses. Where we rely on consent, you can withdraw it at any time. Write to ${site.email}; we may need to verify your identity.`,
          "If you are a staff member or customer of a business that uses Aestrox, please contact that business first. We will help it respond. You may also complain to your data protection authority, including the Irish Data Protection Commission where applicable.",
        ],
      },
      {
        title: "Cookies and children",
        paragraphs: [
          "We do not use advertising or tracking cookies. Our Cookies page explains what our products and this website store on your device.",
          "Aestrox products are made for businesses and are not intended for children.",
        ],
      },
      {
        title: "Updates and contact",
        paragraphs: [
          `We may update this policy when our products or practices change. The date below shows the current version. For questions or a privacy request, email ${site.email}.`,
        ],
      },
    ],
  },
  terms: {
    title: "Terms of use",
    intro: "The terms for using Aestrox POS and our other products, our apps and this website.",
    sections: [
      {
        title: "Using Aestrox",
        paragraphs: [
          `These terms apply when you use Aestrox products, our apps or this website. If your business has a signed order form or service agreement with us, that agreement applies where it differs from these terms. You can reach us at ${site.email}.`,
          "Aestrox products are for business use. If you accept these terms for a business, you confirm that you are allowed to do so on its behalf.",
        ],
      },
      {
        title: "Accounts and access",
        paragraphs: [
          "The business owner sets up the workspace, invites team members and chooses each person's role and locations. Each person should use their own account and keep their sign-in details private.",
          `Your business is responsible for activity under its accounts. Tell us at ${site.supportEmail} as soon as possible if you think an account has been used without permission.`,
        ],
      },
      {
        title: "Free trial and subscriptions",
        paragraphs: [
          `New businesses can try Aestrox POS free for ${site.trialDays} days. Paid plans are billed monthly or annually. We confirm your price, renewal and cancellation terms in writing before a paid subscription starts.`,
          "Sending an enquiry or choosing a billing period on this website does not create a subscription or a binding quotation. Applicable taxes may be added to fees. If fees remain unpaid after we have contacted you, we may restrict access to the paid account.",
        ],
      },
      {
        title: "Your data",
        paragraphs: [
          "Your business owns the information it enters, including menus, orders, receipts and reports. You allow us to store and process it only to provide, secure and support our services for you.",
          "You are responsible for the accuracy of the information you enter and for having the right to enter information about your staff and customers.",
        ],
      },
      {
        title: "Prices, taxes and receipts",
        paragraphs: [
          "Aestrox POS calculates totals and taxes from the prices, tax rates and business details you set. Your business is responsible for these settings and for meeting its own tax, invoicing and record-keeping obligations.",
          "Issued receipts cannot be edited. Cancellations and refunds are recorded as separate entries so the history stays complete. Receipts from Aestrox POS are sales receipts; where the law requires a formal tax invoice, check with your accountant whether a receipt is enough.",
        ],
      },
      {
        title: "Payments",
        paragraphs: [
          "Aestrox POS does not process payments. Staff record payments taken with your own terminal, cash drawer or payment provider. Recording a payment in Aestrox does not verify it, so check that the money was received before marking an order paid.",
        ],
      },
      {
        title: "Printers and devices",
        paragraphs: [
          "Printer support depends on the printer model, connection and device. Check your setup with our team before buying hardware. A print being sent does not guarantee that paper was printed, so check your printers during service.",
        ],
      },
      {
        title: "Acceptable use",
        paragraphs: [
          "Do not try to access another business's data, bypass security or usage limits, copy or reverse engineer our software except where the law allows, introduce harmful code, or interfere with the service for others.",
          "Do not use Aestrox for unlawful purposes, resell it without our agreement, or enter information you are not entitled to share.",
        ],
      },
      {
        title: "Availability and changes",
        paragraphs: [
          "We work to keep our services available, but maintenance, outages, and your own internet connection or devices can interrupt them. We improve our products over time and aim to give notice of changes that significantly affect a paid service.",
        ],
      },
      {
        title: "This website and the assistant",
        paragraphs: [
          "Website descriptions give an overview, not a promise that every configuration, device or integration is supported. Product previews use fictional sample data.",
          "The website assistant is an AI system, not a person. Its answers may be incomplete or wrong. It cannot access your account, send an enquiry for you or make a commitment. Confirm important product, pricing and compatibility questions with our team.",
        ],
      },
      {
        title: "Our software and content",
        paragraphs: [
          "Aestrox software, branding and content belong to Aestrox or its licensors. While your subscription or trial is active, your business may use our products for its own operations under these terms.",
          "Other names and marks belong to their owners. Mentioning a device, platform or service does not imply endorsement or a partnership.",
        ],
      },
      {
        title: "Ending your use",
        paragraphs: [
          "You can stop using Aestrox at any time, subject to the cancellation terms of your subscription. We may suspend or end access for a serious breach of these terms or to protect the service and other customers.",
          "Before an account closes, your business can ask us for a copy of its records.",
        ],
      },
      {
        title: "Responsibility",
        paragraphs: [
          "We provide our services with reasonable care and skill. To the extent the law allows, we are not responsible for indirect losses or lost profits, and your service agreement may set further limits. Nothing in these terms excludes rights or responsibilities that cannot be excluded by law.",
          "Our products and website do not give legal, tax or financial advice.",
        ],
      },
      {
        title: "Changes and questions",
        paragraphs: [
          `We may update these terms as our products change. The date below shows the current version. Contact ${site.email} with any questions.`,
        ],
      },
    ],
  },
  cookies: {
    title: "Cookies & local storage",
    intro: "What Aestrox products and this website store on your device, and why.",
    sections: [
      {
        title: "No advertising or tracking",
        paragraphs: [
          "Aestrox products and this website do not use advertising cookies, tracking pixels or third-party analytics. We do not show a consent banner because there is no tracking to consent to.",
        ],
      },
      {
        title: "Aestrox POS and apps",
        paragraphs: [
          "Aestrox POS stores what it needs to work on your device: keeping you signed in, remembering the business and location you chose, your layout preferences, and the printer and receipt settings for each location.",
          "These are needed for the service to work. Clearing them signs you out and resets those settings on that device.",
        ],
      },
      {
        title: "This website",
        paragraphs: [
          "The sample order, pricing choice, form entries and assistant conversation are kept only while the page is open. Reloading the page clears them.",
          "The website remembers your scroll position within a browser tab so the back and forward buttons return you to the same place. It is not used for advertising or profiling.",
        ],
      },
      {
        title: "Your controls",
        paragraphs: [
          `You can manage cookies and site data in your browser or device settings. If we ever add optional tracking, we will update this page and ask for consent where required before turning it on. Questions can be sent to ${site.email}.`,
        ],
      },
    ],
  },
};
