"use client";

import Link from "next/link";

interface ServicePageLayoutProps {
  eyebrow: string;
  title: string;
  intro: string;
  sections: {
    heading: string;
    body: string;
  }[];
  bullets?: string[];
  ctaText?: string;
}

export default function ServicePageLayout({
  eyebrow,
  title,
  intro,
  sections,
  bullets,
  ctaText = "Book a Call",
}: ServicePageLayoutProps) {
  const handleBookCall = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-sand pt-28 pb-20 px-6 lg:pt-32">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            {eyebrow}
          </p>
          <h1
            className="text-[2.5rem] sm:text-[3rem] font-bold text-navy leading-tight mb-6"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            {title}
          </h1>
          <p
            className="text-[1.0625rem] text-navy-2 leading-relaxed max-w-2xl"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            {intro}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-12">
            {sections.map((section, i) => (
              <div key={i}>
                <h2
                  className="text-[1.5rem] sm:text-[1.75rem] font-bold text-navy leading-tight mb-4"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  {section.heading}
                </h2>
                <p
                  className="text-[1rem] text-navy-2 leading-relaxed"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {section.body}
                </p>
              </div>
            ))}

            {bullets && bullets.length > 0 && (
              <ul className="space-y-3">
                {bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[1rem] text-navy-2 leading-relaxed"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    <span className="text-coral mt-1 shrink-0">&#8226;</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-[2rem] sm:text-[2.5rem] font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Ready to talk through your options?
          </h2>
          <p
            className="text-[1rem] text-slate mb-8"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            The first call is free, takes 15 to 30 minutes, and gives you a
            clear picture of where you stand.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleBookCall}
              className="bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem]"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              {ctaText}
            </button>
            <Link
              href="/services"
              className="border-2 border-sand text-sand font-semibold px-8 py-3.5 rounded-lg hover:bg-sand hover:text-navy transition-colors text-center text-[0.9375rem]"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
