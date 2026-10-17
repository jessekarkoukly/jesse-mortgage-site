import type { Metadata } from "next";
import { social } from "@/lib/seo";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Privacy Policy | Jesse Karkoukly",
  description:
    "How Jesse Karkoukly collects, uses and protects your personal information on jessekarkoukly.com, in line with Canadian privacy law (PIPEDA).",
  alternates: { canonical: "/privacy" },
  ...social("Privacy Policy | Jesse Karkoukly", "How Jesse Karkoukly collects, uses and protects your personal information on jessekarkoukly.com, in line with Canadian privacy law (PIPEDA).", "/privacy"),
};

const UPDATED = "October 17, 2026";
const CONTACT_EMAIL = "jkarkoukly@sherwoodmortgagegroup.com";

const SECTIONS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Who I am",
    body: (
      <p>
        This website is run by Jesse Karkoukly, Mortgage Agent Level 1 (Lic. M25003068), with
        Sherwood Mortgage Group (Brokerage Lic. 12176). I follow Canada&apos;s Personal Information
        Protection and Electronic Documents Act (PIPEDA). If you have a question about your
        information, email me at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    ),
  },
  {
    heading: "What I collect",
    body: (
      <ul className="list-disc pl-6 flex flex-col gap-2">
        <li>
          <b>What you give me in a form.</b> Your name, email, phone number, and any details you
          share, like your renewal date or calculator inputs.
        </li>
        <li>
          <b>Anonymous visit data.</b> The page you viewed, the site that sent you, your device
          type, a random session ID, campaign tags in the link (UTM), the first page you landed
          on, and which buttons you clicked. This does not identify you by name.
        </li>
      </ul>
    ),
  },
  {
    heading: "How I use it",
    body: (
      <ul className="list-disc pl-6 flex flex-col gap-2">
        <li>To reply to you and help with your mortgage questions.</li>
        <li>To send the report, reminder or emails you asked for.</li>
        <li>To understand which pages help people, so I can improve the site.</li>
      </ul>
    ),
  },
  {
    heading: "Who else handles it",
    body: (
      <>
        <p>I use a few trusted services to run this site. Each one only gets what it needs.</p>
        <ul className="list-disc pl-6 flex flex-col gap-2 mt-3">
          <li>
            <b>Supabase</b> stores form submissions and visit data.
          </li>
          <li>
            <b>Resend</b> sends email notifications and the emails you sign up for.
          </li>
          <li>
            <b>Vercel</b> hosts the website.
          </li>
          <li>
            <b>Calendly</b> handles booking when you schedule a call.
          </li>
          <li>
            <b>Scarlett Network</b> handles your mortgage application if you start one.
          </li>
        </ul>
        <p className="mt-3">
          Some of these services store data outside Canada, including in the United States, where
          local laws apply. I never sell your information.
        </p>
      </>
    ),
  },
  {
    heading: "Emails and consent",
    body: (
      <p>
        I only email you if you sign up or ask me to. Every email has an unsubscribe link, and you
        can also just reply and ask me to stop. This follows Canada&apos;s Anti-Spam Legislation
        (CASL).
      </p>
    ),
  },
  {
    heading: "How long I keep it",
    body: (
      <p>
        I keep your information only as long as I need it to help you, or as long as the law
        requires for mortgage records. Then I delete it.
      </p>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <p>
        You can ask to see the information I have about you, correct it, or have it deleted. Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
          {CONTACT_EMAIL}
        </a>{" "}
        and I will respond within 30 days. If you are not happy with my answer, you can contact
        the Office of the Privacy Commissioner of Canada.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <PageShell hideFloatingCTAs>
      <section className="bg-sand pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-[0.75rem] font-semibold text-coral uppercase tracking-widest mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Privacy
          </p>
          <h1
            className="text-[2.5rem] sm:text-[3rem] font-bold text-navy leading-tight mb-4"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Privacy Policy<span className="text-coral">.</span>
          </h1>
          <p
            className="text-[0.875rem] text-navy-2/70 mb-12"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Last updated {UPDATED}
          </p>
          <div
            className="flex flex-col gap-10 text-[1.0625rem] text-navy-2 leading-relaxed"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            {SECTIONS.map((s) => (
              <div key={s.heading}>
                <h2
                  className="text-[1.5rem] font-bold text-navy mb-3"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  {s.heading}
                </h2>
                {s.body}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
