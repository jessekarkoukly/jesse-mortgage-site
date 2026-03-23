"use client";

import { useState, useEffect } from "react";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-[#E5E7EB] shadow-[0_-2px_10px_rgba(0,0,0,0.08)] px-4 py-3 transition-all duration-300 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      }`}
    >
      <button
        onClick={() =>
          window.dispatchEvent(new CustomEvent("open-booking-modal"))
        }
        className="w-full rounded-lg bg-coral text-white font-bold text-[0.9375rem] py-3 active:bg-coral-dark active:scale-95 transition-all cursor-pointer"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        Book a Call
      </button>
    </div>
  );
}
