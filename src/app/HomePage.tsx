"use client";

import { useCallback, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import Nav from "@/components/Nav";
import HomeHero from "@/components/home/HomeHero";
import WhatBringsYou from "@/components/home/WhatBringsYou";
import ReviewsStrip from "@/components/home/ReviewsStrip";
import BrokerDeck from "@/components/home/BrokerDeck";
import AboutJesse from "@/components/home/AboutJesse";
import HowItWorks from "@/components/home/HowItWorks";
import FAQSection from "@/components/FAQSection";
import BlogPreview from "@/components/BlogPreview";
import HelpList from "@/components/home/HelpList";
import MortgageQuestions from "@/components/home/MortgageQuestions";
import StoryForm from "@/components/home/StoryForm";
import SherwoodFooter from "@/components/SherwoodFooter";
import JesseFooter from "@/components/JesseFooter";
import HomeJsonLd from "@/components/HomeJsonLd";
import { CALENDLY_URL } from "@/components/home/brand";

function openCalendly() {
  trackEvent("book_call_click");
  window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
}

export default function HomePage() {
  const [storyOpen, setStoryOpen] = useState(false);
  const openStory = useCallback(() => {
    trackEvent("email_me_click");
    setStoryOpen(true);
  }, []);
  const closeStory = useCallback(() => setStoryOpen(false), []);

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
        <FAQSection />
        <BlogPreview />
        <HelpList />
        <MortgageQuestions onSchedule={openCalendly} onEmail={openStory} />
      </main>
      <SherwoodFooter />
      <JesseFooter />
      <StoryForm open={storyOpen} onClose={closeStory} />
    </>
  );
}
