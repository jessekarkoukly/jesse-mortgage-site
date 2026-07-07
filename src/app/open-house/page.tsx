import Image from "next/image";
import NavWithBooking from "@/components/NavWithBooking";
import HeroCarousel from "./HeroCarousel";
import SherwoodFooter from "@/components/SherwoodFooter";
import JesseFooter from "@/components/JesseFooter";

export const metadata = {
  title: "Open House | Jesse Karkoukly Toronto Mortgage Agent",
  description:
    "Extra breathing room means you can cover childcare, take that vacation or handle life's surprises with total confidence. Jesse Karkoukly, Toronto mortgage agent.",
  robots: { index: false, follow: false },
};

const REVIEWS = [
  {
    name: "Frank Carnevale",
    text: "Jesse was extremely diligent in ensuring I had the best mortgage options and offers. Really appreciated the effort and care.",
  },
  {
    name: "Adam Wasser",
    text: "Jesse always delivers! Having the right mortgage partner makes all the difference and Jesse always comes through for my clients. He makes the whole process feel smooth and stress free, stays on top of everything, and communicates every step of the way. I always feel confident referring him, knowing my clients are in great hands. On top of that, he's just a great guy!",
  },
  {
    name: "Norah Schulman",
    text: "Working with Jesse was a breeze. His industry expertise and understanding of the broader economic landscape ensured we received excellent guidance when our previous mortgage came due. He was consistently responsive, knowledgeable, and easy to work with throughout the process. We felt confident every step of the way and would highly recommend Jesse to anyone looking for a reliable mortgage broker.",
  },
];

const LENDER_LOGOS = [
  { name: "TD",             logo: "/logos/TD-logo.webp" },
  { name: "Scotiabank",     logo: "/logos/Scotiabank.webp" },
  { name: "First National", logo: "/logos/First-National-Logo.webp" },
  { name: "MCAP",           logo: "/logos/MCAP-logo.webp" },
  { name: "Manulife",       logo: "/logos/ManuLife.webp" },
  { name: "Equitable Bank", logo: "/logos/Equitable-logo.webp" },
  { name: "Home Trust",     logo: "/logos/Home-Trust-logo.webp" },
  { name: "Merix",          logo: "/logos/Merix.webp" },
  { name: "RMG",            logo: "/logos/RMG-logo.webp" },
  { name: "CMLS",           logo: "/logos/CMLS-Logo.webp" },
  { name: "Haventree",      logo: "/logos/HavenTree-Logo.webp" },
  { name: "DUCA",           logo: "/logos/Duca-logo.webp" },
];

const GET_POINTS = [
  {
    label: "Get Prepared",
    body: "Your credit score isn't a report card, it's a rate card. Better credit, better rate. Start months in advance so it has time to work.",
  },
  {
    label: "Get Leverage",
    body: "Shop multiple lenders. Most people skip this because dealing with each bank is a pain, and nobody wants their credit pulled five times. Multiple commitments give you options and leverage.",
  },
  {
    label: "Get Broker Discounts",
    body: "Brokers get wholesale and volume pricing the big banks don't hand out at the branch.",
  },
];

export default function OpenHousePage() {
  return (
    <>
      <NavWithBooking />
      <main>

        {/* ── Section 1: Hero Carousel ── */}
        <HeroCarousel />

        {/* ── Section 2: Copy ── */}
        <section id="rate" className="bg-navy py-16 sm:py-24 lg:py-32 px-6">
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-[1.875rem] sm:text-[2.75rem] lg:text-[3.25rem] font-bold text-white leading-tight mb-10 sm:mb-12"
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              Getting the best rate isn&rsquo;t luck.
            </h2>

            <div className="flex flex-col gap-6 sm:gap-7 mb-10 sm:mb-12">
              {GET_POINTS.map(({ label, body }) => (
                <div key={label} className="flex gap-4 items-start">
                  <span className="w-2 h-2 rounded-full bg-coral mt-2 shrink-0" aria-hidden="true" />
                  <p
                    className="text-[0.9375rem] sm:text-[1.0625rem] text-white/80 leading-relaxed"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    <span className="font-bold text-white">{label}.</span>{" "}{body}
                  </p>
                </div>
              ))}
            </div>

            {/* Phone CTA */}
            <a
              href="tel:+14162762666"
              className="inline-block bg-coral text-white font-semibold px-7 py-3 rounded-lg hover:bg-coral-dark transition-colors text-[0.9375rem] shadow-lg shadow-coral/25 mb-5 uppercase tracking-wide"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              CALL ME TODAY
            </a>

            {/* Secondary links */}
            <div
              className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-[0.8125rem] text-white/60"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              <a
                href="mailto:jkarkoukly@sherwoodmortgagegroup.com"
                className="underline hover:text-white transition-colors break-all"
              >
                jkarkoukly@sherwoodmortgagegroup.com
              </a>
              <span className="hidden sm:inline">·</span>
              <a
                href="https://calendly.com/working-with-jesse/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                Book a call
              </a>
              <span className="hidden sm:inline">·</span>
              <a href="tel:+14162762666" className="underline hover:text-white transition-colors">
                416-276-2666
              </a>
            </div>
          </div>
        </section>

        {/* ── Lender Ribbon ── */}
        <div className="bg-slate py-2 sm:py-3 overflow-hidden">
          <div className="marquee-track items-center">
            {[...LENDER_LOGOS, ...LENDER_LOGOS].map((l, i) => (
              <div key={i} className="flex items-center shrink-0 px-8">
                <img
                  src={l.logo}
                  alt={l.name}
                  className="h-20 sm:h-24 w-auto object-contain opacity-80"
                  style={{ filter: "grayscale(1) contrast(15) invert(1)" }}
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 3: About Jesse ── */}
        <section className="bg-white py-16 sm:py-24 lg:py-32 px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            {/* Left: headshot */}
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden max-w-sm mx-auto lg:max-w-none">
              <Image
                src="/jesse-headshot.png"
                alt="Jesse Karkoukly, Toronto Mortgage Agent"
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Right: bio */}
            <div className="flex flex-col justify-center">
              <p
                className="text-[0.75rem] font-bold text-coral tracking-[0.18em] uppercase mb-4 sm:mb-5"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                About Jesse
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2.25rem] lg:text-[2.5rem] font-bold text-navy leading-tight mb-6 sm:mb-8"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                You should understand exactly what you are signing. I make sure you do.
              </h2>
              <div
                className="flex flex-col gap-4 sm:gap-5 text-[1rem] sm:text-[1.0625rem] text-navy-2 leading-relaxed mb-8 sm:mb-10"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                <p>
                  I came to mortgages after a decade in tech. What I noticed: most people feel
                  like they are on their own when it comes to one of the biggest financial
                  decisions of their adult lives. That felt wrong to me.
                </p>
                <p>
                  My approach is simple. I listen first. Then I look at your full picture, run
                  the numbers across multiple lenders, and walk you through what actually makes
                  sense for your situation. Not what sounds good. What is good.
                </p>
              </div>
              <div
                className="flex flex-col sm:flex-row gap-2 sm:gap-5 text-[0.9375rem] font-semibold"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                <a href="tel:+14162762666" className="text-navy hover:text-coral transition-colors">
                  416-276-2666
                </a>
                <span className="hidden sm:block text-slate">·</span>
                <a
                  href="mailto:jkarkoukly@sherwoodmortgagegroup.com"
                  className="text-navy hover:text-coral transition-colors break-all"
                >
                  jkarkoukly@sherwoodmortgagegroup.com
                </a>
              </div>
              <p
                className="text-[0.75rem] text-slate mt-4 leading-relaxed"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Mortgage Agent Lic. M25003068 · Sherwood Mortgage Group, Brokerage Lic. 12176
              </p>
            </div>

          </div>
        </section>

        {/* ── Section 4: Testimonials ── */}
        <section className="bg-navy pt-10 sm:pt-14 pb-16 sm:pb-24 lg:pb-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2
                className="text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem] font-bold text-white leading-tight"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Testimonials<span className="text-coral">.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {REVIEWS.map(({ name, text }) => (
                <div
                  key={name}
                  className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col gap-5 sm:gap-6 shadow-lg"
                >
                  <p
                    className="text-navy-2 leading-relaxed text-[0.9375rem] sm:text-[1rem] flex-1"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    &ldquo;{text}&rdquo;
                  </p>
                  <div>
                    <p
                      className="font-semibold text-navy text-[0.9375rem] sm:text-[1rem]"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {name}
                    </p>
                    <p
                      className="text-slate text-[0.8125rem] mt-0.5"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      Google Review
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 sm:mt-16 text-center">
              <a
                href="tel:+14162762666"
                className="inline-block bg-coral text-white font-semibold px-7 py-3 rounded-lg hover:bg-coral-dark transition-colors text-[0.9375rem] shadow-lg shadow-coral/30 uppercase tracking-wide"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                CALL ME TODAY
              </a>
            </div>
          </div>
        </section>

      </main>
      <SherwoodFooter />
      <JesseFooter />
    </>
  );
}
