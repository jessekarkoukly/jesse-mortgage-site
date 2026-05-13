"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ── Founderos-inspired palette ── */
const C = {
  bg:       "#F5F5F0",   // off-white / warm gray
  bgAlt:    "#EAEAE5",   // slightly darker off-white
  lime:     "#C8E636",   // highlighter lime accent
  limeDark: "#B5D12E",   // hover state
  black:    "#1A1A1A",   // near-black text
  gray:     "#6B6B6B",   // secondary text
  grayLt:   "#A0A0A0",   // tertiary / muted
  white:    "#FFFFFF",
  border:   "#D4D4D0",
};

/* ── FAQ data (same content, new skin) ── */
const FAQS = [
  {
    q: "Do I actually have to pay anything to use a mortgage broker?",
    a: "No. The lender pays the broker when a mortgage closes, not you. That fee is built into how lenders price their mortgages and does not affect the rate you receive. You pay nothing for the advice.",
  },
  {
    q: "Can a broker actually get me a better rate than if I just go to my bank?",
    a: "Often yes, sometimes no. A broker has access to over 50 lenders including banks, credit unions, and monoline lenders your bank will never mention. In most cases, that competition produces a better rate. But if your bank genuinely has the best deal for your situation, Jesse will tell you that and explain why.",
  },
  {
    q: "What actually happens when I reach out?",
    a: "You book a call. Jesse asks about your situation, your timeline, and what you are trying to accomplish. No documents yet, just a conversation. From there, he tells you honestly where you stand, what your options look like, and what the next step is.",
  },
  {
    q: "My renewal is coming up. When should I actually start looking?",
    a: "120 days before your term ends. That is when lenders will issue rate holds and when you have real negotiating leverage. Most banks do not send renewal offers until 21 days out, which leaves almost no time to compare.",
  },
  {
    q: "My income is complicated. Can I still get approved?",
    a: "Complicated income is where a broker adds the most value. Lenders treat contract income, self-employment, commission, and bonuses differently, and some lenders are significantly better than others for specific income types.",
  },
  {
    q: "What if I lock in a rate and then rates go down?",
    a: "You always get the better rate. A rate hold locks in today's rate, but if rates drop before your closing date, the lender gives you the lower rate instead. If rates go up, you keep the original hold.",
  },
];

const SERVICES = [
  { title: "First-Time Buyers", desc: "Step-by-step guidance from pre-approval to keys." },
  { title: "Pre-Approval", desc: "Know your budget before you start looking." },
  { title: "Self-Employed", desc: "Income is complicated. Approval does not have to be." },
  { title: "Mortgage Renewal", desc: "Your bank's first offer is rarely the best one." },
  { title: "Refinancing", desc: "Access your equity or restructure your payments." },
  { title: "Debt Consolidation", desc: "Roll high-interest debt into your mortgage." },
  { title: "Cottage & Vacation", desc: "Financing for your second property." },
  { title: "Specialty Programs", desc: "Alternative and private lending solutions." },
];

export default function BrandTestPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      {/* ── NAV ── */}
      <header
        style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/preview/brand-test" className="flex flex-col leading-none select-none">
            <span
              className="text-[1.5rem] lg:text-[2.25rem] font-bold"
              style={{ fontFamily: "var(--font-spectral)", color: C.black }}
            >
              Jesse<span style={{ color: C.lime }}>.</span>
            </span>
            <span
              className="text-[0.8rem] lg:text-[1.15rem] font-normal -mt-1"
              style={{ fontFamily: "var(--font-spectral)", color: C.gray }}
            >
              Karkoukly
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-8">
            {["Services", "Rates", "Calculators", "About", "Blog"].map((label) => (
              <span
                key={label}
                className="text-[1rem] font-semibold cursor-pointer transition-colors duration-150"
                style={{ fontFamily: "var(--font-jakarta)", color: C.black }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.gray)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.black)}
              >
                {label}
              </span>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-5">
            <span
              className="text-[1rem] font-semibold"
              style={{ fontFamily: "var(--font-jakarta)", color: C.black }}
            >
              416-276-2666
            </span>
            <button
              className="font-semibold px-7 py-3 rounded-full transition-all duration-150 hover:scale-[1.03] active:scale-95 cursor-pointer text-[1rem]"
              style={{
                fontFamily: "var(--font-jakarta)",
                background: C.lime,
                color: C.black,
                border: "none",
              }}
            >
              Book a Call
            </button>
          </div>

          {/* Mobile placeholder */}
          <div className="lg:hidden flex items-center gap-3">
            <span style={{ color: C.black }} className="text-sm font-semibold">Menu</span>
          </div>
        </div>
      </header>

      <main>
        {/* ── HERO ── */}
        <section style={{ background: C.bg }} className="pt-20 lg:pt-20">
          <div className="hidden lg:grid lg:grid-cols-2 min-h-[calc(100vh-5rem)]">
            {/* Left copy */}
            <div className="flex flex-col justify-center px-12 xl:px-20 py-20">
              <p
                className="text-[0.75rem] font-bold tracking-[0.18em] uppercase mb-6"
                style={{ fontFamily: "var(--font-jakarta)", color: C.gray }}
              >
                Toronto Mortgage Agent&nbsp;&middot;&nbsp;Sherwood Mortgage Group
              </p>

              <h1
                className="text-[3rem] xl:text-[3.5rem] font-bold leading-[1.1] mb-7"
                style={{ fontFamily: "var(--font-spectral)", color: C.black }}
              >
                Getting a mortgage in Ontario?{" "}
                <span className="block">Let&rsquo;s figure out</span>
                <span className="block">where you stand<span style={{ color: C.lime }}>.</span></span>
              </h1>

              <p
                className="text-[1.1875rem] leading-relaxed mb-10 max-w-lg"
                style={{ fontFamily: "var(--font-jakarta)", color: C.gray }}
              >
                I&rsquo;m Jesse. I look at your full picture, compare options across 50+ lenders, and
                give you a clear plan in plain language.
              </p>

              <div className="flex flex-row gap-3 mb-10">
                <button
                  className="font-bold px-8 py-4 rounded-full hover:scale-[1.03] active:scale-95 transition-all duration-150 cursor-pointer text-[0.9375rem] shadow-md hover:shadow-lg"
                  style={{
                    fontFamily: "var(--font-jakarta)",
                    background: C.lime,
                    color: C.black,
                  }}
                >
                  Book a Call
                </button>
                <button
                  className="font-semibold px-6 py-3.5 rounded-full hover:scale-[1.02] active:scale-95 transition-all duration-150 text-[0.875rem]"
                  style={{
                    fontFamily: "var(--font-jakarta)",
                    border: `2px solid ${C.border}`,
                    color: C.black,
                    background: "transparent",
                  }}
                >
                  Start Application
                </button>
              </div>

              {/* Trust chips */}
              <div className="flex flex-wrap gap-5">
                {["Free to you", "50+ lenders compared", "Toronto and Ontario"].map((chip) => (
                  <span
                    key={chip}
                    className="flex items-center gap-2 text-[0.8125rem] font-semibold"
                    style={{ fontFamily: "var(--font-jakarta)", color: C.black }}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ background: C.lime }}
                      aria-hidden="true"
                    />
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Right photo */}
            <div className="relative">
              <Image
                src="/jesse-hero.jpg"
                alt="Jesse Karkoukly, Toronto Mortgage Agent"
                fill
                className="object-cover"
                style={{ objectPosition: "55% 30%" }}
                priority
              />
              <div
                className="absolute inset-y-0 left-0 w-20 pointer-events-none"
                style={{ background: `linear-gradient(to right, ${C.bg}, transparent)` }}
              />
            </div>
          </div>

          {/* Mobile hero */}
          <div className="lg:hidden">
            <div className="px-6 pt-10 pb-8">
              <p
                className="text-[0.75rem] font-bold tracking-[0.18em] uppercase mb-5"
                style={{ fontFamily: "var(--font-jakarta)", color: C.gray }}
              >
                Toronto Mortgage Agent
              </p>
              <h1
                className="text-[1.875rem] sm:text-[2.75rem] font-bold leading-[1.1] mb-5"
                style={{ fontFamily: "var(--font-spectral)", color: C.black }}
              >
                Getting a mortgage in Ontario?{" "}
                <span className="block">Let&rsquo;s figure out where you stand<span style={{ color: C.lime }}>.</span></span>
              </h1>
              <p
                className="text-[1rem] leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)", color: C.gray }}
              >
                I&rsquo;m Jesse. I look at your full picture, compare options across 50+ lenders, and
                give you a clear plan in plain language.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-7">
                <button
                  className="w-full sm:w-auto font-bold px-7 py-4 rounded-full active:scale-95 transition-all duration-150 cursor-pointer text-[0.9375rem] shadow-md text-center"
                  style={{ fontFamily: "var(--font-jakarta)", background: C.lime, color: C.black }}
                >
                  Book a Call
                </button>
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {["Free to you", "50+ lenders compared", "Toronto and Ontario"].map((chip) => (
                  <span
                    key={chip}
                    className="flex items-center gap-2 text-[0.8125rem] font-semibold"
                    style={{ fontFamily: "var(--font-jakarta)", color: C.black }}
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: C.lime }} />
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
              <Image
                src="/jesse-hero.jpg"
                alt="Jesse Karkoukly, Toronto Mortgage Agent"
                fill
                className="object-cover"
                style={{ objectPosition: "55% 38%" }}
                priority
              />
            </div>
          </div>
        </section>

        {/* ── SERVICES GRID ── */}
        <section style={{ background: C.white }} className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-[2.25rem] sm:text-[2.75rem] font-bold leading-tight mb-4"
              style={{ fontFamily: "var(--font-spectral)", color: C.black }}
            >
              How I can help<span style={{ color: C.lime }}>.</span>
            </h2>
            <p
              className="text-[1.0625rem] mb-12 max-w-xl"
              style={{ fontFamily: "var(--font-jakarta)", color: C.gray }}
            >
              Whether you are buying your first place, renewing, or refinancing, here is what working together looks like.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {SERVICES.map((svc) => (
                <div
                  key={svc.title}
                  className="rounded-2xl p-6 transition-all duration-200 hover:scale-[1.01] cursor-pointer group"
                  style={{ background: C.bg, border: `1px solid ${C.border}` }}
                >
                  <h3
                    className="text-[1.125rem] font-bold mb-2 transition-colors duration-150"
                    style={{ fontFamily: "var(--font-jakarta)", color: C.black }}
                  >
                    {svc.title}
                  </h3>
                  <p
                    className="text-[0.9375rem]"
                    style={{ fontFamily: "var(--font-jakarta)", color: C.gray }}
                  >
                    {svc.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT SECTION ── */}
        <section style={{ background: C.bg }} className="py-24 px-6">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/jesse-hero.jpg"
                alt="Jesse Karkoukly"
                fill
                className="object-cover"
                style={{ objectPosition: "55% 30%" }}
              />
            </div>
            <div>
              <p
                className="text-[0.75rem] font-bold tracking-[0.18em] uppercase mb-4"
                style={{ fontFamily: "var(--font-jakarta)", color: C.gray }}
              >
                About Jesse
              </p>
              <h2
                className="text-[2rem] sm:text-[2.5rem] font-bold leading-tight mb-6"
                style={{ fontFamily: "var(--font-spectral)", color: C.black }}
              >
                You should understand exactly what you are signing<span style={{ color: C.lime }}>.</span>
              </h2>
              <p
                className="text-[1.0625rem] leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-jakarta)", color: C.gray }}
              >
                Before mortgages, I spent a decade in tech. I still think like an engineer: break the problem down, find the best option, explain it clearly.
              </p>
              <p
                className="text-[1.0625rem] leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)", color: C.gray }}
              >
                I work with over 50 lenders across Canada. That means I can match your situation to the right product, not just the one my employer happens to sell.
              </p>
              <button
                className="font-semibold px-6 py-3 rounded-full transition-all duration-150 hover:scale-[1.03] active:scale-95 cursor-pointer text-[0.9375rem]"
                style={{ fontFamily: "var(--font-jakarta)", background: C.lime, color: C.black }}
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ background: C.white }} className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-[2.25rem] sm:text-[2.75rem] font-bold leading-tight mb-10"
              style={{ fontFamily: "var(--font-spectral)", color: C.black }}
            >
              Questions people actually ask<span style={{ color: C.lime }}>.</span>
            </h2>

            <div className="flex flex-col" style={{ borderTop: `1px solid ${C.border}` }}>
              {FAQS.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 py-6 text-left cursor-pointer group"
                    >
                      <span
                        className="font-semibold text-[1.0625rem] sm:text-[1.125rem] transition-colors duration-150"
                        style={{
                          fontFamily: "var(--font-jakarta)",
                          color: C.black,
                        }}
                      >
                        {item.q}
                      </span>
                      <span
                        className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
                        style={{
                          background: isOpen ? C.lime : "transparent",
                          border: `2px solid ${isOpen ? C.lime : C.border}`,
                          color: C.black,
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          {isOpen ? (
                            <>
                              <line x1="2" y1="2" x2="10" y2="10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                              <line x1="10" y1="2" x2="2" y2="10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                            </>
                          ) : (
                            <>
                              <line x1="6" y1="1" x2="6" y2="11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                              <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                            </>
                          )}
                        </svg>
                      </span>
                    </button>
                    {isOpen && (
                      <p
                        className="pb-6 text-[1.0625rem] leading-relaxed"
                        style={{ fontFamily: "var(--font-jakarta)", color: C.gray }}
                      >
                        {item.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA BAND ── */}
        <section
          className="py-20 px-6 text-center"
          style={{ background: C.black }}
        >
          <h2
            className="text-[2rem] sm:text-[2.5rem] font-bold leading-tight mb-4"
            style={{ fontFamily: "var(--font-spectral)", color: C.white }}
          >
            Ready to figure out where you stand<span style={{ color: C.lime }}>?</span>
          </h2>
          <p
            className="text-[1.0625rem] mb-8 max-w-md mx-auto"
            style={{ fontFamily: "var(--font-jakarta)", color: C.grayLt }}
          >
            One call. No pressure. Just a clear picture of your options.
          </p>
          <button
            className="font-bold px-10 py-4 rounded-full hover:scale-[1.03] active:scale-95 transition-all duration-150 cursor-pointer text-[1rem] shadow-lg"
            style={{ fontFamily: "var(--font-jakarta)", background: C.lime, color: C.black }}
          >
            Book a Call
          </button>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ background: C.bgAlt, borderTop: `1px solid ${C.border}` }} className="py-12 px-6">
          <div className="max-w-5xl mx-auto">
            {/* Logo */}
            <div className="mb-8">
              <span
                className="text-[1.5rem] font-bold"
                style={{ fontFamily: "var(--font-spectral)", color: C.black }}
              >
                Jesse<span style={{ color: C.lime }}>.</span>
              </span>
              <span
                className="text-[0.9rem] font-normal ml-1"
                style={{ fontFamily: "var(--font-spectral)", color: C.gray }}
              >
                Karkoukly
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 mb-10">
              <div>
                <p className="text-[0.8125rem] font-semibold mb-3" style={{ fontFamily: "var(--font-jakarta)", color: C.black }}>
                  Contact
                </p>
                <p className="text-[0.875rem] mb-1" style={{ fontFamily: "var(--font-jakarta)", color: C.gray }}>416-276-2666</p>
                <p className="text-[0.875rem]" style={{ fontFamily: "var(--font-jakarta)", color: C.gray }}>jkarkoukly@sherwoodmortgagegroup.com</p>
              </div>
              <div>
                <p className="text-[0.8125rem] font-semibold mb-3" style={{ fontFamily: "var(--font-jakarta)", color: C.black }}>
                  Pages
                </p>
                {["Services", "Rates", "Calculators", "About", "Blog"].map((link) => (
                  <p key={link} className="text-[0.875rem] mb-1" style={{ fontFamily: "var(--font-jakarta)", color: C.gray }}>
                    {link}
                  </p>
                ))}
              </div>
              <div>
                <p className="text-[0.8125rem] font-semibold mb-3" style={{ fontFamily: "var(--font-jakarta)", color: C.black }}>
                  Brokerage
                </p>
                <p className="text-[0.875rem] mb-1" style={{ fontFamily: "var(--font-jakarta)", color: C.gray }}>Sherwood Mortgage Group</p>
                <p className="text-[0.875rem] mb-1" style={{ fontFamily: "var(--font-jakarta)", color: C.gray }}>Brokerage Lic. 12176</p>
                <p className="text-[0.875rem]" style={{ fontFamily: "var(--font-jakarta)", color: C.gray }}>Part of the Mortgage Architects Network</p>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${C.border}` }} className="pt-6">
              <p
                className="text-[0.75rem] leading-relaxed"
                style={{ fontFamily: "var(--font-jakarta)", color: C.grayLt }}
              >
                Jesse Karkoukly, Mortgage Agent Lic. M25003068. Brokerage: Sherwood Mortgage Group, Brokerage Lic. 12176. Part of the Mortgage Architects Network. This website does not constitute a mortgage approval, commitment, or rate guarantee. All rates and terms subject to lender approval.
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* ── BRAND COMPARISON BANNER ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 text-center text-[0.8125rem] font-semibold"
        style={{ background: C.lime, color: C.black, fontFamily: "var(--font-jakarta)" }}
      >
        Brand Preview Mode &mdash; <Link href="/" className="underline">Back to current brand</Link>
      </div>
    </div>
  );
}
