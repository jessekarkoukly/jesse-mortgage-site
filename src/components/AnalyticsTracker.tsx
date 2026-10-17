"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getSessionId, eventForHref, trackEvent } from "@/lib/analytics";

// UTM tags and the first page of the visit, kept for the whole session.
function getVisitSource() {
  try {
    let stored = sessionStorage.getItem("__src");
    if (!stored) {
      const params = new URLSearchParams(window.location.search);
      stored = JSON.stringify({
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
        landing_page: window.location.pathname,
      });
      sessionStorage.setItem("__src", stored);
    }
    return JSON.parse(stored);
  } catch {
    return {};
  }
}

function getDevice(): "mobile" | "tablet" | "desktop" {
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const startTime = useRef(Date.now());
  const pageviewId = useRef<string | null>(null);
  const hasSentDuration = useRef(false);

  useEffect(() => {
    // Never track admin pages
    if (pathname.startsWith("/admin")) return;

    startTime.current = Date.now();
    pageviewId.current = null;
    hasSentDuration.current = false;

    const session_id = getSessionId();

    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        type: "pageview",
        page: pathname,
        referrer: document.referrer || null,
        device: getDevice(),
        session_id,
        ...getVisitSource(),
      }),
    })
      .then((r) => r.json())
      .then((d) => { pageviewId.current = d.id ?? null; })
      .catch(() => {});

    const sendDuration = () => {
      if (hasSentDuration.current || !pageviewId.current) return;
      hasSentDuration.current = true;
      const duration = Math.round((Date.now() - startTime.current) / 1000);
      if (duration < 2) return;
      const payload = JSON.stringify({
        type: "duration",
        id: pageviewId.current,
        duration_seconds: duration,
      });
      try {
        navigator.sendBeacon(
          "/api/analytics/track",
          new Blob([payload], { type: "application/json" })
        );
      } catch {
        fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          keepalive: true,
          body: payload,
        }).catch(() => {});
      }
    };

    window.addEventListener("beforeunload", sendDuration);
    return () => {
      sendDuration(); // fires on client-side route change
      window.removeEventListener("beforeunload", sendDuration);
    };
  }, [pathname]);

  // Count clicks on call, email, booking and application links anywhere on the site.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.("a");
      const href = link?.getAttribute("href");
      if (!href) return;
      const name = eventForHref(href);
      if (name) trackEvent(name);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
