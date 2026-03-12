"use client";

import { useState, useEffect, useRef } from "react";

/* ── FAQ ── */
const FAQ_ITEMS = [
  {
    q: "My renewal is coming up. When should I actually start?",
    a: "4 to 6 months before your renewal date. That is when lenders compete for your business and when you have the most room to negotiate with your existing lender. Inside 30 days, your options narrow significantly.",
  },
  {
    q: "Do I have to go through the whole qualification process again just to switch lenders?",
    a: "For a straight switch at renewal, no. Since November 2024, both insured and uninsured mortgages are exempt from the stress test when you switch lenders without increasing the balance or extending the amortization. If you are changing terms, increasing the amount, or extending the amortization, you will need to re-qualify. Jesse tells you upfront which category you are in.",
  },
  {
    q: "What if I just want to stay with my bank? Is there still a reason to call you?",
    a: "Completely reasonable. Jesse can tell you whether their offer is fair before you sign back. If it is, sign it. If it is not, you now have a number to negotiate with. Either way you are better off knowing.",
  },
  {
    q: "I already have a mortgage. Can a broker actually help with a renewal?",
    a: "Renewal is one of the most common reasons people work with a broker. There is no cost to you. The broker is paid by the lender if you switch, and charges nothing for the review if you stay. Either way you get a clear picture of where you stand.",
  },
  {
    q: "Should I go fixed or variable this time around?",
    a: "Depends on your situation, your plans for the home, and your risk tolerance. Both scenarios get run with a direct recommendation. Most people in 2026 are leaning toward shorter fixed terms, but the right answer varies.",
  },
];

/* ── Process steps ── */
const STEPS = [
  {
    num: "01",
    title: "You share what your lender sent",
    body: "Bring the renewal offer, your current rate, and how long you have left on your amortization. That is enough to start. Jesse tells you within the first call whether the number is competitive or not.",
  },
  {
    num: "02",
    title: "You get a rate hold while the market is shopped",
    body: "Jesse takes your file to 50+ lenders and locks in the best rate he finds on your behalf. A rate hold is exactly what it sounds like: that rate is held for you for up to 120 days. If rates go down before your renewal date, you get the lower rate. If they go up, you are protected at the rate that was held. You do not lose by locking it in early.",
  },
  {
    num: "03",
    title: "You decide with full information",
    body: "Sign your current offer, negotiate it using what Jesse found, or switch to a better lender. Your call. He lays out the numbers for each option and tells you what he would do and why.",
  },
];

/* ── TOC sections ── */
const TOC_SECTIONS = [
  { id: "the-problem", label: "The problem" },
  { id: "how-it-works", label: "How it works" },
  { id: "switching", label: "Switching lenders" },
  { id: "fixed-or-variable", label: "Fixed or variable" },
  { id: "faq", label: "FAQ" },
];

export default function RenewalContent() {
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [activeId, setActiveId] = useState<string>(TOC_SECTIONS[0].id);
  const sectionRefs = useRef<Map<string, IntersectionObserverEntry>>(new Map());

  const handleBookCall = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  };

  /* ── Scroll-spy ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionRefs.current.set(entry.target.id, entry);
        });
        const visible = Array.from(sectionRefs.current.values())
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    const ids = TOC_SECTIONS.map((s) => s.id);
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-3xl px-5 pt-28 pb-20 md:pt-36 md:pb-28 text-center">
          <p
            className="text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-coral mb-6"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Mortgage Renewal &middot; Toronto &middot; Ontario
          </p>
          <h1
            className="text-[2rem] md:text-[2.75rem] leading-[1.15] font-bold mb-6"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Your lender sent a renewal offer. Before you sign, find out what you
            can actually get.
          </h1>
          <p
            className="text-sand/80 text-[1.0625rem] md:text-[1.125rem] leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Most Canadians renew on auto-pilot and never know what they left on
            the table. Jesse compares your offer against 50+ lenders and tells
            you straight: sign it, negotiate it, or switch.
          </p>
          <button
            onClick={handleBookCall}
            className="bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Book a Call
          </button>

          {/* Trust chips */}
          <div className="flex flex-wrap gap-5 justify-center mt-6">
            {[
              "No cost to you",
              "50+ lenders compared",
              "Toronto and Ontario",
            ].map((chip) => (
              <span
                key={chip}
                className="flex items-center gap-2 text-[0.8125rem] font-medium text-sand"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                <span className="w-2 h-2 rounded-full bg-coral shrink-0" />
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOC + Content grid ── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[220px_1fr] gap-12">
          {/* Sticky TOC (desktop) */}
          <nav className="hidden lg:block">
            <div className="sticky top-[84px] border-r border-sand-2 pr-6">
              <p
                className="text-[0.6875rem] font-bold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                On This Page
              </p>
              <div className="flex flex-col gap-1">
                {TOC_SECTIONS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`text-[0.875rem] py-1.5 px-3 rounded transition-colors ${
                      activeId === item.id
                        ? "text-coral font-semibold bg-coral/5 border-l-2 border-coral"
                        : "text-navy-2 hover:text-coral border-l-2 border-transparent"
                    }`}
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </nav>

          {/* Main content */}
          <div className="max-w-3xl">
            {/* ── The Problem ── */}
            <div id="the-problem" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
              <p
                className="text-navy text-[1.0625rem] md:text-[1.125rem] leading-relaxed mb-6"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                1.15 million Canadian mortgages are renewing in 2026. Most lenders
                send a renewal offer 21 days before the deadline. They know that the
                shorter the window, the less likely you are to shop around. That is
                not a coincidence.
              </p>
              <p
                className="text-navy text-[1.0625rem] md:text-[1.125rem] leading-relaxed"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Renewal is one of the only moments in your mortgage where you have
                real leverage. You can stay, negotiate, or leave. Jesse&rsquo;s job
                is to make sure you know which of those three is actually the right
                move for your situation, before you sign anything.
              </p>
            </div>

            {/* ── How It Works ── */}
            <div id="how-it-works" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
              <h2
                className="text-navy text-[1.75rem] md:text-[2.25rem] font-bold text-center mb-14"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Here is what actually happens when you reach out
              </h2>

              <div className="grid md:grid-cols-3 gap-8 md:gap-10">
                {STEPS.map((step) => (
                  <div key={step.num}>
                    <span
                      className="block text-coral text-[2.5rem] font-bold mb-3"
                      style={{ fontFamily: "var(--font-spectral)" }}
                    >
                      {step.num}
                    </span>
                    <h3
                      className="text-navy text-[1.125rem] font-bold mb-3"
                      style={{ fontFamily: "var(--font-spectral)" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-navy-2 text-[0.9375rem] leading-relaxed"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mid-page CTA strip */}
              <div className="mt-16 bg-coral rounded-xl py-10 px-6 text-center">
                <p
                  className="text-white text-[1.25rem] md:text-[1.5rem] font-bold mb-5"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  See what your options actually look like.
                </p>
                <button
                  onClick={handleBookCall}
                  className="bg-white text-coral font-semibold px-8 py-3.5 rounded-lg hover:bg-sand transition-colors cursor-pointer text-[0.9375rem]"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Explore Renewal Options
                </button>
              </div>
            </div>

            {/* ── Switching Lenders ── */}
            <div id="switching" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
              <h2
                className="text-navy text-[1.75rem] md:text-[2.25rem] font-bold mb-8"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                If switching lenders sounds like a hassle, here is what it actually
                involves
              </h2>
              <p
                className="text-navy text-[1.0625rem] md:text-[1.125rem] leading-relaxed mb-6"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Switching lenders at renewal is simpler than most people expect. For
                insured mortgages, there is no stress test re-qualification. Jesse
                coordinates with your new lender, your lawyer receives a standard
                assignment, and the transition happens at your renewal date. You do
                not move. You do not reapply from scratch. You get a better rate.
              </p>
              <p
                className="text-navy text-[1.0625rem] md:text-[1.125rem] leading-relaxed"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                The main scenario where switching gets more complex: if your mortgage
                is uninsured and you are extending your amortization, or if there is
                a HELOC in second position behind your mortgage. He flags these
                upfront so there are no surprises.
              </p>
            </div>

            {/* ── Fixed or Variable ── */}
            <div id="fixed-or-variable" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
              <h2
                className="text-navy text-[1.75rem] md:text-[2.25rem] font-bold mb-8"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Fixed or variable? And how long a term?
              </h2>
              <p
                className="text-navy-2 text-[1.0625rem] md:text-[1.125rem] leading-relaxed mb-6"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Fixed gives you a locked payment for the term. Variable tracks
                prime, moves up or down with Bank of Canada decisions, and comes
                with a lighter penalty if you need to break early.
              </p>
              <p
                className="text-navy-2 text-[1.0625rem] md:text-[1.125rem] leading-relaxed mb-6"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                In 2025 and 2026 most borrowers have been choosing shorter fixed
                terms, 2 or 3 years rather than 5, to preserve the option to
                renegotiate sooner. That is a reasonable position. It is not the
                right position for everyone.
              </p>
              <p
                className="text-navy-2 text-[1.0625rem] md:text-[1.125rem] leading-relaxed"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Jesse looks at your income, your plans for the home, and your
                tolerance for payment variability before making a recommendation.
                There is no single right answer, but there is usually a clearly
                better one for your specific situation.
              </p>
            </div>

            {/* ── FAQ ── */}
            <div id="faq" className="scroll-mt-24">
              <h2
                className="text-navy text-[1.75rem] md:text-[2.25rem] font-bold text-center mb-12"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Frequently asked questions
              </h2>

              <div className="space-y-3">
                {FAQ_ITEMS.map((item, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={i}
                      className="bg-sand rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? -1 : i)}
                        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                      >
                        <span
                          className="text-navy font-semibold text-[0.9375rem] pr-4"
                          style={{ fontFamily: "var(--font-jakarta)" }}
                        >
                          {item.q}
                        </span>
                        <svg
                          className={`w-5 h-5 text-coral shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
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
                        className="grid transition-all duration-200"
                        style={{
                          gridTemplateRows: isOpen ? "1fr" : "0fr",
                        }}
                      >
                        <div className="overflow-hidden">
                          <p
                            className="px-6 pb-5 text-navy/70 text-[0.9375rem] leading-relaxed"
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          >
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timing Strip (full-bleed, outside the grid) ── */}
      <section className="bg-coral">
        <div className="mx-auto max-w-3xl px-5 py-16 md:py-20 text-center">
          <h2
            className="text-white text-[1.75rem] md:text-[2.5rem] font-bold mb-4"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Already received your letter? Do not sign yet.
          </h2>
          <p
            className="text-white/90 text-[1.0625rem] md:text-[1.125rem] mb-8"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            It takes one call to find out if it is the best you can get.
          </p>
          <button
            onClick={handleBookCall}
            className="bg-white text-coral font-semibold px-8 py-3.5 rounded-lg hover:bg-sand transition-colors cursor-pointer text-[0.9375rem]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Book a Call
          </button>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-2xl px-5 py-20 md:py-24 text-center">
          <h2
            className="text-[1.75rem] md:text-[2.5rem] font-bold mb-5"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Your renewal is worth a conversation.
          </h2>
          <p
            className="text-sand/80 text-[1.0625rem] md:text-[1.125rem] mb-10"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Jesse reviews your offer, shops the market, and gives you a straight
            answer. Free. Takes about 20 minutes.
          </p>
          <button
            onClick={handleBookCall}
            className="bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Book a Call
          </button>
        </div>
      </section>
    </>
  );
}
