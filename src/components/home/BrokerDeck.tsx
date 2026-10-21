"use client";

import { useEffect, useRef, useState, type PointerEvent as RPointerEvent, type ReactNode } from "react";
import { B, serif, sans } from "./brand";

// Soft linen drawing colours (picked from the colour test)
const P = { m: "#A89A8E", l: "#EDE5DC", c: "#D9C7B8", d: "#CFC3B8", s: "#9DB6C3", panel: "#3F342E", doc: "#4A3E37" };

function Doors() {
  return (
    <svg viewBox="0 0 320 240" className="w-full h-auto" aria-hidden="true">
      <rect width="320" height="240" rx="20" fill={P.panel} />
      <g fill="none" stroke={P.m} strokeWidth="2">
        <path d="M22 196V136a22 22 0 0 1 44 0v60z" /><path d="M82 196V136a22 22 0 0 1 44 0v60z" />
        <path d="M142 196V136a22 22 0 0 1 44 0v60z" /><path d="M262 196V136a22 22 0 0 1 44 0v60z" />
      </g>
      <path d="M202 196V136a22 22 0 0 1 44 0v60z" fill={P.c} />
      <g fill={B.linen}>
        <rect x="208" y="128" width="4" height="66" rx="2" opacity="0.5" /><rect x="216" y="120" width="4" height="74" rx="2" opacity="0.65" />
        <rect x="224" y="118" width="4" height="76" rx="2" opacity="0.8" /><rect x="232" y="120" width="4" height="74" rx="2" opacity="0.9" />
        <rect x="240" y="128" width="4" height="66" rx="2" />
      </g>
      <line x1="14" y1="197" x2="306" y2="197" stroke={P.m} strokeWidth="2" />
      <circle cx="224" cy="80" r="20" fill={P.s} />
      <path d="M215 80l6 6 12-13" fill="none" stroke={B.espresso} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OneCheck() {
  return (
    <svg viewBox="0 0 320 240" className="w-full h-auto" aria-hidden="true">
      <rect width="320" height="240" rx="20" fill={P.panel} />
      <g fill="none" stroke={P.s} strokeWidth="2" strokeDasharray="4 5">
        <path d="M128 92C170 92 180 62 222 62" /><path d="M128 120H222" /><path d="M128 148C170 148 180 178 222 178" />
      </g>
      <rect x="34" y="50" width="94" height="140" rx="12" fill={P.doc} stroke={P.l} strokeWidth="2" />
      <g stroke={P.d} strokeWidth="5" strokeLinecap="round"><path d="M52 80h58" /><path d="M52 98h44" /><path d="M52 116h58" /><path d="M52 134h36" /></g>
      <circle cx="112" cy="174" r="20" fill={P.s} />
      <text x="112" y="181" textAnchor="middle" fontFamily="Georgia, serif" fontSize="20" fill={B.espresso}>1</text>
      <g fill="none" stroke={P.l} strokeWidth="2">
        <path d="M226 84V62a16 16 0 0 1 32 0v22z" /><path d="M226 142V120a16 16 0 0 1 32 0v22z" /><path d="M226 200V178a16 16 0 0 1 32 0v22z" />
      </g>
      <g fill={P.c}><circle cx="270" cy="70" r="5" /><circle cx="270" cy="128" r="5" /><circle cx="270" cy="186" r="5" /></g>
    </svg>
  );
}

function Compete() {
  return (
    <svg viewBox="0 0 320 240" className="w-full h-auto" aria-hidden="true">
      <rect width="320" height="240" rx="20" fill={P.panel} />
      <g fill="none" stroke={P.m} strokeWidth="2">
        <path d="M30 92V70a16 16 0 0 1 32 0v22z" /><path d="M258 92V70a16 16 0 0 1 32 0v22z" />
        <path d="M30 202V180a16 16 0 0 1 32 0v22z" /><path d="M258 202V180a16 16 0 0 1 32 0v22z" />
      </g>
      <g fill="none" stroke={P.l} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M72 84l52 26" /><path d="M114 100l10 10-14 2" /><path d="M248 84l-52 26" /><path d="M206 100l-10 10 14 2" />
        <path d="M72 186l52-26" /><path d="M114 170l10-10-14-2" /><path d="M248 186l-52-26" /><path d="M206 170l-10-10 14-2" />
      </g>
      <circle cx="160" cy="135" r="38" fill={P.c} />
      <circle cx="160" cy="124" r="11" fill={B.espresso} />
      <path d="M140 156a20 18 0 0 1 40 0" fill={B.espresso} />
      <text x="160" y="36" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="16" fill={P.s}>lenders compete for you</text>
    </svg>
  );
}

function PathToDoor() {
  const slats = ["#E6E2DC", "#E2D9CF", "#DCCFC2", "#D3C3B4", "#C9B6A5"];
  return (
    <svg viewBox="0 0 320 240" className="w-full h-auto" aria-hidden="true">
      <defs><clipPath id="jk-door-clip"><path d="M226 204V96a32 32 0 0 1 64 0v108z" /></clipPath></defs>
      <rect width="320" height="240" rx="20" fill={P.panel} />
      <path d="M24 214C80 214 70 150 124 150S180 196 220 200" fill="none" stroke={P.l} strokeWidth="3" strokeLinecap="round" strokeDasharray="2 10" />
      <circle cx="24" cy="214" r="6" fill={P.s} />
      <g clipPath="url(#jk-door-clip)">
        {slats.map((c, i) => <rect key={c} x={226 + i * 10.5} y="60" width="9" height="150" fill={c} />)}
        <rect x="278.5" y="60" width="11.5" height="150" fill={B.linen} />
      </g>
      <line x1="200" y1="205" x2="306" y2="205" stroke={P.m} strokeWidth="2" />
      <g fill="none" stroke={P.s} strokeWidth="2" strokeLinecap="round"><path d="M208 70v10M203 75h10" /><path d="M300 40v8M296 44h8" /></g>
    </svg>
  );
}

const REASONS: { title: string; body: string; art: ReactNode }[] = [
  {
    title: "A personalized experience",
    body: "No two mortgages I’ve worked on have been the same, and you deserve a personalized experience. I am transparent, strategic and understanding. I like to explain each step as we go, to empower you in making confident mortgage decisions.",
    art: <PathToDoor />,
  },
  {
    title: "Only one credit check",
    body: "I pull your credit once and use it with the lenders we apply to, so you don’t have a new check on your file at every bank.",
    art: <OneCheck />,
  },
  {
    title: "Negotiation power",
    body: "Lenders compete for business that comes through brokers, which gives me room to push on rate and terms for you. I am building my business through referrals. The way I get referrals is by getting you the best deal and delivering results.",
    art: <Compete />,
  },
  {
    title: "More than one lender",
    body: "Your bank can show you the best mortgage options they offer. I can show you the mortgage options across many lenders. This gives you more optionality and a higher likelihood of finding the best current deal for your situation.",
    art: <Doors />,
  },
];

const N = REASONS.length;
const EASE = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease";

export default function BrokerDeck() {
  const [idx, setIdx] = useState(0);
  const [dx, setDx] = useState(0);
  const [drag, setDrag] = useState(false);
  const [out, setOut] = useState(0);
  const [demo, setDemo] = useState(0);
  const [touched, setTouched] = useState(false);
  const startX = useRef(0);
  const touchedRef = useRef(false);
  const timers = useRef<number[]>([]);
  const deckRef = useRef<HTMLDivElement>(null);

  // Show-don't-tell: a hand drags the top card until the visitor touches the deck.
  useEffect(() => {
    const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let started = false;
    const cycle = () => {
      if (touchedRef.current) return;
      setDemo(1);
      later(() => { if (!touchedRef.current) { setDemo(2); setDx(-80); } }, 350);
      later(() => { if (!touchedRef.current) { setDemo(3); setDx(0); } }, 1350);
      later(() => { if (!touchedRef.current) setDemo(0); }, 1750);
    };
    const io = new IntersectionObserver((entries) => {
      if (!started && entries.some((e) => e.isIntersecting)) { started = true; later(cycle, 700); }
    }, { threshold: 0.4 });
    if (deckRef.current) io.observe(deckRef.current);
    const t = timers.current;
    return () => { io.disconnect(); t.forEach(clearTimeout); };
  }, []);

  const stopDemo = () => { touchedRef.current = true; setTouched(true); setDemo(0); };

  const fly = (dir: number) => {
    if (out) return;
    setDrag(false);
    setOut(dir);
    try { navigator.vibrate?.(12); } catch { /* not supported */ }
    window.setTimeout(() => { setIdx((i) => (i + 1) % N); setOut(0); setDx(0); }, 360);
  };

  const onDown = (e: RPointerEvent<HTMLDivElement>) => {
    if (out) return;
    stopDemo();
    startX.current = e.clientX;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* ignore */ }
    setDrag(true);
    setDx(0);
  };
  const onMove = (e: RPointerEvent<HTMLDivElement>) => { if (drag) setDx(e.clientX - startX.current); };
  const onUp = () => {
    if (!drag) return;
    if (Math.abs(dx) > 90) fly(dx > 0 ? 1 : -1);
    else { setDrag(false); setDx(0); }
  };

  const hand = touched ? 0 : demo;
  const handStyle = [
    { opacity: 0, transform: "translateX(0) rotate(0deg)", transition: "opacity 0.25s ease" },
    { opacity: 1, transform: "translateX(0) rotate(-8deg)", transition: "opacity 0.25s ease, transform 0.25s ease" },
    { opacity: 1, transform: "translateX(-170px) rotate(-16deg)", transition: "transform 0.9s cubic-bezier(0.45, 0, 0.2, 1), opacity 0.2s ease" },
    { opacity: 0, transform: "translateX(-190px) rotate(-16deg)", transition: "opacity 0.35s ease, transform 0.35s ease" },
  ][hand];

  return (
    <section className="bg-white border-y border-[#E3D9CD] px-5 sm:px-6 py-16 lg:py-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, color: B.espresso, fontWeight: 400 }}>
          Why work with a broker instead of your bank?
        </h2>

        <div className="flex flex-col gap-5 select-none">
          <div
            ref={deckRef}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            className="relative grid pb-[34px]"
            style={{ touchAction: "pan-y", cursor: drag ? "grabbing" : "grab" }}
          >
            <div aria-hidden="true" className="absolute z-30 top-[42%] right-[14%] pointer-events-none flex items-center gap-2.5" style={handStyle}>
              <svg width="58" height="24" viewBox="0 0 58 24" fill="none" stroke={B.clay} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 4L4 12l10 8" /><path d="M32 4l-10 8 10 8" opacity="0.6" /><path d="M50 4l-10 8 10 8" opacity="0.3" />
              </svg>
              <span className="w-[72px] h-[72px] rounded-full flex items-center justify-center" style={{ background: B.linen, boxShadow: "0 0 0 10px rgba(245,239,232,0.18), 0 12px 28px rgba(0,0,0,0.35)" }}>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke={B.espresso} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V10" /><path d="M12 10V8.5a1.5 1.5 0 0 1 3 0V11" />
                  <path d="M15 10.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1a6 6 0 0 1-4.7-2.3L4 15.5a1.5 1.5 0 0 1 2.3-1.9L9 16" />
                </svg>
              </span>
            </div>

            {REASONS.map((r, i) => {
              const k = (i - idx + N) % N;
              let transform: string, opacity: number, z: number;
              if (k === 0) {
                transform = out ? `translateX(${out * 125}%) rotate(${out * 14}deg)` : `translateX(${dx}px) rotate(${dx / 24}deg)`;
                opacity = 1; z = 10;
              } else {
                const kk = out ? k - 1 : k;
                const pull = !out && drag ? Math.min(1, Math.abs(dx) / 160) : 0;
                const depth = Math.max(0, kk - pull);
                transform = `translateY(${depth * 16}px) scale(${1 - depth * 0.045})`;
                opacity = kk <= 2 ? 1 : 0; z = 10 - k;
              }
              const shown = k === 0 && !out;
              return (
                <article
                  key={r.title}
                  aria-hidden={k !== 0}
                  className="flex flex-wrap items-center gap-x-10 gap-y-7 rounded-[24px] border p-6 sm:p-10 lg:p-[52px]"
                  style={{
                    gridArea: "1 / 1", zIndex: z, opacity, transform, transition: drag ? "none" : EASE, transformOrigin: "50% 100%",
                    background: B.espresso, borderColor: "#4A3E37", boxShadow: "0 18px 40px rgba(53,43,38,0.28)", color: B.linen,
                  }}
                >
                  <div className="flex-[999_1_320px] min-w-0 flex flex-col gap-3.5">
                    <span className="text-[3.5rem] sm:text-[5rem] leading-[0.9]" style={{ ...serif, color: B.clay }}>0{i + 1}</span>
                    <h3 className="m-0 text-[1.875rem] sm:text-[2.625rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.linen }}>{r.title}</h3>
                    <p className="m-0 max-w-[560px] text-[1rem] sm:text-[1.125rem] leading-[1.65]" style={{ ...sans, color: B.onDark }}>{r.body}</p>
                  </div>
                  <div
                    className="flex-[1_1_260px] w-full max-w-[400px] mx-auto"
                    style={{
                      opacity: shown ? 1 : 0.2,
                      transform: shown ? "scale(1) translateY(0)" : "scale(0.88) translateY(14px)",
                      transition: "opacity 0.5s ease 0.18s, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.18s",
                    }}
                  >
                    {r.art}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-5">
            <button type="button" aria-label="Previous reason" onClick={() => { stopDemo(); setIdx((i) => (i + N - 1) % N); setDx(0); setOut(0); }}
              className="cursor-pointer w-12 h-12 rounded-full border-[1.5px] border-[#D8CCC0] bg-white text-[#352B26] text-lg hover:border-[#4F6B7A] hover:text-[#4F6B7A] transition-colors duration-150">←</button>
            <div className="flex items-center gap-2">
              {REASONS.map((r, i) => (
                <button key={r.title} type="button" aria-label={`Reason ${i + 1} of ${N}`} aria-current={i === idx}
                  onClick={() => { stopDemo(); setIdx(i); setDx(0); setOut(0); }}
                  className="cursor-pointer p-1.5 -m-1.5"
                >
                  <span className="block h-2.5 rounded-full" style={{ width: i === idx ? 34 : 10, background: i === idx ? B.clay : "#D8CCC0", transition: "width 0.4s ease, background 0.4s ease" }} />
                </button>
              ))}
            </div>
            <button type="button" aria-label="Next reason" onClick={() => { stopDemo(); fly(-1); }}
              className="cursor-pointer w-12 h-12 rounded-full border-[1.5px] border-[#D8CCC0] bg-white text-[#352B26] text-lg hover:border-[#4F6B7A] hover:text-[#4F6B7A] transition-colors duration-150">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
