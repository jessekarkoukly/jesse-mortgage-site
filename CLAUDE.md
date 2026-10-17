# CLAUDE.md
## Jesse Karkoukly Mortgage Site — Terminal Source of Truth
**Lives at:** `~/jesse-mortgage-site/CLAUDE.md`
**Last updated:** 2026-03-10
**Rule:** This file governs every build decision. Where CLAUDE.md conflicts with any brief, CLAUDE.md wins. Read this before opening any other file.

---

## IDENTITY

| Field | Value |
|---|---|
| Name | Jesse Karkoukly |
| Title | Mortgage Agent |
| License | M25003068 |
| Brokerage | Sherwood Mortgage Group |
| Brokerage License | 12176 |
| Network | Part of the Mortgage Architects Network |
| Phone | 416-276-2666 |
| Email | jkarkoukly@sherwoodmortgagegroup.com |
| Location | The Annex, Toronto. Works across Toronto and Ontario. |

---

## COMPLIANCE — REQUIRED ON EVERY PAGE

Footer disclaimer — verbatim, no exceptions:

> Jesse Karkoukly, Mortgage Agent Lic. M25003068. Brokerage: Sherwood Mortgage Group, Brokerage Lic. 12176. Part of the Mortgage Architects Network. This website does not constitute a mortgage approval, commitment, or rate guarantee. All rates and terms subject to lender approval.

Sherwood logo (`public/sherwood-logo-lic.png`, official "Digital_Horiz_Lic-Full_Color" artwork from the Sherwood brand kit, licence number built in):
- Full colour only. Never greyscale. Never resized below 80px wide.
- Appears in the compliance footer on every page.
- Use supplied logo files exactly as provided. Never recreate, recolour, crop, combine, or type licence text next to a logo.

---

## DESIGN TOKENS

| Token | Value |
|---|---|
| Navy | `#1E2D3D` |
| Sand | `#F7F3EE` |
| Sand Dark | `#EDE7DE` |
| Coral | `#E8705A` |
| Slate | `#8A9BAA` |
| Headline font | Spectral 700 / 800 |
| Body font | Plus Jakarta Sans 400 / 600 / 700 |
| Logo | "Jesse." Spectral 700, coral period. "Karkoukly" below in Spectral 400. |
| Favicon | JK. — sand on navy, coral period |

---

## PHOTOS

| File | Use |
|---|---|
| `public/jesse-hero.jpg` | Homepage hero only |
| `public/jesse-about.jpg` | Homepage about section + Annex neighbourhood page only |
| `public/sherwood-logo-lic.png` | Compliance footer, full colour, every page (official artwork with Brokerage Lic. 12176) |
| `public/blog/jesse-face.jpg` | Blog byline avatar |
| `public/blog/jesse-headshot.jpg` | Blog author box |

---

## WRITING RULES

- No em dashes. No double hyphens in visible copy. Rewrite the sentence.
- Always "home." Never "house."
- Jesse is singular. Never "we," "our team," or "us" in body copy.
- Never "buying a home is one of the biggest decisions of your life." Cut forever.
- Never open with a definition. Open with a person, moment, or number.
- One idea per paragraph. Three sentences max.
- No salesy negations in hero or trust signals: no "no obligation," "no commitment," "no spam."
- "Free" is not a standalone claim. "There is no cost to you" is allowed in context.
- Voice: knowledgeable friend. Warm, direct, confident. Never salesy.

---

## PRE-SHIP GREP

Run on every file before marking done. All must return zero results in visible copy.

```bash
# Em dashes and double hyphens in visible copy
grep -n "\-\-\|—" [file] | grep -v "var(--\|^\s*--\|<!--"

# We / our / us
grep -n "\bwe\b\|\bour\b\|\bus\b" [file] | grep -v "//"

# House
grep -in "\bhouse\b" [file]

# Salesy negations (note: "free" in context like "no cost to you" is allowed — review manually)
grep -in "no obligation\|no commitment\|no spam\|\bfree\b" [file]
```

Note on the `\bfree\b` grep: this may flag legitimate uses like "There is no cost to you" — review hits manually. The rule is no "free" as a *standalone* claim (e.g. "Free." or "100% Free"). Contextual use is allowed.

---

## CTA SYSTEM

One component: `BookingModal`. Label is contextual per page.

| Page | CTA Label | Goal pre-population |
|---|---|---|
| Homepage | `Book a Call` | `null` |
| `/working-with-jesse` | `Book a Call` | `null` |
| `/services/first-time-buyers` | `Book an Intro Call` | `'first_time_buyer'` |
| `/services/pre-approval` | `Book a Pre-Approval Call` | `'pre_approval'` |
| `/services/renewal` | `Book a Call` | `'renewal'` |
| `/services/self-employed` | `Book a Call` | `'self_employed'` |
| `/services/refinancing` | `Book a Call` | `'refinancing'` |
| `/services/debt-consolidation` | `Book a Call` | `'debt_consolidation'` |
| `/services/cottage` | `Book a Call` | `'cottage'` |
| `/neighbourhoods/*` | `Book a Call` | `null` |
| All others | `Book a Call` | `null` |

**Nav CTA:** `Book a Call` — navy background, white text. Coral is reserved for page-level CTAs only.

**Secondary CTA:** `How It Works →` — ghost style, links to `/working-with-jesse`. Never opens modal.

**Calculator entry:** `Run the Numbers →` — sticky pill, bottom-right desktop. Opens CalculatorModal. Not a primary CTA. Not in any hero block.

**RETIRED FOREVER — never use:**
- "Book a Strategy Session"
- "See My Options"
- "Explore My Options"
- "Get Started"

---

## CALCULATOR HUB

- `CalculatorHub` is **OFF the homepage**. Remove `<CalculatorHub />` from `app/page.tsx` if still present.
- Calculator is accessible via sticky pill (bottom-right, desktop) and `/calculators` page only.

**Canadian mortgage payment formula — always use this. Never use `annualRate / 12`:**

```typescript
const ear = Math.pow(1 + annualRate / 2, 2) - 1;
const periodicRate = Math.pow(1 + ear, 1 / paymentsPerYear) - 1;
const n = amortYears * paymentsPerYear;
const payment = principal * (periodicRate * Math.pow(1 + periodicRate, n))
                / (Math.pow(1 + periodicRate, n) - 1);
```

Every calculator result ends with: "Want Jesse to run your exact numbers? It takes one call." CTA: `Book a Call` → BookingModal.

---

## SITE ROUTES

| Route | Status | Brief |
|---|---|---|
| `/` | Built — needs v2 sections | `briefs/homepage.md` |
| `/working-with-jesse` | Built | `briefs/working-with-jesse.md` |
| `/services/first-time-buyers` | Built | `briefs/first-time-buyers.md` |
| `/services/pre-approval` | Built | `briefs/pre-approval.md` |
| `/services/renewal` | Built | `briefs/renewal.md` |
| `/services/self-employed` | Planned | — |
| `/services/refinancing` | Planned | — |
| `/services/debt-consolidation` | Planned | — |
| `/services/cottage` | Planned | — |
| `/calculators` | Brief complete, not built | `briefs/Calculator Hub/` |
| `/about` | Planned | — |
| `/blog` | Built. Index lists posts from `src/data/posts`, then external Medium/LinkedIn links | — |
| `/blog/[slug]` | Built. One data file per post in `src/data/posts/`, register it in `src/data/posts/index.ts`. Sitemap, schema and OG image are generated from the data. | — |
| `/neighbourhoods/the-annex` | Brief complete, not built | `briefs/neighbourhoods.md` |
| `/neighbourhoods/leslieville` | Planned | `briefs/neighbourhoods.md` |
| `/neighbourhoods/roncesvalles` | Planned | `briefs/neighbourhoods.md` |

---

## HOMEPAGE — CURRENT VS TARGET

**Currently in `app/page.tsx`:**
Nav → Hero → TrackPrompt → LenderTicker → RatesSection → HowICanHelp → AboutSection → FAQSection → CTABand → SherwoodFooter → JesseFooter → BookingModal

**Target order per `briefs/homepage.md`:**
Nav → Hero → Two-Track → LenderTicker → Rates → HowICanHelp → Process Teaser → About Jesse → Reviews → Neighbourhood Grid → Broker vs Bank → FAQ → Email Capture → Renewal Capture → Footer CTA → Footer

**Sections still to build:**
- ~~Two-Track~~ Built
- ~~Rates~~ Built (Supabase-backed — shows dashes until Jesse populates the `rates` table)
- Process Teaser (3 steps, links to `/working-with-jesse`)
- Reviews (4 approved Google reviews only — see below)
- Neighbourhood Grid (Annex, Leslieville, Roncesvalles)
- Broker vs Bank comparison table
- Email Capture
- Renewal Date Capture

---

## APPROVED REVIEWS — VERBATIM, THESE 4 ONLY

No stars displayed. No fabricated quotes. No other reviews.

**Norah Schulman:**
"His industry expertise and understanding of the broader economic landscape ensured we received excellent guidance when our mortgage came due. Consistently responsive, knowledgeable, and easy to work with. We felt confident every step of the way."

**Yoni Rahamim:**
"I always appreciated how clearly he explained important details. He communicates well, knows his stuff, and is someone I would confidently recommend."

**Nicole Boyle:**
"Consistently delivered thoughtful, high-quality guidance and handled every situation with professionalism and care. Working with him always left us in a stronger position."

**Rafaela Khalimov:**
"Consistently impressed by how responsive and detail-oriented he is."

DO NOT USE: Emily Ascroft, Josh G — colleague references, not client testimonials.

---

## SUPABASE TABLES

| Table | Key fields | Purpose |
|---|---|---|
| `booking_leads` | id, type, goal, first_name, last_name, email, phone, preferred_days[], preferred_times[], meeting_format, notes | BookingModal submissions |
| `email_subscribers` | email, created_at, source | Email capture |
| `renewal_reminders` | email, renewal_date, created_at | 120-day trigger |
| `rates` | term_label, rate_value, rate_type_label, badge_label, updated_at | Jesse updates manually |
| `neighbourhood_stats` | neighbourhood_slug, stat fields, updated_at | Jesse updates manually |

On BookingModal submit: write to `booking_leads`, fire email to `jkarkoukly@sherwoodmortgagegroup.com`.
Subject line: `New Lead: [First Name] via [source page]`

Never hardcode rates. Always read from Supabase `rates` table. Show `—` if empty.

---

## MOBILE RULES

- Two-track: full-width stacked cards, thumb-friendly
- "How I Can Help" accordion: ALL closed by default on mobile
- Calculator pill: bottom-right, perfect thumb zone
- Sticky "Book a Call" bar: appears after 400px scroll, bottom of screen, does not obscure content
- Reviews: horizontal scroll on mobile, not stacked
- Broker vs Bank table: compress to 3 rows or convert to two cards on mobile
- No pop-ups. Mortgage audience skews older.
- Min 48px touch targets on all interactive elements

---

## HOW THIS PROJECT WORKS

**This Claude.ai chat session:** Strategy, copy decisions, brief writing, mockups. Not code.
**Claude Code terminal:** Building. Reading briefs. Running greps. Shipping files.

**Three tiers:**
1. **CLAUDE.md** — this file. Global constants. Wins all conflicts.
2. **`briefs/Calculator Hub/`** — calculator briefs (inherit shared rules from INDEX.md inside)
3. **`briefs/*.md`** — one per page. Can have unique CTAs and copy. Must not contradict CLAUDE.md.

**MEMORY.md is stale — ignore it entirely.** It contains wrong font names, wrong CTAs, wrong calculator vendor. CLAUDE.md supersedes it.

---

## SESSION LOG

Newest first.

**2026-10-17: Project Optimization, Release 1 (backend)**
Every page now has its own title (under 60), description (under 155) and canonical. Layout title template is `"%s"` and the layout no longer sets a site-wide canonical. Homepage split into server `page.tsx` (canonical "/") and client `HomePage.tsx`. Duplicate routes removed with 301s in `next.config.ts`: `/services/self-employed-mortgages`, `/services/cottage-vacation`, `/services/renewals-and-refinancing`, `/process`. `/preview/*` is noindex. Office address is Ste 201. Schema: FinancialService, Person with FSRA licence credential, sameAs (add Google Business Profile link when ready). Sitemap uses a fixed `PAGES_UPDATED` date; bump it when content changes. Analytics: visit source (referrer, UTM, landing page) and clicks on call, email, book and apply, plus form signups (`email_signup`, `renewal_signup`, `calculator_report`). Dashboard data moved from `/api/admin/analytics` to `/admin/data` so the admin login protects it. Dashboard shows "Where visitors came from" and a "Notify Bing" button (IndexNow, key file in `/public`). New `/privacy` page, linked in the footer and under every email form with the consent line. Supabase SQL needed once for source columns:
`ALTER TABLE analytics_pageviews ADD COLUMN utm_source text, ADD COLUMN utm_medium text, ADD COLUMN utm_campaign text, ADD COLUMN landing_page text;`

**2026-10-13 — Blog post system + first long-form article**
Added `/blog/[slug]` with typed post data, BlogPosting/Person/FAQPage schema, per-post OG image, sitemap entries. First post: `/blog/self-employed-dividends-mortgage`. Compliance footer now uses the official Sherwood logo with licence. `/services/self-employed-mortgages` canonicalises to `/services/self-employed`; homepage services link now points to `/services/self-employed`. Article-only exceptions: a dated worked-example rate (4.74%, Oct 2026) is hardcoded as editorial content, and one Jesse-approved line uses "We".

**2026-03-10 — CLAUDE.md replaces terminal prompt + SYSTEM.md for build sessions**
Terminal suggested putting the source of truth in the project root as CLAUDE.md so it is read automatically every session. Done. SYSTEM.md in the Claude desktop folder remains as the strategy/copy reference for chat sessions. CLAUDE.md is the build reference for Terminal.

**2026-03-10 — Calculator Hub removed from homepage**
CalculatorHub component is off the homepage. Accessible via sticky pill and /calculators only. Decision made for cleaner conversion focus — homepage CTA hierarchy was diluted by having a full calculator mid-page.

**2026-03-10 — CTA system updated to contextual labels**
Previous rule was "Book a Call everywhere." Each page serves a visitor in a different emotional state. First-time buyers are anxious — "Intro Call" signals lower commitment. Pre-approval visitors are ready — "Pre-Approval Call" mirrors their intent. One modal, contextual labels. Reasoning documented per brief.

**2026-03-10 — Mortgage Roadmap PDF dropped**
/working-with-jesse page replaces it entirely. No PDF generator at any phase.

**2026-03-10 — Bendigi dropped permanently**
Custom calculators built and in use. Bendigi was never implemented. Do not reference it.

**2026-03-10 — MEMORY.md superseded**
Contains wrong fonts (Playfair Display), wrong calculator vendor (Bendigi), wrong CTA ("Book a Strategy Session"), wrong hero sub ("Free. No obligation."). CLAUDE.md wins on all conflicts.

**2026-03-10 — Reviews locked to 4 real Google reviews**
Emily Ascroft and Josh G removed — colleague references, not client testimonials. 4 approved reviews verbatim from Google. No stars. No fabricated quotes.

**2026-03-10 — Trust pills updated**
Removed "Free to you" (salesy). Removed "Response within 24 hours" (creates testable commitment). Added "Toronto and Ontario" (local SEO). Added "Mortgage Architects Network" (affiliation credibility). Kept "50+ lenders compared."
