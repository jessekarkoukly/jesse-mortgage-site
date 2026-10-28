// Concept A, "In your corner": leads with Jesse. Portrait and his brand statement, client words, his real story,
// plain facts for search and AI, and one calm ending. The editorial one.

import type { GoogleReviews } from "@/lib/googleReviews";
import { ConceptShell, Timeline } from "./client";
import { QA_BANK, QUOTES, STEPS } from "./content";
import {
  ArchPortrait, Band, BankVsBroker, Body, CloseBand, ConceptJsonLd, CtaPair, Display, FooterFacts, GoogleLine, H2, HeroH1, PAD,
  PreviewTag, QuestionList, Reassure, ReviewNote, ReviewsBand, ServiceIndex, ShortVersion, StoryBlock, TextLink, Wrap,
} from "./ui";

export default function ConceptA({ google }: { google: GoogleReviews }) {
  return (
    <ConceptShell hideWhen={["hero-cta", "close-cta"]} beforeFooter={<FooterFacts />}>
      <ConceptJsonLd />

      {/* 1. Hero: his face, his statement, who he is, proof, one clear step */}
      <Band tone="linen" className="pt-[100px] sm:pt-[120px] lg:pt-[150px] pb-16 lg:pb-24">
        <Wrap className="grid gap-7 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12 items-end">
          <ArchPortrait priority className="lg:order-2" imgClass="w-[188px] h-[235px] sm:w-[280px] sm:h-[350px] lg:w-[360px] lg:h-[450px]" sizes="(min-width: 1024px) 360px, (min-width: 640px) 280px, 188px" />
          <div className="flex flex-col gap-5 sm:gap-6 lg:order-1 lg:pb-4">
            <Display>You should understand exactly what you’re signing.</Display>
            <HeroH1>I’m Jesse Karkoukly, a Toronto mortgage agent with Sherwood Mortgage Group. I help first-time buyers and self-employed borrowers make confident mortgage decisions.</HeroH1>
            <GoogleLine google={google} />
            <CtaPair id="hero-cta" />
            <Reassure />
          </div>
        </Wrap>
      </Band>

      {/* 2. Proof straight after the promise */}
      <ReviewsBand google={google} quotes={[QUOTES.guzziCorner, QUOTES.syed, QUOTES.paola, QUOTES.goldhar]} />

      {/* 3. Where are you at? in the visitor's words, and every service as a plain link */}
      <ServiceIndex />

      {/* 4. His real story */}
      <StoryBlock />

      {/* 5. Broker vs bank, every row visible */}
      <BankVsBroker />

      {/* 6. How it works, ending on the P4 door */}
      <Band tone="sand" labelledBy="how-h" className={PAD}>
        <Wrap className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 items-start">
          <div className="flex flex-col gap-5">
            <H2 id="how-h">How it works</H2>
            <Body>The same six steps for every client, from the first call to the day you get your keys.</Body>
            <div className="max-w-md pt-2"><ReviewNote q={QUOTES.marshello} /></div>
            <TextLink href="/working-with-jesse">See every step in detail</TextLink>
          </div>
          <Timeline steps={STEPS} keys="door" />
        </Wrap>
      </Band>

      {/* 7. The short version: plain facts people (and AI tools) can quote */}
      <ShortVersion />

      {/* 8. Questions, answer first */}
      <QuestionList items={[QA_BANK.cost, QA_BANK.rate, QA_BANK.selfEmployed, QA_BANK.afford, QA_BANK.bankNo, QA_BANK.downPayment, QA_BANK.reachOut]} />

      {/* 9. One ending, joined to the footer */}
      <CloseBand tone="espresso" />

      <PreviewTag letter="A" name="In your corner" />
    </ConceptShell>
  );
}
