# UX, UI and AI review: jessekarkoukly.com homepage

Checked on the local production build with Playwright at 390x844 and 1440x900; forms opened, never submitted. Evidence: /tmp/claude-0/-home-claude/4e15f968-fa91-5ed5-924f-e456d46cfc44/scratchpad/homepage-audit/work-ux/

## 1. Verdict

The page is warm and honest, with clean labelled forms, a visible focus ring, reduced-motion support and FAQ answers that disarm skeptics. It was laid out for a desktop reader who already knows Jesse, and on a phone the calm turns vague and long. The biggest problem: on a phone the page runs 17.5 screens with one booking button, in the hero, and no sticky bar (the homepage skips the component that adds it), so the Meta and AI-referral visitors Jesse is paying to attract lose the next step after the first scroll.

## 2. Four visitors

**(a) Engaged couple, Instagram ad, phone at night.** They need to see it's for first-time buyers, proof, and a step that isn't a commitment. They get a large photo, a general promise and two equal buttons. After one scroll: cards and links, no number or proof. Before booking: cost, credit, what the call is like. Once they decide, the only button is six screens back up.

**(b) Self-employed designer, bank said no, sent by ChatGPT.** "Self-employed" in the subline is the right signal. Her link sits under four cards, and Syed's review cuts off before the part about the bank. Before booking she needs a document list, proof nothing is pulled without consent, and somewhere to type the question an AI already framed for her. The note form has no question field and no self-employed option.

**(c) Skeptical tech worker, referred, laptop.** He skims for specifics and finds adjectives ("transparent, strategic and understanding"); the fee and "better rate" FAQs land. He has already decided, so the friction is four required fields and a grey button that won't say why.

**(d) Realtor vetting Jesse.** Needs licence, review count and proof of speed. Ephy Bookbinder's realtor review ("Within roughly 24 to 48 hours of getting involved, he had secured the financing my clients needed and put the deal firmly back on track.") isn't on the homepage, and there is no way to send Jesse a client.

## 3. Findings, ranked

**1. Must. No sticky booking bar on phones.** HomePage.tsx doesn't render PageShell, so StickyMobileCTA never mounts (p-scroll-deep.png). "Schedule a call" appears once in the body (y 655); the next contact button is almost six screens later (y 5,487) and opens the other form. Fix: a brand-styled bar from 400px, hidden while the hero or closing CTA is visible (reuse LandingExtras from the landing page): "Schedule a call" (espresso, 52px) plus "Call or text", with safe-area padding.

**2. Must. The two CTAs look like one thing twice, and the note form breaks its promise.** Equal full-width buttons. "Start the conversation" promises "I'll reply personally to find a time to talk", then lands on Calendly with "Looking forward to connecting with you." Nothing confirms the note arrived. Fix:
- Primary "Schedule a call", helper: "Pick a time that suits you. The call takes about [X] minutes." (Jesse picks one length; the site says 10, 15, 15 to 30 and 20.)
- Quiet link: "Not ready for a call? Send me a note."
- Note thank-you: "Thanks, [name]. Your note is with me and I'll reply personally. If you'd like to talk sooner, pick a time below." Calendly stays, so Matt's /thank-you conversion is unchanged (store `from: "story"`; ThankYouContent already reads it).

**3. Must. The note form can't hold a question.** "Drop me a note about ... any questions you have" opens a fill-in-the-blanks sentence with a one-line "goal" blank. No self-employed or "my bank said no" option, and "planning a home purchase" is preselected, so skippers send it unchanged. On a phone the sentence wraps into six lines (p-story-open.png) and placeholders are the only visible labels, 22px #8C7A6E on espresso, about 3.4:1 against WCAG's 4.5:1. Fix: Name, Email, "What's on your mind?" (text box, hint "A question, a number you're unsure about, or where you're at."), optional chips: Buying my first home / I'm self-employed / My bank said no / Renewal or refinance / Just exploring. Visible labels; "Hi Jesse," as the placeholder keeps the warmth.

**4. Should. Inquiry form friction.** Four required fields, phone included. The button stays grey with no reason: "test@" produced no message. GOV.UK's design system warns disabled buttons "have poor contrast and can confuse some users". Focus escapes the dialog to the nav behind it. Fix: active button, validation on submit ("Add your email so I can reach you."), focus trapped and returned on close, "What can I help with?" prefilled from the button that opened it. Consider phone optional, as in the approved landing page quiz; if required, say why: "In case a quick text is easier."

**5. Should. The phone first screen is mostly photo.** A 240x300 arch, H1, subline, two stacked buttons fill exactly one screen. No stars, cost line or consent line. Fix (design sets sizes): smaller arch, the stars line (GoogleSummary exists), the primary button with helper, the note link, and "On most mortgages there is no cost to you, and your credit stays untouched until you give the OK."

**6. Should. Patterns that hide content or stretch the scroll.**
- Broker deck: 971px for one reason; three of four hidden unless swiped, and screen readers get only the top card. Phones: four short stacked reasons, or a scroll-snap row with the next card peeking.
- Reviews: four stacked cards cut mid-sentence ("he had his hands full with…"); CLAUDE.md asks for horizontal scroll on phones. Use a scroll-snap row with the verbatim highlights already checked in src/data/landing/fthb.ts. Paola Santiago: "He made the whole process easy to understand. He was knowledgeable, patient, and gave me confidence about the next steps."
- Lender ticker: pauses on hover only, so touch users can't stop it (WCAG 2.2.2); reduced motion does stop it. Make it static, or cut it for "I compare options across 50+ lenders" (the logos are an open compliance question anyway).
- FAQ: 4.6 screens, then 2.8 screens of blog and services before any contact button. Lead with cost, self-employed, "what happens when I reach out" and down payment, then "Still have a question? Send me a note."

**7. Should. Nav.** On phones "Schedule a call" hides in the menu. "Apply" sends cold visitors to an external application, skipping the intro call and Matt's tracking. Fix: a 48px "Call" link in the phone header; Apply moves to the footer as "Client application" (Jesse confirms who it's for).

**8. Should. Small text and targets.** Card and step text is 15px, review text 14px, for an audience that skews older: 16 to 17px on phones. Under 48px: footer links (20px tall), review links (37px), "Each step in detail" and "All articles" (39px), header icons (44px), deck dots (28px wide).

**9. Could. Plain language.** Estimated Flesch-Kincaid grade (my heuristic): hero subline 14, About 9.4, self-employed FAQ 12.1, versus 4.0 for the approved landing page hero. Unbounce's finance benchmarks point to a middle-school level.

## 4. Keep exactly as is

- Inquiry form basics: visible labels, 52px fields, phone bottom sheet, autocomplete, email and tel keyboards, "See available times", the call-me fallback on error.
- The sky deep focus ring and the reduced-motion handling.
- The FAQ answers on cost and "better rate", the How it works timeline with Keys in hand, and "Every door, walked through together."

## 5. AI and smart tools: two, both hand people to Jesse

**1. "Start here" router** (replaces the cards and links). "What brings you here?" with five chips: Buying my first home / I'm self-employed / My bank said no / Renewal coming up / I own and want to change something. A tap opens two or three sentences of Jesse's copy, the service page link, and "Schedule a call" with the form prefilled; the path rides along in the lead email. Why: one thumb decision, and Jesse starts the call knowing the situation. Interact's 2026 report puts quiz start-to-lead at 40.1% on average, and the landing page quiz already posts to /api/leads. AI stays behind the scenes: optionally, a model writes a three-line brief at the top of Jesse's lead email so he replies faster; visitors never see generated text. Risks: static, Jesse-approved answers (no rates or approval language), no income questions, one Meta event per path for Matt.

**2. Document checklist builder, "What will I need?"** Three taps: how you earn (salary or hourly, self-employed incorporated, sole proprietor, commission or bonus, a mix), buying alone or together, a family gift or not. Out comes a checklist from Jesse's own "Getting Started" list (salaried: two years of T4s and Notices of Assessment, a recent paystub, two pieces of ID, the employment letter later); Jesse approves every variant. Then "Email me this list" (with the consent line) or "Send it to Jesse" (note form, list attached). Why: paperwork worry is a top pattern in his client email, 44% of first-time buyers want step-by-step guidance (Scotiabank and Harris poll), and it gives people not ready to book a first step. It shows "good systems handle the busywork" instead of claiming it. Risks: label it "A starting list. Lenders can ask for more."; no uploads, SIN or account numbers.

Not now: a public chatbot. Eligibility answers are an FSRA risk, invented answers are hard to rule out, people would type income into it, and I think AI-referred visitors come to meet the person, not another bot.

## 6. Phone-first flow

1. **Hero, one screen:** smaller arch, H1, descriptor subline, stars, "Schedule a call" with helper, note link, reassurance line. Who, for whom, proof, one step.
2. **Start here router:** sort in one tap, carry context into the form.
3. **Proof row:** three verbatim highlights (Guzzi, Marshello, Syed), count line, Google link.
4. **How it works plus "My promises"** from the landing page (credit untouched until you give the OK; nothing goes to a lender without your say-so; if your bank has the best deal, I'll tell you; if now isn't the right time, I'll say so). Takes the fear out of the call.
5. **Broker vs bank:** four short reasons and the 50+ lenders line.
6. **About Jesse and the 2021 story,** with the note link.
7. **Checklist builder:** value for people not ready to book.
8. **FAQ, reordered,** then "Still have a question? Send me a note."
9. **Realtors and partners:** one line, Ephy's review, "Send me a client".
10. **Blog (two cards on phones), Everything I help with, closing band, footer.**

Sticky bar from 400px, hidden while the hero or closing CTA is visible.

## 7. Sources

- Disabled buttons, quoting the GOV.UK Design System: https://www.tempertemper.net/blog/how-to-avoid-disabled-buttons
- WCAG 2.2 Pause, Stop, Hide: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
- WCAG 2.2 Contrast (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- WAI-ARIA modal dialog pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- From the team's conversion research file, not re-checked this session: https://tryinteract.com/blog/quiz-conversion-rate-report/ ; https://unbounce.com/industry/finance-and-insurance/ ; https://www.newswire.ca/news-releases/scotiabank-poll-trusted-advice-tops-list-of-needs-for-first-time-homebuyers-800206534.html

## For the other reviewers

- Brand and compliance: the deck says "the lenders we apply to"; "best deal" (deck) and "You always get the better rate ... the best available number" (FAQ) are absolutes; About uses the banned "one of the biggest financial decisions".
- Design: StickyMobileCTA and ScrollCTA carry pre-refresh styles (coral, rounded-lg, scale on hover); review cards use Arial and Google's colours.
