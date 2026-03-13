"use client";

import { useState } from "react";

/* ── Steps ── */
const STEPS = [
  {
    num: "01",
    title: "Intro Call",
    subtitle: "Understanding where you are starting from",
    body: "It starts with a conversation. Your situation, your timeline, what matters most to you. This is a conversation, not an interrogation. I ask the questions, you share what you know, and by the end you have a clear picture of what the path forward looks like.",
    timeline: "15 to 30 min",
    youBring: "Just your story",
    iHandle: "The questions, the options, the next step",
  },
  {
    num: "02",
    title: "Document Collection",
    subtitle: "At your pace",
    body: "I send you a clear list of exactly what I need. Nothing more. You share documents when you are ready and I let you know if anything is missing. No chasing, no confusion.",
    timeline: "1 to 3 days",
    youBring: "ID, income docs, property info",
    iHandle: "Reviewing everything and building your application",
  },
  {
    num: "03",
    title: "Your Plan",
    subtitle: "A clear picture built around your situation",
    body: "I put together a customized plan based on your income, your goals, and your timeline. Not a template. Your actual numbers. I walk you through each scenario, look at a few different options side by side, and you leave knowing exactly where you stand.",
    timeline: "30-min call",
    youBring: "Your questions",
    iHandle: "The plan, the scenarios, the plain-language explanation",
  },
  {
    num: "04",
    title: "Pre-Approval",
    subtitle: "Know your options, not just your limit",
    body: "I shop your file across 50+ lenders and come back with real options. You see multiple scenarios with different rates, terms, and structures so you can make an informed decision. Not just the first offer from one place.\n\nRate holds are locked for up to 120 days. If rates drop before your closing date, you get the lower rate. If they rise, you are protected. You cannot lose by locking in early.",
    timeline: "1 to 3 business days",
    youBring: "Nothing",
    iHandle: "Shopping your file, stress test, rate hold",
  },
  {
    num: "05",
    title: "Property Search",
    subtitle: "Available while you look",
    body: "Go find your home with confidence. I am available for quick questions on offers, condition guidance, and anything that comes up. Found something you like? Call me before you put in an offer.",
    timeline: "Your pace",
    youBring: "Property details when you find something",
    iHandle: "Fast answers and offer conditions",
  },
  {
    num: "06",
    title: "Full Approval",
    subtitle: "Rate locked. Conditions handled.",
    body: "Once you have an accepted offer, I finalize the approval and lock in your rate. I manage the lender relationship and keep you updated at every stage.",
    timeline: "3 to 5 business days",
    youBring: "Purchase agreement, updated docs",
    iHandle: "Lender, conditions list, commitment letter",
  },
  {
    num: "07",
    title: "Conditions Fulfilled",
    subtitle: "Your team, coordinated",
    body: "I connect the dots between your lawyer, realtor, and insurer to make sure everything is in place before closing. You should not have to be the one holding all the pieces together.",
    timeline: "5 to 10 days before closing",
    youBring: "Insurance details, lawyer info",
    iHandle: "Coordinating all parties",
  },
  {
    num: "08",
    title: "Funding Day",
    subtitle: "Keys in your hands",
    body: "The mortgage funds, you sign at the lawyer's office, and you get your keys. My job at this point is to make sure nothing goes wrong. It usually does not.",
    timeline: "Closing day",
    youBring: "Show up and sign",
    iHandle: "Making sure everything goes smoothly",
  },
  {
    num: "09",
    title: "Ongoing Support",
    subtitle: "The relationship does not end at closing",
    body: "I check in every year, monitor rate movements, and reach out before your renewal so you are never caught off guard. If anything changes in your life, call me. This is the part most agents skip. I do not.",
    timeline: "Ongoing",
    youBring: "Let me know when life changes",
    iHandle: "Watching the market, keeping you informed",
  },
];

/* ── Operating Principles ── */
const PRINCIPLES = [
  {
    label: "AVAILABLE WHEN IT MATTERS",
    body: "I work when you need support. During the day you can expect a fast response. Evenings and weekends I will do my best to get back to you within the hour. Mortgages do not always move on a schedule and neither do I.",
  },
  {
    label: "I DO THE UNDERWRITING WORK MYSELF",
    body: "Most agents send your file to a team and wait. I have learned underwriting, so I run the numbers myself, compare across lenders directly, and come back to you faster with fewer rounds of back and forth. That is a real difference in how long things take.",
  },
  {
    label: "HONEST EVEN WHEN IT COSTS ME",
    body: "If you can get a better deal somewhere else, I will tell you. These are some of the biggest financial decisions your family will make. You should work with whoever is actually the right fit. I would rather lose the deal and have you trust me than close something that was not right for you.",
  },
  {
    label: "TRANSPARENT FROM THE START",
    body: "Before anything is signed, you understand what you are signing. I walk through the risks, answer every question, and stay available until you feel confident. That is not just how I do business. It is how I plan to build it.",
  },
];

/* ── Reviews ── */
const REVIEWS = [
  {
    quote:
      "His industry expertise and understanding of the broader economic landscape ensured we received excellent guidance when our mortgage came due. Consistently responsive, knowledgeable, and easy to work with. We felt confident every step of the way.",
    name: "Norah Schulman",
  },
  {
    quote:
      "I always appreciated how clearly he explained important details. He communicates well, knows his stuff, and is someone I would confidently recommend.",
    name: "Yoni Rahamim",
  },
  {
    quote:
      "Consistently delivered thoughtful, high-quality guidance and handled every situation with professionalism and care. Working with him always left us in a stronger position.",
    name: "Nicole Boyle",
  },
  {
    quote: "Consistently impressed by how responsive and detail-oriented he is.",
    name: "Rafaela Khalimov",
  },
];

export default function WorkingWithJesseContent() {
  const [openStep, setOpenStep] = useState<number>(0);

  const handleBookCall = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  };

  return (
    <>
      {/* ── SECTION 1: Hero ── */}
      <section className="bg-sand">
        <div className="mx-auto max-w-3xl px-5 pt-28 pb-20 md:pt-36 md:pb-28 text-center">
          <p
            className="text-[0.6875rem] font-semibold tracking-[0.2em] uppercase text-coral mb-6"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Working with Jesse
          </p>
          <h1
            className="text-navy text-[2rem] md:text-[2.75rem] leading-[1.15] font-bold mb-6"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Here is what to expect.
          </h1>
          <p
            className="text-navy/80 text-[1.0625rem] md:text-[1.125rem] leading-relaxed max-w-2xl mx-auto mb-8"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Every situation is different. What is not different is how I approach
            them. You get a clear process, honest answers, and someone who stays
            in your corner after the mortgage closes.
          </p>
          <p
            className="text-slate text-[0.875rem] italic max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Self-employed, renewal, first purchase, complicated income. The
            process is the same. The lender selection is different. Jesse has
            worked through most situations.
          </p>
        </div>
      </section>

      {/* ── SECTION 2: 9-Step Process ── */}
      <section className="bg-navy">
        <div className="mx-auto max-w-3xl px-5 py-20 md:py-24">
          <p
            className="text-[0.6875rem] font-semibold tracking-[0.2em] uppercase text-coral mb-4 text-center"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            How It Works
          </p>
          <h2
            className="text-white text-[1.75rem] md:text-[2.25rem] font-bold text-center mb-4"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Nine steps from first call to keys in hand.
          </h2>
          <p
            className="text-sand/70 text-[1rem] md:text-[1.0625rem] text-center max-w-xl mx-auto mb-14"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Most people have never done this before. You will always know where
            you are and what comes next. No surprises.
          </p>

          <div className="space-y-3">
            {STEPS.map((step, i) => {
              const isOpen = openStep === i;
              const showCtaStrip = i === 5; // After Step 05 (index 4), before Step 06 (index 5)

              return (
                <div key={step.num}>
                  {/* CTA strip between Step 05 and 06 */}
                  {showCtaStrip && (
                    <div className="bg-coral rounded-xl py-6 px-6 md:px-8 mb-3 flex flex-col md:flex-row items-center justify-between gap-4">
                      <p
                        className="text-white text-[1rem] md:text-[1.0625rem] font-medium text-center md:text-left"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        Somewhere around step 1 or 2 and want to know where you
                        stand?
                      </p>
                      <button
                        onClick={handleBookCall}
                        className="bg-white text-coral font-semibold px-6 py-3 rounded-lg hover:bg-sand transition-colors cursor-pointer text-[0.875rem] whitespace-nowrap shrink-0"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        Book a Call
                      </button>
                    </div>
                  )}

                  {/* Step card */}
                  <div
                    className={`rounded-xl overflow-hidden transition-colors duration-200 ${
                      isOpen ? "bg-navy-2" : "bg-sand"
                    }`}
                  >
                    <button
                      onClick={() => setOpenStep(isOpen ? -1 : i)}
                      className="w-full flex items-center gap-4 px-5 md:px-6 py-5 text-left cursor-pointer"
                    >
                      <span
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-[0.8125rem] font-bold transition-colors duration-200 ${
                          isOpen
                            ? "bg-coral text-white"
                            : "bg-sand-2 text-navy/50"
                        }`}
                        style={{ fontFamily: "var(--font-spectral)" }}
                      >
                        {step.num}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-[1rem] font-bold transition-colors duration-200 ${
                            isOpen ? "text-white" : "text-navy"
                          }`}
                          style={{ fontFamily: "var(--font-spectral)" }}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`text-[0.8125rem] mt-0.5 transition-colors duration-200 ${
                            isOpen ? "text-sand/60" : "text-navy/50"
                          }`}
                          style={{ fontFamily: "var(--font-jakarta)" }}
                        >
                          {step.subtitle}
                        </p>
                      </div>
                      <svg
                        className={`w-5 h-5 shrink-0 transition-all duration-200 ${
                          isOpen
                            ? "text-coral rotate-180"
                            : "text-navy/30 rotate-0"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    <div
                      className="grid transition-all duration-300"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                      }}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 md:px-6 pb-6">
                          <div
                            className="border-t border-white/10 pt-5 mb-5"
                            aria-hidden
                          />
                          {step.body.split("\n\n").map((p, pi) => (
                            <p
                              key={pi}
                              className="text-sand/70 text-[0.9375rem] leading-relaxed mb-4"
                              style={{ fontFamily: "var(--font-jakarta)" }}
                            >
                              {p}
                            </p>
                          ))}

                          {/* Metadata row */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div>
                              <p
                                className="text-coral text-[0.6875rem] font-semibold tracking-[0.15em] uppercase mb-1"
                                style={{ fontFamily: "var(--font-jakarta)" }}
                              >
                                Timeline
                              </p>
                              <p
                                className="text-sand/80 text-[0.875rem]"
                                style={{ fontFamily: "var(--font-jakarta)" }}
                              >
                                {step.timeline}
                              </p>
                            </div>
                            <div>
                              <p
                                className="text-coral text-[0.6875rem] font-semibold tracking-[0.15em] uppercase mb-1"
                                style={{ fontFamily: "var(--font-jakarta)" }}
                              >
                                You Bring
                              </p>
                              <p
                                className="text-sand/80 text-[0.875rem]"
                                style={{ fontFamily: "var(--font-jakarta)" }}
                              >
                                {step.youBring}
                              </p>
                            </div>
                            <div>
                              <p
                                className="text-coral text-[0.6875rem] font-semibold tracking-[0.15em] uppercase mb-1"
                                style={{ fontFamily: "var(--font-jakarta)" }}
                              >
                                I Handle
                              </p>
                              <p
                                className="text-sand/80 text-[0.875rem]"
                                style={{ fontFamily: "var(--font-jakarta)" }}
                              >
                                {step.iHandle}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Renewal bridge */}
          <div className="mt-8 bg-sand rounded-xl border-l-[3px] border-coral px-6 py-5">
            <p
              className="text-navy text-[0.9375rem] leading-relaxed"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Coming up on renewal rather than buying? You are typically in and
              out of steps 1 through 4. One call, your options laid out, a
              decision made on your terms.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: How Jesse Operates ── */}
      <section className="bg-sand">
        <div className="mx-auto max-w-2xl px-5 py-20 md:py-24">
          <p
            className="text-[0.6875rem] font-semibold tracking-[0.2em] uppercase text-coral mb-4 text-center"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            How Jesse Operates
          </p>
          <h2
            className="text-navy text-[1.75rem] md:text-[2.25rem] font-bold text-center mb-3"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            A few things worth knowing upfront.
          </h2>
          <p
            className="text-navy/60 text-[1rem] text-center mb-14"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Not marketing. Just how Jesse actually works.
          </p>

          <div className="space-y-10">
            {PRINCIPLES.map((p, i) => (
              <div
                key={i}
                className="border-l-[3px] border-coral pl-6"
              >
                <p
                  className="text-coral text-[0.6875rem] font-semibold tracking-[0.15em] uppercase mb-3"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {p.label}
                </p>
                <p
                  className="text-navy/70 text-[0.9375rem] md:text-[1rem] leading-relaxed"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Reviews ── */}
      <section className="bg-sand-2">
        <div className="mx-auto max-w-4xl px-5 py-20 md:py-24">
          <p
            className="text-[0.6875rem] font-semibold tracking-[0.2em] uppercase text-coral mb-4 text-center"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            What People Say
          </p>
          <h2
            className="text-navy text-[1.75rem] md:text-[2.25rem] font-bold text-center mb-12"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            The people Jesse has worked with.
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className="bg-sand rounded-xl p-6 md:p-7"
              >
                <p
                  className="text-navy text-[0.9375rem] md:text-[1rem] leading-relaxed italic mb-5"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  &ldquo;{r.quote}&rdquo;
                </p>
                <p
                  className="text-navy/60 text-[0.8125rem] font-medium tracking-wide"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {r.name}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-right">
            <a
              href="#"
              className="text-coral text-[0.875rem] font-medium hover:underline"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              All reviews on Google &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Footer CTA ── */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-2xl px-5 py-20 md:py-24 text-center">
          <h2
            className="text-[1.75rem] md:text-[2.5rem] font-bold mb-5"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Ready to start at step one?
          </h2>
          <p
            className="text-sand/80 text-[1.0625rem] md:text-[1.125rem] mb-10"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            The first call is 15 to 30 minutes. You share your situation, Jesse
            asks the questions, and you leave with a clear picture of what is
            possible.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleBookCall}
              className="bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem]"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Book a Call
            </button>
            <a
              href="tel:4162762666"
              className="border border-white/30 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors text-[0.9375rem]"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              416-276-2666
            </a>
          </div>
          <p
            className="text-sand/50 text-[0.75rem] mt-8 max-w-md mx-auto"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            When you reach out, Jesse responds the same day. He sends a short
            note with what to expect and a time to talk.
          </p>
        </div>
      </section>
    </>
  );
}
