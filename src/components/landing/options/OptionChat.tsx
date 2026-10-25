// Option D: "Text with Jesse". The same four plan questions as a text conversation, made for people
// arriving from Facebook and Instagram on their phones. Jesse "types", reacts to answers with something
// useful, and asks for name, email and phone last.

import Image from "next/image";
import { B, serif, sans } from "@/components/home/brand";
import ChatFunnel from "@/components/landing/ChatFunnel";
import ReviewCarousel from "@/components/landing/ReviewCarousel";
import { CheckDot, FaqList, GoogleSummary, LandingFrame, PlanChecklist } from "@/components/landing/kit";
import { LandingExtras, ScrollButton, TalkFirst } from "@/components/landing/kit-client";
import { FAQ, REVIEWS } from "@/data/landing/fthb";
import type { GoogleReviews } from "@/lib/googleReviews";

const FAQ_D = [FAQ[0], FAQ[1], FAQ[3], FAQ[4]];

const PROMISES = [
  "Your credit stays untouched until you give the OK.",
  "Nothing goes to a lender without your say-so.",
  "On most residential mortgages, there is no cost to you.",
];

export default function OptionChat({ google }: { google: GoogleReviews }) {
  return (
    <LandingFrame extras={<LandingExtras sticky={{ label: "Answer 4 quick questions", target: "chat", hideWhen: ["chat"] }} />}>
      {/* 1. Hero: the conversation is the page */}
      <section className="px-4 sm:px-6 pt-5 sm:pt-10 lg:pt-14 pb-12 lg:pb-16">
        <div className="max-w-6xl mx-auto grid gap-5 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-16 items-center">
          <div className="flex flex-col gap-3 sm:gap-5 px-1 sm:px-0">
            <p className="m-0 text-[1rem] sm:text-[1.0625rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>For first-time buyers in Ontario</p>
            <h1 className="m-0 text-[1.75rem] sm:text-[3.25rem] lg:text-[3.75rem] leading-[1.08]" style={{ ...serif, fontWeight: 400, color: B.espresso, letterSpacing: "-0.5px" }}>
              Your First Home Plan, in four quick questions.
            </h1>
            <p className="m-0 hidden sm:block text-[1.25rem] leading-relaxed max-w-xl" style={{ ...sans, color: B.body }}>
              Answer right here, like a text. Then I’ll work out what you can afford, the cash you’ll need on closing day and the programs you can use, and go through it all with you.
            </p>
            <div className="hidden lg:flex flex-col gap-6 pt-2">
              <GoogleSummary google={google} />
              <ul className="m-0 p-0 list-none flex flex-col gap-3">
                {PROMISES.map((p) => (
                  <li key={p} className="flex gap-3 text-[1.0625rem]" style={{ ...sans, color: B.espresso }}><CheckDot />{p}</li>
                ))}
              </ul>
            </div>
          </div>
          <div id="chat" className="scroll-mt-20 w-full max-w-[420px] mx-auto">
            <ChatFunnel google={google} />
          </div>
        </div>
      </section>

      {/* 2. What you get */}
      <section className="bg-white px-5 sm:px-6 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          <div className="flex flex-col gap-5">
            <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>What you get</h2>
            <p className="m-0 text-[1.125rem] leading-relaxed" style={{ ...sans, color: B.body }}>
              One conversation. Then I write it all down for you, so you can come back to it, share it with your partner and plan with real numbers.
            </p>
            <ul className="m-0 p-0 list-none flex flex-col gap-3 pt-1 lg:hidden">
              {PROMISES.map((p) => (
                <li key={p} className="flex gap-3 text-[1rem]" style={{ ...sans, color: B.espresso }}><CheckDot />{p}</li>
              ))}
            </ul>
            <div className="pt-2"><ScrollButton target="chat">Start my plan</ScrollButton></div>
          </div>
          <PlanChecklist />
        </div>
      </section>

      {/* 3. Reviews, Guzzi and Marshello first */}
      <ReviewCarousel heading="In their words" reviews={REVIEWS} google={google} />

      {/* 4. Jesse */}
      <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.linen }}>
        <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-14 items-center">
          <div className="relative overflow-hidden rounded-[22px] aspect-[3/4] w-full max-w-[340px] mx-auto">
            <Image src="/blog/self-employed-dividends-mortgage/jesse-family-walk.jpg" alt="Jesse out for a walk with his baby" fill sizes="(min-width: 768px) 340px, 90vw" className="object-cover" />
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="m-0 text-[2rem] sm:text-[2.5rem] leading-[1.12]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>You should understand exactly what you are signing, and I make sure you do.</h2>
            <p className="m-0 text-[1.0625rem] leading-relaxed" style={{ ...sans, color: B.body }}>
              I’m Jesse. In 2021, my wife and I bought a home for the first time and walked straight into the bank. It was a blur, and it cost my family thousands of dollars.
            </p>
            <p className="m-0 text-[1.0625rem] leading-relaxed" style={{ ...sans, color: B.body }}>
              Now I help first-time buyers across Ontario walk in prepared. I compare 50+ lenders, and you can reach me directly by call or text, start to finish.
            </p>
            <p className="m-0 text-[0.9375rem]" style={{ ...sans, color: B.body }}>Mortgage Agent Lic. M25003068, Sherwood Mortgage Group</p>
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="bg-white px-5 sm:px-6 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <h2 className="m-0 text-[2rem] sm:text-[2.5rem] leading-[1.12]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>Before you reach out</h2>
          <FaqList items={FAQ_D} />
        </div>
      </section>

      {/* 6. Close */}
      <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.espresso }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <h2 className="m-0 text-[2.25rem] sm:text-[3rem] leading-[1.08]" style={{ ...serif, fontWeight: 400, color: B.linen }}>Four questions. About 2 minutes.</h2>
          <p className="m-0 text-[1.125rem] leading-relaxed" style={{ ...sans, color: B.onDark }}>
            Then pick a time to talk, and I’ll go through your plan with you.
          </p>
          <div><ScrollButton target="chat" dark>Start my plan</ScrollButton></div>
          <TalkFirst dark />
        </div>
      </section>
    </LandingFrame>
  );
}
