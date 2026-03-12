import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ServicePageLayout from "@/components/ServicePageLayout";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "Restructure & Equity Take Out | Toronto Mortgage Agent Jesse Karkoukly",
  description:
    "Access the equity in your home for renovations, investments, or life events. Understand your options and the true cost before making any changes.",
  alternates: { canonical: "/services/equity-takeout" },
  keywords: [
    "home equity loan Ontario",
    "equity takeout mortgage Toronto",
    "refinance home equity",
    "home equity line of credit Ontario",
    "mortgage restructure Toronto",
    "cash out refinance Canada",
  ],
  openGraph: {
    title: "Restructure & Equity Take Out | Jesse Karkoukly",
    description:
      "Your home equity is an asset. Let's talk about how to use it wisely.",
    url: "https://jessekarkoukly.com/services/equity-takeout",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

export default function EquityTakeoutPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }, { name: "Equity Takeout", href: "/services/equity-takeout" }]} />
      <ServicePageLayout
        eyebrow="Restructure / Equity Take Out"
        title="Your home equity is an asset. Let's talk about how to use it wisely."
        intro="Whether you are renovating, investing, helping a family member, or just want to improve your cash flow, your home equity gives you options. I help you understand what is available and what it actually costs."
        sections={[
          {
            heading: "How it works",
            body: "A refinance lets you access up to 80% of your home's current value, minus what you still owe. The difference is available to you as cash. You can use it for almost anything. The key is understanding how it changes your mortgage and your monthly payments.",
          },
          {
            heading: "Common reasons",
            body: "Home renovations, investment property down payments, paying for education, helping adult children buy their first home, or consolidating other debts. Each situation has different considerations. I walk you through the numbers so you can make an informed decision.",
          },
          {
            heading: "What to consider",
            body: "Breaking your current mortgage early may come with a penalty. I calculate that upfront so there are no surprises. In many cases, the savings or benefits outweigh the cost. But you should see the full picture before deciding.",
          },
        ]}
        bullets={[
          "Access the equity you have built for renovations, investments, or life events",
          "Restructure your mortgage to improve cash flow",
          "Understand the true cost before making any changes",
          "Options beyond what your bank will show you",
        ]}
      />
    </PageShell>
  );
}
