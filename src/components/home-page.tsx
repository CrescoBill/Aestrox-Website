import { Link } from "@tanstack/react-router";
import { useDemo } from "./site-shell";
import { Shot } from "./product-shot";
import { CheckList, CounterStage, FeatureRow, ShotStage } from "./showcase";
import { AndroidSection, BottomCTA, FAQSection } from "./product-pages";
import { site } from "@/data/site";

export function HomePage() {
  const demo = useDemo();
  return (
    <main id="main">
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="kicker">Aestrox POS</p>
            <h1>Made for the way you do business.</h1>
            <p className="lede">
              Point of sale for cafés and restaurants. Take orders, send them to the kitchen and
              close the day with clear numbers, in the browser or on Android.
            </p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => demo({ kind: "trial" })}>
                Start your free trial
              </button>
              <Link className="button button-quiet" to="/products/pos">
                Explore Aestrox POS
              </Link>
            </div>
            <p className="hero-note">
              {site.trialDays} days free. Our team helps you set up your menu and team.
            </p>
          </div>
          <CounterStage priority />
        </div>
      </section>

      <section className="section product-overview" aria-labelledby="overview-title">
        <div className="container">
          <div className="section-head">
            <h2 id="overview-title">From the first order to the last receipt.</h2>
            <p>
              Everything your counter, kitchen and office need during service, in one workspace for
              your whole team.
            </p>
          </div>
          <div className="feature-rows">
            <FeatureRow
              label="Ordering"
              title="Take orders at the pace of service."
              visual={<ShotStage name="customiser" secondary="ticket-1" />}
            >
              <p>
                Tap an item to add it. Choose half or full, set the spice level and add extras in
                one step. The total and tax update as you go.
              </p>
              <CheckList
                items={[
                  "Takeaway, dine-in and token orders",
                  "Search by name or initials",
                  "Save an order and finish it later",
                ]}
              />
            </FeatureRow>
            <FeatureRow
              reverse
              label="Kitchen"
              title="Orders reach the kitchen as tickets."
              visual={<ShotStage name="kitchen" tone="paper" />}
            >
              <p>
                Send an order to the kitchen and it appears as a ticket on the kitchen screen. Your
                cooks move it from new to preparing to ready, and can print it when they need paper.
              </p>
            </FeatureRow>
            <FeatureRow
              label="Reports"
              title="Know how your day is going."
              visual={<ShotStage name="dashboard" />}
            >
              <p>
                See net sales, orders and your average bill against yesterday, the busiest hour of
                the day and how your guests paid.
              </p>
              <Link className="text-link" to="/features">
                See everything in Aestrox POS
              </Link>
            </FeatureRow>
          </div>
        </div>
      </section>

      <section className="section daily-work" aria-labelledby="daily-title">
        <div className="container">
          <div className="section-head">
            <h2 id="daily-title">The rest of the day, covered.</h2>
          </div>
          <div className="bento">
            <article className="bento-card bento-wide">
              <div className="bento-copy">
                <h3>Tables</h3>
                <p>See which tables are free, how long guests have been seated and each bill.</p>
              </div>
              <div className="bento-shot">
                <Shot name="tables" sizes="(min-width: 1100px) 760px, 92vw" />
              </div>
            </article>
            <article className="bento-card bento-tall">
              <div className="bento-copy">
                <h3>Receipts</h3>
                <p>Every sale gets a numbered receipt with CGST and SGST.</p>
              </div>
              <div className="bento-shot bento-receipt">
                <Shot name="receipt" sizes="(min-width: 1100px) 300px, 70vw" />
              </div>
            </article>
            <article className="bento-card bento-wide">
              <div className="bento-copy">
                <h3>Your team</h3>
                <p>Owner, cashier, waiter and kitchen roles, each with the right access.</p>
              </div>
              <div className="bento-shot">
                <Shot name="team" sizes="(min-width: 1100px) 760px, 92vw" />
              </div>
            </article>
          </div>
        </div>
      </section>

      <AndroidSection />

      <section className="section company-band" aria-labelledby="company-title">
        <div className="container company-grid">
          <h2 id="company-title">Software that works for your business.</h2>
          <div>
            <p>
              Aestrox builds software for the work businesses do every day. We are starting with
              point of sale for cafés and restaurants, with more business tools to follow.
            </p>
            <Link className="text-link" to="/about">
              About our company
            </Link>
          </div>
        </div>
      </section>

      <section className="section getting-started" aria-labelledby="start-title">
        <div className="container">
          <div className="section-head">
            <h2 id="start-title">Set up with help from our team.</h2>
            <p>
              Try Aestrox with your own menu and team during your {site.trialDays}-day free trial.
            </p>
          </div>
          <ol className="steps">
            {[
              [
                "Tell us about your business",
                "Share your business details and the setup you use today.",
              ],
              ["Set up your workspace", "We help you get your menu, locations and team ready."],
              [
                `Try it for ${site.trialDays} days`,
                "Use Aestrox in your business and speak to us about the right plan for you.",
              ],
            ].map(([title, copy], index) => (
              <li key={title}>
                <span className="step-number" aria-hidden="true">
                  {index + 1}
                </span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FAQSection />
      <BottomCTA />
    </main>
  );
}
