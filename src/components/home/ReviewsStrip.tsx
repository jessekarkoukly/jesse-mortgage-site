import { GOOGLE_PROFILE_URL, GOOGLE_REVIEW_URL } from "./brand";

// Approved Google reviews, word for word (CLAUDE.md). No stars shown.
const REVIEWS = [
  { name: "Norah Schulman", initial: "N", color: "#7B5EA7", text: "His industry expertise and understanding of the broader economic landscape ensured we received excellent guidance when our mortgage came due. Consistently responsive, knowledgeable, and easy to work with. We felt confident every step of the way." },
  { name: "Yoni Rahamim", initial: "Y", color: "#1E8E5A", text: "I always appreciated how clearly he explained important details. He communicates well, knows his stuff, and is someone I would confidently recommend." },
  { name: "Nicole Boyle", initial: "N", color: "#C5562F", text: "Consistently delivered thoughtful, high-quality guidance and handled every situation with professionalism and care. Working with him always left us in a stronger position." },
  { name: "Rafaela Khalimov", initial: "R", color: "#1A73E8", text: "Consistently impressed by how responsive and detail-oriented he is." },
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

function Card({ r, hidden }: { r: (typeof REVIEWS)[number]; hidden?: boolean }) {
  return (
    <a
      href={GOOGLE_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className="w-[300px] shrink-0 mr-3.5 flex flex-col gap-2 rounded-xl border border-[#E2E2E2] bg-[#F8F9FA] px-[18px] py-4 hover:border-[#4F6B7A] transition-colors duration-150"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <span className="flex items-center gap-2.5">
        <span className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-white text-[14px]" style={{ background: r.color }}>{r.initial}</span>
        <b className="text-[14px] text-[#202124]">{r.name}</b>
      </span>
      <span className="text-[14px] leading-[1.5] text-[#3C4043]">{r.text}</span>
      <span className="text-[12px] text-[#5F6368]">Google review</span>
    </a>
  );
}

export default function ReviewsStrip() {
  return (
    <section aria-label="Google reviews" className="bg-white border-y border-[#E3D9CD] py-6 flex flex-col gap-4">
      <div className="max-w-6xl w-full mx-auto px-5 sm:px-6 flex flex-wrap items-center gap-x-4 gap-y-2" style={{ fontFamily: "Arial, sans-serif" }}>
        <GoogleG />
        <b className="text-[15px] text-[#202124]">Reviews on Google</b>
        <span className="ml-auto flex flex-wrap gap-x-5 gap-y-1">
          <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#1A73E8] py-2">See all reviews</a>
          <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#1A73E8] py-2">Leave a review</a>
        </span>
      </div>
      <div className="overflow-hidden w-full">
        <div className="marquee-track" style={{ animationDuration: "60s" }}>
          {REVIEWS.map((r) => <Card key={`a-${r.name}`} r={r} />)}
          {REVIEWS.map((r) => <Card key={`b-${r.name}`} r={r} hidden />)}
        </div>
      </div>
    </section>
  );
}
