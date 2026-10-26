"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { B, sans } from "@/components/home/brand";
import { isEmail, submitLead } from "@/components/landing/lead";
import { metaCustom } from "@/lib/metaPixel";
import { trackEvent } from "@/lib/analytics";

export const PLAYBOOK_PATH = "/lp/first-time-buyers/playbook/read";

/**
 * Two fields for the playbook: first name and email. The lead goes to /api/leads (Supabase and Jesse's inbox),
 * then the playbook opens right away. Name and email stay in this tab so the plan form on the playbook can skip them.
 */
export default function PlaybookOptin({ id, dark = false }: { id: string; dark?: boolean }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const started = useRef(false);

  const start = () => {
    if (started.current) return;
    started.current = true;
    metaCustom("FormStart", { form: "fthb_playbook" });
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !isEmail(email)) return;
    setStatus("sending");
    const ok = await submitLead({
      name,
      email,
      inquiryType: "Playbook signup",
      message: "Asked for the Ontario First-Time Buyer Playbook.",
      source: "fthb_lp_playbook",
      website,
    });
    try { sessionStorage.setItem("jk_playbook", JSON.stringify({ name: name.trim(), email: email.trim(), fresh: ok })); } catch {}
    if (!ok) { setStatus("error"); return; }
    trackEvent("fthb_playbook_signup");
    router.push(PLAYBOOK_PATH);
  }

  const field = `w-full rounded-xl px-4 py-3.5 min-h-[54px] text-[1rem] border-[1.5px] outline-none focus:border-[#4F6B7A] ${dark ? "bg-[#4A3E37] border-[#6B5B52] text-[#F5EFE8] placeholder:text-[#C9BDB3]" : "bg-white border-[#D8CCC0] text-[#352B26] placeholder:text-[#8A7A70]"}`;
  const soft = dark ? B.onDark : B.body;

  return (
    <form id={id} onSubmit={submit} className="scroll-mt-28 flex flex-col gap-3" style={sans}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="sr-only" htmlFor={`${id}-name`}>First name</label>
          <input id={`${id}-name`} required autoComplete="given-name" value={name} onFocus={start} onChange={(e) => setName(e.target.value)} placeholder="First name" maxLength={80} className={field} />
        </div>
        <div>
          <label className="sr-only" htmlFor={`${id}-email`}>Email</label>
          <input id={`${id}-email`} required type="email" autoComplete="email" value={email} onFocus={start} onChange={(e) => setEmail(e.target.value)} placeholder="Email" maxLength={200} className={field} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className={`cursor-pointer w-full rounded-full px-7 py-4 min-h-[56px] text-[1.0625rem] font-semibold transition-colors duration-150 disabled:opacity-60 ${dark ? "bg-[#C4A592] text-[#352B26] hover:bg-[#9DB6C3]" : "bg-[#4F6B7A] text-white hover:bg-[#352B26]"}`}
      >
        {status === "sending" ? "Opening…" : "Get the playbook"}
      </button>
      {status === "error" ? (
        <p className="m-0 text-[0.9375rem] leading-snug" role="alert" style={{ color: dark ? B.linen : B.espresso }}>
          That didn&apos;t send, so I didn&apos;t get your details. <Link href={PLAYBOOK_PATH} className="underline font-semibold">Read the playbook anyway</Link>, or call or text me at <a href="tel:4162762666" className="underline">416-276-2666</a>.
        </p>
      ) : (
        <p className="m-0 text-[0.9375rem]" style={{ color: soft }}>Opens right away on the next page.</p>
      )}
      <p className="m-0 text-[0.8125rem] leading-snug" style={{ color: soft }}>
        Your information stays private and is only used to contact you directly. No spam, just the occasional market email.{" "}
        <a href="/privacy" className="underline underline-offset-2">Privacy</a>
      </p>
    </form>
  );
}
