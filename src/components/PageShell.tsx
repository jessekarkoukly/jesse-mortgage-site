"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import SherwoodFooter from "@/components/SherwoodFooter";
import JesseFooter from "@/components/JesseFooter";
import BookingModal from "@/components/BookingModal";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ScrollCTA from "@/components/ScrollCTA";

interface PageShellProps {
  children: React.ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  const [modalOpen, setModalOpen] = useState(false);

  // Listen for custom event from calculator "Book a Call" button
  useEffect(() => {
    const handleOpen = () => setModalOpen(true);
    window.addEventListener("open-booking-modal", handleOpen);
    return () => window.removeEventListener("open-booking-modal", handleOpen);
  }, []);

  return (
    <>
      <Nav onBookingOpen={() => setModalOpen(true)} />
      <main>{children}</main>
      <SherwoodFooter />
      <JesseFooter />
      <StickyMobileCTA />
      <ScrollCTA />
      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
