# Design and information hierarchy: jessekarkoukly.com homepage

Measured with Playwright at 1440×900 and 390×844 on localhost:3100 (work-design/measure.js). The page is 8,902px tall on desktop and 14,731px on a phone.

## 1. Verdict

The raw materials are premium: a warm palette, a good serif and sans pairing, a sunlit arch headshot and a beautiful family photo. The structure works against them, with 12 sections between nav and footer, three routing blocks, four espresso bands, a swipe deck that hides three of its four reasons, and a FAQ that fills 27% of the page. The biggest problem is order and duplication: proof and the person arrive late (About starts five screens down on a phone), and the page ends three times.

## 2. Findings, ranked

**Where the eye lands today**

| Section | Eye lands on | Right for the job? |
|---|---|---|
| Hero | The arch face, then the 68px H1 | Mostly. No proof in view, and the arch floats in empty linen |
| What brings you here? | Four equal bold sans titles, four pills | No. Eight equal entry points, with self-employed as a small pill |
| Reviews | Rainbow avatars, gold stars | Partly. Loud, but shows the weakest lines (openings) in Arial 14px |
| Broker deck | 42px card title, competing with the 44px section head | No. One reason of four visible |
| About | Orange canopy. The family sits in the bottom third | No |
| How it works | Numbered dots, serif titles. Left column is empty | Mostly. Step text is 15px and faint |
| Lender ticker | Motion, logos blown out by the invert filter | No |
| Common questions | Nine filled sky deep X buttons | No. The strongest accent means "close" |
| Blog | Three mismatched photos | No |
| Everything I help with | A clean ruled list | Yes, but it repeats the router |
| Mortgage questions? + clay band | Two endings in a row, then the dark footer | No |

**F1. Merge the routers and the endings. Must.** Two link blocks (8 links each), the About button, "Mortgage questions?" and the hero all point at the same next steps. At the bottom, an espresso band, a clay band and the espresso footer stack up (desk-05, desk-06). Fix: one router after the reviews and one closing band, taking the page from 12 sections to 9.

**F2. Put proof next to the promise. Must.** The hero has no stars or count, and reviews start 2,237px down on a phone. The brand book names trust as the first barrier. The landing page Jesse approved puts a star line under the sub and quotes right under the hero. Fix: add its `GoogleSummary` line between the sub and the buttons, and move reviews directly under the hero.

**F3. Reviews: brand type, exact highlights, scroll on phone. Must.** `ReviewsStrip.tsx` uses Arial, Google-coloured avatars and Google-blue links. It is the one place the type system disappears. On a phone the cards stack to 1,076px, which breaks the CLAUDE.md rule "Reviews: horizontal scroll on mobile, not stacked". Fix: keep the band, cards, stars, Google G and count line (Jesse's calls), but set quotes in Newsreader 20px and names in Jakarta 14px. Use the verbatim highlights in `src/data/landing/fthb.ts`. CLAUDE.md asks for openings, so this needs Jesse's OK. On a phone, use a scroll-snap row (S2).

**F4. One type system. Must.** About 20 font sizes in three families. Section heads come in 44/400, 40/400 and 44/500. The deck title (42px) nearly matches its section head, and the closing line (64px) nearly matches the H1 (68px). Fix: the scale below, with one rule. Newsreader is for anything said in someone's voice: headlines, questions, reviews. Plus Jakarta is for explanation, numbers and UI.

**F5. Replace the swipe deck with a static comparison. Should.** The deck uses 971px on a phone to show one reason. Its first card, "A personalized experience", isn't a bank vs broker difference. CLAUDE.md already targets a comparison table. Fix: a ruled table with every row visible (S5). The door drawings can stay as spot art.

**F6. Let the photos carry more. Should.** The arch is 340×430 on a 1440 canvas, and the family photo is a tall crop where trees fill the frame. Fix in S1 and S4. The repo's family files are only 1,067px wide, so ask the photographer for full-resolution originals before going wider than about 560px.

**F7. FAQ: shorter, calmer, readable. Should.** Nine open answers at 77 to 89 characters per line. Fix: show six, still fully expanded (cost, better rate than my bank, self-employed, what happens when I reach out, down payment, programs), as the landing page's plain ruled `FaqList` with no toggles. On desktop, the question goes left in Newsreader 22px (5 of 12 columns) and the answer right in Jakarta 17px, capped at 620px. Closing costs, renewal and rate drops move to their service pages, since there is no /faq page (the footer FAQ link points to /#faq).

**F8. Take the lender ticker off. Should.** It adds motion, harsh inverted logos (15 in code) and a fourth espresso stripe. The brand book also lists lender names as an open compliance gap. Fix: one line in the comparison: "I compare options across 50+ lenders, including major banks."

**F9. Blog as a quiet list. Could.** It runs 1,722px on a phone, with a selfie, a suit portrait that repeats the hero, and a stock-like street. Fix: three ruled rows (date, Newsreader title, source).

**F10. Small breaks. Could.**
- The About button is a one-off sky pill with a shadow. Use the standard ghost button.
- The FAQ heading is weight 500 where the rest are 400.
- The footer disclaimer is 12px. Make it at least 13px.

## 3. Keep exactly as is

- The arch headshot, the phone hero order and Jesse's hero subline.
- Newsreader 400 display, Plus Jakarta body and italic sentence-case labels.
- The sky deep reviews band, gold stars and the review count.
- The How it works timeline, with Keys in hand and the sparkler.
- "Every door, walked through together." and the P4 mark.
- The ruled-list look of "Everything I help with", colour-only hover, 48px targets and the footer.

## 4. The new homepage

Nine sections. Estimated height is about 7,000px on desktop (21% shorter) and 9,700px on a phone (34% shorter). About moves from 4,283px to about 2,350px on a phone.

**S1. Hero, linen.**
- Desktop: text in columns 1 to 7 (H1, sub, star line, two buttons). The arch sits in columns 9 to 12, flush to the bottom edge.
- Phone: arch at 220×275, H1 at 42px, sub, star line, then stacked buttons. All of it fits in about 785px of the 844px screen.
- Why first: face, promise, proof and both actions on one screen.
- H1 options, both Jesse's lines: "Confident mortgage decisions start here." or "A real person behind your mortgage."

**S2. Reviews, sky deep.**
- Desktop: header row (G, stars, count, "See all reviews") over four white quote cards.
- Phone: a scroll-snap row, about 520px tall.
- Why here: proof straight after the promise.

**S3. What brings you here?, white.**
- Desktop: two large linen tiles for his niches, each with a Newsreader 32px title, one sentence and a question link. Below them, a two-column ruled list: Pre-approval, Renewals, Refinancing and equity, Debt consolidation, Cottages and vacation homes, Specialty programs, How much can I afford?, What will my closing costs be?
- Phone: the same, stacked.
- Tile copy: "Buying your first home." What you can afford, the cash you need on closing day and the programs you can use. "Self-employed." Lenders read self-employed income differently, and some read it far better than others. Link: Can I qualify?
- Why here: one router, with the two niches first.

**S4. About, linen.**
- Desktop: the wide family photo across 7 of 12 columns (up to 640px for now), with an italic caption in Jesse's words such as "Out for a walk with my family." Beside it: the "About Jesse" label, the H2, the 2021 story in three short paragraphs, a 2×2 credentials grid (licence, Sherwood brokerage licence, 50+ lenders, a decade in tech) and a ghost "Start the conversation" button.
- Phone: the photo full-bleed at 16:10, then the text.
- H2 options: "I learned this the expensive way." or "You should understand exactly what you're signing."
- Why here: once visitors know the page is for them, they meet the person. His bank story sets up S5.

**S5. Why work with a broker instead of your bank?, white.**
- Desktop: a ruled table with three columns: the row label in Newsreader 22px, "Your bank" and "Working with me". Rows: who they work for (the bank / you); lenders compared (one / 50+, in Newsreader 48px); credit checks (one at each bank you try / one, used across lenders); what you see (that bank's products / options side by side).
- Phone: each row shows its label with two short lines under it.

**S6. How it works, sand.**
- Keep the timeline.
- The empty sticky left column gets the H2, a verbatim Marshello quote ("He is so knowledgeable and kept me updated every step of the way.") and "Each step in detail".
- Step text goes up to 16px in #5A4C44.
- Why: the "I keep you updated" claim gets its proof beside it.

**S7. Common questions, white.** Six questions, laid out as in F7.

**S8. Recent writing, white.** After a hairline. Three ruled rows and "All articles".

**S9. Close, espresso.**
- The P4 door in clay, and "Every door, walked through together." in linen at 56px.
- One line in Jesse's words: "Call or text if you have any questions."
- "Schedule a call" (clay) and "Start the conversation" (ghost), with phone and email as text.
- The footer continues on the same espresso after a hairline.
- Option B, if Jesse wants to keep clay: the headline and two espresso buttons only. White on clay is 3.2:1 and espresso on clay is 4.3:1, both too low for small text.

**Type scale (nine sizes, two families; drop Arial and Jakarta 700)**

| Role | Desktop | Phone | Face |
|---|---|---|---|
| H1 | 72 / 1.04 | 42 / 1.05 | Newsreader 400 |
| Sign-off | 56 / 1.1 | 36 / 1.12 | Newsreader 400 |
| H2, every section | 44 / 1.1 | 32 / 1.12 | Newsreader 400 |
| Figures | 48 / 1 | 40 / 1 | Newsreader 400 |
| H3, FAQ questions | 24 / 1.3 | 22 / 1.3 | Newsreader 500 |
| Review quotes | 20 / 1.4 | 19 / 1.4 | Newsreader 400 |
| Label | 18 italic | 17 italic | Newsreader, clay deep |
| Lead | 20 / 1.55 | 18 / 1.55 | Jakarta 400 |
| Body | 17 / 1.65, max 620px | 17 / 1.6 | Jakarta 400, #5A4C44 |
| Buttons, UI | 16 | 16 | Jakarta 600 |
| Small | 14 (13 minimum) | 14 | Jakarta 400 |

**Colour band plan.** Today there are 13 bands. Espresso appears four times, the FAQ and blog run together into 3,194px of white, and three dark stripes close the page. The new page has one band per section above, and each colour gets one meaning:
- Linen: Jesse talking.
- White: things to read or use.
- Sand: the process.
- Sky deep: other people's words. One band only.
- Espresso: the decision. One band, joined to the footer.
- Clay: buttons on dark and the P4 mark, never a band.

**Photos Jesse could take:** Annex front doors from his walks (no people, no street numbers) for the close; his hands with a printed First Home Plan on a kitchen table; Jesse on the phone near 390 Dupont; a key in his own front door for Keys in hand; a landscape version of the sunlit-wall portrait. `public/jesse-family.jpg` isn't on CLAUDE.md's photo list and shows street numbers, so leave it out unless Jesse says otherwise.

**Benchmarks.** Not verified: the fetch tool and proxy blocked all three domains, so check each before it goes into a mockup.
- Rosewood, https://www.rosewoodhotels.com/en/mayakoba (Jesse's own "place"). Borrow: one big photo moment mid-page (S4).
- Aesop, https://www.aesop.com/. Borrow: ruled lists instead of cards.
- Wealthsimple, https://www.wealthsimple.com/en-ca. Borrow: one plain statement with one large figure (S5).

## 5. Sources

- Section heights, font sizes and line lengths are my Playwright measurements of computed styles on localhost:3100.
- Contrast ratios are computed with the WCAG 2 luminance formula (https://www.w3.org/TR/WCAG22/#contrast-minimum, not opened this session). White on sky deep is 5.6:1.
- No outside statistics are used.

**For the other reviewers**
- Voice: About uses the banned "biggest financial decisions of their adult lives". "Getting you the best deal" (deck) and "You always get the better rate" (FAQ) are absolutes.
- AEO: if the homepage shows six FAQs, the schema should match what is visible.
