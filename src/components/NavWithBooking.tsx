"use client";

import { trackEvent } from "@/lib/analytics";
import Nav from "@/components/Nav";

import { CALENDLY_URL } from "@/components/home/brand";

export default function NavWithBooking() {
  return (
    <Nav
      onBookingOpen={() => {
        trackEvent("book_call_click");
        window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
      }}
    />
  );
}
