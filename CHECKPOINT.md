# Website redesign checkpoint

Date: 22 October 2026

## Scope

Work is local to `C:/Users/Abdul Sameeh K/Desktop/Aestrox website`, cloned from
`CrescoBill/Aestrox-Website`. The Aestrox POS/backend and CRESCOSTACK repositories
were reference sources only and were not modified. No deployment, push,
provider configuration change or real enquiry submission was performed.

## Implemented

- Responsive company website with Aestrox as the parent brand and POS as its first product.
- Shared navigation, POS login, company footer, India sales and Ireland contact number.
- Homepage, POS, features, hardware, pricing, company, contact, integration information and legal pages.
- Interactive sample POS plus actual sample-data product screenshots with an accessible full-screen gallery.
- Monthly/annual billing selection with contact-for-pricing, no invented subscription amounts.
- Confirmed 14-day free-trial CTA and a distinct trial-request enquiry type. This is team-assisted setup, not automatic account provisioning. POS subscription defaults were not changed.
- Android app presentation without “coming soon”; configurable official store URL, with an enquiry fallback until supplied.
- Netlify form blueprint and shared validated form with busy, retry, failure and confirmed-success states.
- Lazy-loaded AI chat with a server-only Groq function, bounded inputs, timeout/cancel/retry and rate limiting.
- Plain copy, no decorative eyebrow dashes or CTA arrows, icon-only chat launcher, approved logo in chat, social vector icons and compact footer locations.
- `hello@aestrox.com` for main enquiries; `contact@aestrox.com` for product help. No `support@` mailbox assumption.
- Self-hosted fonts, prerendered HTML, page metadata, canonical links, sitemap, robots.txt, social preview and Organization/WebSite structured data.
- Static-host-compatible 404, build-generated script CSP hashes and a production hydration fix for serialized route IDs.
- Shared configuration, design context, setup instructions and automated checks.

## Verification

- Production build: passed, 14 prerendered routes.
- TypeScript: passed.
- Unit/integration checks: 29 passed, including form validation, request failure/retry, duplicate protection, trial intent, sample totals and assistant boundary behavior.
- Premium static UI audit: passed with no findings; see `premium-audit.json`.
- Final production-browser verification: passed. Twelve routes at 320, 390, 768 and 1440px (48 combinations), plus trial/pricing forms, focus restoration, mobile navigation, chat success/error/retry, gallery, metadata/schema and real static 404.
- Automated accessibility: no findings on the five audited desktop pages, open chat and mobile contact page. Human assistive-technology and actual device testing remain useful.
- ESLint: no errors; nine non-blocking React fast-refresh export warnings from shared helper/template patterns.
- Visual review: desktop homepage, mobile homepage and branded chat reviewed. Local reports and screenshots are in ignored `.tmp/`.
- Provider delivery remains unverified: no Netlify notification or live Groq request was sent.

The local checks use mocked network responses where appropriate; they do not prove
email delivery, provider uptime, universal device compatibility or legal compliance.

## Real product redesign (22 October 2026, evening)

- Replaced every hand-drawn imitation of the product (sample POS, receipt, report chart,
  phone and the full-screen screenshot viewer of old test captures) with real captures of
  Aestrox POS: menu, current order, customiser, kitchen tickets, tables, dashboard,
  transactions, receipt print, menu management, team and two Android phone screens.
- Captures come from the local POS build with the fictional Demo Bistro, staged as a
  realistic lunch service through the real API, via
  `marketing/video/scripts/capture-website.ts` in the POS repository. Each ships as 1x
  and 2x WebP (1.1 MB in total, lazy-loaded) with reserved size and alt text in
  `src/data/product-images.json`.
- Redesigned the homepage, POS, features, hardware and company pages around fixed UI
  slices on quiet stages; refreshed type (Manrope 600, larger nav, buttons and footer
  text), removed uppercase section labels and the audience strip.
- Kept Log in, Start your free trial, Get the app (Play Store link slot in
  `site.androidStoreUrl`), chat, forms and legal pages. Added `site.dubaiPhone`, shown in
  the footer, contact and company pages once set. No "coming soon" wording.
- Product registry now carries an audience line and a capture for the company page, so
  future products appear in navigation, footer and the company page from one entry.
- Verification: typecheck, lint (no errors; the nine existing warnings), 40 unit tests,
  production build, and browser checks at 320/390/768/1440 px with no accessibility
  violations on the audited pages. A new test checks every product image ships at 1x and
  2x with a size and description; the browser check confirms they load on the features
  page.

## Before publication

1. Review the desktop and mobile preview and approve the copy/design.
2. Add the server-side `GROQ_API_KEY` in Netlify. Review usage/spend settings; the key must not be browser-exposed.
3. Enable form detection and email notifications. Test an enquiry on a deploy preview and verify both the Forms record and inbox delivery.
4. Confirm the hello/contact mailboxes or forwarding destinations. The website does not create mailboxes.
5. Set `site.androidStoreUrl` when the Google Play listing is public. Supply the Dubai number when available.
6. Have the privacy/terms reviewed against the actual company/provider arrangements. These website notices are not the customer SaaS service agreement.
7. Deploy only after approval, then verify HTTPS, canonical domain, redirects, form delivery and live chat.
8. Verify Google Search Console ownership, submit the sitemap and inspect the important URLs. Search ranking cannot be guaranteed.

## Continue from here

Read `README.md` and `DESIGN.md`. Public contacts, FAQs, product registry and the
Android link are in `src/data/site.ts`. Keep future product facts consistent with
the assistant prompt, and retain the user's plain-copy/no-decorative-arrow preference.
