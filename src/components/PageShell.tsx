"use client";

import { useEffect } from "react";
import Nav from "@/components/Nav";
import SherwoodFooter from "@/components/SherwoodFooter";
import JesseFooter from "@/components/JesseFooter";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ScrollCTA from "@/components/ScrollCTA";

const CALENDLY_URL = "https://calendly.com/working-with-jesse/30min";

function openCalendly() {
  window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
}

interface PageShellProps {
  children: React.ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  // Listen for custom event from "Book a Call" buttons across the site
  useEffect(() => {
    const handleOpen = () => openCalendly();
    window.addEventListener("open-booking-modal", handleOpen);
    return () => window.removeEventListener("open-booking-modal", handleOpen);
  }, []);

  return (
    <>
      <Nav onBookingOpen={openCalendly} />
      <main>{children}</main>
      <SherwoodFooter />
      <JesseFooter />
      <StickyMobileCTA />
      <ScrollCTA />
    </>
  );
}
