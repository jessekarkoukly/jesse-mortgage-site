import { GOOGLE_PROFILE_URL, GOOGLE_REVIEW_URL } from "./brand";

// Featured Google reviews, newest first. Each is a 5-star review on Jesse's Google Business Profile.
// The text is the opening of each review word for word, as Google shows it in its review notice;
// the full review opens on Google. No stars shown (CLAUDE.md).
const REVIEWS = [
  { name: "Rebecca Marshello", initial: "R", color: "#7B5EA7", date: "September 2026", text: "Jesse was and is fantastic to work with. Coming as a first time homeowner he had his hands full with" },
  { name: "Daniella Guzzi", initial: "D", color: "#1E8E5A", date: "September 2026", text: "We had an excellent experience working with Jesse Karkoukly and would highly recommend him to anyone" },
  { name: "Syed Aklakur Rahman", initial: "S", color: "#C5562F", date: "August 2026", text: "As a first-time homebuyer, I was extremely fortunate to have Mr. Jesse guide us through the mortgage" },
  { name: "Daniel Goldhar", initial: "D", color: "#1A73E8", date: "July 2026", text: "Jesse is a fabulous Mortgage Broker. He helped me with mine and I couldn’t have picked a better guy" },
];

function GoogleG({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.8c-.5 2.8-2.1 5.1-4.4 6.7v5.5h7.1c4.2-3.8 6.6-9.5 6.6-16.2z" />
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8.1 41.1 15.5 46 24 46z" />
      <path fill="#FBBC05" d="M11.8 28.3c-.4-1.3-.7-2.8-.7-4.3s.3-3 .7-4.3V14H4.5C3 17 2.2 20.4 2.2 24s.8 7 2.3 10l7.3-5.7z" />
      <path fill="#EA4335" d="M24 10.7c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.2 29.9 2 24 2 15.5 2 8.1 6.9 4.5 14l7.3 5.7c1.7-5.2 6.5-9 12.2-9z" />
    </svg>
  );
}

export default function ReviewsStrip() {
  return (
    <section aria-label="Google reviews" className="px-5 sm:px-6 py-14 lg:py-16" style={{ background: "#F5EFE8" }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2" style={{ fontFamily: "Arial, sans-serif" }}>
          <GoogleG />
          <b className="text-[15px] text-[#202124]">Recent reviews on Google</b>
          <span className="ml-auto flex flex-wrap gap-x-5 gap-y-1">
            <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#1558B0] py-2">See all reviews</a>
            <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#1558B0] py-2">Leave a review</a>
          </span>
        </div>
        <div className="grid gap-3.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r) => (
            <a
              key={r.name}
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-2.5 rounded-xl border border-[#E2E2E2] bg-white px-[18px] py-4 hover:border-[#4F6B7A] transition-colors duration-150"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              <span className="flex items-center gap-2.5">
                <span className="w-[32px] h-[32px] shrink-0 rounded-full flex items-center justify-center text-white text-[14px]" style={{ background: r.color }}>{r.initial}</span>
                <span className="flex flex-col">
                  <b className="text-[14px] text-[#202124]">{r.name}</b>
                  <span className="text-[12px] text-[#5F6368]">{r.date}</span>
                </span>
              </span>
              <span className="text-[14px] leading-[1.5] text-[#3C4043]">{r.text}…</span>
              <span className="mt-auto text-[13px] text-[#1558B0]">Read the full review on Google</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
