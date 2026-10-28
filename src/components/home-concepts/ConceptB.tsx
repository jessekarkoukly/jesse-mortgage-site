// Concept B, "Know your numbers": leads with what people get. The written plan with real Toronto math sits beside
// Jesse's portrait, then proof, the two niches, the plan in detail, promises, broker vs bank and a self-employed band.
// The closest to the First Home Plan page Jesse approved.

import type { GoogleReviews } from "@/lib/googleReviews";
import { B, serif, sans } from "@/components/home/brand";
import { Stars } from "@/components/landing/kit";
import { PLAN } from "@/data/landing/fthb";
import { ConceptShell, Timeline } from "./client";
import { CONNECTOR_LINE, QA_BANK, QUOTES, STEPS } from "./content";
import {
  ArchPortrait, Band, BankVsBroker, Body, CloseBand, ConceptJsonLd, CtaPair, Display, FooterFacts, GoogleLine, H2, HeroH1, NicheTiles, PAD,
  PlanSheet, PreviewTag, PromiseList, QuestionList, Reassure, ReviewsBand, SelfEmployedBand, TextLink, Wrap,
} from "./ui";

function Tick() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={B.skyDeep} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[5px]">
      <path d="M3 9.5 7 13l8-8.5" />
    </svg>
  );
}

export default function ConceptB({ google }: { google: GoogleReviews }) {
  const proof = [QUOTES.guzziCorner, QUOTES.marshello, QUOTES.paola];
  return (
    <ConceptShell hideWhen={["hero-cta", "plan-cta", "close-cta"]} beforeFooter={<FooterFacts />}>
      <ConceptJsonLd />

      {/* 1. Hero: the promise, and the plan he writes you, on the desk beside his portrait */}
      <Band tone="linen" className="pt-[100px] sm:pt-[120px] lg:pt-[140px] pb-12 lg:pb-14">
        <Wrap className="grid gap-7 lg:grid-cols-[minmax(0,13fr)_minmax(0,11fr)] lg:gap-10 items-center">
          <div className="relative flex justify-center lg:order-2 lg:h-[580px] lg:block">
            <ArchPortrait
              priority
              className="lg:absolute lg:right-4 lg:top-0"
              imgClass="w-[188px] h-[235px] sm:w-[260px] sm:h-[325px] lg:w-[320px] lg:h-[400px]"
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 260px, 188px"
            />
            <PlanSheet compact className="hidden lg:block absolute left-0 bottom-0 w-[320px] -rotate-2" />
          </div>
          <div className="flex flex-col gap-5 sm:gap-6 lg:order-1">
            <Display>Confident mortgage decisions start here.</Display>
            <HeroH1>Mortgage agent based in Toronto, guiding first-time buyers and self-employed borrowers across Ontario.</HeroH1>
            <Body>I’m Jesse Karkoukly. In one call, I’ll work out what you can afford and the cash you’ll need. Then you get it all in writing.</Body>
            <GoogleLine google={google} />
            <CtaPair id="hero-cta" />
            <Reassure />
          </div>
        </Wrap>
      </Band>

      {/* 2. Three client sentences, right under the promise */}
      <Band tone="linen" label="What clients say on Google" className="pb-16 lg:pb-24">
        <Wrap>
          <ul className="m-0 p-0 list-none grid md:grid-cols-3 border-t" style={{ borderColor: B.espresso }}>
            {proof.map((q, i) => (
              <li key={q.text} className={`py-6 md:py-7 flex flex-col gap-3 ${i > 0 ? "border-t md:border-t-0 md:border-l md:pl-8" : ""} ${i < proof.length - 1 ? "md:pr-8" : ""}`} style={{ borderColor: "#D9CCBF" }}>
                <span role="img" aria-label="5 out of 5 stars"><Stars size={14} /></span>
                <span className="text-[1.1875rem] leading-[1.4]" style={{ ...serif, color: B.espresso }}>“{q.text}”</span>
                <span className="text-[0.875rem]" style={{ ...sans, color: B.body }}>{q.review.name}{q.review.tag ? `, ${q.review.tag.toLowerCase()}` : ""}</span>
              </li>
            ))}
          </ul>
        </Wrap>
      </Band>

      {/* 3. The two niches first, then everything else */}
      <NicheTiles />

      {/* 4. What people get: the plan, in writing */}
      <Band tone="linen" labelledBy="plan-h" className={`${PAD} overflow-hidden`}>
        <Wrap className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <H2 id="plan-h">Your plan, in writing.</H2>
            <Body>One conversation. Then I write it all down for you, so you can come back to it, share it with your partner and plan with real numbers.</Body>
            <ul className="m-0 p-0 list-none flex flex-col border-t" style={{ borderColor: B.line }}>
              {PLAN.map((p) => (
                <li key={p.title} className="flex gap-3 py-4 border-b" style={{ borderColor: B.line }}>
                  <Tick />
                  <span className="flex flex-col gap-0.5" style={sans}>
                    <span className="text-[1.0625rem] font-semibold" style={{ color: B.espresso }}>{p.title}</span>
                    <span className="text-[1rem] leading-[1.6]" style={{ color: B.body }}>{p.body}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Body>{CONNECTOR_LINE}</Body>
            <CtaPair id="plan-cta" />
          </div>
          <div className="relative w-full max-w-[470px] mx-auto">
            <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 lg:rotate-2 rounded-[2px]" style={{ background: B.sand }} />
            <PlanSheet className="relative lg:-rotate-1" />
            <p className="relative mt-6 text-center text-[0.9375rem]" style={{ ...serif, fontStyle: "italic", color: B.body }}>A sample. Yours is built on your own numbers.</p>
          </div>
        </Wrap>
      </Band>

      {/* 5. Proof, in their words */}
      <ReviewsBand google={google} heading="In their words" quotes={[QUOTES.sparsh, QUOTES.david, QUOTES.goldhar, QUOTES.ephy]} />

      {/* 6. How it works, with his promises beside it */}
      <Band tone="sand" labelledBy="how-h" className={PAD}>
        <Wrap className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 items-start">
          <div className="flex flex-col gap-5">
            <H2 id="how-h">How it works</H2>
            <Body>The same six steps for every client, from the first call to the day you get your keys.</Body>
            <PromiseList className="pt-3" />
            <TextLink href="/working-with-jesse">See every step in detail</TextLink>
          </div>
          <Timeline steps={STEPS} keys="sparkler" />
        </Wrap>
      </Band>

      {/* 7. Broker vs bank */}
      <BankVsBroker />

      {/* 8. The one dark band: self-employed, with Syed's words */}
      <SelfEmployedBand quote={QUOTES.syedBank} />

      {/* 9. Questions, answer first */}
      <QuestionList items={[QA_BANK.cost, QA_BANK.rate, QA_BANK.afford, QA_BANK.downPayment, QA_BANK.programs, QA_BANK.reachOut]} />

      {/* 10. The clay sign-off he has today */}
      <CloseBand tone="clay" />

      <PreviewTag letter="B" name="Know your numbers" />
    </ConceptShell>
  );
}
