"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import LenderTicker from "@/components/LenderTicker";
import HowICanHelp from "@/components/HowICanHelp";
import ProcessAccordion from "@/components/ProcessAccordion";
import AboutSection from "@/components/AboutSection";
import BrokerVsBank from "@/components/BrokerVsBank";
import BlogPreview from "@/components/BlogPreview";
import FAQSection from "@/components/FAQSection";
import EmailCapture from "@/components/EmailCapture";
import RenewalCapture from "@/components/RenewalCapture";
import SherwoodFooter from "@/components/SherwoodFooter";
import JesseFooter from "@/components/JesseFooter";
import BookingModal from "@/components/BookingModal";
import HomeJsonLd from "@/components/HomeJsonLd";

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <HomeJsonLd />
      <Nav onBookingOpen={() => setBookingOpen(true)} />
      <main>
        <Hero onBookingOpen={() => setBookingOpen(true)} />
        <LenderTicker />
        <HowICanHelp onBookingOpen={() => setBookingOpen(true)} />
        <ProcessAccordion />
        <AboutSection />
        <BrokerVsBank />
        <BlogPreview />
        <FAQSection />
        <EmailCapture />
        <RenewalCapture />
      </main>
      <SherwoodFooter />
      <JesseFooter />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
