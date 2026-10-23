"use client";

import { useRef, useState } from "react";
import { B, GOOGLE_PROFILE_URL, serif, sans } from "@/components/home/brand";

export type Review = {
  name: string;
  tag?: string;
  /** Exact words from the review, shown big on the front. */
  highlight: string;
  /** The full review, word for word from Google. */
  full: string;
};

/**
 * Big review cards in a swipeable row. The front shows the moment that matters,
 * the back (flip) shows the full review word for word. Both sides are in the page.
 */
export default function ReviewCarousel({ heading, reviews }: { heading: string; reviews: Review[] }) {
  const [flipped, setFlipped] = useState<Set<number>>(() => new Set());
  const rowRef = useRef<HTMLUListElement>(null);
  const toggle = (i: number) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  const scrollBy = (dir: number) => {
    const row = rowRef.current;
    if (!row) return;
    const card = row.querySelector("li");
    row.scrollBy({ left: dir * ((card?.clientWidth ?? 400) + 16), behavior: "smooth" });
  };

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="px-5 sm:px-6"><div className="max-w-6xl mx-auto flex items-end justify-between gap-4 mb-7">
        <h2 className="m-0 text-[2rem] sm:text-[2.5rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>{heading}</h2>
        <div className="hidden sm:flex gap-2.5 shrink-0">
          <button type="button" aria-label="Previous review" onClick={() => scrollBy(-1)} className="cursor-pointer w-12 h-12 rounded-full border-[1.5px] border-[#D8CCC0] bg-white text-[#352B26] text-lg hover:border-[#4F6B7A] hover:text-[#4F6B7A] transition-colors duration-150">←</button>
          <button type="button" aria-label="Next review" onClick={() => scrollBy(1)} className="cursor-pointer w-12 h-12 rounded-full border-[1.5px] border-[#D8CCC0] bg-white text-[#352B26] text-lg hover:border-[#4F6B7A] hover:text-[#4F6B7A] transition-colors duration-150">→</button>
        </div>
      </div></div>

      <ul
        ref={rowRef}
        style={{ paddingInline: "max(1.25rem, calc((100vw - 72rem) / 2))", scrollPaddingInline: "max(1.25rem, calc((100vw - 72rem) / 2))" }}
        className="m-0 list-none flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r, i) => {
          const isFlipped = flipped.has(i);
          return (
            <li key={r.name} className="snap-start shrink-0 w-[86vw] sm:w-[440px] [perspective:1400px]">
              <div
                className="jk-flip relative h-[360px] sm:h-[380px] transition-transform duration-700 [transform-style:preserve-3d] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: isFlipped ? "rotateY(180deg)" : "none" }}
              >
                {/* Front: the moment */}
                <div className="absolute inset-0 rounded-[24px] p-7 sm:p-8 flex flex-col [backface-visibility:hidden]" style={{ background: B.linen }} aria-hidden={isFlipped}>
                  <span aria-hidden="true" className="text-[4rem] leading-[0.6] h-8" style={{ ...serif, color: B.clay }}>“</span>
                  <p className="m-0 text-[1.375rem] sm:text-[1.5rem] leading-[1.35]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>{r.highlight}</p>
                  <div className="mt-auto flex flex-col items-start gap-4 pt-6 sm:flex-row sm:items-end sm:justify-between">
                    <span className="flex flex-col gap-0.5" style={sans}>
                      <span className="text-[1rem] font-semibold" style={{ color: B.espresso }}>{r.name}</span>
                      {r.tag && <span className="text-[0.9375rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>{r.tag}</span>}
                    </span>
                    <button type="button" tabIndex={isFlipped ? -1 : 0} onClick={() => toggle(i)} className="cursor-pointer shrink-0 rounded-full px-4 py-2.5 min-h-[44px] text-[0.875rem] font-semibold border-[1.5px] border-[#352B26] text-[#352B26] hover:border-[#4F6B7A] hover:text-[#4F6B7A] transition-colors duration-150" style={sans}>
                      Read the full review
                    </button>
                  </div>
                </div>

                {/* Back: the full review */}
                <div className="absolute inset-0 rounded-[24px] p-7 sm:p-8 flex flex-col gap-4 [backface-visibility:hidden] [transform:rotateY(180deg)]" style={{ background: B.espresso }} aria-hidden={!isFlipped}>
                  <span className="text-[1rem] font-semibold" style={{ ...sans, color: B.linen }}>{r.name} on Google</span>
                  <div className="flex-1 min-h-0 overflow-y-auto pr-1 flex flex-col gap-3">
                    {r.full.split("\n\n").map((para, j) => (
                      <p key={j} className="m-0 text-[0.9375rem] leading-[1.65]" style={{ ...sans, color: B.onDark }}>{para}</p>
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" tabIndex={isFlipped ? 0 : -1} className="text-[0.875rem] underline underline-offset-2 hover:text-[#9DB6C3]" style={{ ...sans, color: B.onDark }}>See it on Google</a>
                    <button type="button" tabIndex={isFlipped ? 0 : -1} onClick={() => toggle(i)} className="cursor-pointer rounded-full px-4 py-2.5 min-h-[44px] text-[0.875rem] font-semibold bg-[#C4A592] text-[#352B26] hover:bg-[#9DB6C3] transition-colors duration-150" style={sans}>
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
