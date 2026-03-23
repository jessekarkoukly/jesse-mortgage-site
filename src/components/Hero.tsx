import Image from "next/image";

interface HeroProps {
  onBookingOpen: () => void;
}

export default function Hero({ onBookingOpen }: HeroProps) {
  return (
    <section className="bg-sand pt-16 sm:pt-20">
      {/* ── Desktop: two-column full-height ── */}
      <div className="hidden lg:grid lg:grid-cols-2 min-h-[calc(100vh-4rem)]">

        {/* Left: copy */}
        <div className="flex flex-col justify-center px-12 xl:px-20 py-20">
          {/* Eyebrow in coral */}
          <p
            className="text-[0.75rem] font-bold text-coral tracking-[0.18em] uppercase mb-6"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Toronto Mortgage Agent&nbsp;&middot;&nbsp;Sherwood Mortgage Group
          </p>

          <h1
            className="text-[3rem] xl:text-[3.5rem] font-bold text-navy leading-[1.1] mb-7"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            <span className="sr-only">Toronto Mortgage Agent: </span>
            Getting a mortgage in Ontario?{" "}
            <span className="block">Let&rsquo;s figure out</span>
            <span className="block">where you stand.</span>
          </h1>

          <p
            className="text-[1.0625rem] text-navy-2 leading-relaxed mb-10 max-w-md"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            I&rsquo;m Jesse. I look at your full picture, compare options across 50+ lenders, and
            give you a clear plan in plain language.
          </p>

          <div className="flex flex-row gap-3 mb-10">
            <button
              onClick={onBookingOpen}
              className="bg-coral text-white font-bold px-8 py-4 rounded-lg hover:bg-coral-dark hover:scale-[1.03] active:scale-95 transition-all duration-150 cursor-pointer text-[0.9375rem] shadow-md hover:shadow-lg"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Book a Call
            </button>
          </div>

          {/* Trust chips */}
          <div className="flex flex-wrap gap-5">
            {["Free to you", "50+ lenders compared", "Toronto and Ontario"].map((chip) => (
              <span
                key={chip}
                className="flex items-center gap-2 text-[0.8125rem] font-semibold text-navy"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                <span className="w-2 h-2 rounded-full bg-coral shrink-0" aria-hidden="true" />
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Right: photo edge-to-edge */}
        <div className="relative">
          <Image
            src="/jesse-hero.jpg"
            alt="Jesse Karkoukly, Toronto Mortgage Agent"
            fill
            className="object-cover"
            style={{ objectPosition: "55% 30%" }}
            priority
          />
          {/* Subtle gradient on left edge to blend into sand */}
          <div
            className="absolute inset-y-0 left-0 w-20 pointer-events-none"
            style={{
              background: "linear-gradient(to right, #F7F3EE, transparent)",
            }}
          />
        </div>
      </div>

      {/* ── Mobile: copy first, photo below ── */}
      <div className="lg:hidden">
        {/* Copy block */}
        <div className="px-6 pt-10 pb-8">
          <p
            className="text-[0.75rem] font-bold text-coral tracking-[0.18em] uppercase mb-5"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Toronto Mortgage Agent
          </p>

          <h1
            className="text-[1.875rem] sm:text-[2.75rem] font-bold text-navy leading-[1.1] mb-5"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            <span className="sr-only">Toronto Mortgage Agent: </span>
            Getting a mortgage in Ontario?{" "}
            <span className="block">Let&rsquo;s figure out where you stand.</span>
          </h1>

          <p
            className="text-[1rem] text-navy-2 leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            I&rsquo;m Jesse. I look at your full picture, compare options across 50+ lenders, and
            give you a clear plan in plain language.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-7">
            <button
              onClick={onBookingOpen}
              className="w-full sm:w-auto bg-coral text-white font-bold px-7 py-4 rounded-lg hover:bg-coral-dark active:scale-95 transition-all duration-150 cursor-pointer text-[0.9375rem] shadow-md text-center"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Book a Call
            </button>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            {["Free to you", "50+ lenders compared", "Toronto and Ontario"].map((chip) => (
              <span
                key={chip}
                className="flex items-center gap-2 text-[0.8125rem] font-semibold text-navy"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                <span className="w-2 h-2 rounded-full bg-coral shrink-0" aria-hidden="true" />
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Photo: proper aspect ratio, centred on Jesse's face */}
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
  );
}
