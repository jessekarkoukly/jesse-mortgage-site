# Site Map — jessekarkoukly.com

Complete inventory of everything built. Updated 2026-03-12.

---

## Routes (52 pages)

### Core Pages
| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Homepage: Hero, LenderTicker, HowICanHelp, About, FAQ, CTA, footers |
| `/about` | `app/about/page.tsx` | About Jesse |
| `/blog` | `app/blog/page.tsx` | Blog index with article cards |
| `/contact` | `app/contact/page.tsx` | Contact page |
| `/faq` | `app/faq/page.tsx` | Standalone FAQ (footer now links to homepage #faq instead) |
| `/process` | `app/process/page.tsx` | 9-step client journey |
| `/working-with-jesse` | `app/working-with-jesse/page.tsx` | Working with Jesse process page |

### Service Pages
| Route | Content Component | Trust Chips |
|---|---|---|
| `/services` | `app/services/page.tsx` | Services index |
| `/services/first-time-buyers` | `services/FirstTimeBuyerContent.tsx` | No cost to you, 50+ lenders, All programs explained |
| `/services/pre-approval` | `services/PreApprovalContent.tsx` | No cost to you, 50+ lenders, 120-day rate hold |
| `/services/renewal` | `services/RenewalContent.tsx` | No cost to you, 50+ lenders, Toronto and Ontario |
| `/services/refinancing` | `services/RefinancingContent.tsx` | No cost to you, 50+ lenders, Toronto and Ontario |
| `/services/debt-consolidation` | `services/DebtConsolidationContent.tsx` | No cost to you, 50+ lenders, Toronto and Ontario |
| `/services/self-employed` | `services/SelfEmployedContent.tsx` | No cost to you, 50+ lenders, Stated income programs |
| `/services/cottage` | `services/CottageContent.tsx` | No cost to you, 50+ lenders, Ontario cottage country |
| `/services/equity-takeout` | `app/services/equity-takeout/page.tsx` | Equity takeout |
| `/services/renewals-and-refinancing` | Combined page | Legacy route |
| `/services/self-employed-mortgages` | Alt route | Legacy route |
| `/services/cottage-vacation` | Alt route | Legacy route |
| `/services/purchases-and-investment` | Investment page | Investment properties |

### Calculator Pages (8 tools)
| Route | Component |
|---|---|
| `/calculators` | Calculator hub landing |
| `/calculators/mortgage-payment` | `MortgagePaymentCalculator.tsx` |
| `/calculators/affordability` | `AffordabilityCalculator.tsx` |
| `/calculators/closing-costs` | `ClosingCostsCalculator.tsx` |
| `/calculators/land-transfer-tax` | `LandTransferTaxCalculator.tsx` |
| `/calculators/prepayment-penalty` | `PrepaymentPenaltyCalculator.tsx` |
| `/calculators/required-income` | `RequiredIncomeCalculator.tsx` |
| `/calculators/debt-service` | `DebtServiceCalculator.tsx` |
| `/calculators/compare` | `CompareSideBySide.tsx` |

### Neighbourhood Pages (13 guides)
| Route | Data File | Zolo URL |
|---|---|---|
| `/neighbourhoods` | Index page | n/a |
| `/neighbourhoods/the-annex` | `the-annex.ts` | `/annex` |
| `/neighbourhoods/leslieville` | `leslieville.ts` | `/leslieville` |
| `/neighbourhoods/roncesvalles` | `roncesvalles.ts` | `/roncesvalles` |
| `/neighbourhoods/midtown` | `midtown.ts` | `/yonge-eglinton` |
| `/neighbourhoods/the-junction` | `the-junction.ts` | `/the-junction` |
| `/neighbourhoods/riverdale` | `riverdale.ts` | `/riverdale` |
| `/neighbourhoods/the-danforth` | `the-danforth.ts` | `/danforth` |
| `/neighbourhoods/high-park` | `high-park.ts` | `/high-park-north` |
| `/neighbourhoods/cabbagetown` | `cabbagetown.ts` | `/cabbagetown-south-st-james-town` |
| `/neighbourhoods/trinity-bellwoods` | `trinity-bellwoods.ts` | `/trinity-bellwoods` |
| `/neighbourhoods/king-west` | `king-west.ts` | `/king-west-village` |
| `/neighbourhoods/liberty-village` | `liberty-village.ts` | `/liberty-village` |
| `/neighbourhoods/leaside` | `leaside.ts` | `/leaside` |

---

## Components

### Core Layout
- `Nav.tsx` — Fixed header, services dropdown, mobile hamburger, Book a Call button
- `PageShell.tsx` — Wraps every page with Nav + Footers + BookingModal
- `SherwoodFooter.tsx` — Compliance footer (Sherwood logo, Lic. 12176)
- `JesseFooter.tsx` — Links + full disclaimer footer
- `Hero.tsx` — Two-column hero (copy left, photo right)

### Homepage Sections
- `LenderTicker.tsx` — Scrolling marquee of 23 lender logos
- `HowICanHelp.tsx` — 8 service cards accordion
- `RatesSection.tsx` — Supabase-backed rate display (shows dashes if empty)
- `AboutSection.tsx` — Two-column with video embed
- `FAQSection.tsx` — 7-question accordion (id="faq")
- `CTABand.tsx` — Final navy CTA
- `TrackPrompt.tsx` — Two-track routing prompt
- `HomeJsonLd.tsx` — LocalBusiness + Person + WebSite schema

### Forms & Modals
- `BookingModal.tsx` — 5-step lead form, logs to Supabase, emails Jesse
- `EmailCapture.tsx` — Email subscribe form (variant: "sand" | "navy")
- `RenewalCapture.tsx` — Renewal date + email capture
- `StickyMobileCTA.tsx` — Bottom sticky bar after 400px scroll

### Service Page Pattern
All service pages use the same architecture:
1. Navy hero with eyebrow, H1, subhead, CTA button, trust chips
2. Grid layout: sticky TOC left (220px) + content right
3. TOC: "On This Page" label, scroll-spy with IntersectionObserver, coral active state
4. Content sections as divs with `scroll-mt-24 mb-16 pb-16 border-b border-sand-2`
5. FAQ accordion at the bottom
6. Full-width CTA band

### Neighbourhood Page Pattern
All neighbourhood pages use:
- `NeighbourhoodPageLayout.tsx` — Shared layout component
- `data/neighbourhoods/[slug].ts` — Per-neighbourhood data file
- `data/neighbourhoods/types.ts` — NeighbourhoodData interface
- Sections: Hero, quickFacts strip, jesseNote (Annex only), vibe, buyerProfiles chips, propertyTypes cards, topStreets cards, localLife sand cards, Google Maps embed, Zolo market data link, buyingConsiderations, FAQ accordion
- Sticky TOC with scroll-spy (desktop only)
- No CTAs on neighbourhood pages

### SEO
- `BreadcrumbJsonLd.tsx` — On every page
- `sitemap.ts` — Auto-generates XML sitemap
- `robots.ts` — Allows all crawlers, blocks /api/
- JSON-LD schemas on every page (FAQPage, LocalBusiness, Service, BreadcrumbList)

---

## API Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/leads` | POST | BookingModal submissions → Supabase `booking_leads` + email |
| `/api/calculator-leads` | POST | Calculator lead captures |
| `/api/email-subscribe` | POST | Email subscriptions → Supabase `email_subscribers` |
| `/api/renewal-reminder` | POST | Renewal date captures → Supabase `renewal_reminders` |

---

## Supabase Tables

| Table | Purpose |
|---|---|
| `booking_leads` | BookingModal form submissions |
| `email_subscribers` | Email capture signups |
| `renewal_reminders` | 120-day renewal tracker |
| `rates` | Jesse-updated mortgage rates (manual) |
| `neighbourhood_stats` | Neighbourhood market data (manual, currently unused) |

---

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 (PostCSS, no tailwind.config file)
- **Fonts:** Spectral (headlines) + Plus Jakarta Sans (body) via Google Fonts
- **Backend:** Supabase PostgreSQL
- **Charts:** Recharts (calculator visualizations)
- **Hosting:** Vercel
- **Domain:** jessekarkoukly.com

---

## Public Assets

- `jesse-hero.jpg` — Hero photo (homepage only)
- `jesse-about.jpg` — About photo (homepage + Annex page)
- `sherwood-logo.png` — Compliance footer (every page)
- `icon.svg`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` — Favicons
- `manifest.json` — PWA manifest
- `logos/` — 23 lender partner logos (.webp)
- `blog-linkedin-jesse.jpg`, `blog-mortgage-basics.png`, `blog-toronto-homes.png` — Blog images
