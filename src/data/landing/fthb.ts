// Shared content for the first-time buyer ad landing pages (/lp/first-time-buyers/*).
// Reviews are word for word from Jesse's Google Business Profile (all 19 checked on Google Maps, October 25, 2026).
// Highlights are exact excerpts. Never edit, extend or paraphrase a review.
// Order is Jesse's call (October 25, 2026): Daniella Guzzi first, Rebecca Marshello second, then the rest of the
// homepage reviews (Syed, Daniel Goldhar), then others. Never use Emily Ascroft or Josh G (colleague references).

export type Review = {
  name: string;
  /** Only where the review itself says it (first-time buyer, realtor, etc.). */
  tag?: string;
  /** Exact words from the review. */
  highlight: string;
  /** The full review, word for word from Google. */
  full: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Daniella Guzzi",
    highlight: "He made what could have been a stressful and complicated process feel straightforward and manageable.",
    full: "We had an excellent experience working with Jesse Karkoukly and would highly recommend him to anyone looking for a mortgage broker. Jesse was incredibly knowledgeable, responsive, and genuinely invested in helping us find the right mortgage for our needs.\n\nHe made what could have been a stressful and complicated process feel straightforward and manageable. He was always available to answer our questions, explain our options clearly, and make sure we understood everything before making any decisions. We also really appreciated how proactive Jesse was throughout the entire process — he consistently went above and beyond to make sure everything stayed on track.\n\nWe felt completely confident having Jesse in our corner and couldn’t be happier with the outcome. If you’re looking for a mortgage broker who is professional, trustworthy, and truly cares about his clients, we would absolutely recommend Jesse!",
  },
  {
    name: "Rebecca Marshello",
    tag: "First-time buyer",
    highlight: "Coming as a first time homeowner he had his hands full with having to explain in detail every step of the process and looked into every question or requirement that I sent his way.",
    full: "Jesse was and is fantastic to work with. Coming as a first time homeowner he had his hands full with having to explain in detail every step of the process and looked into every question or requirement that I sent his way. He is so knowledgeable and kept me updated every step of the way. I am very happy to have worked with him and excited to continue to work with him in the future.\n\nThank you for everything and thank you for helping us get into our first home.",
  },
  {
    name: "Syed Aklakur Rahman",
    tag: "First-time buyer",
    highlight: "His advice and assistance made a very stressful and complicated process much easier for us.",
    full: "As a first-time homebuyer, I was extremely fortunate to have Mr. Jesse guide us through the mortgage process. His advice and assistance made a very stressful and complicated process much easier for us.\n\nWe initially approached one of Canada’s major banks, where we already had our savings and accounts. However, due to the complexity of documenting the income of a self-employed applicant, we were unable to move forward with the mortgage application. At that point, we had almost lost hope of purchasing our first home.\n\nWe were then referred to Jesse, and that completely changed our experience. He identified the right lender for our situation, advised us on the necessary documentation, and organized everything in a way that made the process straightforward for both us and the lender, another major bank of Canada.\n\nJesse was proactive, responsive, and professional throughout the entire process. His guidance and attention to detail helped us secure our mortgage within a very short period of time. Without his expertise and support, I honestly don't think we would have been able to navigate the process successfully.\n\nI am sincerely grateful to Jesse for helping us achieve our dream of owning our first home. We had faith on him since the beginning and we got the result for that.",
  },
  {
    name: "Daniel Goldhar",
    highlight: "He helped me with mine and I couldn’t have picked a better guy who really cares.",
    full: "Jesse is a fabulous Mortgage Broker. He helped me with mine and I couldn’t have picked a better guy who really cares.",
  },
  {
    name: "Paola Santiago",
    tag: "Getting ready to buy",
    highlight: "He made the whole process easy to understand. He was knowledgeable, patient, and gave me confidence about the next steps.",
    full: "I met with Jesse to learn about getting ready for a mortgage, and he made the whole process easy to understand. He was knowledgeable, patient, and gave me confidence about the next steps.",
  },
  {
    name: "Sparsh Sethi",
    highlight: "Amazing to work with, not only does he walk you through the process but also hold your hand through every stage.",
    full: "Amazing to work with, not only does he walk you through the process but also hold your hand through every stage. Truly a standout mortgage agent and makes the process incredibly smooth",
  },
  {
    name: "David Stern",
    highlight: "He went above and beyond the role of mortgage advisor, painting a thorough picture of the housing market and giving me honest advice that you wouldn't expect from most brokers.",
    full: "Jesse was a pleasure to work with. He went above and beyond the role of mortgage advisor, painting a thorough picture of the housing market and giving me honest advice that you wouldn't expect from most brokers. Highly recommend for anyone looking to make an intelligent home buying decision",
  },
  {
    name: "Ephy Bookbinder",
    tag: "Realtor, for first-time buyer clients",
    highlight: "Within roughly 24 to 48 hours of getting involved, he had secured the financing my clients needed and put the deal firmly back on track.",
    full: "I recently had the opportunity to work with Jesse on a deal involving my first-time home buyer clients, and I can genuinely say he was instrumental in getting the deal across the finish line.\n\nMy clients had been working directly with their bank, but as we got further into the transaction, some financing issues came up and suddenly we were in a very difficult spot with time running out. That’s when we reached out to Jesse.\n\nEven though he was brought in at the last minute, he immediately jumped in, got himself fully up to speed, reviewed everything thoroughly, and started working on a solution right away.\n\nWhat impressed me most was how calm and responsive he remained throughout. There was a lot of stress, understandably, but Jesse was clear, steady, and solutions focused. We even went ahead and arranged an extension on the financing condition to create some breathing room, but Jesse worked so quickly that we didn’t even need the extra time.\n\nWithin roughly 24 to 48 hours of getting involved, he had secured the financing my clients needed and put the deal firmly back on track. As an Realtor, moments like this really show you the value of having the right professionals around you.\n\nI’m extremely grateful for the effort he put in and would absolutely recommend Jesse to any buyer or real estate professional looking for a mortgage agent who is knowledgeable, responsive, and willing to step up when it matters most.",
  },
  {
    name: "R.S. Konjek",
    highlight: "I found Jesse via google search and he was fast and friendly to work with.",
    full: "I found Jesse via google search and he was fast and friendly to work with. He pointed me in the right direction and my situation was resolved quickly. Greatly appreciated, highly recommended!",
  },
];

/** Short, whole sentences for proof strips. Guzzi, then Marshello, then Syed. */
export const QUICK_PROOF = [
  { text: "He made what could have been a stressful and complicated process feel straightforward and manageable.", name: "Daniella Guzzi" },
  { text: "He is so knowledgeable and kept me updated every step of the way.", name: "Rebecca Marshello, first-time buyer" },
  { text: "His advice and assistance made a very stressful and complicated process much easier for us.", name: "Syed Aklakur Rahman, first-time buyer" },
];

/** What goes into the plan Jesse writes after the first call (the breakdown he already sends clients). */
export const PLAN = [
  { title: "Your number", body: "The price range you qualify for, based on your income, down payment, debts and credit." },
  { title: "Your monthly payment", body: "A few options side by side, so you can pick what feels comfortable." },
  { title: "Your cash for closing day", body: "Down payment, land transfer tax after rebates, legal fees and the rest, worked out for your price." },
  { title: "Your programs", body: "FHSA, Home Buyers’ Plan and land transfer tax refunds. Which ones you can use, and how to stack them." },
  { title: "Your next steps", body: "What to do now, and when pre-approval makes sense." },
];

/** The questions first-time buyers send Jesse, in their words (from his inbox). */
export const QUESTIONS = [
  "Can I actually afford a home right now?",
  "How much do I really need saved?",
  "What will closing day cost me?",
  "Which first-time buyer programs can I use?",
  "My bank approved me for less than I need. Now what?",
  "I’m self-employed. Will a lender work with me?",
];

export const PROGRAMS = [
  { n: "$40,000", t: "First Home Savings Account", b: "Save for your down payment. Contributions lower your taxes, and the money comes out tax-free when you buy." },
  { n: "$60,000", t: "Home Buyers’ Plan", b: "Use your RRSP savings toward your down payment and pay yourself back over 15 years." },
  { n: "$8,475", t: "Land transfer tax rebates", b: "The most a first-time buyer can get back on a Toronto home: $4,000 from Ontario plus $4,475 from the city." },
];

export const FAQ = [
  { q: "Does this cost me anything?", a: "Typically, no. On most residential mortgages, the lender pays me a finder’s fee when your mortgage closes, so there is no cost to you. If a mortgage ever needs a fee, like some alternative lender mortgages, you’ll know upfront, in the first conversation." },
  { q: "Will you check my credit?", a: "Not to start. Your first call and your plan don’t need a credit check. I only pull credit or send anything to a lender with your clear OK." },
  { q: "I’m not buying for a year. Is it too early?", a: "A year out is a great time. It gives you room to use the FHSA, pay down the right debts and know your number before you fall for a home." },
  { q: "My bank already pre-approved me. Why talk to you?", a: "A second opinion is worth having. I compare 50+ lenders, and your plan covers closing costs and programs, not just the mortgage. If your bank genuinely has the best deal, I’ll tell you straight up." },
  { q: "I’m self-employed. Can I still qualify?", a: "Often, yes. Lenders treat self-employed income differently, and some are much better than others for it. Before asking for a single document, I’ll tell you honestly whether and how you qualify." },
  { q: "How much do I need for a down payment?", a: "At least 5% of the first $500,000 and 10% of the part between $500,000 and $1.5 million. Homes priced at $1.5 million or more need 20% down. A $700,000 home needs at least $45,000: $25,000 on the first $500,000 and $20,000 on the next $200,000." },
];

/** The family walk photo from the homepage About section (Jesse's pick for the landing pages, October 25, 2026). */
export const FAMILY_PHOTO = { src: "/jesse-about.jpg", alt: "Jesse Karkoukly walking with his family on a Toronto street in the fall" };
/** The same photo cropped to the family (1067 by 670), for wide frames. About a third of the bytes on phones. */
export const FAMILY_WIDE = { src: "/landing/family-walk-wide.jpg", alt: FAMILY_PHOTO.alt };

export const PHONE_DISPLAY = "416-276-2666";
export const PHONE_TEL = "tel:4162762666";
export const SMS_TEL = "sms:4162762666";
