"use client";

import { useEffect, useState } from "react";

interface Rate {
  term_label: string;
  rate_value: string | null;
  rate_type_label: string;
  badge_label: string | null;
  updated_at: string | null;
}

const FALLBACK_RATES: Rate[] = [
  {
    term_label: "5-Year Fixed",
    rate_value: null,
    rate_type_label: "Insured \u00b7 25yr amort",
    badge_label: null,
    updated_at: null,
  },
  {
    term_label: "3-Year Fixed",
    rate_value: null,
    rate_type_label: "Most popular in 2026",
    badge_label: "Most chosen",
    updated_at: null,
  },
  {
    term_label: "2-Year Fixed",
    rate_value: null,
    rate_type_label: "Flexible short term",
    badge_label: null,
    updated_at: null,
  },
  {
    term_label: "5-Year Variable",
    rate_value: null,
    rate_type_label: "Prime \u00b7 Lower break penalty",
    badge_label: null,
    updated_at: null,
  },
];

interface RatesSectionProps {
  onBookingOpen: () => void;
}

export default function RatesSection({ onBookingOpen }: RatesSectionProps) {
  const [rates, setRates] = useState<Rate[]>(FALLBACK_RATES);
  const [updatedDate, setUpdatedDate] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRates() {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!supabaseUrl || !supabaseKey) return;

        const res = await fetch(
          `${supabaseUrl}/rest/v1/rates?select=*&order=id.asc`,
          {
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
            },
          }
        );
        if (!res.ok) return;

        const data = await res.json();
        if (data && data.length > 0) {
          setRates(data);
          const latest = data.reduce(
            (max: string | null, r: Rate) =>
              r.updated_at && (!max || r.updated_at > max)
                ? r.updated_at
                : max,
            null
          );
          if (latest) {
            setUpdatedDate(
              new Date(latest).toLocaleDateString("en-CA", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            );
          }
        }
      } catch {
        // Supabase not connected — show fallback dashes
      }
    }
    fetchRates();
  }, []);

  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-5xl px-5 py-16 md:py-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p
              className="text-[0.6875rem] font-semibold tracking-[0.2em] uppercase text-coral mb-3"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Current Rates
            </p>
            <h2
              className="text-white text-[1.75rem] md:text-[2.125rem] font-bold"
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              Jesse&rsquo;s current best rates.
            </h2>
          </div>
          <div
            className="text-sand/50 text-[0.8125rem] md:text-right max-w-[260px]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            <p className="mb-1">
              Rates vary by borrower profile. These are starting points.
            </p>
            <p>
              {updatedDate ? `Updated ${updatedDate}` : "Check back soon"}
              {" \u00b7 "}
              <button
                onClick={onBookingOpen}
                className="text-coral hover:underline cursor-pointer"
              >
                Book a call for your actual number &rarr;
              </button>
            </p>
          </div>
        </div>

        {/* Rate grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/5 rounded-xl overflow-hidden">
          {rates.map((rate, i) => (
            <div
              key={i}
              className="bg-navy-2 p-5 md:p-6 flex flex-col justify-between relative"
            >
              {rate.badge_label && (
                <span
                  className="absolute top-4 right-4 bg-coral text-white text-[0.625rem] font-semibold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {rate.badge_label}
                </span>
              )}
              <div>
                <p
                  className="text-sand/50 text-[0.75rem] font-semibold tracking-[0.1em] uppercase mb-3"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {rate.term_label}
                </p>
                <p
                  className="text-white text-[2.25rem] md:text-[2.5rem] font-bold mb-1"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  {rate.rate_value ? `${rate.rate_value}%` : "\u2014"}
                </p>
              </div>
              <p
                className="text-sand/40 text-[0.75rem] mt-3"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {rate.rate_type_label}
              </p>
            </div>
          ))}
        </div>

        {/* Footer row */}
        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p
            className="text-sand/40 text-[0.75rem] max-w-lg"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Rates shown are representative starting points for well-qualified
            borrowers. Your rate depends on down payment, credit, and property
            type.
          </p>
          <button
            onClick={onBookingOpen}
            className="bg-coral text-white font-semibold px-6 py-3 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.8125rem] whitespace-nowrap shrink-0"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Get My Actual Rate
          </button>
        </div>
      </div>
    </section>
  );
}
