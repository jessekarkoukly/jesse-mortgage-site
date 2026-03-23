"use client";

import { useState } from "react";

interface EmailCaptureProps {
  variant?: "sand" | "navy";
  heading?: string;
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="6" r="1.5" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 114 0v4M11 10v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function EmailCapture({ variant = "sand", heading }: EmailCaptureProps) {
  const isNavy = variant === "navy";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/email-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage" }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className={`${isNavy ? "bg-navy py-20 sm:py-24" : "bg-sand py-16"} px-6`}>
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className={`font-bold leading-tight mb-4 ${isNavy ? "text-[2.25rem] sm:text-[2.75rem] text-white" : "text-[1.75rem] sm:text-[2rem] text-navy"}`}
          style={{ fontFamily: "var(--font-spectral)" }}
        >
          {heading || "Stay connected"}<span className="text-coral">.</span>
        </h2>
        <p
          className={`leading-relaxed mb-10 ${isNavy ? "text-[1rem] text-slate" : "text-[0.9375rem] text-navy-2"}`}
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          I keep an eye on what&#39;s happening in the Ontario market so you don&#39;t have to.
          When something&#39;s worth knowing, I&#39;ll send it your way.
        </p>

        {/* Email subscribe */}
        <div className="max-w-md mx-auto">
          {status === "success" ? (
            <p
              className="text-coral font-semibold text-[0.9375rem]"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              You are on the list. Talk soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className={`flex-1 border-2 rounded-lg focus:outline-none focus:border-coral transition-colors ${isNavy ? "px-5 py-3.5 text-[1rem] border-navy-2 bg-white/10 text-white placeholder:text-slate" : "px-4 py-3 text-[0.9375rem] border-sand-2 bg-white text-navy"}`}
                style={{ fontFamily: "var(--font-jakarta)" }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className={`font-semibold rounded-lg disabled:opacity-50 transition-all cursor-pointer whitespace-nowrap shrink-0 hover:scale-[1.03] active:scale-95 ${isNavy ? "px-8 py-3.5 text-[1rem] bg-coral text-white hover:bg-coral-dark shadow-lg shadow-coral/20" : "px-6 py-3 text-[0.875rem] bg-navy text-white hover:bg-navy-2"}`}
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p
              className="text-coral text-[0.8125rem] mt-3"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Something went wrong. Try again or email Jesse directly.
            </p>
          )}
        </div>

        {/* Socials */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span
            className={`text-[0.8125rem] ${isNavy ? "text-slate" : "text-navy-2"}`}
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Follow along
          </span>
          <div className={`w-8 h-px ${isNavy ? "bg-white/15" : "bg-sand-2"}`} />
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/jkarkoukly/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-[0.8125rem] text-white transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
              style={{
                fontFamily: "var(--font-jakarta)",
                background: "linear-gradient(135deg, #833AB4, #E1306C, #F77737)",
              }}
            >
              <InstagramIcon />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.linkedin.com/in/jessekarkoukly/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-[0.8125rem] text-white transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
              style={{
                fontFamily: "var(--font-jakarta)",
                background: "linear-gradient(135deg, #0077B5, #0A66C2, #004182)",
              }}
            >
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
