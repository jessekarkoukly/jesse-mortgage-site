# SEO review: jessekarkoukly.com homepage

Lane: classic Google search and local search. Evidence: raw HTML of the production build at localhost:3100 (saved Oct 25, 22:23), source files, Google documentation.

## 1. Verdict

The technical base is sound: one H1, all copy in the server HTML, a self-referencing canonical, clean robots, and a sitemap of 42 URLs that all return 200. The weak spot is entity clarity: the page never shows Jesse's address or the Annex, an FAQ answer calls him "a mortgage broker", and the schema still carries a dropped affiliation, "Free consultation" as a price and a text card as his photo. Fix who, where and what first, because that is what Google matches to his Business Profile and to searches for his name.

## 2. Findings, ranked by impact

**1. Must. An FAQ answer titles Jesse a broker.** Common questions, Q2: "As a mortgage broker, I have access to over 50 lenders." The same text feeds the FAQPage JSON-LD, so crawlers get it twice, and a verbatim review on the page already says "Mortgage Broker". Fix: "Often yes, sometimes no. Through Sherwood Mortgage Group, I can compare options from over 50 lenders." (Confirm 50+ is accurate.)

**2. Must. Correct the structured data** (`src/components/HomeJsonLd.tsx`):
- Remove `priceRange: "Free consultation"`. Google expects a numeric range or signs like "$$$" [2], and this is a "free" claim in code. It's optional, so leave it out.
- Remove `memberOf: Mortgage Architects Network` and `mortgagearchitects.ca/jessekarkoukly` from both sameAs lists.
- Replace `image: /opengraph-image` (a text card) with the headshot `/jesse-hero-arch.jpg` (1000x1250). Add `logo: /icon-512.png` (512x512; Google's minimum is 112x112 [7]).
- WebSite `name` reads as a title ("Jesse Karkoukly | Toronto Mortgage Agent"). Set "Jesse Karkoukly" plus alternateName [4], and use one og:site_name on every page (other pages say "Jesse Karkoukly, Mortgage Agent", from `src/lib/seo.ts`).
- Link the nodes by @id (snippet in section 4). Keep the existing @ids, because the blog schema references them.
- Use the brand descriptor word for word as the business and Person description.
- Never add AggregateRating or Review markup for the Google reviews. Google: if the entity being reviewed controls the reviews about itself, pages using LocalBusiness or Organization markup "are ineligible for star review feature", including reviews shown "through an embedded third-party widget (for example, Google Business reviews...)" [1]. Show them as content only, as now.
- FAQPage can stay (built from the same array as the visible FAQ, so they can't drift), but expect no rich result: since August 2023 Google shows FAQ results only for well-known government and health sites [3].

**3. Must. Service links can't be crawled from the nav or footer (sitewide).** Nav "Services" is a `<button>`, and its dropdown links render only after a click (`{servicesOpen && ...}` in `Nav.tsx`), so they aren't in the HTML. Footer "Services" points to `/#services`, but no element has `id="services"`. The homepage has zero links to /services. Google follows only `<a href>` links [6]. Fix: footer link to `/services`; render the dropdown links in the HTML at all times (hidden with CSS), or make "Services" a link to /services with a separate toggle.

**4. Must. No visible address, no Annex.** "390 Dupont" appears twice in the HTML, both inside JSON-LD. "Annex" appears zero times. Google ranks local results on relevance, distance and prominence [5], and this page is the profile's main support. Fix: a footer on every page with the descriptor, "390 Dupont St, Suite 201, Toronto, ON M5R 1V9", phone and email, formatted as on his Business Profile. In About, mention the Annex once, linked to /neighbourhoods/the-annex.

**5. Should. Swap the H1.** "Confident mortgage decisions start here." names no service and no place. Jesse's subline names both. Make "Mortgage agent based in Toronto, guiding first-time buyers and self-employed borrowers across Ontario." the `<h1>` and render the brand line as a `<p>` with the same styling. Nothing changes visually. If the mockups change the hero, the H1 still needs "mortgage agent", "Toronto" and both niches.

**6. Should. Title and description.** The title is clean but generic, and the description doesn't say what a visitor gets. New versions in section 4.

**7. Should. Internal links.** "Each step in detail" is a vague anchor. About doesn't link to /about. "Everything I help with" skips /services/equity-takeout and /services/purchases-and-investment and repeats all four intent-card links. FAQ answers mention the closing cost calculator, programs and renewals without linking. Full list in section 4.

**8. Should. Blog cards send people off-site.** Two of three cards go to LinkedIn and Medium. Host those articles on jessekarkoukly.com (Jesse already wants this), show on-site posts only, and post summaries elsewhere that link back.

**9. Should. Cut the lender ticker.** It's 15 logos, each repeated for the loop (30 img tags), with no search value, and the brand book lists lender names as an open compliance gap. Replace it with one sentence in the broker section: "Through Sherwood, I can compare options from more than 50 lenders, including big banks, credit unions and lenders that only work through brokers."

**10. Should. Page speed: the whole homepage hydrates.** Today's Lighthouse run failed because the port 3100 server stopped responding. These figures are from three homepage runs saved Oct 21 (localhost, older build, simulated mobile, not production): performance 66 to 84, LCP 3.7 to 4.5 s, TBT 270 to 640 ms, CLS 0. The LCP element is the hero headshot, and 83% of LCP was render delay (3.5 s) against 0.24 s to download it. Likely cause: `HomePage.tsx` starts with "use client", so every section hydrates. Fix: render it on the server like the landing page, with client islands for the nav, forms, deck and FAQ toggles. Re-test production with PageSpeed Insights afterwards.

**11. Could. Sitemap freshness.** Every URL shares one lastmod (`PAGES_UPDATED = "2026-10-17"`), though the homepage changed daily from Oct 20 to 25. Google uses lastmod only when it's consistently accurate, and it ignores priority and changefreq [8]. Bump the date when the new homepage ships.

**12. Could. Business Profile link.** sameAs and the review links use the share.google short link, which redirects. Use the full Google Maps URL of the profile in sameAs and `hasMap`. I couldn't open the profile from here, so confirm the schema name and address match it exactly.

**13. Could. Headings.** The reviews band has no heading, FAQ questions aren't headings, and "Blog" says nothing. Outline in section 4.

## 3. Keep exactly as is

- Canonical, robots meta, Open Graph and Twitter tags, en-CA.
- One H1, all copy and links in the server HTML, FAQ fully expanded.
- Question links with plain anchors ("How much can I afford?" to /calculators/affordability).
- Alt text, the hero preload with `sizes`, CLS 0.
- robots.txt, the sitemap (noindex pages left out), and 308 redirects for retired URLs.
- jobTitle "Mortgage Agent", the FSRA `hasCredential`, and verbatim reviews linking to Google.

## 4. Recommendations for the new homepage

**Title (62 characters):** Jesse Karkoukly | Toronto Mortgage Agent for First-Time Buyers
Fallback: keep the current title. Check Search Console queries first.

**Meta description (154 characters):** Toronto mortgage agent with Sherwood Mortgage Group. I help first-time buyers and self-employed borrowers see what they qualify for and what it will cost.

**H1:** Mortgage agent based in Toronto, guiding first-time buyers and self-employed borrowers across Ontario. Display line above it, as a `<p>`: Confident mortgage decisions start here.

**H2 outline.** The order can follow the design reviews.
- What brings you here?
- Reviews from clients on Google
- Why work with a broker instead of your bank? (an H3 for each card)
- You should understand exactly what you are signing, and I make sure you do.
- How it works (an H3 for each step)
- Common mortgage questions (each question an H3 wrapping its toggle)
- Recent articles
- Mortgages I help with
- Mortgage questions?

**Copy that names the entity.** The copy reviewers own the final wording.
- Under the broker H2: "I'm a licensed mortgage agent with Sherwood Mortgage Group, a mortgage brokerage. Here is what changes when you work through a brokerage instead of your bank."
- In About: "I live in the Annex, and my office is on Dupont Street. I'm a licensed mortgage agent with Sherwood Mortgage Group, and most of my clients are first-time buyers and self-employed people." Add a "More about me" link to /about.
- In the footer: the descriptor word for word, then the address, phone and email.

**"Mortgage broker" searches, compliantly.** People search in broker terms, as Jesse's own FAQ questions and a client review show. Never use "broker" as his title: not in the title tag, H1, schema, bylines or profile name. Use it for the channel instead: "broker vs bank", "what a mortgage broker costs you", "working through a brokerage". Add a blog guide, "Mortgage agent or mortgage broker in Ontario: what's the difference?", that answers the question honestly. One possible line: "In Ontario, mortgage agents and brokers are both licensed by FSRA and work through a brokerage." (Confirm with Sherwood compliance.) I couldn't verify search volumes, so use Search Console and Keyword Planner rather than guesses.

**Page jobs**, so pages don't compete: the homepage takes his name, "Toronto mortgage agent", the Annex and broker vs bank. Service pages take the niche terms (first-time buyer programs, FHSA, self-employed and dividend income), calculators take the tools, and neighbourhood pages take "buying in [area]".

**Internal links the homepage should carry:**
- All 10 service pages with short anchors (first-time-buyers, self-employed, pre-approval, renewal, refinancing, equity-takeout, debt-consolidation, purchases-and-investment, cottage, specialty), plus "All mortgage services" to /services.
- "See every step in detail" to /working-with-jesse.
- /calculators/affordability, /calculators/closing-costs, /calculators/land-transfer-tax and /calculators.
- /about, /neighbourhoods/the-annex, /neighbourhoods, /blog and on-site posts.
- Links inside the programs, self-employed, closing-costs and renewal FAQ answers.

**Corrected JSON-LD.** Use one `@graph`. FAQPage stays as its own block. Person fields not shown stay as they are, minus memberOf. There is no priceRange, aggregateRating or review.

```json
{"@context":"https://schema.org","@graph":[
 {"@type":"WebSite","@id":"https://jessekarkoukly.com/#website","url":"https://jessekarkoukly.com/",
  "name":"Jesse Karkoukly","alternateName":["Jesse Karkoukly, Mortgage Agent","jessekarkoukly.com"],
  "inLanguage":"en-CA","publisher":{"@id":"https://jessekarkoukly.com/#jesse"}},
 {"@type":"FinancialService","@id":"https://jessekarkoukly.com/#business",
  "name":"Jesse Karkoukly, Mortgage Agent",
  "description":"Jesse Karkoukly is a Toronto mortgage agent with Sherwood Mortgage Group who helps first-time buyers and self-employed borrowers make confident mortgage decisions.",
  "url":"https://jessekarkoukly.com/","telephone":"+1-416-276-2666","email":"jkarkoukly@sherwoodmortgagegroup.com",
  "image":"https://jessekarkoukly.com/jesse-hero-arch.jpg","logo":"https://jessekarkoukly.com/icon-512.png",
  "address":{"@type":"PostalAddress","streetAddress":"390 Dupont St Ste 201","addressLocality":"Toronto","addressRegion":"ON","postalCode":"M5R 1V9","addressCountry":"CA"},
  "geo":{"@type":"GeoCoordinates","latitude":43.6697,"longitude":-79.4043},
  "areaServed":[{"@type":"City","name":"Toronto"},{"@type":"State","name":"Ontario"}],
  "founder":{"@id":"https://jessekarkoukly.com/#jesse"},
  "parentOrganization":{"@id":"https://jessekarkoukly.com/#sherwood"},
  "hasMap":"GOOGLE_MAPS_PROFILE_URL",
  "sameAs":["GOOGLE_MAPS_PROFILE_URL","https://www.linkedin.com/in/jessekarkoukly","https://www.instagram.com/jkarkoukly/","https://medium.com/@jessekarkoukly"]},
 {"@type":"Person","@id":"https://jessekarkoukly.com/#jesse","name":"Jesse Karkoukly","jobTitle":"Mortgage Agent",
  "description":"(same descriptor)","image":"https://jessekarkoukly.com/jesse-hero-arch.jpg",
  "worksFor":{"@id":"https://jessekarkoukly.com/#sherwood"},
  "sameAs":["https://www.linkedin.com/in/jessekarkoukly","https://www.instagram.com/jkarkoukly/","https://medium.com/@jessekarkoukly"]},
 {"@type":"Organization","@id":"https://jessekarkoukly.com/#sherwood","name":"Sherwood Mortgage Group",
  "url":"https://sherwoodmortgagegroup.com",
  "identifier":{"@type":"PropertyValue","propertyID":"FSRA brokerage licence","value":"12176"}}
]}
```

## 5. Sources

1. Google, Review snippet structured data (checked Oct 25): https://developers.google.com/search/docs/appearance/structured-data/review-snippet
2. Google, LocalBusiness structured data (checked Oct 25): https://developers.google.com/search/docs/appearance/structured-data/local-business
3. Google Search Central, "Changes to HowTo and FAQ rich results", August 2023: https://developers.google.com/search/blog/2023/08/howto-faq-changes
4. Google Search Central, "An update on site names": https://developers.google.com/search/blog/2023/07/sitenames
5. Google Business Profile Help, "How to improve your local ranking on Google": https://support.google.com/business/answer/7091?hl=en
6. Google, Make your links crawlable: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
7. Google, Organization structured data (logo minimum 112x112): https://developers.google.com/search/docs/appearance/structured-data/organization
8. Google, Build and submit a sitemap: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

## For the other reviewers

- The FAQ and broker deck use absolutes: "negotiate the best rate", "getting you the best deal", "You always get the better rate", "the best available number".
- About still says "one of the biggest financial decisions of their adult lives".
- The fourth featured review (Goldhar) calls Jesse "a fabulous Mortgage Broker". Verbatim is right, but compliance may prefer another review in that slot.
- For the coordinator: localhost:3100 stopped responding before 23:00 on Oct 25.
