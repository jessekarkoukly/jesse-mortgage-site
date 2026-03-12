"use client";

import { useState, useEffect, useRef } from "react";
import type { NeighbourhoodData } from "@/data/neighbourhoods/types";

const TOC_SECTIONS = [
  { id: "the-vibe", label: "The vibe" },
  { id: "who-buys-here", label: "Who buys here" },
  { id: "property-types", label: "Property types" },
  { id: "streets", label: "Streets to know" },
  { id: "local-life", label: "Local life" },
  { id: "the-map", label: "Map" },
  { id: "market-data", label: "Market data" },
  { id: "buying-here", label: "Buying here" },
  { id: "faq", label: "FAQ" },
];

interface NeighbourhoodPageLayoutProps {
  data: NeighbourhoodData;
}

export default function NeighbourhoodPageLayout({
  data,
}: NeighbourhoodPageLayoutProps) {
  const [activeSection, setActiveSection] = useState("the-vibe");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const ids = TOC_SECTIONS.map((t) => t.id);
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const activeToc = TOC_SECTIONS.filter((s) => {
    if (s.id === "streets" && !data.topStreets) return false;
    if (s.id === "faq" && data.faq.length === 0) return false;
    return true;
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-sand pt-28 pb-10 px-6 lg:pt-32 lg:pb-12">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-[0.75rem] font-semibold text-coral uppercase tracking-widest mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            {data.eyebrow}
          </p>
          <h1
            className="text-[2.25rem] sm:text-[3rem] font-bold text-navy leading-tight mb-5"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            {data.headline}
            <span className="text-coral">.</span>
          </h1>
          <p
            className="text-[1.0625rem] text-navy-2 leading-relaxed max-w-2xl"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            {data.intro}
          </p>
        </div>
      </section>

      {/* Quick facts strip */}
      <section className="bg-sand pb-16 px-6 lg:pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {data.quickFacts.map((fact, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-sand-2 px-4 py-3 flex flex-col"
              >
                <span
                  className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {fact.label}
                </span>
                <span
                  className="text-[1rem] font-bold text-navy"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jesse's note (if present) */}
      {data.jesseNote && (
        <section className="bg-white border-b border-sand-2">
          <div className="max-w-3xl mx-auto px-6 py-10">
            <div className="flex gap-4 items-start">
              <div className="w-1 shrink-0 rounded-full bg-coral self-stretch" />
              <div>
                <p
                  className="text-[0.75rem] font-semibold text-coral uppercase tracking-widest mb-2"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {data.jesseNote.heading}
                </p>
                <p
                  className="text-[1.0625rem] text-navy-2 leading-relaxed"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {data.jesseNote.body}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main content with sticky TOC */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-16">
            {/* Sticky TOC (desktop) */}
            <nav className="hidden lg:block">
              <div className="sticky top-28">
                <p
                  className="text-[0.6875rem] font-semibold text-slate uppercase tracking-widest mb-4"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  On this page
                </p>
                <div className="flex flex-col gap-1">
                  {activeToc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`text-[0.875rem] py-1.5 px-3 rounded transition-colors ${
                        activeSection === item.id
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

            {/* Content */}
            <div className="min-w-0">
              {/* The vibe */}
              <section id="the-vibe" className="mb-14 pb-14 border-b border-sand-2">
                <h2
                  className="text-[1.5rem] sm:text-[1.75rem] font-bold text-navy leading-tight mb-5"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  {data.vibe.heading}
                  <span className="text-coral">.</span>
                </h2>
                <div className="space-y-4">
                  {data.vibe.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-[1.0625rem] text-navy-2 leading-relaxed"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </section>

              {/* Who buys here */}
              <section id="who-buys-here" className="mb-14 pb-14 border-b border-sand-2">
                <h2
                  className="text-[1.5rem] sm:text-[1.75rem] font-bold text-navy leading-tight mb-5"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  {data.buyerProfiles.heading}
                  <span className="text-coral">.</span>
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {data.buyerProfiles.profiles.map((profile, i) => (
                    <span
                      key={i}
                      className="inline-block bg-sand rounded-full px-4 py-2.5 text-[0.9375rem] text-navy font-medium"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {profile}
                    </span>
                  ))}
                </div>
              </section>

              {/* Property types */}
              <section id="property-types" className="mb-14 pb-14 border-b border-sand-2">
                <h2
                  className="text-[1.5rem] sm:text-[1.75rem] font-bold text-navy leading-tight mb-5"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  {data.propertyTypes.heading}
                  <span className="text-coral">.</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.propertyTypes.types.map((type, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-sand-2 p-5"
                    >
                      <p
                        className="text-[1.0625rem] font-bold text-navy mb-1"
                        style={{ fontFamily: "var(--font-spectral)" }}
                      >
                        {type.label}
                      </p>
                      <p
                        className="text-[1.125rem] font-bold text-coral mb-2"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {type.priceRange}
                      </p>
                      <p
                        className="text-[0.875rem] text-navy-2 leading-relaxed"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {type.note}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Top streets */}
              {data.topStreets && (
                <section id="streets" className="mb-14 pb-14 border-b border-sand-2">
                  <h2
                    className="text-[1.5rem] sm:text-[1.75rem] font-bold text-navy leading-tight mb-5"
                    style={{ fontFamily: "var(--font-spectral)" }}
                  >
                    {data.topStreets.heading}
                    <span className="text-coral">.</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.topStreets.streets.map((street, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-sand-2 p-5 hover:border-coral/30 transition-colors"
                      >
                        <p
                          className="text-[1rem] font-bold text-navy mb-1"
                          style={{ fontFamily: "var(--font-spectral)" }}
                        >
                          {street.name}
                        </p>
                        <p
                          className="text-[0.875rem] text-navy-2 leading-relaxed"
                          style={{ fontFamily: "var(--font-jakarta)" }}
                        >
                          {street.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Local life */}
              <section id="local-life" className="mb-14 pb-14 border-b border-sand-2">
                <h2
                  className="text-[1.5rem] sm:text-[1.75rem] font-bold text-navy leading-tight mb-6"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  {data.localLife.heading}
                  <span className="text-coral">.</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {data.localLife.categories.map((cat, i) => (
                    <div key={i} className="bg-sand rounded-xl p-5">
                      <p
                        className="text-[0.75rem] font-semibold text-coral uppercase tracking-widest mb-3"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {cat.label}
                      </p>
                      <ul className="space-y-2">
                        {cat.items.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2.5 text-[0.9375rem] text-navy-2 leading-relaxed"
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          >
                            <span className="text-coral mt-0.5 shrink-0 text-[0.625rem]">&#9679;</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Map */}
              <section id="the-map" className="mb-14 pb-14 border-b border-sand-2">
                <h2
                  className="text-[1.5rem] sm:text-[1.75rem] font-bold text-navy leading-tight mb-5"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  Where is {data.name}
                  <span className="text-coral">.</span>
                </h2>
                <div className="rounded-xl overflow-hidden border border-sand-2">
                  <iframe
                    title={`Map of ${data.name}, Toronto`}
                    src={`https://www.google.com/maps?q=${data.mapCenter.lat},${data.mapCenter.lng}&z=${data.mapZoom || 15}&output=embed`}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <a
                  href={`https://www.google.com/maps/place/${encodeURIComponent(data.name + ", Toronto, ON")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-coral font-semibold text-[0.875rem] mt-3"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Open in Google Maps
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </section>

              {/* Market data (link out) */}
              <section id="market-data" className="mb-14 pb-14 border-b border-sand-2">
                <h2
                  className="text-[1.5rem] sm:text-[1.75rem] font-bold text-navy leading-tight mb-3"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  Market data
                  <span className="text-coral">.</span>
                </h2>
                <p
                  className="text-[1rem] text-navy-2 leading-relaxed mb-5"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Average prices, days on market, and recent sales for {data.name}. Updated regularly by a third-party source.
                </p>
                <a
                  href={data.marketDataUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-navy-2 transition-colors text-[0.9375rem]"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  View current market data
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 12L12 4M12 4H6M12 4v6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </section>

              {/* Buying considerations */}
              <section id="buying-here" className="mb-14 pb-14 border-b border-sand-2">
                <h2
                  className="text-[1.5rem] sm:text-[1.75rem] font-bold text-navy leading-tight mb-6"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  {data.buyingConsiderations.heading}
                  <span className="text-coral">.</span>
                </h2>
                <div className="space-y-4">
                  {data.buyingConsiderations.points.map((point, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-sand-2 p-5"
                    >
                      <h3
                        className="text-[1.0625rem] font-bold text-navy mb-1.5"
                        style={{ fontFamily: "var(--font-spectral)" }}
                      >
                        {point.title}
                      </h3>
                      <p
                        className="text-[0.9375rem] text-navy-2 leading-relaxed"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {point.body}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              {data.faq.length > 0 && (
                <section id="faq">
                  <h2
                    className="text-[1.5rem] sm:text-[1.75rem] font-bold text-navy leading-tight mb-6"
                    style={{ fontFamily: "var(--font-spectral)" }}
                  >
                    Questions about {data.name}
                    <span className="text-coral">.</span>
                  </h2>
                  <div className="space-y-3">
                    {data.faq.map((item, i) => (
                      <div
                        key={i}
                        className="border border-sand-2 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() =>
                            setOpenFaq(openFaq === i ? null : i)
                          }
                          className="w-full text-left px-5 py-4 flex items-center justify-between cursor-pointer"
                        >
                          <span
                            className="text-[1rem] font-semibold text-navy pr-4"
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          >
                            {item.q}
                          </span>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            className={`shrink-0 text-coral transition-transform duration-200 ${
                              openFaq === i ? "rotate-45" : ""
                            }`}
                          >
                            <path
                              d="M10 4v12M4 10h12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                        <div
                          className="grid transition-all duration-300 ease-in-out"
                          style={{
                            gridTemplateRows:
                              openFaq === i ? "1fr" : "0fr",
                          }}
                        >
                          <div className="overflow-hidden">
                            <p
                              className="px-5 pb-4 text-[0.9375rem] text-navy-2 leading-relaxed"
                              style={{
                                fontFamily: "var(--font-jakarta)",
                              }}
                            >
                              {item.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
