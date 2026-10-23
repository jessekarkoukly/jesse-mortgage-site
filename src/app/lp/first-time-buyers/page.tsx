import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import FirstTimeBuyerLanding from "@/components/landing/FirstTimeBuyerLanding";

// Ad-only landing page (Meta and ChatGPT ads). Hidden from search.
export const metadata: Metadata = {
  title: "First-Time Home Buyers in Ontario | Jesse Karkoukly",
  description: "Planning to buy your first home? Toronto mortgage agent Jesse Karkoukly helps you make confident decisions and remove the overwhelm.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <PageShell>
      <FirstTimeBuyerLanding />
    </PageShell>
  );
}
