// Shared helpers for the site's own analytics (stored in Supabase, shown at /admin).
// Nothing personal is stored: no names, emails or phone numbers.

export function getSessionId(): string {
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

export function trackEvent(eventName: string): void {
  try {
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        type: "event",
        page: window.location.pathname,
        event_name: eventName,
        session_id: getSessionId(),
      }),
    }).catch(() => {});
  } catch {
    // Analytics should never break the site.
  }
}

// Which outbound link was clicked, by where it points.
export function eventForHref(href: string): string | null {
  if (href.startsWith("tel:")) return "call_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (href.includes("calendly.com")) return "book_call_click";
  if (href.includes("scarlettnetwork.com")) return "start_application_click";
  return null;
}
