"use client";

import { useEffect, useRef, useState } from "react";

export default function RateCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative flex justify-center lg:justify-end py-12 px-8">

      {/* Sunshine dots — scattered around card */}
      <span className="absolute top-2 right-24  w-3   h-3   rounded-full bg-coral opacity-70" />
      <span className="absolute top-0 right-10  w-2   h-2   rounded-full bg-coral opacity-45" />
      <span className="absolute top-6 right-6   w-1.5 h-1.5 rounded-full bg-coral opacity-35" />
      <span className="absolute top-1/4 right-0 w-2.5 h-2.5 rounded-full bg-coral opacity-55" />
      <span className="absolute top-1/3 -right-2 w-1.5 h-1.5 rounded-full bg-coral opacity-35" />
      <span className="absolute top-1/2 right-1 w-2   h-2   rounded-full bg-coral opacity-40" />
      <span className="absolute bottom-1/4 right-0 w-2.5 h-2.5 rounded-full bg-coral opacity-50" />
      <span className="absolute bottom-4 right-14  w-3   h-3   rounded-full bg-coral opacity-65" />
      <span className="absolute bottom-2 right-4   w-1.5 h-1.5 rounded-full bg-coral opacity-35" />
      <span className="absolute top-1/2 left-4  w-2   h-2   rounded-full bg-coral opacity-30" />
      <span className="absolute top-1/4 left-6  w-1.5 h-1.5 rounded-full bg-coral opacity-25" />
      <span className="absolute bottom-1/3 left-2 w-2  h-2   rounded-full bg-coral opacity-35" />

      {/* Card */}
      <div
        ref={ref}
        className={`relative bg-white rounded-3xl px-10 py-14 text-center shadow-2xl w-full max-w-sm transition-all duration-700 ease-out ${
          visible
            ? "opacity-100 translate-x-0 scale-100"
            : "opacity-0 translate-x-16 scale-95"
        }`}
      >
        <p
          className="text-[0.7rem] font-bold text-slate tracking-[0.2em] uppercase mb-5"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Today&rsquo;s Rate
        </p>

        {/* Rate number — single size so % stays inside the card */}
        <p
          className="font-bold text-coral leading-none"
          style={{ fontFamily: "var(--font-spectral)", fontSize: "6rem" }}
        >
          3.65%
        </p>

        <p
          className="text-navy text-[1.0625rem] font-semibold mt-4 mb-8"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          3-Year Variable
        </p>

        <div className="border-t border-navy/10 pt-6">
          <p
            className="text-slate text-[0.875rem] leading-relaxed"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Rate hold available up to 120 days
          </p>
        </div>
      </div>
    </div>
  );
}
