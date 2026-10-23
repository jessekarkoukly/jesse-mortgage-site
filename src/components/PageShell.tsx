"use client";

import { trackEvent } from "@/lib/analytics";
import { useCallback, useEffect, useState } from "react";
import Nav from "@/components/Nav";
import SherwoodFooter from "@/components/SherwoodFooter";
import JesseFooter from "@/components/JesseFooter";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ScrollCTA from "@/components/ScrollCTA";
import InquiryForm from "@/components/InquiryForm";
import StoryForm from "@/components/home/StoryForm";

interface PageShellProps {
  children: React.ReactNode;
  hideFloatingCTAs?: boolean;
}

export default function PageShell({ children, hideFloatingCTAs }: PageShellProps) {
  // Every "Schedule a call" button opens the short inquiry form, which leads to /thank-you and Calendly.
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const openInquiry = useCallback(() => {
    trackEvent("book_call_click");
    setInquiryOpen(true);
  }, []);
  const closeInquiry = useCallback(() => setInquiryOpen(false), []);

  // "Start the conversation" buttons open the story form.
  const [storyOpen, setStoryOpen] = useState(false);
  const closeStory = useCallback(() => setStoryOpen(false), []);
  useEffect(() => {
    const handle = () => {
      trackEvent("email_me_click");
      setStoryOpen(true);
    };
    window.addEventListener("open-story-form", handle);
    return () => window.removeEventListener("open-story-form", handle);
  }, []);

  useEffect(() => {
    const handleOpen = () => openInquiry();
    window.addEventListener("open-booking-modal", handleOpen);
    return () => window.removeEventListener("open-booking-modal", handleOpen);
  }, [openInquiry]);

  return (
    <>
      <Nav onBookingOpen={openInquiry} />
      <main>{children}</main>
      <SherwoodFooter />
      <JesseFooter />
      {!hideFloatingCTAs && <StickyMobileCTA />}
      {!hideFloatingCTAs && <ScrollCTA />}
      <InquiryForm open={inquiryOpen} onClose={closeInquiry} />
      <StoryForm open={storyOpen} onClose={closeStory} />
    </>
  );
}
