# GEO review: jessekarkoukly.com homepage

Lane: being found, cited and recommended by AI assistants. Checked on the local production build, October 25, 2026.

## 1. Verdict

The technical base is good: robots.txt admits every AI crawler, and all copy, FAQ answers and review openers are in the server HTML. The biggest problem is that no sentence says who Jesse is: in the page text (the logo is an image) his name appears only in one review and the compliance footer, Sherwood only in the footer, and the brand descriptor is on none of the six indexable pages I checked. The proof an assistant needs to recommend him for self-employed or first-time buyer questions is cut off after one line, and the full reviews sit only on the noindex landing page.

## 2. Findings, ranked by impact

**1. No quotable "who is Jesse" sentence. Must.**
Seen: the H1 and hero line name neither Jesse nor Sherwood, and the About heading is a brand statement. The descriptor is on zero indexable pages (home, /about, /working-with-jesse, two service pages, /contact); meta and schema use four other wordings.
Why: assistants answer from passages. To name Jesse for "a Toronto mortgage agent for self-employed people", a model needs one passage tying name, role, brokerage, city and niche. His brand book says it: consistency is what search and AI learn.
Fix: the descriptor word for word in a facts block, the footer, meta, OG and schema, with the first-person version opening About.

**2. Proof is truncated, and the best reviews are invisible. Must.**
Seen: four 100-character openers ending in "…". Syed's stops before the part where his bank couldn't move forward with a self-employed applicant. Ephy Bookbinder's ("within roughly 24 to 48 hours") and R.S. Konjek's ("I found Jesse via google search") appear only on the noindex, nofollow landing page.
Why: outside Google's products, assistants can't count on reading Google Maps reviews; they quote what's on the page. In the GEO paper, adding quotations was the strongest single edit (+41% visibility).
Fix: three longer verbatim excerpts (section 4), full text in a `<details>` so it stays in the HTML, links to Google. This changes the CLAUDE.md "opening only" rule, so Jesse decides; the approved landing page already uses exact excerpts.

**3. No plain facts block. Must.**
Seen: the licence number is only in the footer. The office address is in schema but not on the page, and Google wants structured data to match visible text. "No cost to you" and "50+ lenders" are buried, and the consent promise is missing.
Why: assistants compare agents on attributes: licence, brokerage, office, niche, cost, credit handling. Missing facts get skipped or guessed.
Fix: "The short version" (section 4).

**4. Schema sends mixed signals. Should.**
Seen: `memberOf` Mortgage Architects (dropped in October), `priceRange: "Free consultation"`, `image` is the preview card, `areaServed` is Toronto on one entity and Ontario on the other, and `sameAs` has a share.google redirect and an unverified mortgagearchitects.ca URL.
Why: Microsoft says Bing and Copilot use schema for their LLMs, and Google says schema must match the page. Contradictions blur the one-person signal.
Fix: see the technical checklist.

**5. Conflicting numbers, stories and lender names. Should.**
"50+", "over 50" and "many" lenders, plus 16 logos whose alt text names 15 lenders (an assistant can repeat that as "works with TD and Scotiabank"). Three origin stories (home, /about, landing page), and About uses the banned "biggest financial decisions" line, so a model asked why Jesse does this will blend them. Use "50+ lenders" everywhere, drop the ticker, and tell the 2021 story on every page.

**6. Niche evidence is thin. Should.**
Self-employed gets one link and one FAQ answer. Assistants recommend specialists when the page shows specialist knowledge. In the GEO paper, statistics lifted visibility about 31%, and lower-ranked pages gained most (fifth-ranked sources +115% from citing sources, while top-ranked ones lost ground). A new site facing established brokers is that case. Add one self-employed block and one first-time buyer number (section 4).

**7. Measure it. Could.**
Add "an AI assistant" to a "How did you hear about me?" field on the inquiry form. Watch Bing Webmaster Tools' AI Performance report. Run the brand book's monthly prompt check, logging whether he's named and which sources are cited.

## 3. Keep exactly as is

- robots.ts (allow all, disallow `/api/`, sitemap).
- Prerendered HTML with every word present; FAQs fully expanded.
- Title, canonical, `hasCredential` naming FSRA, the `@id`s, sitemap, IndexNow.
- "19 five-star reviews on Google" as text, and hedges like "Often yes, sometimes no." Candour is quotable.

## 4. Recommendations for the new homepage

**Order.** Name in the first screen, substantive reviews in the top third, About opening with the descriptor, then "The short version", niche evidence before the FAQ, descriptor and address in the footer.

**Hero.** Keep the H1. Option for the sub line (replaces Jesse's October 24 line, his call): "I'm Jesse Karkoukly, a mortgage agent with Sherwood Mortgage Group in Toronto. I work with first-time buyers and self-employed borrowers across Ontario." Under the buttons, as text: "19 five-star reviews on Google."

**About opener** (2021 lines from the approved landing page):
> I'm Jesse Karkoukly, a Toronto mortgage agent with Sherwood Mortgage Group. I help first-time buyers and self-employed borrowers make confident mortgage decisions.
>
> In 2021, my wife and I bought a home for the first time. Like most first-time buyers, the first stop was the bank.
>
> It was a blur, and I signed off on decisions I didn't fully understand. Those decisions cost my family thousands of dollars.
>
> Before mortgages, I spent a decade in tech and sales. Now I lay out the options and the numbers, and you choose.

**The short version** (H2, plain lines):
> Jesse Karkoukly is a Toronto mortgage agent with Sherwood Mortgage Group who helps first-time buyers and self-employed borrowers make confident mortgage decisions.
>
> I'm licensed in Ontario as a Mortgage Agent Level 1 (Lic. M25003068). My brokerage is Sherwood Mortgage Group (Brokerage Lic. 12176).
>
> My office is at 390 Dupont St, Suite 201, in the Annex. I work with clients across Ontario.
>
> I compare options across 50+ lenders. If your bank has the best deal, I'll tell you.
>
> On most residential mortgages, the lender pays me when your mortgage closes, so there is no cost to you. If a mortgage needs a fee, you'll know in the first conversation.
>
> I don't pull your credit or send anything to a lender without your clear OK.

Optional, his call: "I became a licensed mortgage agent in 2025, after a decade in tech and sales." Plain beats a model's guess.

**Reviews** (verbatim; tags only where the review says it):
- Syed Aklakur Rahman, first-time buyer: "We initially approached one of Canada’s major banks, where we already had our savings and accounts. However, due to the complexity of documenting the income of a self-employed applicant, we were unable to move forward with the mortgage application."
- Rebecca Marshello, first-time buyer: "Coming as a first time homeowner he had his hands full with having to explain in detail every step of the process and looked into every question or requirement that I sent his way."
- Ephy Bookbinder, realtor for first-time buyer clients: "Within roughly 24 to 48 hours of getting involved, he had secured the financing my clients needed and put the deal firmly back on track."

**Self-employed block** (heading from the brand book: "Self-employed doesn't mean unqualified."):
> Lenders use your personal tax return, usually the average of your last two years. At most banks, money you leave in your company isn't counted, so a modest dividend can lower what you qualify for.
>
> Some lenders read self-employed income differently, and matching you with the right one is a big part of what I do. The full math is in my article on dividends and mortgages.

**First-time buyer number** (approved landing page math):
> A $600,000 Toronto home needs about $50,283 in cash: $35,000 down, $8,475 in land transfer tax after rebates, $1,808 in tax on mortgage insurance and about $5,000 in legal fees (October 2026).

**Footer line** above the compliance text: the descriptor word for word, then "390 Dupont St, Suite 201, Toronto, ON M5R 1V9."

### Technical checklist

1. **Crawlers.** `User-agent: *` already admits OpenAI's OAI-SearchBot (opted-out sites "will not be shown in ChatGPT search answers"), GPTBot (training), ChatGPT-User and OAI-AdsBot (checks ChatGPT ad landing pages, relevant to his planned ads); Anthropic's Claude-SearchBot, Claude-User and ClaudeBot; PerplexityBot (Perplexity-User generally ignores robots.txt); and Google-Extended (Gemini apps, no effect on Google Search). Keep training bots allowed: a model answering from memory only knows him if pages about him were in its training data.
2. **Edge.** I couldn't reach the live domain from here. Confirm no Vercel Firewall or Cloudflare rule blocks these bots (Cloudflare has blocked AI crawlers by default since July 2025), then run live tests in Search Console and Bing Webmaster Tools.
3. **Rendering.** Keep every word in server HTML in the rebuild, including review texts and facts. No text only in images or click-to-load.
4. **Schema.** Both descriptions = the descriptor. Remove `memberOf` and `priceRange`. `image` = the headshot JPG. `areaServed` = Ontario on both. Business `name` matches the Business Profile exactly. Replace share.google with the profile's Maps URL. Keep the mortgagearchitects.ca URL only if live; add a Sherwood profile URL if one exists. Skip rating markup for his own reviews; Google has long treated self-serving reviews as ineligible for stars (not re-checked here).
5. **Google.** No special files or schema are needed for AI Overviews or AI Mode: the page must be indexed and snippet-eligible, with the Business Profile current.
6. **llms.txt: skip it.** Google says sites don't need "AI text files"; Gary Illyes said Google doesn't support it and isn't planning to; John Mueller said no AI system uses it. I found no major engine confirming it uses llms.txt.

### Off-page, next 90 days

My audit search tool returned nothing about Jesse for his name or domain, while colleagues' Mortgage Architects pages appeared. I can't confirm its index (TechCrunch reported Claude's web search appears to use Brave), so treat it as a warning: links from already-indexed pages help every index find him.

1. **Google Business Profile:** descriptor in the description, services, homepage link, photos, a review request after every closing, a reply to every review. BrightLocal found GBP a primary source for Google AI Mode.
2. **Listings:** identical name, address, phone and descriptor on Bing Places, Apple Business Connect and Foursquare. Yext's study of 6.8 million AI citations found listings drove 42% and brand websites 44% (vendor research).
3. **Brokerage directory:** a live Sherwood or Mortgage Architects profile with the descriptor and a site link.
4. **LinkedIn and Medium:** the descriptor word for word, with a homepage link.
5. **Two earned mentions** from people he works with: a joint article on Seth Freedman's site and a realtor partner's client guide. BrightLocal saw ChatGPT and Perplexity lean on industry directories (legal ones for legal queries), so note which mortgage directories assistants cite in his prompt checks.
6. **Reddit stays low priority:** Yext found Reddit and similar sites were about 2% of citations once location and intent were applied.

## 5. Sources

Read:
- Aggarwal et al., GEO, KDD '24: https://arxiv.org/abs/2311.09735v3 ; tables https://ar5iv.labs.arxiv.org/html/2311.09735 ; setup (simulated GPT-3.5 engine over top-5 Google results) https://arxiv.org/html/2311.09735v2 . A lab benchmark measuring share of the answer, not clicks. Perplexity test: up to 37%. Keyword stuffing: about 8% below baseline.
- OpenAI: https://developers.openai.com/api/docs/bots
- Anthropic: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Perplexity: https://docs.perplexity.ai/docs/resources/perplexity-crawlers.md
- Google AI features: https://developers.google.com/search/docs/appearance/ai-features
- Google-Extended: https://www.searchenginejournal.com/google-clarifies-the-google-extended-crawler-documentation/507645
- llms.txt: https://searchengineland.com/google-says-normal-seo-works-for-ranking-in-ai-overviews-and-llms-txt-wont-be-used-459422
- Yext (July to August 2025 data): https://www.businesswire.com/news/home/20251009106549/en/Yext-Research-86-of-AI-Citations-Come-from-Brand-Managed-Sources-Clarifying-How-Marketers-Can-Compete-in-the-AI-Search-Era
- BrightLocal (20 searches, 10 niches): https://brightlocal.com/blog/ai-search-using-listings-sources

Headline only:
- https://searchengineland.com/microsoft-bing-copilot-use-schema-for-its-llms-453455
- https://searchengineland.com/bing-webmaster-tools-ai-performance-report-468751
- https://www.technologyreview.com/2025/07/01/1119498/cloudflare-will-now-by-default-block-ai-bots-from-crawling-its-clients-websites/
- https://techcrunch.com/2025/03/21/anthropic-appears-to-be-using-brave-to-power-web-searches-for-its-claude-chatbot/

Not verified: the mortgagearchitects.ca/jessekarkoukly page, the live edge settings, the Business Profile name and category.

## For the other reviewers

- SEO: neither the H1 nor the About H2 carries his name or "Toronto mortgage agent".
- Compliance: the lender logos, plus "Free consultation" and Mortgage Architects in schema.
- Authenticity: three origin stories across home, /about and the landing page.
- AEO: FAQ program numbers have no "updated" date.
