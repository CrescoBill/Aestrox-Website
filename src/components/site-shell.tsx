import { Link, useLocation } from "@tanstack/react-router";
import {
  createContext,
  lazy,
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { Brand } from "./brand";
import { products, site, type Enquiry } from "@/data/site";
import { ContactForm } from "./contact-form";

const ChatWidget = lazy(() => import("./chat-widget"));
const DemoContext = createContext<(enquiry?: Enquiry) => void>(() => {});
export const useDemo = () => useContext(DemoContext);
export const siteLinks = [
  { label: "Pricing", to: "/pricing" },
  { label: "Company", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;
const socialIcons = { Instagram, Facebook, LinkedIn: Linkedin };

export function SiteShell({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  const [dialog, setDialog] = useState<Enquiry | null>(null);
  const [chat, setChat] = useState(false);
  const [chatLoaded, setChatLoaded] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);
  const dialogTrigger = useRef<HTMLElement | null>(null);
  const pathname = useLocation({ select: (location) => location.pathname });
  useEffect(() => {
    setMenu(false);
    setDialog(null);
    setChat(false);
  }, [pathname]);
  function openDemo(enquiry: Enquiry = { kind: "demo" }) {
    dialogTrigger.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setMenu(false);
    setChat(false);
    setDialog(enquiry);
  }
  const title =
    dialog?.kind === "android"
      ? "Get Aestrox for Android"
      : dialog?.kind === "pricing"
        ? "Get a quote"
        : dialog?.kind === "trial"
          ? "Start your free trial"
          : "Contact our team";
  return (
    <DemoContext.Provider value={openDemo}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>Business software by Aestrox</span>
          <a href={`tel:${site.phone}`}>
            <Phone size={12} aria-hidden="true" />
            <span>India sales</span> {site.phoneDisplay}
          </a>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" aria-label="Aestrox home" className="logo-link">
            <Brand />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <Dropdown.Root>
              <Dropdown.Trigger className="nav-dropdown">
                Products <ChevronDown size={14} />
              </Dropdown.Trigger>
              <Dropdown.Portal>
                <Dropdown.Content className="product-dropdown" sideOffset={18} align="start">
                  {products.map((product) => (
                    <Dropdown.Item key={product.id} asChild>
                      <Link to={product.href}>
                        <span className="product-nav-mark">A</span>
                        <span>
                          <strong>{product.name}</strong>
                          <small>{product.shortName} for cafés & restaurants</small>
                        </span>
                      </Link>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Content>
              </Dropdown.Portal>
            </Dropdown.Root>
            {siteLinks.map((link) => (
              <Link key={link.to} to={link.to} activeProps={{ className: "nav-active" }}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <a className="login-link" href={site.posUrl}>
              Log in
            </a>
            <button
              className="button button-primary header-demo"
              onClick={() => openDemo({ kind: "trial" })}
            >
              Start your free trial
            </button>
            <Dialog.Root open={menu} onOpenChange={setMenu}>
              <Dialog.Trigger className="icon-button menu-trigger" aria-label="Open navigation">
                <Menu />
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />
                <Dialog.Content className="mobile-menu">
                  <Dialog.Title className="sr-only">Navigation</Dialog.Title>
                  <Dialog.Description className="sr-only">
                    Explore Aestrox products and company.
                  </Dialog.Description>
                  <Brand />
                  <Dialog.Close className="icon-button dialog-close" aria-label="Close navigation">
                    <X />
                  </Dialog.Close>
                  <nav aria-label="Mobile navigation">
                    {products.map((product) => (
                      <Link to={product.href} key={product.id}>
                        {product.name}
                      </Link>
                    ))}
                    {siteLinks.map((link) => (
                      <Link key={link.to} to={link.to}>
                        {link.label}
                      </Link>
                    ))}
                    <a href={site.posUrl}>Log in to Aestrox POS</a>
                  </nav>
                  <button
                    className="button button-primary"
                    onClick={() => openDemo({ kind: "trial" })}
                  >
                    Start your free trial
                  </button>
                  <a className="mobile-phone" href={`tel:${site.phone}`}>
                    India sales · {site.phoneDisplay}
                  </a>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <Link to="/" aria-label="Aestrox home">
                <Brand light />
              </Link>
              <p>Software for your business.</p>
              <div className="social-links">
                {site.socials.map((social) => {
                  const Icon = socialIcons[social.label];
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={social.label}
                    >
                      <Icon size={20} aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
            <div>
              <h2>Products</h2>
              {products.map((product) => (
                <Link key={product.id} to={product.href}>
                  {product.name}
                </Link>
              ))}
              <Link to="/hardware">Devices & printing</Link>
              <Link to="/pricing">Plans & pricing</Link>
              <a href={site.posUrl}>Log in to POS</a>
            </div>
            <div>
              <h2>Company</h2>
              <Link to="/about">About Aestrox</Link>
              <Link to="/contact">Contact us</Link>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={`mailto:${site.supportEmail}`}>Product support</a>
            </div>
            <div>
              <h2>Our team</h2>
              <p>Mangalore, India</p>
              <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
              <p>Dubai, UAE</p>
              <p>Dublin, Ireland</p>
              <a href={`tel:${site.irelandPhone}`}>{site.irelandPhoneDisplay}</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Aestrox</span>
            <div>
              <Link to="/privacy">Privacy policy</Link>
              <Link to="/terms">Terms of use</Link>
              <Link to="/cookies">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
      <Dialog.Root
        open={dialog !== null}
        onOpenChange={(open) => {
          if (!open) setDialog(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content
            className="enquiry-dialog"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              dialogTrigger.current?.focus();
            }}
          >
            <span className="eyebrow">Aestrox POS</span>
            <Dialog.Title asChild>
              <h2>{title}</h2>
            </Dialog.Title>
            <Dialog.Description>
              {dialog?.kind === "pricing"
                ? `${dialog.billingPeriod ?? "Monthly"} billing for Aestrox POS. Tell us about your setup and we’ll put together a quote.`
                : dialog?.kind === "android"
                  ? "Share your details and our team will help you get set up."
                  : dialog?.kind === "trial"
                    ? "Try Aestrox POS free for 14 days. Share your business details and we’ll contact you to set up your trial."
                    : "Tell us about your business and how we can help."}
            </Dialog.Description>
            {dialog && <ContactForm enquiry={dialog} />}
            <Dialog.Close className="icon-button dialog-close" aria-label="Close enquiry">
              <X />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <button
        ref={launcher}
        className="chat-launcher"
        onClick={() => {
          setChatLoaded(true);
          setChat(true);
        }}
        aria-label="Ask Aestrox AI assistant"
        aria-haspopup="dialog"
      >
        <MessageCircle size={21} />
      </button>
      {chatLoaded && (
        <Suspense
          fallback={
            chat ? (
              <div role="status" className="chat-loading">
                Opening assistant…
              </div>
            ) : null
          }
        >
          <ChatWidget
            open={chat}
            onOpenChange={setChat}
            onCloseFocus={() => launcher.current?.focus()}
          />
        </Suspense>
      )}
    </DemoContext.Provider>
  );
}
