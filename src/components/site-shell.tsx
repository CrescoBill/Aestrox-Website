import { Link, useLocation } from '@tanstack/react-router';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/aestrox-logo-clean.png';

const DemoContext = createContext<(label?: string) => void>(() => {});
export const useDemo = () => useContext(DemoContext);
export const siteLinks = [
  { label: 'Billing', to: '/billing' }, { label: 'Features', to: '/features' },
  { label: 'Hardware', to: '/hardware' }, { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
] as const;
export function Brand() { return <img className="brand-logo" src={logo} alt="Aestrox" width="1566" height="518" />; }
export function SiteShell({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  const [dialog, setDialog] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const pathname = useLocation({ select: location => location.pathname });
  useEffect(() => {
    setMenu(false);
    const elements = document.querySelectorAll('main section, .reveal');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    elements.forEach(element => { element.classList.add('scroll-reveal'); observer.observe(element); });
    return () => observer.disconnect();
  }, [pathname]);
  function openDemo(label = 'Book a demo') { setSubmitted(false); setDialog(label); }
  return <DemoContext.Provider value={openDemo}>
    <header className="site-header"><div className="container header-inner">
      <Link to="/" aria-label="Aestrox home" className="logo-link"><Brand /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{siteLinks.map(link => <Link key={link.to} to={link.to} activeProps={{ className: 'nav-active' }}>{link.label}</Link>)}</nav>
      <div className="header-actions"><Button variant="pill" onClick={() => openDemo()}>Book a demo <ArrowRight /></Button><Button variant="ghost" size="icon" className="menu-trigger" onClick={() => setMenu(!menu)} aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu}>{menu ? <X /> : <Menu />}</Button></div>
    </div>{menu && <nav className="mobile-nav" aria-label="Mobile navigation">{siteLinks.map(link => <Link key={link.to} to={link.to} onClick={() => setMenu(false)}>{link.label}<ArrowRight /></Link>)}<Link to="/integrations">Integrations <ArrowRight /></Link><Link to="/contact">Contact <ArrowRight /></Link></nav>}</header>
    {children}
    <footer><div className="container"><div className="footer-intro"><Link to="/" aria-label="Aestrox home"><Brand /></Link><p>Every bill. Every business.<br />One connected workspace.</p></div><div className="footer-grid">
      <div><h4>Product</h4><Link to="/billing">Billing & payments</Link><Link to="/features">Inventory & reports</Link><Link to="/integrations">Integrations</Link><Link to="/hardware">Hardware</Link></div>
      <div><h4>Explore</h4><Link to="/pricing">Plans & pricing</Link><Link to="/about">About Aestrox</Link><Link to="/contact">Contact</Link><Button variant="link" onClick={() => openDemo()}>Book a demo</Button></div>
      <div><h4>Made for</h4><Link to="/features" hash="businesses">Restaurants & cafés</Link><Link to="/features" hash="businesses">Retail stores</Link><Link to="/features" hash="businesses">Growing businesses</Link></div>
      <div><h4>A better business day.</h4><p>Less admin.<br />More room to grow.</p><Button variant="pill" onClick={() => openDemo()}>Let’s talk <ArrowRight /></Button></div>
    </div><div className="footer-bottom"><span>© 2026 Aestrox. All rights reserved.</span><span>Billing, beautifully connected.</span></div></div></footer>
    <Dialog.Root open={dialog !== null} onOpenChange={open => { if (!open) setDialog(null); }}><Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="demo-dialog"><Dialog.Title asChild><h2>{submitted ? 'Details prepared.' : dialog}</h2></Dialog.Title><Dialog.Description asChild><p>{submitted ? 'Demo scheduling is not connected yet. Your details have not been sent or saved.' : 'Let’s find the right billing setup for your business.'}</p></Dialog.Description>{!submitted && <form className="demo-form" onSubmit={event => { event.preventDefault(); setSubmitted(true); }}><label>Your name<input name="name" autoComplete="name" placeholder="Full name" required /></label><label>Work email<input type="email" name="email" autoComplete="email" placeholder="you@business.com" required /></label><label>Business name<input name="business" autoComplete="organization" placeholder="Your business" required /></label><label>Business type<select name="type"><option>Restaurant or café</option><option>Retail store</option><option>Other business</option></select></label><Button variant="pill" type="submit">Request a demo <ArrowRight /></Button></form>}<Dialog.Close asChild><Button variant="ghost" size="icon" className="dialog-close" aria-label="Close"><X /></Button></Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>
  </DemoContext.Provider>;
}
