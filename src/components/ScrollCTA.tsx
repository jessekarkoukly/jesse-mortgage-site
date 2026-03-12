"use client";

import { useState, useEffect } from "react";

export default function ScrollCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if already dismissed this session
    if (sessionStorage.getItem("scroll-cta-dismissed") === "true") {
      setDismissed(true);
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = scrollTop / docHeight;
      if (pct >= 0.7) {
        setScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show with a slight delay after scroll threshold is met
  useEffect(() => {
    if (!scrolled || dismissed) return;
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, [scrolled, dismissed]);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem("scroll-cta-dismissed", "true");
    // Let fade-out finish before unmounting
    setTimeout(() => setDismissed(true), 300);
  };

  const handleBookCall = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
    handleDismiss();
  };

  if (dismissed) return null;

  return (
    <div
      className={`
        hidden lg:block fixed bottom-6 right-6 z-40
        max-w-[280px] w-full
        bg-white rounded-xl shadow-lg border border-sand-2
        p-5
        transition-all duration-300 ease-out
        ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}
      `}
    >
      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        aria-label="Dismiss"
        className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center text-slate hover:text-navy transition-colors rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Content */}
      <p
        className="text-navy font-bold text-[1rem] leading-snug"
        style={{ fontFamily: "var(--font-spectral)" }}
      >
        Have questions?
      </p>
      <p
        className="text-navy-2 text-[0.8125rem] mt-1 leading-snug"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        Book a 20-minute call with Jesse.
      </p>

      {/* CTA */}
      <button
        onClick={handleBookCall}
        className="mt-3 w-full bg-coral hover:bg-coral-dark text-white font-semibold text-[0.8125rem] py-2.5 rounded-lg transition-colors"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        Book a Call
      </button>
    </div>
  );
}
