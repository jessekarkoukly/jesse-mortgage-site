"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getDevice(): "mobile" | "tablet" | "desktop" {
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem("__sid");
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem("__sid", id);
    }
    return id;
  } catch {
    return "unknown";
  }
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

  return null;
}
