"use client";

import { useCallback, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import Nav from "@/components/Nav";
import HomeHero from "@/components/home/HomeHero";
import WhatBringsYou from "@/components/home/WhatBringsYou";
import ReviewsStrip from "@/components/home/ReviewsStrip";
import type { GoogleReviews } from "@/lib/googleReviews";
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
import JesseFooter from "@/components/JesseFooter";
import HomeJsonLd from "@/components/HomeJsonLd";


export default function HomePage({ google }: { google: GoogleReviews }) {
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

  return (
    <>
      <HomeJsonLd />
      <Nav onBookingOpen={openCalendly} />
      <main>
        <HomeHero onSchedule={openCalendly} onEmail={openStory} />
        <WhatBringsYou />
        <ReviewsStrip google={google} />
        <BrokerDeck />
        <AboutJesse onStory={openStory} />
        <HowItWorks />
        <LenderTicker />
        <FAQSection />
        <BlogPreview />
        <HelpList />
        <MortgageQuestions onEmail={openStory} />
      </main>
      <JesseFooter />
      <StoryForm open={storyOpen} onClose={closeStory} />
      <InquiryForm open={inquiryOpen} onClose={closeInquiry} />
    </>
  );
}
