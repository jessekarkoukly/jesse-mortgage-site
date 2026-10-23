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
| Phone | 416-276-2666 |
| Email | jkarkoukly@sherwoodmortgagegroup.com |
| Location | The Annex, Toronto. Works across Toronto and Ontario. |

---

## COMPLIANCE — REQUIRED ON EVERY PAGE

Footer disclaimer — verbatim, no exceptions:

> Jesse Karkoukly, Mortgage Agent Lic. M25003068. Brokerage: Sherwood Mortgage Group, Brokerage Lic. 12176. This website does not constitute a mortgage approval, commitment, or rate guarantee. All rates and terms subject to lender approval.

"Part of the Mortgage Architects Network" was dropped by Jesse's choice in October 2026 (Sherwood's guide p.13 asks for it; decision recorded in the brand book).

Sherwood logo (`public/sherwood-logo-lic.png`, official "Digital_Horiz_Lic-Full_Color" artwork from the Sherwood brand kit, licence number built in):
- Full colour only. Never greyscale. Never resized below 80px wide.
- Appears in the compliance footer on every page.
- Use supplied logo files exactly as provided. Never recreate, recolour, crop, combine, or type licence text next to a logo.

---

## DESIGN TOKENS

Brand refresh, October 2026. Source: the Jesse Karkoukly Brand Book (Claude artifact). Tailwind token names were kept so every page picked up the new palette: `navy` = espresso, `sand` = linen, `coral` = clay deep, `coral-dark` = sky deep (hover), `slate` = sky.

| Token | Value |
|---|---|
| Espresso (text, buttons, dark sections) | `#352B26` |
| Linen (light sections) | `#F5EFE8` |
| Clay (buttons on dark, accents) | `#A88A78` |
| Clay deep (labels, accent text) | `#7E6352` |
| Sky | `#7F9BAA` |
| Sky deep (hover, focus ring, small labels) | `#4F6B7A` |
| Headline font | Newsreader 400 / 500 (loaded under the `--font-spectral` variable name) |
| Body font | Plus Jakarta Sans 400 / 600 / 700 |
| Labels | Newsreader italic, sentence case. Never small spaced capitals. |
| Hover | Colour change only to sky (light buttons to `#4F6B7A`, dark buttons to `#9DB6C3`), 150ms. |
| Logo | P4 slatted door + "Jesse Karkoukly" with "Mortgage Agent" in italic (`public/jesse-logo.png`). |
| Favicon | Bold small-size P4: four slats (sky to espresso) on linen, drawn on the pixel grid (`src/app/favicon.ico` 16/32/48, `src/app/icon.svg` on a 16px grid). `apple-icon.png` and the 192/512 PNGs keep the full P4. Next links them with content hashes, so do not add an `icons` block to the layout. |

---

## PHOTOS

| File | Use |
|---|---|
| `public/jesse-hero-arch.jpg` | Homepage hero (sunlit wall headshot, arch crop). Above the headline on mobile. |
| `public/jesse-hero.jpg` | Old hero, retired from the homepage |
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
| Homepage | `Schedule a call` | `null` |
| `/working-with-jesse` | `Schedule a call` | `null` |
| `/services/first-time-buyers` | `Book an Intro Call` | `'first_time_buyer'` |
| `/services/pre-approval` | `Book a Pre-Approval Call` | `'pre_approval'` |
| `/services/renewal` | `Schedule a call` | `'renewal'` |
| `/services/self-employed` | `Schedule a call` | `'self_employed'` |
| `/services/refinancing` | `Schedule a call` | `'refinancing'` |
| `/services/debt-consolidation` | `Schedule a call` | `'debt_consolidation'` |
| `/services/cottage` | `Schedule a call` | `'cottage'` |
| `/neighbourhoods/*` | `Schedule a call` | `null` |
| All others | `Schedule a call` | `null` |

**Labels (October 21, 2026, Jesse's call, site-wide):** every booking button reads `Schedule a call` (sentence case). Buttons that start a direct email read `Start the conversation`: the homepage hero and "Mortgage questions?" buttons open the "Tell me a little about your story" form (`src/components/home/StoryForm.tsx`, posting to `/api/story`); the blog post's ask box opens an email. `Book an Intro Call` and `Book a Pre-Approval Call` were not part of this change.

**Schedule a call flow (October 22, 2026, for Matt Evanoff):** every `Schedule a call` button (nav, page CTAs, sticky bar, homepage) opens the short inquiry form (`src/components/InquiryForm.tsx`: name, email, phone, "What can I help with?"). It posts to `/api/leads`, which saves to Supabase `leads` and emails Jesse through Resend, and succeeds if either works. Success goes to `/thank-you` (noindex): "Thanks, [first name]." / "Looking forward to connecting with you." and the Calendly inline embed with name and email prefilled (passed in sessionStorage, never in the URL). The same form sits on `/contact` (`#schedule`). `/open-house` still links straight to Calendly.

**Nav CTA:** `Schedule a call` — navy background, white text. Coral is reserved for page-level CTAs only.

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

Every calculator result ends with: "Want Jesse to run your exact numbers? It takes one call." CTA: `Schedule a call` → BookingModal.

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

## REVIEWS ON THE HOMEPAGE

Featured (October 2026, Jesse's pick, newest first, static grid, no rotation): Rebecca Marshello, Daniella Guzzi, Syed Aklakur Rahman, Daniel Goldhar. All 5-star on Google. The text shown is the opening of each review word for word, taken from Google's review notification emails, ending in "…" with a link to the full review on Google. Never extend or paraphrase a review. No stars displayed. To feature a different review, copy its text exactly from Google.

Earlier approved reviews (still fine to use elsewhere, verbatim): Norah Schulman, Yoni Rahamim, Nicole Boyle, Rafaela Khalimov.

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
- Sticky "Schedule a call" bar: appears after 400px scroll, bottom of screen, does not obscure content
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

**2026-10-23: Homepage copy pass 1**
Hero headline `Confident mortgage decisions start here.` (also on the link preview images), new subline. What brings you here: new copy for the first three cards, second card is "Ready to look at homes". About section: address line replaced by a sky deep "Start the conversation" button. How it works: six cards in a 3 by 2 grid that flip to show each step on an inverted colour back (both sides in the page; no turn with reduced motion). FAQ: Jesse's answers for broker cost, better rate, self-employed and what happens when you reach out; answers are first person; answers support paragraph breaks (`\n\n`).

**2026-10-23: Business card on About and Contact**
`src/components/about/ContactCard.tsx` is now a white business card (logo, phone, email that copies on click, office, licensing, Schedule a call and Start the conversation) with a one-time drop-in animation (`.jk-card-drop` in `globals.css`, off for reduced motion). It is the first thing on `/about` and the whole of `/contact` with "Looking forward to connecting with you." under it. The inline inquiry form left `/contact`; Schedule a call opens it. A nav Contact pop-out was mocked up and declined (branch `contact-card-draft`, not merged).

**2026-10-23: Calendly embed, About page**
Calendly link is now Jesse's scheduling page `https://calendly.com/working-with-jesse` (his embed code: linen background, espresso text, sky deep buttons). Both homepage buttons end on `/thank-you`: the story form now saves the name and email and redirects there too. The story form is mounted in `PageShell` (event `open-story-form`) so any page can open it. About page: Jesse's hero copy, a Contact card (phone, email, office, licensing, Schedule a call and Start the conversation buttons) in place of the stats strip and credentials, "A few things worth knowing upfront" rebuilt as four white cards on linen with Jesse's wording, reviews and the closing band removed.

**2026-10-22: Inquiry form and lead tables**
The `leads`, `email_subscribers`, `renewal_reminders` and `calculator_leads` tables had never been created, so the newsletter signup (/blog), renewal reminder and calculator report forms failed, and story form leads only arrived by email. Tables created (RLS on, no public policies; server routes use the service role key, including `/api/email-subscribe` now). Matt's flow built: Schedule a call opens the inquiry form, then `/thank-you` with Calendly. `/api/leads` rewritten: honeypot, input limits, HTML-escaped email with reply-to, save and email in parallel. Email needs `RESEND_API_KEY` in Vercel and jessekarkoukly.com verified in Resend.

**2026-10-21: Favicon**
The favicon at tab size was six thin slats that blurred into grey. New bold small-size mark (four slats, pixel-aligned). Removed the layout's manual `icons` list, which had overridden `icon.svg` and `apple-icon.png`; the icon links now carry content hashes, so browsers fetch new versions. Manifest colours moved to linen.

**2026-10-21: Site audit fixes**
Full crawl of 42 pages: all 200, no broken links, sitemap complete, schema valid. Fixed: link preview images were empty (0 bytes) on the live site because they loaded .woff2 fonts from Google, which the image renderer cannot read. They now share one card in the new brand (`src/lib/og.tsx`, fonts and logo bundled in `assets/og/`) and are built as static files at deploy. Homepage title is `Jesse Karkoukly | Toronto Mortgage Agent`; blog post title is `Mortgage on Dividend Income: Self-Employed Guide (Ontario)`. Hero and About photos have `sizes`, cutting the homepage from 868 KB to 468 KB. `/services` has its h1. Bylines on equity takeout, specialty, and purchases and investment. Calculator and form fields carry labels for screen readers, toggles are switches, broker deck dots are 48px tall tap targets, green amounts are sky deep. Contrast audit of 21 pages: zero failures.

**2026-10-20: Polish round**
Homepage: What brings you here moved above reviews on a white band (separates it from the hero); reviews are a static grid of four featured Google reviews; broker deck starts with "A personalized experience", the swipe demo plays once, dots centred between the arrows; How it works steps open a pop-up explanation (Jesse's wording from Working with Jesse); lender ticker back after How it works (Mortgage Architects logo removed); blog cards pull site posts and external articles, newest first, with date and tag. Larger "Mortgage Agent" in the logo, logo bigger in nav and footer. App-level favicon (`src/app/favicon.ico`, `icon.svg`, `apple-icon.png`) now the P4 door. All FAQs across the site (homepage, service pages, neighbourhoods, blog) start fully expanded. Accent colours now follow the nearest background through CSS variables in `globals.css` (`--jk-accent`, `--jk-muted`, `--jk-body2`, `--jk-btn-bg`), so no brown-on-brown or faint-on-light text; a contrast audit of 21 pages came back with zero failures.

**2026-10-20: Brand refresh and homepage rebuild**
New palette, Newsreader headlines, P4 logo and favicon applied site-wide through the theme tokens in `globals.css` (hardcoded old hex values swapped too). Spaced-caps labels render as Newsreader italic via a global rule. Homepage rebuilt from the approved design (sections in `src/components/home/`): hero, What brings you here, rolling Google reviews (4 approved, no stars, links to the Google profile and review link), broker vs bank swipe deck, About, How it works (6 steps, Keys in hand highlighted), Common questions, Blog, Everything I help with, Mortgage questions, and the "Every door, walked through together." band. Lender ticker, rates teaser and newsletter block are off the homepage. Google Business Profile link updated in `sameAs`. Mortgage Architects line removed from the footers. The story form (`/api/story`) emails Jesse through Resend (needs `RESEND_API_KEY`) and saves a row in `leads` with source `homepage_story_form`; it succeeds if either works.

**2026-10-17: SEO sweep, metadata cleanup**
Link-preview tags (Open Graph, Twitter) now come from `social()` in `src/lib/seo.ts`, so they always match the page title and description and carry the shared image. Old previews had stale titles, "Free, no obligation" wording and no image. Service page FAQs live in `src/data/faqs/` and feed both the visible FAQ and the FAQPage schema, so they cannot drift apart again (all 7 had drifted). Homepage has one `<h1>` (mobile); the desktop copy is `role="heading"`. Homepage Person and FinancialService schema carry `@id`s that the blog schema references. Sitemap includes `/services`, `/services/purchases-and-investment`, `/calculators/mortgage-calculator`.

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
