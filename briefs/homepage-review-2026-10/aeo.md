# AEO review: jessekarkoukly.com homepage

## 1. Verdict

The homepage already does the hard part: nine plain-language questions, answers that are expanded and server-rendered, FAQPage markup built from the same text, and four question links that mirror real searches. The biggest problem is the sentence an engine would lift: three answers would be quoted as absolute or unverified claims ("You always get the better rate", "Most banks do not send renewal offers until 21 days out", "the best rate and term"), and the top question in Jesse's inbox, "How much can I afford?", has no answer. Fix those claims, make the questions real headings and lead every answer with the answer, and the page can be quoted safely.

## 2. Findings, ranked by impact

**1. Must. Three answers read as promises or unverified claims.**
- Rate drop: "You always get the better rate... you end up with the best available number." Lender policies vary, so this reads as a rate promise. `/services/pre-approval` answers the same question.
- Renewal: "Most banks do not send renewal offers until 21 days out." The verified fact is narrower: federally regulated lenders must send the renewal statement at least 21 days before the term ends (FCAC). The answer also conflicts with the renewal page (120 days here, 4 to 6 months there) and ends on an "is not about X" reversal.
- Broker cost: "negotiate the best rate and term".

Fix: move the renewal and rate-drop answers to their own pages (copy in section 4). Cut the broker-cost answer to its first paragraph plus the B lender sentence.

**2. Must. The questions aren't headings.** Each question is a `<span>` inside a `<button>`, so the HTML has no question headings. Wrap each button in an `<h3>` (the W3C accordion pattern). Keep the answers expanded and server-rendered, and keep the JSON-LD built from the same array, moved to `src/data/faqs/home.ts`. Google has limited FAQ rich results to government and health sites since 2023, so expect easier parsing, not dropdowns.

**3. Must. Four answers bury the answer or never give it.** The self-employed answer opens with "Complicated income is where a broker can add a substantial amount of value" and never says yes or no. The programs answer packs four programs into 89 words. The closing-costs answer has no number. The broker-cost answer runs 103 words and "What actually happens" runs 77. The bank below fixes all four: 51 to 60 words each, with a first sentence that works read aloud on its own.

**4. Should. The top question in Jesse's inbox has no answer.** Pattern 1 in the email insights is "Would I qualify? For how much?" Pattern 3 is "the bank said no" or "approved for less". The homepage only links the first question to a calculator. Add Q3 and Q8.

**5. Should. The question links land on pages that don't answer the question up top.** `/services/self-employed` opens with "Your income is real. Your tax return just does not show it." Both calculator pages show only an H1 and a disclaimer. On each page, put the exact question as an H2 with the same short answer near the top. Point the programs link to `/services/first-time-buyers#programs`.

**6. Should. Deeper pages get facts wrong or leave them out.**
- The first-time buyers FAQ on a partner who has owned before says "Unfortunately, no" to every program. Ontario only refuses its refund if the spouse owned a home while being your spouse; otherwise it splits the refund by ownership share (ontario.ca), as in Jesse's JS & SH file. Rewrite from "It depends on when your partner owned," and have Jesse check the FHSA and HBP parts.
- HBP: for first withdrawals from 2022 to 2028, repayment starts in the fifth year after the withdrawal (CRA).
- Add new-home relief to `#programs` once dates and conditions are confirmed: the GST back on new homes up to $1 million (partial to $1.5 million), plus up to $80,000 of Ontario's share of the HST (CRA).
- Source or cut "1.15 million Canadian mortgages are renewing in 2026" and "16% of Canadians are self-employed".

**7. Should. The broker vs bank H2 asks a question it never answers directly.** Instead there are four swipe cards, and two say "best deal". Add this line under the H2, built from Jesse's deck: "Your bank can show you its own mortgages. I can show you options across 50+ lenders with one credit check, and if your bank has the best deal for you, I'll tell you."

**8. Could. Freshness and depth.** Put "Numbers checked October 2026" under the FAQ heading in Newsreader italic. Add a CLAUDE.md reminder to re-check the numbers whenever a federal or Ontario budget lands. End each answer with one descriptive link, kept outside the schema text.

## 3. Keep exactly as is

Answers expanded in the server HTML, with schema built from the visible text. `index, follow` and `max-snippet:-1`. "How it works" as an ordered list with H3 steps. The blog card that answers "Yes, dividends count.", which is the pattern for every answer. Jesse's lines "Typically, no.", "Often yes, sometimes no.", "I will tell you that straight up and explain why." and "Before asking for a single document, I will tell you honestly whether and how you qualify." The down payment rule and the $700,000 example (both verified).

## 4. Recommendations

**FAQ heading:** "Questions I get every week" or keep "Common questions". The section can sit wherever the design wants it, because engines read the whole page.

### Homepage answer bank (in this order)

**Q1. Do I actually have to pay anything to use a mortgage broker?** (Jesse's, cut)
Typically, no. On most residential mortgages, the lender pays me a finder's fee when your mortgage closes, so there is no cost to you. The only time a broker usually charges a fee is on an alternative (B lender) mortgage, and I would tell you what it costs upfront, in the first conversation.
*Link: /working-with-jesse*

**Q2. Can a broker actually get me a better rate than if I just go to my bank?** (Jesse's, plus his deck line)
Often yes, sometimes no. I have access to over 50 lenders, and lenders compete for business that comes through brokers, which gives me room to push on rate and terms for you. But if your bank genuinely has the best deal for your situation, I will tell you that straight up and explain why.
*Link: /services/pre-approval#broker-vs-bank*

**Q3. How much can I afford?** (new)
It comes down to four things: your income, your monthly debts, your down payment and your credit. Most lenders also check that you could still make the payment at a higher rate than the one you'll get. The calculator gives you a rough number. I can work out your real number from your documents before you fall for a home.
*Source: OSFI qualifying rate (rule only). Link: /calculators/affordability*

**Q4. How much do I need for a down payment in Ontario?**
You need at least 5% of the first $500,000 and 10% of the part between $500,000 and $1.5 million. Homes priced at $1.5 million or more need 20% down. A $700,000 home needs at least $45,000. With less than 20% down, you'll pay mortgage insurance, and first-time buyers can choose a 30-year amortization.
*Source: FCAC, Finance Canada. Link: /services/first-time-buyers#down-payment*

**Q5. What first-time buyer programs can I use in Ontario?**
The main ones are the FHSA, the Home Buyers' Plan and the land transfer tax refunds. The FHSA lets you save up to $40,000, with a tax deduction going in and no tax coming out. The Home Buyers' Plan lets you use up to $60,000 from your RRSP. The refunds go up to $4,000 from Ontario and $4,475 in Toronto.
*Source: CRA, ontario.ca, toronto.ca. Link: /services/first-time-buyers#programs. Works as a ruled list.*

**Q6. How much are closing costs in Toronto?**
On a $600,000 Toronto home, a first-time buyer pays about $8,475 in land transfer tax after both rebates. Toronto buyers pay it twice, once to the province and once to the city. Plan for about $5,000 more in legal fees and other costs, plus tax on mortgage insurance if you put less than 20% down.
*Source: ontario.ca and toronto.ca. The math ($16,950 before rebates) matches `src/lib/mortgageFormulas.ts` and the landing page. The $5,000 is Jesse's estimate. Link: /calculators/closing-costs*

**Q7. I'm self-employed or my income is complicated. Can I still get a mortgage?** (Jesse's, answer first)
Often, yes. Lenders treat self-employment, contract income, commission and bonuses differently, and some lenders are significantly better than others for specific income types. That is where a broker can add a substantial amount of value. Before asking for a single document, I will tell you honestly whether and how you qualify.
*Link: /services/self-employed*

**Q8. My bank said no, or approved me for less than I need. What now?** (new)
Usually, it means your file didn't fit that one lender's rules. Each lender reads income, credit and down payment differently, so I look at where your file fits best and what would change the answer. Sometimes that's another lender. Sometimes it's a few months of preparation, and I'll tell you which.
*Link: /services/self-employed#lending-ladder*

**Q9. What actually happens when I reach out?** (Jesse's, trimmed, plus his landing page consent promise)
It starts with an intro call where I learn about your situation and what you're hoping for. Everything you share is kept confidential, and I don't pull your credit until you give the OK. From there, I build a plan with you, from your max purchase price to pre-approval. Then I walk with you through every step to your keys.
*Link: /working-with-jesse*

All nine pass the CLAUDE.md greps.

### Move off the homepage

- **Renewal goes to /services/renewal.** It's off-niche here, it contradicts that page and it overstates the 21-day rule. Keep the "Renewal coming up" card. Use one answer on both pages: "About four months before your term ends. Many lenders will hold a rate for up to 120 days, which gives you time to compare and negotiate. Federally regulated lenders only have to send your renewal statement 21 days before your term ends, so it helps to start before it arrives."
- **Rate drop goes to /services/pre-approval.** It duplicates that page and reads as a promise. Replace both versions with: "Usually, you can still get the lower rate. The hold protects you if rates go up before you close. If rates drop, I ask the lender to move you to the new rate, which many lenders allow. I check each lender's policy before you commit."

## 5. Sources

- Down payment tiers: [FCAC](https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html) (2025-10-15)
- $1.5M cap, 30-year amortization: [Finance Canada](https://www.canada.ca/en/department-finance/news/2024/12/boldest-mortgage-reforms-in-decades-come-into-force-today.html) (Dec 15, 2024)
- FHSA: [CRA](https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/first-home-savings-account.html) (2026-02-02), [CRA tax tip](https://www.canada.ca/en/revenue-agency/news/newsroom/tax-tips/tax-tips-2024/ten-tips-opened-first-home-savings-account-2023.html)
- HBP and deferral: [CRA](https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/what-home-buyers-plan.html) (2026-02-17)
- Ontario refund and spouse rule: [ontario.ca](https://ontario.ca/document/land-transfer-tax/land-transfer-tax-refunds-first-time-homebuyers) (Feb 10, 2026)
- Toronto rebate: [toronto.ca](https://www.toronto.ca/services-payments/property-taxes-utilities/municipal-land-transfer-tax-mltt/municipal-land-transfer-tax-mltt-rebate-opportunities/) (Dec 18, 2025)
- New-home GST/HST relief: [CRA](https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/gst-hst-rebates/first-time-home-buyers-gst-hst-rebate.html) (2026-06-16)
- 21-day renewal statement: [FCAC](https://www.canada.ca/en/financial-consumer-agency/services/mortgages/renew-mortgage.html) (2025-10-15)
- Qualifying rate: [OSFI](https://www.osfi-bsif.gc.ca/en/supervision/financial-institutions/banks/minimum-qualifying-rate-uninsured-mortgages) (found by search, not opened)
- [Google FAQ change](https://developers.google.com/search/blog/2023/08/howto-faq-changes), [Google AI features](https://developers.google.com/search/docs/appearance/ai-features), [W3C accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) (not re-read this session)
- Not verified: lender rate-hold lengths, legal fees, and the GST/HST rebate dates and conditions.

## For the other reviewers

- Schema: Person keeps `memberOf` Mortgage Architects and a mortgagearchitects.ca `sameAs`. FinancialService has `priceRange: "Free consultation"`. (SEO, GEO)
- The About section uses the banned line "one of the biggest financial decisions of their adult lives". (Brand)
- First-time buyers page says "legally required to act in your best interest", which needs a compliance check. (Compliance)
