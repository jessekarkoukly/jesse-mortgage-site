// Concept C, "Start here": leads with a question. Visitors tap their situation and get Jesse's short answer and the
// right next step, with the topic filled in when they book. A document checklist shows the "good systems" idea
// instead of claiming it, and a short note for realtors. The phone-first one.

import type { GoogleReviews } from "@/lib/googleReviews";
import { Checklist, ConceptShell, StartHere, Timeline } from "./client";
import { QA_BANK, QUOTES, STEPS } from "./content";
import {
  Band, BankVsBroker, Body, CloseBand, ConceptJsonLd, CtaPair, Display, FooterFacts, GoogleLine, H2, HeroH1, PAD, PreviewTag,
  QuestionList, RealtorBlock, ReviewsBand, StoryBlock, TextLink, Wrap,
} from "./ui";

export default function ConceptC({ google }: { google: GoogleReviews }) {
  return (
    <ConceptShell hideWhen={["hero-cta", "close-cta"]} beforeFooter={<FooterFacts />}>
      <ConceptJsonLd />

      {/* 1. Hero: a real person, and a question to start with */}
      <Band tone="linen" className="pt-[100px] sm:pt-[120px] lg:pt-[144px] pb-16 lg:pb-24">
        <Wrap className="grid gap-10 lg:grid-cols-2 lg:gap-14 items-start">
          <div className="flex flex-col gap-5 sm:gap-6 lg:pt-4">
            <Display>A real person behind your mortgage.</Display>
            <HeroH1>I’m Jesse Karkoukly, a Toronto mortgage agent with Sherwood Mortgage Group, for first-time buyers and self-employed borrowers.</HeroH1>
            <Body>You deal with me from the first call to closing day, and I pick up the phone.</Body>
            <GoogleLine google={google} />
            <CtaPair id="hero-cta" />
          </div>
          <StartHere headingId="start-h" />
        </Wrap>
      </Band>

      {/* 2. Proof */}
      <ReviewsBand google={google} quotes={[QUOTES.guzziCorner, QUOTES.marshello, QUOTES.syed, QUOTES.paola]} />

      {/* 3. What will I need? Three taps, then a starting list */}
      <Band tone="white" labelledBy="docs-h" className={PAD}>
        <Wrap className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 max-w-2xl">
            <H2 id="docs-h">What will I need?</H2>
            <Body>Paperwork is one of the first things people ask me about. Answer three quick questions and you’ll see where to start.</Body>
          </div>
          <Checklist />
        </Wrap>
      </Band>

      {/* 4. His story, with the arch portrait */}
      <StoryBlock photo="arch" />

      {/* 5. How it works, with Jesse's sparkler on the keys */}
      <Band tone="sand" labelledBy="how-h" className={PAD}>
        <Wrap className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 items-start">
          <div className="flex flex-col gap-5">
            <H2 id="how-h">How it works</H2>
            <Body>The same six steps for every client, from the first call to the day you get your keys.</Body>
            <TextLink href="/working-with-jesse">See every step in detail</TextLink>
          </div>
          <Timeline steps={STEPS} keys="sparkler" />
        </Wrap>
      </Band>

      {/* 6. Broker vs bank */}
      <BankVsBroker />

      {/* 7. Questions, answer first */}
      <QuestionList tone="linen" items={[QA_BANK.cost, QA_BANK.rate, QA_BANK.afford, QA_BANK.programs, QA_BANK.closing, QA_BANK.reachOut]} />

      {/* 8. For realtors */}
      <RealtorBlock quote={QUOTES.ephy} />

      {/* 9. One ending */}
      <CloseBand tone="espresso" />

      <PreviewTag letter="C" name="Start here" />
    </ConceptShell>
  );
}
