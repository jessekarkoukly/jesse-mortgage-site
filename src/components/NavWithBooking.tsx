"use client";

import Nav from "@/components/Nav";

const CALENDLY_URL = "https://calendly.com/working-with-jesse/30min";

export default function NavWithBooking() {
  return (
    <Nav
      onBookingOpen={() =>
        window.open(CALENDLY_URL, "_blank", "noopener,noreferrer")
      }
    />
  );
}
