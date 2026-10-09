import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowRight, ArrowLeftRight, Check, Monitor, QrCode, ReceiptText, ScanLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDemo } from '@/components/site-shell';
import { BusinessSections, InsightsSection, FAQSection, PricingSection, HardwareSection, IntegrationsSection, BottomCTA } from '@/components/product-pages';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Aestrox — Billing software for better business days' },
    { name: 'description', content: 'Discover Aestrox billing software for checkout, products, inventory, and sales insights.' },
    { property: 'og:title', content: 'Aestrox — Billing software for better business days' },
    { property: 'og:description', content: 'Discover a clearer way to manage billing, products, and your business.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

const menuItems = [
  { category: 'VEG', name: 'Paneer Tikka Angara', price: 320 },
  { category: 'NON-VEG', name: 'Murgh Dum Biryani', price: 380 },
  { category: 'NON-VEG', name: 'Butter Chicken Kulcha', price: 340 },
  { category: 'VEG', name: 'Garlic Butter Naan', price: 90 },
  { category: 'BEVERAGE', name: 'Ginger Masala Chai', price: 99 },
  { category: 'DESSERT', name: 'Gulab Jamun Twist', price: 120 },
];
function Index() {
  const openDemo = useDemo();
  const [counts, setCounts] = useState([1, 1, 1, 1, 1, 0]);
  const [paid, setPaid] = useState(false);
  const subtotal = menuItems.reduce((sum, item, index) => sum + item.price * (counts[index] ?? 0), 0);
  const total = subtotal * 1.05;
  function addItem(index: number) { setCounts(previous => previous.map((n, i) => i === index ? n + 1 : n)); setPaid(false); }
  return <>
    <main>
      <section className="hero" id="overview"><div className="container">
        <div className="hero-copy"><div className="hero-brand-name">Aestrox</div><h1>Billing software.<br /><span>A better business day.</span></h1><p className="hero-subtitle">Every sale, every product, every receipt.<br className="mobile-break" /> Beautifully connected.</p><div className="hero-buttons"><Button variant="pill" onClick={() => openDemo()}>Book a demo</Button><Link className="text-link" to="/billing">Explore billing <ArrowRight /></Link></div></div>
        <div className="terminal-shell"><div className="terminal-screen">
          <div className="terminal-topbar"><span className="terminal-label"><span className="dot" /> AESTROX · BUSINESS OVERVIEW</span><div><span className="live">● SAMPLE WORKSPACE</span><span className="terminal-date">TODAY’S OVERVIEW</span></div></div>
          <div className="terminal-main"><div><div className="micro">TODAY’S REVENUE</div><div className="revenue">₹1,84,200</div><div className="revenue-note"><span>↗ 12.4%</span> VS YESTERDAY · LIVE RECONCILIATION</div><div className="terminal-stats"><span>Table #12 · ₹1,333.50</span><span>Table #06 · ₹2,840.00</span><span>Swiggy #802 · ₹840.00</span></div></div>
          <div className="payment-preview"><div className="payment-top">BILLING & PAYMENTS <span>● PAYMENT RECEIVED</span></div><div className="payment-info"><QrCode className="qr" /><div><small>Every sale, together.</small><strong>₹1,333.50</strong><div className="micro">UPI TRANSACTION VERIFIED</div></div></div></div></div>
          <div className="terminal-bottom"><span><span className="dot" /> Connected billing workspace</span><span>A clearer picture.</span></div>
        </div></div>
      </div></section>
      <section className="workflow-strip"><div className="container"><span>From opening time to the final receipt.</span><div><ReceiptText /> Billing</div><div><ArrowLeftRight /> Products</div><div><Monitor /> Insights</div></div></section>
      <BusinessSections />
      <section className="band" id="terminal"><div className="container"><div className="section-heading center"><div className="eyebrow">YOUR COUNTER, SIMPLIFIED</div><h2>Every bill. Effortlessly.</h2><p>A focused checkout for your busiest moments.</p></div>
        <div className="pos-shell"><div className="pos"><div className="pos-menu"><div className="pos-heading"><strong><span className="dot" /> Table #12 · 4 Guests</strong><span>LIVE · LAN CONNECTED</span></div><div className="menu-grid">{menuItems.map((item, index) => <Button variant="ghost" className="menu-item" key={item.name} onClick={() => addItem(index)}><small>{item.category}</small>{item.name}<span>₹{item.price}</span></Button>)}</div><div className="pos-foot"><span>Integrated kitchen routing</span><span>Ready to print</span></div></div>
          <div className="pos-check"><div className="check-title"><strong>Table Check</strong><span>DINE-IN</span></div>{menuItems.map((item, index) => (counts[index] ?? 0) > 0 && <div className="check-row" key={item.name}><span>{counts[index]} · {item.name}</span><span>₹{(item.price * (counts[index] ?? 0)).toFixed(2)}</span></div>)}<div className="check-taxes"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div><div className="check-taxes"><span>GST (CGST 2.5% + SGST 2.5%)</span><span>₹{(subtotal * .05).toFixed(2)}</span></div><div className="check-total"><span>Total</span><strong>₹{total.toFixed(2)}</strong></div><Button variant="pill" onClick={() => setPaid(true)}>{paid ? <><Check /> SAMPLE BILL SETTLED</> : <><ScanLine /> SETTLE SAMPLE BILL</>}</Button><div className="check-note">{paid ? 'Sample check settled · No payment collected' : 'Illustrative checkout · No payment collected'}</div></div>
        </div></div>
      </div></section>
      <div className="section-link"><Link to="/billing" className="text-link">Open the billing workspace <ArrowRight /></Link></div>
      <InsightsSection />
      <IntegrationsSection />
      <HardwareSection />
      <PricingSection />
      <FAQSection />
      <BottomCTA />
    </main>
  </>;
}
