// Copy and data for the homepage concepts (/preview/home/*), October 2026.
// Built from the seven expert reviews of the homepage. Jesse's own lines are kept word for word where they exist:
// his 2021 story and promises (approved landing page), his FAQ answers, his brand book statements and his email lines.

import { REVIEWS, type Review } from "@/data/landing/fthb";

/** The brand descriptor. Use it word for word: consistency is what search and AI learn (brand book). */
export const DESCRIPTOR =
  "Jesse Karkoukly is a Toronto mortgage agent with Sherwood Mortgage Group who helps first-time buyers and self-employed borrowers make confident mortgage decisions.";

export const PHONE = { display: "416-276-2666", tel: "tel:4162762666" };
export const ADDRESS = "390 Dupont St, Suite 201, Toronto, ON M5R 1V9";

const review = (name: string): Review => {
  const r = REVIEWS.find((x) => x.name === name);
  if (!r) throw new Error(`Missing review: ${name}`);
  return r;
};

/** One sentence (or two in a row) from a Google review, copied exactly from the review's full text. */
export type Quote = { review: Review; text: string; tag?: string };

export const QUOTES = {
  guzziCorner: { review: review("Daniella Guzzi"), text: "We felt completely confident having Jesse in our corner and couldn’t be happier with the outcome." },
  guzziCalm: { review: review("Daniella Guzzi"), text: "He made what could have been a stressful and complicated process feel straightforward and manageable." },
  marshello: { review: review("Rebecca Marshello"), text: "He is so knowledgeable and kept me updated every step of the way." },
  syed: { review: review("Syed Aklakur Rahman"), text: "His advice and assistance made a very stressful and complicated process much easier for us." },
  syedBank: {
    review: review("Syed Aklakur Rahman"),
    text: "At that point, we had almost lost hope of purchasing our first home. We were then referred to Jesse, and that completely changed our experience.",
    tag: "First-time buyer, self-employed",
  },
  goldhar: { review: review("Daniel Goldhar"), text: "He helped me with mine and I couldn’t have picked a better guy who really cares." },
  paola: { review: review("Paola Santiago"), text: "He was knowledgeable, patient, and gave me confidence about the next steps." },
  ephy: { review: review("Ephy Bookbinder"), text: "Within roughly 24 to 48 hours of getting involved, he had secured the financing my clients needed and put the deal firmly back on track." },
  ephyCalm: { review: review("Ephy Bookbinder"), text: "What impressed me most was how calm and responsive he remained throughout." },
  sparsh: { review: review("Sparsh Sethi"), text: "Amazing to work with, not only does he walk you through the process but also hold your hand through every stage." },
  david: { review: review("David Stern"), text: "He went above and beyond the role of mortgage advisor, painting a thorough picture of the housing market and giving me honest advice that you wouldn't expect from most brokers." },
} satisfies Record<string, Quote>;

/** Jesse's 2021 story, word for word from the approved first-time buyer page. */
export const STORY = [
  "In 2021, my wife and I bought a home for the first time. Like most first-time buyers, the first stop was the bank.",
  "It was a blur. The process moved fast, the language was foreign, and I signed off on decisions I didn’t fully understand.",
  "Those decisions cost my family thousands of dollars.",
  "So that’s how I work now. Every number explained before you sign anything. Skip the banker talk.",
];

/** His vision line (brand book) and the connector habit ("Need a window cleaner? I'll find you one."). */
export const TECH_LINE = "Before mortgages, I spent a decade in tech and sales. I let good systems handle the busywork, so I have more time for people and getting a mortgage feels calm.";
export const ANNEX_LINE = "I live in the Annex, and I’m building my business on referrals. Do good, and good comes back.";
export const CONNECTOR_LINE = "Need a lawyer, an inspector, a realtor or even a window cleaner? Ask, and I’ll find you one.";
/** Jesse's own email lines. */
export const CLOSE_LINE = "I know it can be an overwhelming and stressful process, but I’m genuinely here to help any way I can. Call or text if you have any questions.";

export const CREDENTIALS = [
  { k: "Mortgage Agent", v: "Lic. M25003068" },
  { k: "Sherwood Mortgage Group", v: "Brokerage Lic. 12176" },
  { k: "50+ lenders", v: "compared for you" },
  { k: "A decade in tech", v: "before mortgages" },
];

/** The six steps. Jesse's titles; his step text with light edits (no triplets, no promises), Keys in hand word for word. */
export const STEPS = [
  { title: "Intro call", text: "You tell me where you’re at and what you’re hoping for. I ask the questions, and by the end you’ll have a rough idea of where you stand." },
  { title: "List of documents needed", text: "I send you a clear list of exactly what I need. You share documents when you’re ready, and I let you know if anything is missing." },
  { title: "Personalized roadmap", text: "I put together a plan based on your income, your goals and your timeline, with the math shown. Then I walk you through a few options side by side." },
  { title: "Pre-approval", text: "When you’re ready to shop, I compare 50+ lenders and come back with real options. Your credit is only pulled with your OK." },
  { title: "Mortgage commitment", text: "Once you have an accepted offer, I finalize the approval and lock in your rate. I manage the lender relationship and keep you updated at every stage." },
  { title: "Keys in hand", text: "My job is to get you from the starting point to keys in hand." },
];

/** Jesse's promises, word for word from the approved first-time buyer page. */
export const PROMISES = [
  "Your credit stays untouched until you give the OK.",
  "Nothing goes to a lender without your say-so.",
  "If your bank has the best deal, I’ll tell you.",
  "If now isn’t the right time, I’ll say so, and tell you what to work on first.",
];

export const COMPARE: { label: string; bank: string; me: string; figure?: string }[] = [
  { label: "Who they work for", bank: "The bank", me: "You" },
  { label: "Lenders compared", bank: "One", figure: "50+", me: "big banks included" },
  { label: "Credit checks", bank: "A new one at each bank you try", me: "One, and only with your OK" },
  { label: "What you see", bank: "That bank’s own mortgages", me: "Options side by side, with the math shown" },
];

export const COMPARE_LEAD =
  "Your bank can show you its own mortgages. I can show you options across 50+ lenders with one credit check, and if your bank has the best deal for you, I’ll tell you.";

export type QA = { q: string; a: string; link?: { href: string; label: string } };

/** The homepage answer bank (AEO review): answer first, about 40 to 60 words, Jesse's wording kept where it exists. */
export const QA_BANK = {
  cost: {
    q: "Do I actually have to pay anything to use a mortgage broker?",
    a: "Typically, no. On most residential mortgages, the lender pays me a finder’s fee when your mortgage closes, so there is no cost to you. The only time a broker usually charges a fee is on an alternative (B lender) mortgage, and I would tell you what it costs upfront, in the first conversation.",
    link: { href: "/working-with-jesse", label: "How working with me works" },
  },
  rate: {
    q: "Can a broker actually get me a better rate than if I just go to my bank?",
    a: "Often yes, sometimes no. Through Sherwood Mortgage Group, I compare options from over 50 lenders, and lenders compete for business that comes through brokers, which gives me room to push on rate and terms. But if your bank genuinely has the best deal for your situation, I will tell you that straight up and explain why.",
  },
  afford: {
    q: "How much can I afford?",
    a: "It comes down to four things: your income, your monthly debts, your down payment and your credit. Most lenders also check that you could still make the payment at a higher rate than the one you’ll get. The calculator gives you a rough number. I can work out your real number from your documents before you fall for a home.",
    link: { href: "/calculators/affordability", label: "Affordability calculator" },
  },
  selfEmployed: {
    q: "I’m self-employed or my income is complicated. Can I still get a mortgage?",
    a: "Often, yes. Lenders treat self-employment, contract income, commission and bonuses differently, and some are significantly better than others for specific income types. Before asking for a single document, I will tell you honestly whether and how you qualify.",
    link: { href: "/services/self-employed", label: "Self-employed mortgages" },
  },
  bankNo: {
    q: "My bank said no, or approved me for less than I need. What now?",
    a: "Usually, it means your file didn’t fit that one lender’s rules. Each lender reads income, credit and down payment differently, so I look at where your file fits best and what would change the answer. Sometimes that’s another lender. Sometimes it’s a few months of preparation, and I’ll tell you which.",
  },
  downPayment: {
    q: "How much do I need for a down payment in Ontario?",
    a: "At least 5% of the first $500,000 and 10% of the part between $500,000 and $1.5 million. Homes priced at $1.5 million or more need 20% down. A $700,000 home needs at least $45,000. With less than 20% down, you’ll pay mortgage insurance, and first-time buyers can choose a 30-year amortization.",
    link: { href: "/services/first-time-buyers", label: "First-time buyers" },
  },
  programs: {
    q: "What first-time buyer programs can I use in Ontario?",
    a: "The main ones are the FHSA, the Home Buyers’ Plan and the land transfer tax refunds. The FHSA lets you save up to $40,000, with a tax deduction going in and no tax coming out. The Home Buyers’ Plan lets you use up to $60,000 from your RRSP. The refunds go up to $4,000 from Ontario and $4,475 in Toronto.",
    link: { href: "/services/first-time-buyers", label: "First-time buyer programs" },
  },
  closing: {
    q: "How much are closing costs in Toronto?",
    a: "On a $600,000 Toronto home, a first-time buyer pays about $8,475 in land transfer tax after both rebates. Toronto buyers pay it twice, once to the province and once to the city. Plan for about $5,000 more in legal fees and other costs, plus tax on mortgage insurance if you put less than 20% down.",
    link: { href: "/calculators/closing-costs", label: "Closing cost calculator" },
  },
  reachOut: {
    q: "What actually happens when I reach out?",
    a: "It starts with an intro call where I learn about your situation and what you’re hoping for. Everything you share is kept confidential, and I don’t pull your credit until you give the OK. From there, I build a plan with you, from your max purchase price to pre-approval. Then I walk with you through every step to your keys.",
    link: { href: "/working-with-jesse", label: "See every step in detail" },
  },
} satisfies Record<string, QA>;

/** "The short version": plain facts an assistant can quote (GEO review). */
export const FACTS = [
  { k: "Who I am", v: DESCRIPTOR },
  { k: "Licence", v: "Mortgage Agent Level 1, Lic. M25003068. Brokerage: Sherwood Mortgage Group, Brokerage Lic. 12176." },
  { k: "Where", v: "My office is at 390 Dupont St, Suite 201, Toronto. I live in the Annex and work with clients across Ontario." },
  { k: "Lenders", v: "I compare options from 50+ lenders, big banks included. If your bank has the best deal, I’ll tell you." },
  { k: "Cost to you", v: "On most residential mortgages, the lender pays me when your mortgage closes, so there is no cost to you. If a mortgage needs a fee, you’ll know in the first conversation." },
  { k: "Your credit", v: "I don’t pull your credit or send anything to a lender without your clear OK." },
  { k: "Reach me", v: "Call or text 416-276-2666, or email jkarkoukly@sherwoodmortgagegroup.com." },
];

/** "Where are you at?": the visitor's words, then Jesse's one-line answer. */
export const SITUATIONS = [
  { says: "I’m starting to think about buying.", reply: "Before you look at homes, you’ll know what you qualify for and how much cash closing day takes.", href: "/services/first-time-buyers", link: "First-time buyers" },
  { says: "I’m self-employed.", reply: "Lenders read self-employed income differently, and some are much better at it than others. I’ll tell you honestly where you stand before asking for a single document.", href: "/services/self-employed", link: "Self-employed mortgages" },
  { says: "I’m ready to look at homes.", reply: "I get you pre-approved, which holds a rate while you shop.", href: "/services/pre-approval", link: "Pre-approval" },
  { says: "My renewal is coming up.", reply: "Start about four months before your term ends, so you have time to compare before you sign.", href: "/services/renewal", link: "Renewals" },
  { says: "I own a home and want to change something.", reply: "Thinking about using your equity or rolling other debt into your mortgage? I’ll show you what it costs before you decide.", href: "/services/refinancing", link: "Refinancing" },
];

/** Every service page, so each one has a plain link from the homepage (SEO review). */
export const SERVICES: [string, string][] = [
  ["First-time buyers", "/services/first-time-buyers"],
  ["Self-employed", "/services/self-employed"],
  ["Pre-approval", "/services/pre-approval"],
  ["Renewals", "/services/renewal"],
  ["Refinancing", "/services/refinancing"],
  ["Equity takeout", "/services/equity-takeout"],
  ["Debt consolidation", "/services/debt-consolidation"],
  ["Purchases and investment", "/services/purchases-and-investment"],
  ["Cottages and vacation homes", "/services/cottage"],
  ["Specialty programs", "/services/specialty"],
];

export const TOOLS: [string, string][] = [
  ["How much can I afford?", "/calculators/affordability"],
  ["What will my closing costs be?", "/calculators/closing-costs"],
  ["Land transfer tax", "/calculators/land-transfer-tax"],
  ["All calculators", "/calculators"],
];

// Must match HELP_OPTIONS in src/components/InquiryForm.tsx exactly (that file is a client module).
const HELP = ["Buying my first home", "Getting pre-approved", "Renewing my mortgage", "Refinancing", "I'm self-employed", "Something else"] as const;
const help = (i: number) => HELP[i];

/** The "Start here" router (concept C). `help` pre-fills "What can I help with?" in the Schedule a call form. */
export const ROUTES = [
  {
    id: "first",
    chip: "Buying my first home",
    help: help(0),
    title: "Your first home",
    body: [
      "Before you look at a single listing, I’ll work out what you can afford, the cash you’ll need on closing day and the programs you can use.",
      "Then you get it all in writing, so you can plan with real numbers.",
    ],
    href: "/services/first-time-buyers",
    link: "How I help first-time buyers",
  },
  {
    id: "self",
    chip: "I’m self-employed",
    help: help(4),
    title: "Self-employed",
    body: [
      "Self-employed doesn’t mean unqualified. Lenders read your income differently, and some are much better at it than others.",
      "Before asking for a single document, I’ll tell you honestly whether and how you qualify.",
    ],
    href: "/services/self-employed",
    link: "Self-employed mortgages",
  },
  {
    id: "no",
    chip: "My bank said no",
    help: help(5),
    context: "bank_said_no",
    title: "When the bank says no",
    body: [
      "Usually, it means your file didn’t fit that one lender’s rules. I look at where your file fits best and what would change the answer.",
      "Sometimes that’s another lender. Sometimes it’s a few months of preparation, and I’ll tell you which.",
    ],
    quote: QUOTES.syedBank,
  },
  {
    id: "renew",
    chip: "My renewal is coming up",
    help: help(2),
    title: "Your renewal",
    body: [
      "Start about four months before your term ends. That gives you time to compare options before you sign.",
      "If staying with your lender is the right call, I’ll tell you.",
    ],
    href: "/services/renewal",
    link: "Renewals",
  },
  {
    id: "own",
    chip: "I own and want to change something",
    help: help(3),
    title: "Changing your mortgage",
    body: ["Thinking about using your equity, rolling other debt into your mortgage or paying it down faster? I’ll show you what each option costs before you decide."],
    href: "/services/refinancing",
    link: "Refinancing and equity",
  },
] as const;

/** Starting document lists (concept C). Salaried: Jesse's own "Getting Started" email. Self-employed: his self-employed page. */
export const EARN_TYPES = [
  { id: "salary", label: "Salary or hourly" },
  { id: "inc", label: "Self-employed, incorporated" },
  { id: "sole", label: "Self-employed, sole proprietor" },
  { id: "contract", label: "Contract or commission" },
] as const;

export type EarnId = (typeof EARN_TYPES)[number]["id"];

const SELF_EMPLOYED_BASE = [
  "T1 General returns for the last two years",
  "Notices of Assessment for the last two years",
  "Government-issued photo ID",
  "90 days of statements for your down payment account",
  "A void cheque or direct deposit form",
];

export const DOCS: Record<EarnId, { now: string[]; later?: string[] }> = {
  salary: {
    now: ["T4s for the last two years", "Notices of Assessment for the last two years", "Your most recent paystub", "Two pieces of government ID"],
    later: ["An employment letter. I’ll need it eventually, but it can wait until you start looking at places, because it needs to be recent."],
  },
  inc: { now: [...SELF_EMPLOYED_BASE, "T2 corporate returns for the last two years", "Financial statements: income statement and balance sheet", "Articles of Incorporation"] },
  sole: { now: [...SELF_EMPLOYED_BASE, "T2125 Statement of Business Activities for the last two years", "Your business licence, if you have one"] },
  contract: { now: [...SELF_EMPLOYED_BASE, "T4A slips or contracts", "Invoicing history for the last 12 months"] },
};

export const GIFT_DOCS = ["A signed gift letter confirming the money is a gift, not a loan", "90 days of bank statements showing the gifted funds"];
export const PARTNER_NOTE = "If your partner’s income is part of the application, they’ll need the same documents for their income.";
