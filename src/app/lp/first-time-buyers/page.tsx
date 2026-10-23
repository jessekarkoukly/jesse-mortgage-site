import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import LandingPage from "@/components/landing/LandingPage";
import { FAQS } from "@/data/faqs/home";

// Ad-only landing page (Meta and ChatGPT ads). Hidden from search.
export const metadata: Metadata = {
  title: "First-Time Home Buyers in Ontario | Jesse Karkoukly",
  description: "Understand what you qualify for, the first-time buyer programs you can use and your closing costs, with a Toronto mortgage agent.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <PageShell hideFloatingCTAs>
      <LandingPage
        c={{
          label: "For first-time buyers",
          headline: "Buying your first home? Start with a clear plan.",
          intro: "I’m Jesse Karkoukly, a Toronto mortgage agent at Sherwood Mortgage Group. I help first-time buyers understand what they qualify for and build a home buying plan.",
          points: [
            { title: "What you qualify for", body: "Your maximum purchase price, the down payment you need and what your monthly payment looks like." },
            { title: "The programs you can use", body: "The FHSA (up to $40,000), the Home Buyers’ Plan (up to $60,000 from your RRSP) and up to $8,475 back on land transfer tax in Toronto." },
            { title: "Your real closing costs", body: "Land transfer tax, legal fees, title insurance and the rest, worked out for your price." },
          ],
          steps: [
            { title: "Intro call", text: "It starts with a conversation. Your situation, your timeline, what matters most to you. By the end you have a clear picture of the path forward." },
            { title: "Personalized roadmap", text: "I put together a plan based on your income, your goals and your timeline, and walk you through a few options side by side." },
            { title: "Pre-approval", text: "I shop your file across 50+ lenders and come back with real options, so you can start looking at homes with confidence." },
          ],
          faqs: [FAQS[2], FAQS[3], FAQS[0]],
        }}
      />
    </PageShell>
  );
}
