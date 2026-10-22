import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Mail, Monitor, Phone, Printer, Smartphone } from "lucide-react";
import { useDemo } from "./site-shell";
import { ContactForm } from "./contact-form";
import { PhoneShot, Shot } from "./product-shot";
import { CheckList, FeatureRow, OrderingStage, ShotStage } from "./showcase";
import { site, faqs, posFeatures, products, type BillingPeriod } from "@/data/site";
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
        <p className="kicker">{label}</p>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="section faq-section" id="questions" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <div>
          <h2 id="faq-title">Frequently asked questions</h2>
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
    <section className="bottom-cta" aria-labelledby="cta-title">
      <div className="container cta-inner">
        <div>
          <h2 id="cta-title">Try Aestrox POS free for {site.trialDays} days.</h2>
          <p>Get set up with help from our team.</p>
        </div>
        <div className="cta-actions">
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
    <section className="android-section" id="android" aria-labelledby="android-title">
      <div className="container android-grid">
        <div className="android-copy">
          <p className="kicker">Aestrox for Android</p>
          <h2 id="android-title">Aestrox, where you work.</h2>
          <p>
            Take orders at the table or the counter on Android phones and tablets. Print receipts
            from the device to a compatible receipt printer.
          </p>
          {site.androidStoreUrl ? (
            <a
              className="button button-white"
              href={site.androidStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Smartphone size={19} aria-hidden="true" /> Get the app
            </a>
          ) : (
            <button className="button button-white" onClick={() => demo({ kind: "android" })}>
              <Smartphone size={19} aria-hidden="true" /> Get the app
            </button>
          )}
        </div>
        <div className="android-phones">
          <PhoneShot name="phone-cart" className="handset-back" />
          <PhoneShot name="phone-order" className="handset-front" />
        </div>
      </div>
    </section>
  );
}

export function PricingSection() {
  const demo = useDemo();
  const [period, setPeriod] = useState<BillingPeriod>("Annual");
  return (
    <section className="section pricing-section" aria-labelledby="pricing-title">
      <div className="container pricing-layout">
        <div className="pricing-intro">
          <p className="kicker">Aestrox POS</p>
          <h2 id="pricing-title">A plan that fits your business.</h2>
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
            <span>Standard</span>
            <span>{period} billing</span>
          </div>
          <h3>Aestrox POS</h3>
          <p className="plan-description">Your counter, your kitchen and your team.</p>
          <div className="price-label">Let’s talk pricing.</div>
          <p>Contact us for a quote for your business.</p>
          <button
            className="button button-primary"
            onClick={() => demo({ kind: "pricing", billingPeriod: period })}
          >
            Contact for pricing
          </button>
          <div className="plan-features">
            <h4>Every workspace includes</h4>
            <CheckList items={posFeatures} />
          </div>
          <p className="pricing-footnote">Start with a {site.trialDays}-day free trial.</p>
        </div>
      </div>
    </section>
  );
}

export function BillingPage() {
  const demo = useDemo();
  return (
    <main id="main">
      <section className="product-hero">
        <div className="container">
          <div className="product-hero-copy">
            <p className="kicker">Aestrox POS</p>
            <h1>Point of sale for cafés and restaurants.</h1>
            <p className="lede">
              Manage your counter, your kitchen and your team in one place. Use it in the browser or
              on Android.
            </p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => demo({ kind: "trial" })}>
                Start your free trial
              </button>
              <Link className="button button-quiet" to="/features">
                See all features
              </Link>
            </div>
          </div>
          <OrderingStage priority />
        </div>
      </section>

      <section className="section" aria-labelledby="essentials-title">
        <div className="container">
          <div className="section-head">
            <h2 id="essentials-title">Run your counter from one workspace.</h2>
            <p>
              Set up your menu, take an order, send it to the kitchen, record the payment and keep a
              clear record of the day.
            </p>
          </div>
          <div className="capabilities">
            {[
              [
                "Orders & billing",
                "Add items, make the changes your guest asks for and complete the bill when you’re ready.",
              ],
              [
                "Kitchen tickets",
                "Orders reach the kitchen screen as tickets that move from new to ready.",
              ],
              ["Tables", "See every table at a glance and add to a bill as guests order more."],
              [
                "Your menu",
                "Organise categories, prices, sizes and add-ons in a way that fits what you serve.",
              ],
              [
                "A record of the day",
                "Find any sale, reprint a receipt or review the day’s sales on your dashboard.",
              ],
              [
                "Your team & locations",
                "Give people the access their role needs and move between the businesses you manage.",
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

      <section className="section tinted-section" aria-labelledby="pos-detail-title">
        <div className="container">
          <h2 className="sr-only" id="pos-detail-title">
            Aestrox POS in detail
          </h2>
          <div className="feature-rows">
            <FeatureRow
              label="Kitchen"
              title="The kitchen sees every order."
              visual={<ShotStage name="kitchen" tone="paper" />}
            >
              <p>
                Send an order to the kitchen and your team sees it straight away, with sizes,
                add-ons and notes. Cancellations are marked clearly.
              </p>
            </FeatureRow>
            <FeatureRow
              reverse
              label="Tables"
              title="Every table, one glance."
              visual={<ShotStage name="tables" tone="paper" />}
            >
              <p>
                Free tables, seated guests, how long they have been there and the bill so far. Tap a
                table to add to its order.
              </p>
            </FeatureRow>
            <FeatureRow
              label="Records"
              title="A receipt for every sale."
              visual={<ShotStage name="transactions" secondary="receipt" tone="paper" />}
            >
              <p>
                Record cash, card or UPI payments taken through your existing setup. Every sale gets
                a numbered receipt you can find, reprint or reverse later.
              </p>
            </FeatureRow>
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

const featureAreas = [
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
    visual: <ShotStage name="menu" secondary="cart" />,
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
    visual: <ShotStage name="customiser" />,
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
    visual: <ShotStage name="kitchen" tone="paper" />,
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
    visual: <ShotStage name="tables" tone="paper" />,
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
    visual: <ShotStage name="transactions" secondary="receipt" tone="paper" />,
  },
  {
    label: "Reports",
    title: "Keep an eye on the day.",
    copy: "Your dashboard brings together sales, orders and your average bill, compared with yesterday.",
    points: ["Sales by hour", "Busiest hour of the day", "Payment and order type mix"],
    visual: <ShotStage name="dashboard" />,
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
    visual: <ShotStage name="menu-manage" tone="paper" />,
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
    visual: <ShotStage name="team" tone="paper" />,
  },
] as const;

export function FeaturesPage() {
  return (
    <main id="main">
      <PageIntro
        label="Inside Aestrox POS"
        title="Familiar work. One workspace."
        copy="A closer look at the tools your team uses throughout the day, from the first order to the close of business."
      />
      <section className="section features-list" aria-label="Aestrox POS features">
        <div className="container feature-rows">
          {featureAreas.map((area, index) => (
            <FeatureRow
              key={area.label}
              reverse={index % 2 === 1}
              label={area.label}
              title={area.title}
              visual={area.visual}
            >
              <p>{area.copy}</p>
              <CheckList items={area.points} />
            </FeatureRow>
          ))}
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
            <Shot name="receipt" className="receipt-shot" sizes="(min-width: 760px) 320px, 80vw" />
          </div>
          <div className="hardware-copy">
            <h2>The bill is part of the experience.</h2>
            <p>
              A readable receipt with your business details and a clear tax breakdown. Choose the
              layout that suits your printer.
            </p>
            <CheckList
              items={[
                "58 mm and 80 mm receipt layouts",
                "A4 for a standard office printer",
                "Browser printing through your device’s print dialog",
                "Direct printing from the Android app to a compatible printer",
              ]}
            />
            <button className="button button-primary" onClick={() => demo()}>
              Check my printer setup
            </button>
          </div>
        </div>
      </section>
      <section className="section tinted-section" aria-labelledby="devices-title">
        <div className="container">
          <div className="section-head">
            <h2 id="devices-title">Works with the devices you have.</h2>
          </div>
          <div className="device-grid">
            {(
              [
                [
                  Monitor,
                  "Web",
                  "Use Aestrox in a modern browser on a computer or tablet. Printing uses the options your device makes available.",
                ],
                [
                  Smartphone,
                  "Android",
                  "Use the Android app on phones and tablets, with direct printing to a compatible thermal printer.",
                ],
                [
                  Printer,
                  "Your printer",
                  "USB, Bluetooth and network printers need the right device and connection. Share your exact model so we can check it.",
                ],
              ] as const
            ).map(([Icon, title, copy]) => (
              <article key={title}>
                <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
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
        copy={`Choose monthly or annual billing. Contact us for a quote, or start with a ${site.trialDays}-day free trial.`}
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
          <h2>Practical tools, built for everyday use.</h2>
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
          </div>
        </div>
      </section>
      <section className="section tinted-section" aria-labelledby="products-title">
        <div className="container">
          <div className="section-head">
            <h2 id="products-title">Our products</h2>
          </div>
          <div className="product-list">
            {products.map((product) => (
              <Link key={product.id} to={product.href} className="product-card">
                <div className="product-card-copy">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <span className="text-link">Explore {product.name}</span>
                </div>
                <div className="product-card-shot">
                  <Shot name={product.image} decorative sizes="(min-width: 760px) 420px, 88vw" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="where-title">
        <div className="container where-grid">
          <h2 id="where-title">Where we work</h2>
          <ul className="place-list">
            <li>
              <strong>Mangalore, India</strong>
              <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
            </li>
            <li>
              <strong>Dubai, UAE</strong>
              {site.dubaiPhone ? (
                <a href={`tel:${site.dubaiPhone}`}>{site.dubaiPhoneDisplay}</a>
              ) : null}
            </li>
            <li>
              <strong>Dublin, Ireland</strong>
              <a href={`tel:${site.irelandPhone}`}>{site.irelandPhoneDisplay}</a>
            </li>
          </ul>
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
            <p className="kicker">Contact Aestrox</p>
            <h1>Talk to our team.</h1>
            <p>
              Have a question, want a closer look, or ready to get your team set up? Let’s talk.
            </p>
            <div className="contact-methods">
              <a href={`mailto:${site.email}`}>
                <Mail aria-hidden="true" />
                <span>
                  <small>General enquiries</small>
                  {site.email}
                </span>
              </a>
              <a href={`tel:${site.phone}`}>
                <Phone aria-hidden="true" />
                <span>
                  <small>India sales</small>
                  {site.phoneDisplay}
                </span>
              </a>
              {site.dubaiPhone ? (
                <a href={`tel:${site.dubaiPhone}`}>
                  <Phone aria-hidden="true" />
                  <span>
                    <small>Dubai</small>
                    {site.dubaiPhoneDisplay}
                  </span>
                </a>
              ) : null}
              <a href={`tel:${site.irelandPhone}`}>
                <Phone aria-hidden="true" />
                <span>
                  <small>Ireland</small>
                  {site.irelandPhoneDisplay}
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
            Today, Aestrox POS records payments confirmed through your existing payment setup.
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
