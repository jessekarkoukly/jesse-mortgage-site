# Anti AI slop review: jessekarkoukly.com homepage

## 1. Verdict

The bones are right: the arch headshot, Newsreader, a calm palette, real Google reviews, real Ontario numbers in the FAQ, and lines that are plainly Jesse ("Often yes, sometimes no."). The biggest problem is that almost every section reaches for a stock component (rounded card grid, filled plus ghost pill pair, swipe deck with a tutorial hand, logo marquee, sparkler confetti, Google-widget review cards), so the page reads as a good template, not as Jesse. Cream, a serif and a clay accent is already a look AI site builders default to, so shape, real artefacts, photography and copy have to carry the distinctiveness. Today they pull the other way.

## 2. Findings, ranked by impact

**1. Seven corner radii and eight button styles (Must).** Measured with Playwright on the live build: 8, 12, 16, 18, 20 and 24px, plus about 35 fully round elements (5 pill buttons, 6 timeline dots, 9 FAQ discs, 4 letter avatars, deck dots and arrows, blog chips). The buttons come in eight styles, from an 8px nav button that scales on hover to a sky pill with a glow, a lift and an arrow disc (About). When every component picks its own softness, nothing reads as decided. Fix: the spec in section 4.

**2. Stock components standing in for Jesse (Must).** The broker swipe deck (stacked 24px cards, a heavy shadow, a cartoon hand that auto-drags the card, dots, "01 to 04" on reasons that aren't a sequence, "+" glints) looks like app onboarding and hides three of four reasons. The lender marquee is the "trusted by" strip, logos crushed to stencil white, one cut off ("Home T"). Review cards copy Google's widget (Arial, Google-blue links, letter avatars, sentences cut mid-thought). "What brings you here?" is the SaaS feature grid. The FAQ shows nine filled discs with an X, which reads as "dismiss", on answers that are always open.

**3. Scattered motion (Must).** Five things move on their own: the deck demo, fling and overshoot pop, the timeline fill, 30 sparkler streaks with a pulsing glow, and the marquee. Hover adds lifts, a sliding arrow and scaling. The brand book says "Colour change only, 150ms ease. No movement, no growing shadows."

**4. Copy anyone could have written (Must).** Worst in About, deck cards one and four, and two FAQ answers. Rewrites in section 4.

**5. Eyebrows and arrows (Should).** "About Jesse" and "Lender Partners" add nothing; an italic eyebrow is still an eyebrow. "→" sits on 16 links and buttons.

**6. Same weight everywhere (Should).** 13 bands in 6 colours, nearly all `py-16 lg:py-20`, mixed H2 weights, item titles switching between Jakarta bold and Newsreader.

**7. Grain over everything (Could).** layout.tsx fixes a 6% noise layer over photos, white paper and the Sherwood logo.

## 3. Keep exactly as is

The arch headshot, the type pair, the palette, the sky deep reviews band, and "Every door, walked through together." on the clay band. The help list's square hairline rows (the model for the rest). The story form's fill-in-the-blanks sentence, the most human thing on the site. The six-step timeline. Jesse's lines: "Often yes, sometimes no.", "Already own, want to change something", the four question links, "See available times".

## 4. Recommendations

### Shape and radius spec

| Shape | Where | Why |
|---|---|---|
| 0 | Bands, ruled rows (situations, broker reasons, FAQ, services, blog list), dividers | Rows and bands are structure, not objects |
| 2px | Paper (plan sheet, review notes, form panels, inputs, Sherwood plate) and photos | Reads as paper and prints: crisp, not harsh |
| 4px | Every button, nav and sticky bar included | Firm, calm, clearly an action |
| Arch | Jesse's portrait and the P4 mark only: `999px 999px 0 0`, square base, on a 1px espresso threshold | The door means Jesse |
| Circle | Timeline markers, a face (P.S. avatar) | Markers on a line and faces are round in life |
| Pill | Program tags inside the plan sheet only, as on the approved LP | "Okay in some places": one deliberate place |

The hero's ghost pill becomes an underlined "Start the conversation" link beside the phone number. Modals go from 24px to 4px. The sticky bar (other pages) drops Tailwind's default grey border #E5E7EB, its shadow and `active:scale-95`.

### Patterns to cut, with replacements

| Cut | Replace with |
|---|---|
| Swipe deck, hand, dots, arrows, numbers, illustrations | Four ruled rows, all visible: Newsreader title left, one or two sentences right |
| Lender marquee | One line in step 4: "I compare 50+ lenders, including some you can only reach through a broker." |
| Google-widget reviews | 2px paper notes: small stars, one whole verbatim sentence in Newsreader (the LP's highlights), name, "Read the full review on Google". CLAUDE.md asks for openings today, so Jesse decides |
| Situation tiles and pill links | One ruled index in the visitor's voice, adding "I'm self-employed." |
| FAQ discs | The LP's static FaqList |
| Sparkler, glow, pops, lifts, scales, marquee | One moment (rule 8) |
| "→" and icons in buttons, eyebrows | Underlined links, plain labels, captions that carry information |
| Global grain | Grain on linen and clay only, or none |

### Copy rewrites

| Current | Rewrite |
|---|---|
| Card titles | "I'm starting to think about buying." / "I'm ready to look at homes." / "I'm self-employed." / "My renewal is coming up." / "I own a home and want to change something." |
| "Understand what you qualify for, the first-time buyer programs…" | "Before you start looking, you'll know what you qualify for and how much cash closing day takes." |
| "Get a clear buying roadmap… can go a long way here…" | "I get you pre-approved, which holds a rate for up to 60 days while you shop." |
| New self-employed row | "Lenders read self-employed income differently, and some are much better at it than others. I'll tell you honestly where you stand before asking for a single document." |
| "…find ways to improve your position." | "Start about 120 days out. That's when lenders will hold a rate, and you still have time to compare." |
| "Refinancing, using your equity or rolling debt…" | "Thinking about using your equity or rolling other debt into your mortgage? I'll show you what it costs before you decide." |
| "A personalized experience… transparent, strategic and understanding… empower you" | "One person, start to finish." "You deal with me from the first call to closing day, and I pick up the phone. I explain each step before you sign anything." |
| "…the lenders we apply to…" | "I pull your credit once, and only with your OK. That one check goes to the lenders I apply to, so you don't get a new one at every bank." |
| "…getting you the best deal and delivering results." | "Lenders compete for files that come through brokers, which gives me room to push on rate and terms. I'm building my business on referrals, so I need you to be glad you called." |
| "…more optionality and a higher likelihood…" | "Your bank can only offer its own mortgages. I compare 50+ lenders and tell you which fits, including when your bank's offer is the right one." |
| About paragraph one | The LP's approved 2021 story, word for word |
| About paragraph two ("What I noticed:… That felt wrong to me.") | "Before mortgages, I spent a decade in tech. I let good systems handle the busywork, so more of my time goes to you." |
| "How it works" | "Six steps, the same for every client." |
| Step 1 ("…path forward…") | "I listen first, to your income, savings, timeline and what you want. By the end, you'll have a rough idea of where you stand." |
| Step 2 | "I send a short list for your situation. For most salaried buyers, it starts with two years of T4s and Notices of Assessment, a recent paystub and two pieces of ID." |
| Step 3 ("personalized… customized") | "I write up your Mortgage Roadmap with the math shown: what you qualify for, your cash for closing day and the programs you can use. Then I walk you through it." |
| Step 4 ("…informed decision") | "When you're ready to shop, I compare 50+ lenders and get you pre-approved. Your credit is only pulled with your OK." |
| Step 5 ("manage the lender relationship") | "Once your offer is accepted, I get the final approval and send you each condition as a short list. Your realtor and lawyer hear from me too, so nobody has to chase." |
| Renewal FAQ: "Starting early is not about… It is about…" | Cut both sentences. End at "almost no time to compare." |
| Rate-hold FAQ: "You always get the better rate… best available number." | Open with "Usually, you get the lower one." Cut the closer. |
| Self-employed FAQ ("a substantial amount of value") | The LP's approved answer |
| "…I would be truly happy to assist any way I can." | "Send me a note about where you're at, even if buying is a year or two away. I'll reply personally. Or call or text me at 416-276-2666." |

Leave alone: "Confident mortgage decisions start here." and the hero subline (Jesse's, though the subline leans on an "-ing" phrase), "My job is to get you from the starting point to keys in hand.", and "Every door, walked through together." (a tagline ending, fine as his sign-off if it appears once).

### Design language: ten rules

1. **The arch is Jesse.** Semicircle top, square base, on a 1px espresso threshold. Only his portrait and the P4 mark.
2. **Paper for what Jesse writes you.** White, 2px corners, a 1px #E3D9CD edge, no shadow. One sheet per page, the sample plan, may lie on the desk (the LP's sand under-sheet, -1deg on desktop, `0 24px 60px -28px rgba(53,43,38,.45)`): the page's only shadow and rotation.
3. **Real artefacts, never illustrations.** The sample Mortgage Roadmap with the LP's $600,000 Toronto math ($50,283 cash), his starting document list, his closing-day note, reviews as notes. If Jesse wouldn't hand it to a client, it isn't on the page.
4. **The slat ramp means progress.** Timeline markers step through the P4 tones #9DB6C3, #7F9BAA, #5C6A70, #463B36, #352B26 (espresso numerals on the first two, linen after). Keys in hand is the P4 door. Never a gradient or decoration.
5. **Lines group, boxes hold objects.** Choices, reasons, FAQs and services are ruled rows: one 1px rule, 24px+ padding, no column or double rules. Boxes only for a review, the plan or a form. Warm, not a newspaper.
6. **Type has roles.** Newsreader 400 headings on one scale (68/44/28px desktop, 40/32/24 phone), plus the visitor's voice (situation index, FAQ questions). Jakarta body 17px, 1.65 line height, 66 characters max. Italic only for captions, annotations and Jesse's signature. Tabular figures.
7. **No labels for their own sake.** No eyebrows, "→" or icons in buttons. Numbers only on a real sequence. Two button kinds: primary at 4px (espresso on light, clay on dark) and underlined links.
8. **One moment of motion.** The timeline line draws as you read and, at Keys in hand, fills the door's slats sky to espresso (5 × 90ms, once, off with reduced motion). Nothing else moves unless clicked. Hover is a colour change, 150ms.
9. **The sun is in the photos.** No gradients, glows or sparkles. Warmth comes from the plaster-wall headshot and the fall walk, full-bleed or as 2px prints with a one-line caption Jesse writes.
10. **Colour and air carry meaning.** Linen is Jesse talking, white paper is what he gives you, sky deep is clients' words, espresso is the decision, clay is the sign-off, once. About 8 bands, not 13. Paddings of 64px (lists), 96px (standard) and 144px (hero, sign-off).

## 5. Sources

No outside statistics. Evidence: the components named, globals.css, layout.tsx, styles measured on localhost:3100 (`work-slop/inventory.json`), screenshots, the brand book, the approved LP and email-insights.md.

## For the other reviewers

- UX: phones get no sticky "Schedule a call" bar. HomePage.tsx never mounts StickyMobileCTA (checked at 390px after scrolling 2,200px).
- Compliance: lender logos break the no-lender-names rule. The FAQ has absolutes ("best rate", "You always get the better rate"). The grain overlay sits on the Sherwood logo.
- Hierarchy: self-employed, a core niche, has no situation card.
