"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface NavProps {
  onBookingOpen: () => void;
}

const SERVICE_LINKS = [
  { label: "First-Time Buyers", href: "/services/first-time-buyers" },
  { label: "Pre-Approval", href: "/services/pre-approval" },
  { label: "Self-Employed", href: "/services/self-employed" },
  { label: "Mortgage Renewal", href: "/services/renewal" },
  { label: "Refinancing", href: "/services/refinancing" },
  { label: "Debt Consolidation", href: "/services/debt-consolidation" },
  { label: "Cottage & Vacation", href: "/services/cottage" },
  { label: "Specialty Programs", href: "/services/specialty" },
];

export default function Nav({ onBookingOpen }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close dropdown on outside click */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const navLinks = [
    { label: "Rates", href: "/rates" },
    { label: "Calculators", href: "/calculators" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-[0_2px_12px_rgba(30,45,61,0.10)]" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none select-none shrink-0">
          <span
            className="text-[1.5rem] lg:text-[2.25rem] font-bold text-navy"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Jesse<span className="text-coral">.</span>
          </span>
          <span
            className="text-[0.8rem] lg:text-[1.15rem] font-normal text-slate -mt-1"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Karkoukly
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Services dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-1.5 text-[1rem] font-semibold text-navy hover:text-coral transition-colors duration-150 cursor-pointer"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Services
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              >
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {servicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                <div className="bg-white rounded-xl border border-sand-2 shadow-lg py-2.5 min-w-[240px]">
                  {SERVICE_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setServicesOpen(false)}
                      className="block px-5 py-2.5 text-[0.9375rem] font-medium text-navy hover:text-coral hover:bg-sand/50 transition-colors"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[1rem] font-semibold text-navy hover:text-coral transition-colors duration-150"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right actions */}
        <div className="hidden lg:flex items-center gap-5">
          <a
            href="tel:4162762666"
            className="text-[1rem] font-semibold text-navy hover:text-coral transition-colors duration-150"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            416-276-2666
          </a>
          <button
            onClick={onBookingOpen}
            className="bg-navy text-white text-[1rem] font-semibold px-7 py-3 rounded-lg hover:bg-navy-2 hover:scale-[1.03] active:scale-95 transition-all duration-150 cursor-pointer"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Book a Call
          </button>
        </div>

        {/* Mobile: phone + hamburger */}
        <div className="flex lg:hidden items-center gap-2 sm:gap-3">
          <a
            href="tel:4162762666"
            aria-label="Call 416-276-2666"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="#E8705A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="p-2 text-navy min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-sand-2 px-6 pb-6 pt-4">
          <nav className="flex flex-col gap-4 mb-6">
            {/* Services with expandable sub-links */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center gap-1.5 text-[1rem] font-semibold text-navy hover:text-coral transition-colors cursor-pointer"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Services
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {mobileServicesOpen && (
                <div className="flex flex-col gap-3 mt-3 ml-4 border-l-2 border-sand-2 pl-4">
                  {SERVICE_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-[0.9375rem] text-navy-2 font-medium hover:text-coral transition-colors"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[1rem] font-semibold text-navy hover:text-coral transition-colors"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <a
              href="tel:4162762666"
              className="w-full text-center border-2 border-navy text-navy font-semibold py-3 rounded hover:bg-navy hover:text-white active:scale-95 transition-all"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              416-276-2666
            </a>
            <button
              onClick={() => { setMenuOpen(false); onBookingOpen(); }}
              className="w-full bg-navy text-white font-semibold py-3 rounded hover:bg-navy-2 active:scale-95 transition-all cursor-pointer"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Book a Call
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
