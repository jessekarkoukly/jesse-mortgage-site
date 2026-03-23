interface CTABandProps {
  onBookingOpen: () => void;
}

export default function CTABand({ onBookingOpen }: CTABandProps) {
  return (
    <section className="bg-navy py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="text-[2rem] sm:text-[2.75rem] font-bold text-white leading-tight mb-4"
          style={{ fontFamily: "var(--font-spectral)" }}
        >
          Ready to see your options?
        </h2>
        <p
          className="text-[1rem] text-slate mb-10 max-w-xl mx-auto"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          One conversation. A clear picture of what is available to you. No cost, no obligation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onBookingOpen}
            className="bg-sand text-navy font-semibold px-8 py-3.5 rounded hover:bg-white hover:scale-[1.03] active:scale-95 transition-all duration-150 cursor-pointer text-[0.9375rem] w-full sm:w-auto"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Book a Call
          </button>
          <a
            href="tel:4162762666"
            className="border-2 border-slate text-white font-semibold px-8 py-3.5 rounded hover:border-white hover:scale-[1.03] active:scale-95 transition-all duration-150 text-center text-[0.9375rem] w-full sm:w-auto"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            416-276-2666
          </a>
        </div>
      </div>
    </section>
  );
}
