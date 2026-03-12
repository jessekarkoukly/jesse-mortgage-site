# Build Status — jessekarkoukly.com

What is done, what needs work. Updated 2026-03-12.

---

## Built and Functional

- Homepage (Hero, LenderTicker, HowICanHelp, About, FAQ, CTA, footers)
- Nav with services dropdown, mobile menu, phone link
- BookingModal (5-step form, Supabase logging, email to Jesse)
- EmailCapture (sand and navy variants)
- RenewalCapture (renewal date + email)
- 8 calculators (mortgage payment, affordability, closing costs, LTT, prepayment penalty, required income, debt service, compare)
- First-Time Buyers page (comprehensive, TOC, inline calculators, programs accordion)
- Pre-Approval page (TOC, broker vs bank, rate hold explanation)
- Renewal page (TOC, grid layout, trust chips)
- Refinancing page (TOC, equity + break-even calculators, trust chips)
- Debt Consolidation page (TOC, consolidation savings calculator, trust chips)
- Self-Employed page (4 income methods, trust chips)
- Cottage page (lender factors, trust chips)
- Working with Jesse page (9-step process)
- 13 neighbourhood guide pages (data-driven, shared layout, Zolo market data links, Google Maps)
- Neighbourhood index page with area badges
- Blog index with article cards and logo badges
- Full SEO: sitemap, robots.txt, JSON-LD schemas, breadcrumbs, canonical URLs, meta tags, security headers
- PWA manifest and favicons
- Supabase integration (4 API endpoints)
- Compliance footer on every page

## Needs Work / Not Started

### Homepage Sections Still Missing (per CLAUDE.md target)
- Process Teaser (3 steps, links to /working-with-jesse)
- Reviews section (4 approved Google reviews, horizontal scroll mobile)
- Neighbourhood Grid (Annex, Leslieville, Roncesvalles cards)
- Broker vs Bank comparison table
- Email Capture section
- Renewal Date Capture section

### Pages Planned but Not Built
- `/services/specialty` — Listed in sitemap but no page
- Individual blog post pages (only index exists)

### Known Issues
- `/faq` standalone page still exists but footer now links to `/#faq` — consider deleting the page
- `jesse-hero.jpg` is 24.8 MB — needs optimization
- `og-image.jpg` is 0 bytes — needs a real OG image
- Rates section shows dashes until Jesse populates the Supabase `rates` table
- Some service routes have duplicates (e.g., `/services/self-employed` and `/services/self-employed-mortgages`)
- `neighbourhood_stats` Supabase table exists but is unused (replaced by Zolo link-out)
- `MarketStats.tsx` component exists but is unused

### Neighbourhood Pages
- Pages are functional but Jesse feels they are still too generic/dense
- No photos or visual assets for individual neighbourhoods
- King West and High Park Zolo URLs may need verification
