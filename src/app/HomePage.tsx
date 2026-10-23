"use client";

import { useCallback, useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import Nav from "@/components/Nav";
import HomeHero from "@/components/home/HomeHero";
import WhatBringsYou from "@/components/home/WhatBringsYou";
import ReviewsStrip from "@/components/home/ReviewsStrip";
import BrokerDeck from "@/components/home/BrokerDeck";
import AboutJesse from "@/components/home/AboutJesse";
import HowItWorks from "@/components/home/HowItWorks";
import LenderTicker from "@/components/LenderTicker";
import FAQSection from "@/components/FAQSection";
import BlogPreview from "@/components/BlogPreview";
import HelpList from "@/components/home/HelpList";
import MortgageQuestions from "@/components/home/MortgageQuestions";
import StoryForm from "@/components/home/StoryForm";
import InquiryForm from "@/components/InquiryForm";
import SherwoodFooter from "@/components/SherwoodFooter";
import JesseFooter from "@/components/JesseFooter";
import HomeJsonLd from "@/components/HomeJsonLd";


export default function HomePage() {
  const [storyOpen, setStoryOpen] = useState(false);
  const openStory = useCallback(() => {
    trackEvent("email_me_click");
    setStoryOpen(true);
  }, []);
  const closeStory = useCallback(() => setStoryOpen(false), []);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const openCalendly = useCallback(() => {
    trackEvent("book_call_click");
    setInquiryOpen(true);
  }, []);
  const closeInquiry = useCallback(() => setInquiryOpen(false), []);

  // Buttons elsewhere on the page (like the Contact card) open these forms by event.
  useEffect(() => {
    window.addEventListener("open-booking-modal", openCalendly);
    window.addEventListener("open-story-form", openStory);
    return () => {
      window.removeEventListener("open-booking-modal", openCalendly);
      window.removeEventListener("open-story-form", openStory);
    };
  }, [openCalendly, openStory]);

  return (
    <>
      <HomeJsonLd />
      <Nav onBookingOpen={openCalendly} />
      <main>
        <HomeHero onSchedule={openCalendly} onEmail={openStory} />
        <WhatBringsYou />
        <ReviewsStrip />
        <BrokerDeck />
        <AboutJesse />
        <HowItWorks />
        <LenderTicker />
        <FAQSection />
        <BlogPreview />
        <HelpList />
        <MortgageQuestions onSchedule={openCalendly} onEmail={openStory} />
      </main>
      <SherwoodFooter />
      <JesseFooter />
      <StoryForm open={storyOpen} onClose={closeStory} />
      <InquiryForm open={inquiryOpen} onClose={closeInquiry} />
    </>
  );
}
