// The Ontario First-Time Buyer Playbook (2026 edition), /lp/first-time-buyers/playbook/read. Opens after the playbook signup.
// Every figure is worked out with the site's own formulas or checked against the program rules (October 2026):
// FHSA $8,000 a year, $40,000 lifetime, room only from opening, carry-forward up to $8,000 (CRA);
// HBP up to $60,000, repaid over 15 years from the second year after withdrawal (CRA);
// Ontario refund up to $4,000, Toronto rebate up to $4,475; first-time buyer tax credit up to $1,500;
// new-home GST rebate up to $50,000, full to $1M, phased out to $1.5M, agreements from May 27, 2025 (Finance Canada).

import type { ReactNode } from "react";
import { B, CALENDLY_URL, serif, sans } from "@/components/home/brand";
import PlaybookCover from "@/components/landing/PlaybookCover";
import PlanQuiz from "@/components/landing/PlanQuiz";
import PlaybookWelcome from "@/components/landing/PlaybookWelcome";
import { GoogleSummary, LandingFrame } from "@/components/landing/kit";
import { LandingExtras, TalkFirst } from "@/components/landing/kit-client";
import { PHONE_DISPLAY, PHONE_TEL } from "@/data/landing/fthb";
import type { GoogleReviews } from "@/lib/googleReviews";
import { calculateOntarioLTT, calculateTorontoMLTT, formatDollars, getCMHCInsurance, getMinDownPayment } from "@/lib/mortgageFormulas";

const CHAPTERS = [
  { id: "costs", t: "What your first home really costs" },
  { id: "programs", t: "The programs that stretch your savings" },
  { id: "pre-approval", t: "Getting pre-approved" },
  { id: "offer-to-keys", t: "From offer to keys" },
  { id: "mistakes", t: "The mistakes that cost money" },
];

// Chapter 1 worked example: $600,000 in Toronto, minimum down payment, 25-year amortization.
const PRICE = 600000;
const DOWN = getMinDownPayment(PRICE);
const ON = calculateOntarioLTT(PRICE);
const TO = calculateTorontoMLTT(PRICE);
const ON_REFUND = Math.min(ON, 4000);
const TO_REBATE = Math.min(TO, 4475);
const INS = getCMHCInsurance(PRICE, DOWN, 25);
const INS30 = getCMHCInsurance(PRICE, DOWN, 30);
const OTHER = 5000;
const CASH = DOWN + ON - ON_REFUND + TO - TO_REBATE + INS.pst + OTHER;
const CLOSING_ONLY = CASH - DOWN;
const CASH_OUTSIDE_TORONTO = CASH - (TO - TO_REBATE);

const P = ({ children }: { children: ReactNode }) => (
  <p className="m-0 text-[1.0625rem] sm:text-[1.125rem] leading-[1.75]" style={{ ...sans, color: B.bodyDark }}>{children}</p>
);
const Term = ({ children }: { children: ReactNode }) => <span className="font-semibold" style={{ color: B.espresso }}>{children}</span>;

function Chapter({ n, id, title, children }: { n: number; id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 flex flex-col gap-5 pt-12 first:pt-0">
      <div className="flex flex-col gap-1">
        <p className="m-0 text-[1rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Chapter {n}</p>
        <h2 className="m-0 text-[1.875rem] sm:text-[2.375rem] leading-[1.12]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function PlaybookContent({ google }: { google: GoogleReviews }) {
  const costRows: [string, string, boolean?][] = [
    ["Down payment", formatDollars(DOWN)],
    ["Ontario land transfer tax", formatDollars(ON)],
    ["Ontario first-time buyer refund", `−${formatDollars(ON_REFUND)}`],
    ["Toronto land transfer tax", formatDollars(TO)],
    ["Toronto first-time buyer rebate", `−${formatDollars(TO_REBATE)}`],
    ["Tax on mortgage insurance", formatDollars(INS.pst)],
    ["Legal fees and other costs, about", formatDollars(OTHER)],
    ["Cash you need on closing day", formatDollars(CASH), true],
  ];

  return (
    <LandingFrame extras={<LandingExtras />}>
      <PlaybookWelcome />

      {/* Title */}
      <section className="px-5 sm:px-6 pt-10 lg:pt-16 pb-12 lg:pb-16" style={{ background: B.linen }}>
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16 items-center">
          <div className="flex flex-col gap-4">
            <p className="m-0 text-[1.0625rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>2026 edition</p>
            <h1 className="m-0 text-[2.375rem] sm:text-[3.25rem] lg:text-[3.875rem] leading-[1.04]" style={{ ...serif, fontWeight: 400, color: B.espresso, letterSpacing: "-0.5px" }}>
              The Ontario First-Time Buyer Playbook
            </h1>
            <p className="m-0 text-[1.0625rem] sm:text-[1.1875rem]" style={{ ...sans, color: B.body }}>By Jesse Karkoukly, Mortgage Agent</p>
          </div>
          <div className="hidden lg:block pr-3"><PlaybookCover width={240} tilt={false} priority /></div>
        </div>
      </section>

      <section className="bg-white px-5 sm:px-6 py-14 lg:py-20">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-16">
          {/* Contents */}
          <nav aria-label="Chapters" className="self-start">
            <p className="m-0 mb-3 text-[1rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Contents</p>
            <ol className="m-0 p-0 list-none flex flex-col gap-1" style={sans}>
              {CHAPTERS.map((c, i) => (
                <li key={c.id}>
                  <a href={`#${c.id}`} className="flex items-center gap-3 py-2 min-h-[48px] text-[0.9375rem] leading-snug hover:text-[#4F6B7A]" style={{ color: B.espresso }}>
                    <span style={{ ...serif, color: B.skyDeep }}>{i + 1}</span>{c.t}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="max-w-[68ch] flex flex-col">
            <div className="flex flex-col gap-5 pb-12 mb-12 border-b" style={{ borderColor: B.line }}>
              <P>In 2021, my wife and I bought a home for the first time. The first stop was the bank, and it was a blur. The decisions I signed off on in that blur cost my family thousands of dollars.</P>
              <P>This is everything I wish someone had handed me first. Five short chapters. Read them in order, or jump to what you need.</P>
            </div>

            <Chapter n={1} id="costs" title="What your first home really costs">
              <P>Take a {formatDollars(PRICE)} home in Toronto, bought with the minimum down payment. Here’s every dollar of cash you need on closing day.</P>
              <table className="w-full border-collapse my-2" style={sans}>
                <caption className="sr-only">Cash needed on closing day for a {formatDollars(PRICE)} home in Toronto</caption>
                <tbody>
                  {costRows.map(([k, v, total]) => (
                    <tr key={k} className={total ? "border-t-2" : "border-b"} style={{ borderColor: total ? B.espresso : B.line }}>
                      <th scope="row" className={`text-left py-3 pr-4 text-[1rem] ${total ? "font-bold" : "font-normal"}`} style={{ color: total ? B.espresso : B.body }}>{k}</th>
                      <td className={`text-right py-3 text-[1rem] tabular-nums ${total ? "font-bold text-[1.125rem]" : "font-semibold"}`} style={{ color: B.espresso }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <P><Term>Down payment.</Term> The minimum is 5% of the first $500,000 and 10% of the part between $500,000 and $1.5 million. Here, that’s $25,000 plus $10,000. Homes priced at $1.5 million or more need 20% down.</P>
              <P><Term>Your deposit.</Term> When your offer is accepted, you usually pay a deposit within 24 hours. It counts toward your down payment, so it isn’t extra, but it needs to be ready in your account.</P>
              <P><Term>Land transfer tax.</Term> Ontario charges it on every purchase. Toronto charges its own on top, so Toronto buyers pay it twice. First-time buyers get up to $4,000 back from Ontario and up to $4,475 from Toronto.</P>
              <P><Term>Mortgage insurance.</Term> With less than 20% down, your mortgage has to be insured. Here, the premium is 4.00% of the {formatDollars(INS.mortgageAmount)} mortgage: {formatDollars(INS.premium)}. It’s added to your mortgage, so you don’t pay it upfront.</P>
              <P><Term>The tax on that insurance.</Term> Ontario charges 8% sales tax on the premium, and it can’t go on the mortgage. That’s {formatDollars(INS.pst)}, paid in cash on closing day. It catches a lot of people off guard.</P>
              <P><Term>Legal fees and other costs.</Term> About {formatDollars(OTHER)} for your lawyer, title insurance and closing adjustments, like property tax the seller already paid.</P>
              <P>Outside Toronto, there’s no city land transfer tax, so the same home needs about {formatDollars(CASH_OUTSIDE_TORONTO)}.</P>
              <P>Choosing a 30-year amortization? The insurance premium goes up to 4.20%: {formatDollars(INS30.premium)} here, with {formatDollars(INS30.pst)} in tax.</P>
            </Chapter>

            <Chapter n={2} id="programs" title="The programs that stretch your savings">
              <P><Term>First Home Savings Account (FHSA).</Term> Save up to $8,000 a year, to $40,000 in total. Your contributions lower your taxes, and the money comes out tax-free when you buy. Room only starts building once the account is open, so open one now, even if you can’t contribute yet.</P>
              <P><Term>Home Buyers’ Plan.</Term> Take up to $60,000 from your RRSP for your first home, tax-free. You pay it back over 15 years, starting the second year after you withdraw. You can use it together with your FHSA.</P>
              <P><Term>Land transfer tax refunds.</Term> Up to $4,000 from Ontario and up to $4,475 from Toronto, claimed when your lawyer registers the purchase. In Toronto, that’s up to $8,475.</P>
              <P><Term>First-time home buyers’ tax credit.</Term> A $10,000 claim on your tax return, worth up to $1,500.</P>
              <P><Term>GST rebate on new homes.</Term> Buying a newly built home? First-time buyers can get up to $50,000 of the GST back: full relief up to $1 million, reduced between $1 million and $1.5 million. The agreement has to be signed on or after May 27, 2025, and there are other rules I’ll check with you.</P>
              <P><Term>30-year amortization.</Term> First-time buyers with an insured mortgage can spread payments over 30 years instead of 25. Lower monthly payments, more interest over time.</P>
              <P><Term>Buying with a partner?</Term> FHSA and Home Buyers’ Plan limits are per person. Together, that’s up to $80,000 in FHSAs and $120,000 from RRSPs.</P>
              <P><Term>Who counts as a first-time buyer?</Term> It depends on the program. The land transfer tax refunds need you to have never owned a home anywhere in the world, while the FHSA, Home Buyers’ Plan and GST rebate look at roughly the last four years. I’ll check each one with you.</P>
            </Chapter>

            <Chapter n={3} id="pre-approval" title="Getting pre-approved">
              <P>The day you see the right home, you want your number already in hand. A pre-approval tells you how much a lender will lend you and holds a rate while you shop. Get one before you book showings.</P>
              <div className="rounded-2xl p-6 flex flex-col gap-3" style={{ background: B.linen }}>
                <p className="m-0 text-[1.0625rem] font-semibold" style={{ ...sans, color: B.espresso }}>To start, I need four things:</p>
                <ul className="m-0 pl-5 flex flex-col gap-1.5 text-[1.0625rem] leading-relaxed list-disc" style={{ ...sans, color: B.bodyDark }}>
                  <li>Your T4s from the last two years</li>
                  <li>Your Notices of Assessment from CRA for the same two years</li>
                  <li>Your most recent pay stub</li>
                  <li>Two pieces of government ID</li>
                </ul>
                <p className="m-0 text-[1rem] leading-relaxed" style={{ ...sans, color: B.body }}>Your employment letter comes later, once you’re looking at homes. It needs to be recent.</p>
              </div>
              <P><Term>Self-employed?</Term> Lenders want your last two years of T1 Generals and Notices of Assessment. The income lenders use is your net income after write-offs, which is often lower than what you would think of as your income. It’s plannable, it just needs to be talked through early.</P>
              <P><Term>Your down payment.</Term> Lenders look at 90 days of history for the account it’s in. If family is helping, they’ll sign a gift letter.</P>
              <P><Term>The stress test.</Term> Lenders check that you could still afford your payments at the higher of your rate plus 2%, or 5.25%.</P>
              <P><Term>Your credit.</Term> I only pull it with your clear OK.</P>
              <P>A pre-approval isn’t a final approval. Once you have an accepted offer, the lender reviews the home and confirms your documents.</P>
            </Chapter>

            <Chapter n={4} id="offer-to-keys" title="From offer to keys">
              <ol className="m-0 p-0 list-none flex flex-col">
                {[
                  { t: "Offer accepted", b: "Your deposit is due, usually within 24 hours. If your offer has a financing condition, you have a few business days to firm up the mortgage." },
                  { t: "Mortgage approved", b: "The lender reviews the home, sometimes with an appraisal, along with your documents. Then it issues a commitment." },
                  { t: "Conditions cleared", b: "You send the last documents, and the lender sends instructions to your lawyer." },
                  { t: "The week before closing", b: "You sign the mortgage documents with your lawyer and send the rest of your down payment and closing costs." },
                  { t: "Closing day", b: "The mortgage funds, your lawyer registers the home in your name, and you get the keys." },
                ].map((s, i, all) => (
                  <li key={s.t} className="relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 pb-7 last:pb-0">
                    {i < all.length - 1 && <span aria-hidden="true" className="absolute left-[1.0625rem] top-9 bottom-0 w-px" style={{ background: B.line }} />}
                    <span className="relative w-9 h-9 rounded-full flex items-center justify-center text-[1rem] font-semibold" style={{ ...sans, background: i === all.length - 1 ? B.skyDeep : B.linen, color: i === all.length - 1 ? B.white : B.espresso }}>{i + 1}</span>
                    <span className="flex flex-col gap-1 pt-1">
                      <span className="text-[1.125rem] font-semibold" style={{ ...sans, color: B.espresso }}>{s.t}</span>
                      <span className="text-[1.0625rem] leading-relaxed" style={{ ...sans, color: B.bodyDark }}>{s.b}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <P>Going firm, with no financing condition? Then your pre-approval and documents need to be ready before you offer. Talk to me first.</P>
            </Chapter>

            <Chapter n={5} id="mistakes" title="The mistakes that cost money">
              <ol className="m-0 p-0 list-none flex flex-col gap-5">
                {[
                  { t: "Only talking to your own bank.", b: "It can only offer its own mortgages. I compare 50+ lenders. This is the one I made in 2021." },
                  { t: "Finding the home first, then the mortgage.", b: "Financing gets rushed, and rushed is when mistakes cost money." },
                  { t: "Forgetting closing costs.", b: `On a ${formatDollars(PRICE)} Toronto home, they’re ${formatDollars(CLOSING_ONLY)} on top of the down payment.` },
                  { t: "Changing jobs or taking on new debt before closing.", b: "A new car loan or credit card can change what you qualify for. Talk to me first." },
                  { t: "Moving money without a paper trail.", b: "Lenders want to see where your down payment came from. Big deposits need an explanation." },
                  { t: "Opening your FHSA late.", b: "Room only starts building once the account is open, at $8,000 a year. Open it early, even if you can’t contribute yet." },
                ].map((m) => (
                  <li key={m.t} className="text-[1.0625rem] sm:text-[1.125rem] leading-[1.7]" style={{ ...sans, color: B.bodyDark }}>
                    <Term>{m.t}</Term> {m.b}
                  </li>
                ))}
              </ol>
            </Chapter>

            <div className="mt-14 pt-10 border-t flex flex-col gap-3" style={{ borderColor: B.line }}>
              <p className="m-0 text-[1.375rem] sm:text-[1.5rem] leading-snug" style={{ ...serif, color: B.espresso }}>
                Questions? Call or text me at <a href={PHONE_TEL} className="underline underline-offset-4 hover:text-[#4F6B7A]">{PHONE_DISPLAY}</a>.
              </p>
              <p className="m-0 text-[1.0625rem]" style={{ ...sans, color: B.body }}>
                Or <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2 hover:text-[#4F6B7A]" style={{ color: B.espresso }}>pick a time to talk</a>. The most prepared people make the best decisions.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Next step: the plan, with name and email already filled in */}
      <section className="px-5 sm:px-6 py-16 lg:py-24" style={{ background: B.espresso }}>
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col gap-5">
            <h2 className="m-0 text-[2.25rem] sm:text-[3rem] leading-[1.08]" style={{ ...serif, fontWeight: 400, color: B.linen }}>Ready for your own numbers?</h2>
            <p className="m-0 text-[1.125rem] leading-relaxed" style={{ ...sans, color: B.onDark }}>
              Four quick questions, then pick a time to talk. I’ll work out what you can afford, your cash for closing day and the programs you can use, and write it all down for you. There is no cost to you.
            </p>
            <GoogleSummary google={google} dark />
            <TalkFirst dark />
          </div>
          <div className="rounded-[22px] p-5 sm:p-7" style={{ background: "#3E332D" }}>
            <PlanQuiz id="plan-playbook" dark source="fthb_lp_playbook_plan" form="fthb_playbook_plan" />
          </div>
        </div>
      </section>
    </LandingFrame>
  );
}
