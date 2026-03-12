"use client";

import Link from "next/link";

interface TrackPromptProps {
  onBookingOpen: () => void;
}

export default function TrackPrompt({ onBookingOpen }: TrackPromptProps) {
  return (
    <section className="grid md:grid-cols-2">
      {/* Left track — Ready to talk */}
      <button
        onClick={onBookingOpen}
        className="bg-coral text-white px-6 sm:px-8 py-10 sm:py-12 md:py-16 text-left group cursor-pointer transition-colors hover:bg-coral-dark"
      >
        <div className="max-w-md ml-auto mr-0 md:mr-8 lg:mr-12">
          <h2
            className="text-[1.5rem] md:text-[1.75rem] font-bold mb-2"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Ready to talk?
            <span className="inline-block ml-3 transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </h2>
          <p
            className="text-white/80 text-[0.9375rem]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Book a call. Takes about 20 minutes.
          </p>
        </div>
      </button>

      {/* Right track — Still exploring */}
      <Link
        href="/working-with-jesse"
        className="bg-navy text-white px-6 sm:px-8 py-10 sm:py-12 md:py-16 text-left group transition-colors hover:bg-navy-2"
      >
        <div className="max-w-md mr-auto ml-0 md:ml-8 lg:ml-12">
          <h2
            className="text-[1.5rem] md:text-[1.75rem] font-bold mb-2"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Still exploring?
            <span className="inline-block ml-3 transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </h2>
          <p
            className="text-sand/70 text-[0.9375rem]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Start with how the process works.
          </p>
        </div>
      </Link>
    </section>
  );
}
