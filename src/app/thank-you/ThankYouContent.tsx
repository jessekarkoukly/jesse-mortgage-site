"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { B, CALENDLY_URL, serif, sans } from "@/components/home/brand";

export default function ThankYouContent() {
  const params = useSearchParams();
  const name = params.get("name") ?? "";
  const email = params.get("email") ?? "";
  const first = name.split(/\s+/)[0];

  // Calendly inline embed, with the visitor's name and email filled in.
  const src = useMemo(() => {
    const q = new URLSearchParams({ hide_gdpr_banner: "1", background_color: "ffffff", text_color: "352b26", primary_color: "4f6b7a" });
    if (name) q.set("name", name);
    if (email) q.set("email", email);
    return `${CALENDLY_URL}?${q.toString()}`;
  }, [name, email]);

  useEffect(() => {
    if (document.querySelector('script[src*="assets.calendly.com"]')) return;
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <section className="px-5 sm:px-6 pt-24 lg:pt-32 pb-16" style={{ background: B.linen }}>
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        <h1 className="m-0 text-[2.25rem] sm:text-[3rem] leading-[1.1]" style={{ ...serif, fontWeight: 500, color: B.espresso }}>
          {first ? `Thanks, ${first}.` : "Thanks for reaching out."}
        </h1>
        <p className="m-0 text-[1.0625rem] sm:text-[1.1875rem] leading-relaxed max-w-xl" style={{ ...sans, color: B.body }}>
          Looking forward to connecting with you.
        </p>
        <div className="calendly-inline-widget mt-4 rounded-2xl overflow-hidden bg-white" data-url={src} style={{ minWidth: 320, height: 700 }} />
      </div>
    </section>
  );
}
