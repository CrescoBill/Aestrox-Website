# Aestrox website

The official Aestrox company website. Aestrox POS is the first product; navigation and shared content are structured to support more products later.

## Run locally

Use Node.js 22 and npm. The npm lockfile is the authoritative dependency lockfile for Netlify.

```powershell
cd "C:\Users\Abdul Sameeh K\Desktop\Aestrox website"
npm ci
npm run dev
```

Use the local URL Vite prints. For the exact static production output:

```sh
npm run build
npm run preview
```

The static preview runs at http://127.0.0.1:4311. It deliberately does not simulate successful form delivery or a live AI backend. Use Netlify Dev for integration work, or a Netlify deploy preview for actual form-delivery checks.

## Where to edit

| File / folder                      | Purpose                                                                                               |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `src/data/site.ts`                 | Company contacts, social links, product registry, Android store link, FAQs and verified product facts |
| `src/data/legal.ts`                | Website privacy, terms and cookie notices                                                             |
| `src/components/site-shell.tsx`    | Shared header, product navigation, footer, enquiry dialog and lazy-loaded assistant                   |
| `src/components/home-page.tsx`     | Company-led homepage                                                                                  |
| `src/components/product-pages.tsx` | POS, pricing, company, contact and supporting pages                                                   |
| `src/components/product-shot.tsx`  | Real product captures (`Shot`, `PhoneShot`) with 1x/2x WebP, reserved size and alt text               |
| `src/components/showcase.tsx`      | Stage compositions of real captures, feature rows and check lists                                     |
| `src/data/product-images.json`     | Generated size and alt text for every image in `public/product`                                       |
| `src/components/contact-form.tsx`  | Shared enquiry form, validation, submitting/error/success states                                      |
| `src/components/chat-widget.tsx`   | Accessible AI chat dialog; conversation stays in page memory                                          |
| `netlify/functions/chat.ts`        | Server-only Groq integration, verified-fact prompt and request validation                             |
| `src/routes/`                      | TanStack route definitions and page metadata                                                          |
| `src/styles.css`                   | Runtime design tokens and responsive styles                                                           |
| `DESIGN.md`                        | Design decisions and constraints                                                                      |
| `netlify.toml`                     | Netlify build, headers, functions and 404 configuration                                               |
| `public/__forms.html`              | Static form definition Netlify detects during deployment                                              |
| `scripts/`                         | Static output finalizer, local preview, screenshots and browser checks                                |

To add a product, create its page/route and add it to `products` in `src/data/site.ts`. The company navigation then picks it up. Update verified facts and FAQs as functionality changes; the assistant uses these same sources.

## Android

The site presents Aestrox for Android without “coming soon.” Set `site.androidStoreUrl` in `src/data/site.ts` to the official published Play Store URL. Until configured, **Get the app** opens an app-access enquiry, not a broken store link. No unpublished listing URL or release date is invented.

Set `site.dubaiPhone` (dialling format, for example `+9715xxxxxxxx`) and
`site.dubaiPhoneDisplay` to show the Dubai number in the footer, contact and company pages.

## Netlify setup

No deployment or provider-account changes are part of this local redesign.

1. Connect the existing `CrescoBill/Aestrox-Website` repository to the intended Netlify site.
2. Build command: `npm run build`. Publish directory: `dist/client`. Node: 22. These are already in `netlify.toml`.
3. Enable Netlify form detection, then deploy. Confirm `aestrox-enquiry` appears in Forms.
4. Set its email notifications to your monitored sales inbox. Confirm that `hello@aestrox.com` and `contact@aestrox.com` actually receive mail or forward correctly; code does not create mailboxes.
5. Add `GROQ_API_KEY` as a server-side Functions environment variable. Do not use a `VITE_` prefix or commit the key.
6. Optional variables: `GROQ_MODEL=openai/gpt-oss-20b`, `CHAT_ENABLED=true`. Set `CHAT_ENABLED=false` to stop assistant provider requests.
7. Review Netlify usage limits and Groq account spending controls before enabling public traffic. Per-IP rate limiting reduces abuse; it is not a guarantee of zero charges.
8. Confirm the custom domain, HTTPS and canonical host are `https://aestrox.com`.
9. On a deploy preview, send one clearly labelled test enquiry; verify the Forms record and notification inbox. Then verify a live assistant reply and error fallback. These cannot be confirmed by the local mocked tests.
10. Obtain legal review of the website notices before publishing. They use the supplied Aestrox name and city-level locations; they are not your customer subscription/service agreement.

Forms collect only enquiry details, not payment information. The hidden honeypot is spam mitigation, not a complete anti-abuse system. The assistant is visibly labelled AI, cannot access accounts or perform bookings/actions, and does not intentionally persist transcripts in this codebase. Hosting and model providers still process requests according to their own policies.

## Search visibility

The website prerenders meaningful content and uses individual titles and descriptions,
canonical URLs, a sitemap, robots.txt, social previews and Organization/WebSite
structured data. No ratings, office street addresses or prices are invented for markup.
SEO helps search engines understand the site; it does not guarantee first place.
After launch, verify the domain in Google Search Console, submit `/sitemap.xml`,
inspect the homepage and POS page, and monitor real search queries and indexing.
See [Google's SEO guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
and [Organization guidance](https://developers.google.com/search/docs/appearance/structured-data/organization).

## Build and security

Pages are prerendered as static HTML for fast delivery and SEO. The assistant is a separate Netlify function, loaded only when needed; no long-running SSR service is required for the public pages.

The finalizer generates a sitemap, real 404 document and hash-based Content Security Policy from the actual output. It escapes literal NULs in serialized route IDs before hashing; HTML would otherwise replace those characters and break both CSP and hydration. Do not hand-edit `dist/` or bypass the finalizer when deploying. Inline styles are permitted for React/Radix; inline scripts need their build-generated hashes.

The assistant bounds request size and conversation length, accepts only alternating user/assistant turns, sets its own system prompt, applies timeouts, sanitizes provider errors and configures Netlify's per-IP/domain rate limit. No API key is bundled into the browser. AI responses can still be wrong; business commitments remain with the team.

## Verification

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
# In another terminal, with Chrome installed:
npm run test:browser
```

Browser checks cover responsive routes, keyboard/dialog behavior, pricing selection, form validation, local-delivery safety, mocked assistant success/failure/retry, product images (loaded, sized, described), 404s, CSP/hydration errors and automated accessibility. They write local evidence to ignored `.tmp/`. They do not send real enquiries or spend Groq credits.

A marketing page may still benefit from human screen-reader and real-device testing. Do not equate automated checks with complete accessibility certification.

## Product images

Every product image on the site is a real capture of Aestrox POS, not a drawing. They are
taken from the local POS build with the fictional Demo Bistro (no customer data) by
`marketing/video/scripts/capture-website.ts` in the Aestrox POS repository:

```sh
# In the POS repository, with the local stack running (see marketing/video/README.md)
pnpm local:reset && pnpm local:seed && pnpm local:demo
cd marketing/video && pnpm stage
node scripts/capture-website.ts "C:/Users/Abdul Sameeh K/Desktop/Aestrox website"
```

It writes `public/product/<name>.webp` (2x), `<name>-1x.webp` (1x) and
`src/data/product-images.json`. Re-run it after visible product changes so the website
matches the app, soon after staging so table timers and ticket ages look live.

## Assets

- Approved Aestrox logo retained from this repository.
- Product images are real captures as described above, with no real customer data.
- Manrope and DM Sans are self-hosted via Fontsource packages.
- `public/social-preview.png` is generated from the rendered homepage
  (`node scripts/generate-social-preview.mjs` with the dev server on port 4310).

See `CHECKPOINT.md` for the current handoff and remaining launch work.

Proprietary. All rights reserved.
