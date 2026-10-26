"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { B, sans } from "@/components/home/brand";
import { metaTrack } from "@/lib/metaPixel";
import { trackEvent } from "@/lib/analytics";

/**
 * "Thanks, [name]. Here's your playbook." for someone who just signed up, and the playbook conversion for Meta
 * (CompleteRegistration, kept apart from the Lead on /thank-you). Name comes from this tab's sessionStorage only.
 */
export default function PlaybookWelcome() {
  const raw = useSyncExternalStore(
    () => () => {},
    () => { try { return sessionStorage.getItem("jk_playbook") ?? ""; } catch { return ""; } },
    () => "",
  );
  const { first, fresh } = useMemo(() => {
    try {
      const v = JSON.parse(raw);
      return { first: String(v.name ?? "").trim().split(/\s+/)[0] ?? "", fresh: v.fresh === true };
    } catch {
      return { first: "", fresh: false };
    }
  }, [raw]);

  useEffect(() => {
    if (!fresh) return;
    metaTrack("CompleteRegistration", { content_name: "fthb_playbook" });
    trackEvent("fthb_playbook_opened");
    try {
      const v = JSON.parse(sessionStorage.getItem("jk_playbook") ?? "{}");
      sessionStorage.setItem("jk_playbook", JSON.stringify({ ...v, fresh: false }));
    } catch {}
  }, [fresh]);

  if (!first) return null;
  return (
    <div className="px-5 sm:px-6 py-4" style={{ background: B.skyDeep }}>
      <p className="max-w-6xl mx-auto m-0 text-[1rem] sm:text-[1.0625rem] leading-snug" style={{ ...sans, color: B.white }}>
        <span className="font-semibold">Thanks, {first}. Here’s your playbook.</span> Bookmark this page to come back to it.
      </p>
    </div>
  );
}
