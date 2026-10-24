"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { B, CALENDLY_URL, serif, sans } from "@/components/home/brand";
import { metaTrack } from "@/lib/metaPixel";

export default function ThankYouContent() {
  // Name and email from the inquiry form, kept in this browser tab only.
  const raw = useSyncExternalStore(
    () => () => {},
    () => { try { return sessionStorage.getItem("jk_inquiry") ?? ""; } catch { return ""; } },
    () => "",
  );
  const { name, email, plan } = useMemo(() => {
    try { const v = JSON.parse(raw); return { name: String(v.name ?? ""), email: String(v.email ?? ""), plan: v.from === "plan" }; }
    catch { return { name: "", email: "", plan: false }; }
  }, [raw]);
  const first = name.split(/\s+/)[0];

  // Calendly inline embed, with the visitor's name and email filled in.
  const src = useMemo(() => {
    const q = new URLSearchParams({ background_color: "f5efe8", text_color: "352b26", primary_color: "4f6b7a" });
    if (name) q.set("name", name);
    if (email) q.set("email", email);
    return `${CALENDLY_URL}?${q.toString()}`;
  }, [name, email]);

  // A completed form lands here, so this is the lead Meta counts.
  useEffect(() => { metaTrack("Lead"); }, []);

  useEffect(() => {
    const w = window as unknown as { Calendly?: { initInlineWidgets?: () => void } };
    if (w.Calendly?.initInlineWidgets) { w.Calendly.initInlineWidgets(); return; }
    if (document.querySelector('script[src*="assets.calendly.com"]')) return;
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, [src]);

  return (
    <section className="px-5 sm:px-6 pt-24 lg:pt-32 pb-16" style={{ background: B.linen }}>
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        <h1 className="m-0 text-[2.25rem] sm:text-[3rem] leading-[1.1]" style={{ ...serif, fontWeight: 500, color: B.espresso }}>
          {first ? `Thanks, ${first}.` : "Thanks for reaching out."}
        </h1>
        <p className="m-0 text-[1.0625rem] sm:text-[1.1875rem] leading-relaxed max-w-xl" style={{ ...sans, color: B.body }}>
          {plan ? "Last step: pick a time below to go through your plan with me." : "Looking forward to connecting with you."}
        </p>
        <div key={src} className="calendly-inline-widget mt-2" data-url={src} style={{ minWidth: 320, height: 700 }} />
      </div>
    </section>
  );
}
