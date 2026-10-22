import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Check,
  ChevronDown,
  Coffee,
  Mail,
  Monitor,
  Phone,
  Printer,
  Smartphone,
} from "lucide-react";
import { useDemo } from "./site-shell";
import { Brand } from "./brand";
import { ProductPreview, ReceiptPreview, ReportingPreview } from "./product-preview";
import { ContactForm } from "./contact-form";
import { ProductGallery } from "./product-gallery";
import { site, faqs, posFeatures, type BillingPeriod } from "@/data/site";
import { companyStructuredData } from "@/data/seo";

export function pageHead(title: string, description: string, path = "/") {
  const fullTitle = title.startsWith("Aestrox") ? title : `${title} | Aestrox`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: site.origin + path },
      { property: "og:type", content: "website" },
      { property: "og:image", content: site.origin + "/social-preview.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Aestrox business software and POS workspace" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: site.origin + "/social-preview.png" },
    ],
    links: [{ rel: "canonical", href: site.origin + path }],
    scripts:
      path === "/"
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify(companyStructuredData).replace(/</g, "\\u003c"),
            },
          ]
        : [],
  };
}

export function PageIntro({ label, title, copy }: { label: string; title: string; copy: string }) {
  return (
    <section className="page-intro">
      <div className="container">
        <p className="eyebrow">{label}</p>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="section faq-section" id="questions">
      <div className="container faq-layout">
        <div>
          <p className="eyebrow">FAQs</p>
          <h2>Frequently asked questions</h2>
          <p>Have something else in mind?</p>
          <Link className="text-link" to="/contact">
            We’re here to help
          </Link>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <ChevronDown size={20} aria-hidden="true" />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BottomCTA() {
  const demo = useDemo();
  return (
    <section className="bottom-cta">
      <div className="container cta-inner">
        <div>
          <p className="eyebrow">Get started</p>
          <h2>
            Try Aestrox POS
            <br />
            free for {site.trialDays} days.
          </h2>
        </div>
        <div>
          <p>Get set up with help from our team.</p>
          <button className="button button-primary" onClick={() => demo({ kind: "trial" })}>
            Start your free trial
          </button>
          <a className="cta-email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}

export function AndroidSection() {
  const demo = useDemo();
  return (
    <section className="android-section" id="android">
      <div className="container android-grid">
        <div>
          <p className="eyebrow">Aestrox for Android</p>
          <h2>
            Aestrox,
            <br />
            where you work.
          </h2>
          <p>
            Keep Aestrox close when you’re away from the counter. Get the app for your team’s
            Android devices.
          </p>
          {site.androidStoreUrl ? (
            <a
              className="button button-white"
              href={site.androidStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Smartphone size={19} /> Get the app
            </a>
          ) : (
            <button className="button button-white" onClick={() => demo({ kind: "android" })}>
              <Smartphone size={19} /> Get the app
            </button>
          )}
        </div>
        <div className="phone-stage">
          <div className="phone-frame">
            <div className="phone-camera" />
            <div className="phone-app">
              <Brand />
              <div className="phone-heading">
                <small>THE DAILY CAFÉ</small>
                <strong>
                  Your business,
                  <br />
                  in your hands.
                </strong>
              </div>
              <div className="phone-order-title">
                Current order <span>2 items</span>
              </div>
              <div className="phone-item">
                <span>
                  <Coffee />
                </span>
                <div>
                  <strong>Cappuccino</strong>
                  <small>Regular · 1 item</small>
                </div>
                <b>₹180</b>
              </div>
              <div className="phone-item">
                <span>
                  <Coffee />
                </span>
                <div>
                  <strong>Iced latte</strong>
                  <small>Regular · 1 item</small>
                </div>
                <b>₹220</b>
              </div>
              <div className="phone-total">
                <span>Total</span>
                <strong>₹400</strong>
              </div>
              <div className="phone-checkout">Checkout</div>
              <small className="phone-sample">Illustrative workspace</small>
            </div>
            <div className="phone-home" />
          </div>
          <div className="phone-stage-label">
            At your counter.
            <br />
            In your pocket.
          </div>
        </div>
      </div>
    </section>
  );
}

export function PricingSection() {
  const demo = useDemo();
  const [period, setPeriod] = useState<BillingPeriod>("Annual");
  return (
    <section className="pricing-section">
      <div className="container pricing-layout">
        <div className="pricing-intro">
          <p className="eyebrow">Aestrox POS</p>
          <h2>
            A plan that fits
            <br />
            your business.
          </h2>
          <p>
            Tell us about your team and locations. We’ll walk you through the right setup, with
            clear terms before you start.
          </p>
          <div className="billing-toggle" role="group" aria-label="Billing period">
            {(["Monthly", "Annual"] as const).map((value) => (
              <button key={value} aria-pressed={period === value} onClick={() => setPeriod(value)}>
                {value}
              </button>
            ))}
          </div>
          <p className="billing-caption" aria-live="polite">
            {period === "Annual"
              ? "An annual subscription for the year ahead."
              : "A monthly subscription for your business."}
          </p>
        </div>
        <div className="pricing-card">
          <div className="plan-top">
            <span>STANDARD</span>
            <span>{period} billing</span>
          </div>
          <h3>Aestrox POS</h3>
          <p className="plan-description">Your counter, your team and your daily operations.</p>
          <div className="price-label">Let’s talk pricing.</div>
          <p>Contact us for a quote for your business.</p>
          <button
            className="button button-primary"
            onClick={() => demo({ kind: "pricing", billingPeriod: period })}
          >
            Contact for pricing
          </button>
          <div className="plan-features">
            <h4>In your workspace</h4>
            <ul>
              {posFeatures.map((feature) => (
                <li key={feature}>
                  <Check size={16} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <p className="pricing-footnote">Start with a {site.trialDays}-day free trial.</p>
        </div>
      </div>
    </section>
  );
}

export function BillingWorkspace() {
  return <ProductPreview />;
}

export function BillingPage() {
  const demo = useDemo();
  return (
    <main id="main">
      <section className="product-hero">
        <div className="container">
          <p className="eyebrow">Aestrox POS</p>
          <h1>
            Point of sale for
            <br />
            cafés and restaurants.
          </h1>
          <p>Manage your counter, team and daily business in one place.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => demo({ kind: "trial" })}>
              Start your free trial
            </button>
            <Link className="text-link" to="/features">
              Explore the workspace
            </Link>
          </div>
          <div className="product-hero-preview">
            <ProductPreview />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container intro-grid">
          <p className="eyebrow">Your daily operations</p>
          <div>
            <h2>
              Run your counter
              <br />
              from one workspace.
            </h2>
            <p>
              Aestrox POS brings the essentials of running your counter into one workspace. Set up
              your menu, take an order, record the payment and keep a clear record of the day.
            </p>
          </div>
        </div>
      </section>
      <section className="section canvas-section">
        <div className="container product-details">
          <div>
            <p className="eyebrow">A workspace that makes sense</p>
            <h2>
              From menu
              <br />
              to close of day.
            </h2>
            <Link className="text-link" to="/features">
              A closer look
            </Link>
          </div>
          <div className="capability-list">
            {[
              [
                "Orders & billing",
                "Add items, make the changes your guest asks for, and complete the bill when you’re ready.",
              ],
              [
                "Your menu",
                "Organise categories, prices, variants and modifiers in a way that fits what you serve.",
              ],
              [
                "A record of the day",
                "Find an order, check a transaction or review your daily overview without starting from scratch.",
              ],
              [
                "Your team & locations",
                "Give people access to the work they do and move between the businesses you manage.",
              ],
            ].map(([title, copy]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <AndroidSection />
      <PricingSection />
      <FAQSection />
      <BottomCTA />
    </main>
  );
}

export function FeaturesPage() {
  return (
    <main id="main">
      <PageIntro
        label="Inside Aestrox POS"
        title="Familiar work. One workspace."
        copy="A closer look at the tools your team can use throughout the day."
      />
      <ProductGallery />
      <section className="section canvas-section">
        <div className="container feature-editorial">
          {[
            [
              "The counter",
              "Build an order at the pace of service.",
              "Choose items, adjust quantities and customise variants or modifiers. Save an open order or move on to checkout.",
            ],
            [
              "The menu",
              "Keep what you serve up to date.",
              "Manage categories, item photos or icons, prices and tax rates. Enable or disable items when your menu changes.",
            ],
            [
              "The record",
              "Keep the details within reach.",
              "Record externally confirmed payments, review transactions and print a receipt. Aestrox is not a payment gateway.",
            ],
            [
              "The team",
              "The right access for the right people.",
              "Invite your team, set their role and connect them to the locations they work in.",
            ],
          ].map(([label, title, copy]) => (
            <article key={label}>
              <p className="eyebrow">{label}</p>
              <h2>{title}</h2>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container split-grid">
          <ReportingPreview />
          <div className="section-copy">
            <p className="eyebrow">The bigger picture</p>
            <h2>
              Keep an eye
              <br />
              on the day.
            </h2>
            <p>
              Your dashboard brings together completed orders and recorded sales, with transactions
              a step away when you want the detail.
            </p>
          </div>
        </div>
      </section>
      <BottomCTA />
    </main>
  );
}

export function HardwarePage() {
  const demo = useDemo();
  return (
    <main id="main">
      <PageIntro
        label="Devices & printing"
        title="Start with the right setup."
        copy="Your device, printer and connection should work together. We’ll help you understand what fits before you buy."
      />
      <section className="section">
        <div className="container hardware-layout">
          <div className="receipt-stage">
            <ReceiptPreview />
          </div>
          <div>
            <p className="eyebrow">At your counter</p>
            <h2>
              The bill is part
              <br />
              of the experience.
            </h2>
            <p>
              A readable receipt, with your business details and a clear breakdown. Choose a layout
              that suits your setup.
            </p>
            <ul className="plain-list">
              <li>
                <Check size={18} /> 58mm and 80mm receipt layouts
              </li>
              <li>
                <Check size={18} /> A4 for a standard office printer
              </li>
              <li>
                <Check size={18} /> Browser printing through your device’s print dialog
              </li>
            </ul>
            <button className="button button-primary" onClick={() => demo()}>
              Check my printer setup
            </button>
          </div>
        </div>
      </section>
      <section className="section canvas-section">
        <div className="container device-grid">
          {[
            [
              Monitor,
              "Web",
              "Use Aestrox in a modern browser. Printing depends on the options your computer or mobile device makes available.",
            ],
            [
              Smartphone,
              "Android",
              "Talk to us about the Android app and direct thermal-printing setup for your team.",
            ],
            [
              Printer,
              "Your printer",
              "USB, Bluetooth and network connections need the right device and adapter. Share your exact model so we can check compatibility.",
            ],
          ].map(([Icon, title, copy]) => {
            const DeviceIcon = Icon as typeof Monitor;
            return (
              <article key={String(title)}>
                <DeviceIcon size={34} strokeWidth={1.3} />
                <h3>{String(title)}</h3>
                <p>{String(copy)}</p>
              </article>
            );
          })}
        </div>
      </section>
      <FAQSection />
      <BottomCTA />
    </main>
  );
}

export function PricingPage() {
  return (
    <main id="main">
      <PageIntro
        label="Plans & pricing"
        title="Let’s find your fit."
        copy="Choose monthly or annual billing. Contact us for a quote, or start with a 14-day free trial."
      />
      <PricingSection />
      <FAQSection />
      <BottomCTA />
    </main>
  );
}

export function AboutPage() {
  return (
    <main id="main">
      <PageIntro
        label="About Aestrox"
        title="For the people behind the business."
        copy="Aestrox is a software company with a simple focus: the everyday work that makes a business run."
      />
      <section className="section">
        <div className="container about-statement">
          <p>We build business software.</p>
          <h2>
            Practical tools.
            <br />
            Built for everyday use.
          </h2>
          <div>
            <p>
              Aestrox builds software for the people who run businesses. Our focus is on clear
              interfaces, reliable day-to-day use and support when you need it.
            </p>
            <p>
              We’re starting with Aestrox POS for cafés and restaurants. It’s the first part of a
              broader direction: connected tools for business operations, teams and the way people
              work.
            </p>
            <Link className="text-link" to="/products/pos">
              Meet our first product
            </Link>
          </div>
        </div>
      </section>
      <BottomCTA />
    </main>
  );
}

export function ContactPage() {
  return (
    <main id="main">
      <section className="section contact-section">
        <div className="container contact-layout">
          <div>
            <p className="eyebrow">Contact Aestrox</p>
            <h1>Talk to our team.</h1>
            <p>
              Have a question, want a closer look, or ready to get your team set up? Let’s talk.
            </p>
            <div className="contact-methods">
              <a href={`mailto:${site.email}`}>
                <Mail />
                <span>
                  <small>General enquiries</small>
                  {site.email}
                </span>
              </a>
              <a href={`tel:${site.phone}`}>
                <Phone />
                <span>
                  <small>India sales</small>
                  {site.phoneDisplay}
                </span>
              </a>
            </div>
            <div className="contact-support">
              <strong>Already using Aestrox?</strong>
              <p>
                For product help, email{" "}
                <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
              </p>
            </div>
          </div>
          <div className="contact-form-card">
            <h2>Send an enquiry</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}

export function IntegrationsPage() {
  const demo = useDemo();
  return (
    <main id="main">
      <PageIntro
        label="Your wider setup"
        title="Plan your integrations with us."
        copy="Your business already has its own way of working. Tell us what needs to connect."
      />
      <section className="section">
        <div className="container narrow-copy">
          <h2>Check what works with your setup.</h2>
          <p>
            Payment providers, accounting tools and delivery platforms all have their own
            requirements. We don’t list an integration as available until it’s ready for use.
          </p>
          <p>
            Today, Aestrox POS can record payments confirmed through your existing payment setup.
            Automatic payment verification, accounting sync and delivery-platform connections aren’t
            included in the current product.
          </p>
          <button className="button button-primary" onClick={() => demo()}>
            Discuss my requirements
          </button>
        </div>
      </section>
      <BottomCTA />
    </main>
  );
}
