"use client";

import { useRef, useState } from "react";

const SLIDES = [
  { id: "hero" },
  { id: "td",   bank: "TD Bank",    rate: "3.65%", term: "3-Year Variable", logo: "/logos/TD-logo.webp" },
  { id: "scot", bank: "Scotiabank", rate: "3.89%", term: "5-Year Variable", logo: "/logos/Scotiabank.webp" },
] as const;

const total = SLIDES.length;

export default function HeroCarousel() {
  const [slide, setSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goTo = (n: number) => setSlide(Math.max(0, Math.min(total - 1, n)));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) goTo(slide + (dx > 0 ? 1 : -1));
    touchStartX.current = null;
  };

  return (
    <div
      className="relative overflow-hidden flex flex-col min-h-[70vh]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <style>{`
        @keyframes nudge-right {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(7px); }
        }
        .arrow-nudge { display: inline-block; animation: nudge-right 1.1s ease-in-out infinite; }
      `}</style>

      {/* Track */}
      <div
        className="flex-1 flex transition-transform duration-500 ease-out"
        style={{
          width: `${total * 100}%`,
          transform: `translateX(-${(slide / total) * 100}%)`,
        }}
      >

        {/* ── Slide 1: Hero ── */}
        <div
          className="flex flex-col items-center justify-center px-6 pt-20 sm:pt-24 pb-6 text-center"
          style={{
            width: `${100 / total}%`,
            background:
              "radial-gradient(ellipse at 65% 45%, rgba(232,112,90,0.07) 0%, transparent 55%), #ffffff",
          }}
        >
          <h1
            className="text-[2rem] sm:text-[3.25rem] lg:text-[5rem] font-bold text-navy leading-[1.08] mb-5 sm:mb-7 max-w-3xl"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            How a lower rate buys you more than just a home.
          </h1>
          <p
            className="text-[1rem] sm:text-[1.25rem] text-navy-2 leading-relaxed max-w-2xl mb-7 sm:mb-9"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            That extra monthly breathing room could mean taking that yearly vacation, covering
            childcare, or handling life&rsquo;s surprises with total confidence.
          </p>

          {/* Non-button CTA */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => goTo(1)}
            onKeyDown={(e) => e.key === "Enter" && goTo(1)}
            className="inline-flex items-center gap-2 text-coral font-bold text-[1rem] sm:text-[1.0625rem] cursor-pointer select-none uppercase tracking-wide"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            <span>Swipe for the best rates</span>
            <span className="arrow-nudge" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10h12M11 5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          <Dots slide={slide} goTo={goTo} className="mt-4" dark />
        </div>

        {/* ── Slides 2 & 3: Rate cards ── */}
        {SLIDES.slice(1).map(({ id, bank, rate, term, logo }) => (
          <div
            key={id}
            className="flex flex-col items-center justify-center px-6 pt-20 sm:pt-24 pb-6 bg-white"
            style={{ width: `${100 / total}%` }}
          >
            <div className="bg-white rounded-3xl px-8 sm:px-10 py-8 sm:py-10 text-center shadow-2xl w-full max-w-sm">
              {/* Bank logo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo}
                alt={bank}
                className="h-10 sm:h-12 w-auto mx-auto mb-5 object-contain"
              />

              <p
                className="text-[0.65rem] font-bold text-slate tracking-[0.22em] uppercase mb-3"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {bank} Rate
              </p>

              <p
                className="font-bold text-coral leading-none"
                style={{
                  fontFamily: "var(--font-spectral)",
                  fontSize: "clamp(3rem, 14vw, 5.5rem)",
                }}
              >
                {rate}
              </p>

              <p
                className="text-navy text-[1rem] sm:text-[1.0625rem] font-semibold mt-3 mb-5"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {term}
              </p>

              <div className="border-t border-navy/10 pt-4">
                <p
                  className="text-[0.65rem] font-bold text-slate tracking-[0.22em] uppercase"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Exclusive Broker Rate
                </p>
              </div>
            </div>

            <Dots slide={slide} goTo={goTo} className="mt-5" dark />
          </div>
        ))}
      </div>
    </div>
  );
}

function Dots({
  slide,
  goTo,
  className = "",
  dark = false,
}: {
  slide: number;
  goTo: (n: number) => void;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={`flex gap-2.5 justify-center ${className}`}>
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={(e) => { e.stopPropagation(); goTo(i); }}
          aria-label={`Go to slide ${i + 1}`}
          className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
            slide === i
              ? "bg-coral scale-125"
              : dark
              ? "bg-navy/25"
              : "bg-white/35"
          }`}
        />
      ))}
    </div>
  );
}
