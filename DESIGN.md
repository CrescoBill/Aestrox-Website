---
version: alpha
name: Aestrox
description: A product-led company website, grounded in the everyday rhythm of hospitality.
colors:
  primary: "#0F766E"
  ink: "#143C38"
  paper: "#FFFFFF"
  canvas: "#F5F8F7"
  mint: "#E3EEEA"
  muted: "#526660"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
  sans:
    fontFamily: "DM Sans, Arial, sans-serif"
rounded:
  DEFAULT: "0.75rem"
  panel: "1.5rem"
spacing:
  page-max: "80rem"
  section-gap: "7rem"
components:
  button:
    backgroundColor: "#0F766E"
    textColor: "#FFFFFF"
---

# Aestrox website design

## Overview

An established-feeling software company, not an MVP pitch. Aestrox is the parent
brand; Aestrox POS is the first product. The audience is independent hospitality
businesses, initially in India, with team locations in Mangalore, Dubai and Dublin.
English marketing register. No invented adoption statistics, testimonials,
payment integrations, published prices or claims of universal printer support.

The signature is a working, daylight-coloured POS counter next to confident,
generously spaced typography. Real product behaviour is made tangible through
an explicitly labelled sample workspace. The rest of the page stays restrained.
No floating gradients, repeated feature-card walls, artificial splash delay or
decorative animations. Product content is a registry, not hardcoded into the brand.

## Approved refinements, 22 October 2026

Use straightforward business language, not poetic slogans. No em dashes,
decorative eyebrow strokes or arrows appended to marketing CTAs. Functional
icons such as disclosure chevrons, close controls and chat send remain.
The main CTA is “Start your free trial” for the confirmed 14-day offer. Its
form requests team-assisted setup; never pretend an account is created by it.
Keep login in navigation; do not repeat web/Android availability badges or
browser-login instructions in the page. Android retains “Get the app.”
Chat has an icon-only launcher and the approved logo in its heading, with
“AI assistant · Product & sales questions” beneath it. Socials use labelled
vector icons. City-level locations stay compact in the footer, with India as
the primary sales contact and Ireland's number beside Dublin. Do not invent
a Dubai number. Use hello@aestrox.com for enquiries and contact@aestrox.com
for product help. Avoid large address sections.

## Colors

Runtime authority is `src/styles.css :root`. This document mirrors accepted
values (ownership model B). `primary` maps to `--primary`, `ink` to `--ink`,
`paper` to `--paper`, `canvas` to `--canvas`, `mint` to `--mint`, `muted` to
`--muted-ink`. White is the main surface; pale mint stages the product. Dark teal
is reserved for a single product section and the footer. Error red is semantic.

## Typography

Self-hosted Manrope for headings, DM Sans for text and controls. Display type is
large but not all-caps; tight headline tracking, 1.08 line height. Body copy is
16–18px with a 1.65 line height and sensible line length. Currency uses tabular
numerals. No external font requests.

## Layout

80rem maximum container, 32px desktop / 20px mobile gutters. Asymmetric hero,
quiet editorial sections, full-width product stage. Navigation collapses at
1000px. Two-column layouts stack below 760px. Product preview adapts to phone
width; it is never a min-width desktop screenshot. Reserve all image geometry.

## Elevation & Depth

Only interactive product frames, navigation menus and dialogs use shadows.
Content sections use space and tonal contrast instead of nested boxes.

## Shapes

12px controls and 24px major panels. Receipt uses a serrated edge as a specific
product reference. Avoid pills except selected tabs and compact status labels.

## Components

`SiteShell` owns navigation, footer, enquiry dialog and lazy-loaded chat.
`ContactForm` owns accessible validation, duplicate prevention and honest
submission status. `ProductPreview` owns sample interactions. Public billing
period toggle uses buttons with `aria-pressed`; it is not a checkout.

Radix Dialog handles modal focus, Escape and restoration.
Chat is a labelled modal with an accessible close button, bounded request,
cancel/retry and memory-only history. No token-by-token screen-reader chatter.

All actions have hover/focus/pressed states. Busy controls reserve their size.
Global visible scrollbars inherit token colours, with forced-colour fallback.
Reduced motion disables entrance and scrolling animation. No content is hidden
waiting for a scroll observer. Brand loading indicator appears only during real
route loading; no artificial wait. Lucide is the single UI icon family.

## Do's and Don'ts

- Do describe the business context without pretending ordinary POS features are breakthroughs.
- Do present Android as a product; without a configured store URL its action requests access.
- Do keep product facts and sales-assistant grounding in shared content.
- Don't claim automatic UPI verification, certified hardware or inventory that is not shipped.
- Don't embed third-party social feeds, tracking or remote fonts by default.
- Don't replace original approved Aestrox artwork with a new approximation.
