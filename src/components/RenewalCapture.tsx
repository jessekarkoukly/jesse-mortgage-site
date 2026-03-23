"use client";

import { useState } from "react";

export default function RenewalCapture() {
  const [email, setEmail] = useState("");
  const [renewalDate, setRenewalDate] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !renewalDate) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/renewal-reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, renewal_date: renewalDate }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
      setRenewalDate("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-navy py-16 px-6">
      <div className="max-w-xl mx-auto text-center">
        <p
          className="text-[0.6875rem] font-semibold text-coral tracking-[0.2em] uppercase mb-3"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Renewal Tracker
        </p>
        <h2
          className="text-[1.75rem] sm:text-[2rem] font-bold text-white leading-tight mb-3"
          style={{ fontFamily: "var(--font-spectral)" }}
        >
          When is your renewal coming up?
        </h2>
        <p
          className="text-[0.9375rem] text-sand/70 leading-relaxed mb-8 max-w-md mx-auto"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Drop your email and the date your current mortgage term ends.
          I&#39;ll reach out 120 days before so there&#39;s time to look at
          your options and go into your renewal with a plan.
        </p>

        {status === "success" ? (
          <p
            className="text-coral font-semibold text-[0.9375rem]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Got it. You will hear from Jesse well before your renewal date.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="flex-1 border-2 border-white/10 bg-navy-2 rounded-lg px-4 py-3 text-white text-[0.9375rem] placeholder:text-sand/40 focus:outline-none focus:border-coral transition-colors"
                style={{ fontFamily: "var(--font-jakarta)" }}
              />
              <input
                type="date"
                value={renewalDate}
                onChange={(e) => setRenewalDate(e.target.value)}
                required
                aria-label="Mortgage term end date"
                className="border-2 border-white/10 bg-navy-2 rounded-lg px-4 py-3 text-white text-[0.9375rem] focus:outline-none focus:border-coral transition-colors [color-scheme:dark]"
                style={{ fontFamily: "var(--font-jakarta)" }}
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full sm:w-auto bg-coral text-white font-semibold px-8 py-3 rounded-lg hover:bg-coral-dark hover:scale-[1.03] active:scale-95 disabled:opacity-50 transition-all cursor-pointer text-[0.875rem]"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              {status === "loading" ? "Saving..." : "Remind Me"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p
            className="text-coral/80 text-[0.8125rem] mt-3"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Something went wrong. Try again or call 416-276-2666.
          </p>
        )}
      </div>
    </section>
  );
}
