import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import LandingPage from "@/components/landing/LandingPage";
import { FAQS } from "@/data/faqs/home";
import { REFINANCING_FAQ } from "@/data/faqs/refinancing";

// Ad-only landing page (Meta and ChatGPT ads). Hidden from search.
export const metadata: Metadata = {
  title: "Refinancing Your Mortgage in Ontario | Jesse Karkoukly",
  description: "See your penalty, your savings and your options side by side before you refinance, with a Toronto mortgage agent.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <PageShell hideFloatingCTAs>
      <LandingPage
        c={{
          label: "For homeowners",
          headline: "Thinking about refinancing? See your options first.",
          intro: "I’m Jesse Karkoukly, a Toronto mortgage agent at Sherwood Mortgage Group. I help homeowners refinance, use their equity or roll debt into their mortgage, with the numbers laid out before anything changes.",
          points: [
            { title: "Your exact penalty", body: "What it actually costs to break your current mortgage, worked out for your lender." },
            { title: "Your real savings", body: "Your new rate and payment across 50+ lenders, and the point where refinancing pays for itself." },
            { title: "Your options side by side", body: "Refinancing, a blend-and-extend with your current lender, or using your equity without breaking your mortgage." },
          ],
          steps: [
            { title: "Tell me your situation", text: "Your current rate, balance, how long is left on your term and what you are trying to accomplish. No documents yet." },
            { title: "I run the numbers", text: "Exact penalty, exact savings, exact break-even. I compare your current lender with options across 50+ lenders." },
            { title: "You get an honest recommendation", text: "If breaking is not worth it, I will tell you. If it is, I handle everything from application to closing." },
          ],
          faqs: [
            // No calculator on this page, so drop the line that points to one.
            { ...REFINANCING_FAQ[0], a: REFINANCING_FAQ[0].a.replace(" That is what the calculator above does.", "") },
            REFINANCING_FAQ[2],
            FAQS[0],
          ],
        }}
      />
    </PageShell>
  );
}
