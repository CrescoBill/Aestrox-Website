import { Link } from "@tanstack/react-router";
import { useDemo } from "./site-shell";
import { ProductPreview, ReceiptPreview, ReportingPreview } from "./product-preview";
import { FAQSection, BottomCTA, AndroidSection } from "./product-pages";

export function HomePage() {
  const demo = useDemo();
  return (
    <main id="main">
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Software, with your business in mind</p>
            <h1>
              Made for the way
              <br />
              you do <span>business.</span>
            </h1>
            <p className="hero-description">
              Business software that helps you spend less time managing the day and more time
              running your business.
            </p>
            <p className="hero-detail">
              Meet our first product, Aestrox POS.
              <br />
              For cafés, restaurants and the people behind them.
            </p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => demo({ kind: "trial" })}>
                Start your free trial
              </button>
              <Link className="text-link" to="/products/pos">
                Explore Aestrox POS
              </Link>
            </div>
            <p className="trial-note">Try Aestrox POS free for 14 days.</p>
          </div>
          <div className="hero-product-stage">
            <div className="stage-caption">
              <span>AESTROX POS</span>
              <span>Interactive product preview</span>
            </div>
            <ProductPreview compact />
            <div className="stage-bottom">
              <span>Sample café workspace</span>
              <span>Made for hospitality</span>
            </div>
          </div>
        </div>
      </section>
      <div className="audience-strip">
        <div className="container">
          <span>For hospitality businesses</span>
          <p>Cafés</p>
          <span className="audience-dot" />
          <p>Restaurants</p>
          <span className="audience-dot" />
          <p>Takeaways</p>
          <span className="audience-dot" />
          <p>Food businesses</p>
        </div>
      </div>
      <section className="section introduction">
        <div className="container intro-grid">
          <p className="eyebrow">About Aestrox</p>
          <div>
            <h2>
              Software that works
              <br />
              for your business.
            </h2>
            <p>
              We build software for the work businesses do every day. We’re starting with point of
              sale for cafés and restaurants, with more business tools to follow.
            </p>
            <Link className="text-link" to="/about">
              About our company
            </Link>
          </div>
        </div>
      </section>
      <section className="pos-story">
        <div className="container">
          <div className="story-heading">
            <div>
              <p className="eyebrow">Meet Aestrox POS</p>
              <h2>
                Your counter,
                <br />
                under control.
              </h2>
            </div>
            <div>
              <p>
                Take orders, keep your menu up to date and handle billing in one place. Your team
                can get on with service while you keep track of the business.
              </p>
              <Link className="text-link" to="/products/pos">
                Explore Aestrox POS
              </Link>
            </div>
          </div>
          <div className="story-visuals">
            <div className="story-app">
              <ProductPreview />
              <span className="visual-caption">A sample order. Try adding an item.</span>
            </div>
            <div className="story-receipt">
              <ReceiptPreview />
            </div>
          </div>
        </div>
      </section>
      <section className="section business-view">
        <div className="container split-grid">
          <div className="report-stage">
            <ReportingPreview />
          </div>
          <div className="section-copy">
            <p className="eyebrow">A view beyond the counter</p>
            <h2>
              Know how
              <br />
              your day is going.
            </h2>
            <p>
              Check the day’s transactions, look back at an order, or keep your team’s access
              organised. The details are there when you need them.
            </p>
            <Link className="text-link" to="/features">
              Explore the workspace
            </Link>
          </div>
        </div>
      </section>
      <AndroidSection />
      <section className="section approach">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Getting started</p>
            <h2>
              Set up with
              <br />
              help from our team.
            </h2>
            <p>Try Aestrox with your own menu and team during your 14-day free trial.</p>
          </div>
          <div className="approach-grid">
            {[
              [
                "Tell us about your business",
                "Share your business details and the setup you use today.",
              ],
              ["Set up your workspace", "We’ll help you get your menu, locations and team ready."],
              [
                "Try it for 14 days",
                "Use Aestrox in your business and speak to us about the right plan for you.",
              ],
            ].map(([title, copy], i) => (
              <div key={title}>
                <span className="step-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FAQSection />
      <BottomCTA />
    </main>
  );
}
