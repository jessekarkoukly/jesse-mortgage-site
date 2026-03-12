"use client";

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
import HomeJsonLd from "@/components/HomeJsonLd";

const CALENDLY_URL = "https://calendly.com/working-with-jesse/30min";

function openCalendly() {
  window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
}

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <Nav onBookingOpen={openCalendly} />
      <main>
        <Hero onBookingOpen={openCalendly} />
        <LenderTicker />
        <AboutSection />
        <HowICanHelp onBookingOpen={openCalendly} />
        <BrokerVsBank />
        <ProcessAccordion />
        <FAQSection />
        <BlogPreview />
        <EmailCapture />
        <RenewalCapture />
      </main>
      <SherwoodFooter />
      <JesseFooter />
    </>
  );
}
