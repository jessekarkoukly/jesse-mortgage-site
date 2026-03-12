"use client";

import { useState, useEffect, useCallback } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type InquiryType = "purchase" | "renewal" | "refinance" | "unsure" | "";
type ContactMethod = "phone" | "email" | "zoom" | "either" | "";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const TIMES = ["Morning", "Afternoon", "Evening"];

const INQUIRY_OPTIONS = [
  { value: "purchase", label: "Purchase a Home" },
  { value: "renewal", label: "Renew My Mortgage" },
  { value: "refinance", label: "Refinance or Access Equity" },
  { value: "unsure", label: "Not Sure Yet" },
];

const CONTACT_OPTIONS = [
  { value: "phone", label: "Phone Call" },
  { value: "email", label: "Email" },
  { value: "zoom", label: "Zoom" },
  { value: "either", label: "Either" },
];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [inquiryType, setInquiryType] = useState<InquiryType>("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [days, setDays] = useState<string[]>([]);
  const [time, setTime] = useState("");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("");
  const [message, setMessage] = useState("");

  const TOTAL_STEPS = 5;
  const progress = (step / TOTAL_STEPS) * 100;

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setSubmitted(false);
        setError("");
        setInquiryType("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setDays([]);
        setTime("");
        setContactMethod("");
        setMessage("");
      }, 300);
    }
  }, [isOpen]);

  // Keyboard close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );
  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  const toggleDay = (day: string) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async () => {
    if (!contactMethod) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          inquiry_type: inquiryType,
          day_preferences: days,
          time_preference: time,
          contact_method: contactMethod,
          message,
          source: document.referrer || "direct",
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call Jesse directly at 416-276-2666.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg sm:max-w-lg mx-2 sm:mx-0 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Book a call with Jesse"
      >
        {/* Progress bar */}
        {!submitted && (
          <div className="h-1.5 bg-sand-2 rounded-t-2xl overflow-hidden">
            <div
              className="h-full bg-coral transition-all duration-400"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <div className="p-4 sm:p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate hover:text-navy cursor-pointer p-1"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="15" y1="5" x2="5" y2="15" />
              <line x1="5" y1="5" x2="15" y2="15" />
            </svg>
          </button>

          {/* Thank you screen */}
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-coral/10 flex items-center justify-center mx-auto mb-5">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <circle cx="14" cy="14" r="13" stroke="#E8705A" strokeWidth="1.75" />
                  <path d="M8 14l4 4 8-8" stroke="#E8705A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3
                className="text-[1.5rem] font-bold text-navy mb-3"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Your call is booked.
              </h3>
              <p
                className="text-[0.9375rem] text-navy-2 leading-relaxed mb-6"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Looking forward to connecting, {firstName}. I will be in touch shortly to confirm a time. We will keep it to 15-30 minutes.
              </p>
              <p className="text-slate text-sm" style={{ fontFamily: "var(--font-jakarta)" }}>
                Questions in the meantime?{" "}
                <a href="tel:4162762666" className="text-coral font-semibold hover:underline">
                  416-276-2666
                </a>
              </p>
            </div>
          ) : (
            <>
              {/* Step 1 */}
              {step === 1 && (
                <div>
                  <p className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>Step 1 of 5</p>
                  <h3 className="text-[1.375rem] font-bold text-navy mb-6" style={{ fontFamily: "var(--font-spectral)" }}>What can I help you with?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {INQUIRY_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setInquiryType(opt.value as InquiryType); setStep(2); }}
                        className={`text-left px-5 py-4 rounded-xl border-2 font-semibold text-[0.9375rem] transition-all duration-150 cursor-pointer ${
                          inquiryType === opt.value
                            ? "border-coral bg-coral/5 text-coral"
                            : "border-sand-2 text-navy hover:border-coral hover:text-coral"
                        }`}
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div>
                  <p className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>Step 2 of 5</p>
                  <h3 className="text-[1.375rem] font-bold text-navy mb-6" style={{ fontFamily: "var(--font-spectral)" }}>Tell me about yourself.</h3>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[0.75rem] font-semibold text-slate mb-1.5" style={{ fontFamily: "var(--font-jakarta)" }}>First name</label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full border-2 border-sand-2 rounded-lg px-4 py-3 text-navy text-[0.9375rem] focus:outline-none focus:border-coral transition-colors"
                          style={{ fontFamily: "var(--font-jakarta)" }}
                          placeholder="Jesse"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.75rem] font-semibold text-slate mb-1.5" style={{ fontFamily: "var(--font-jakarta)" }}>Last name</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full border-2 border-sand-2 rounded-lg px-4 py-3 text-navy text-[0.9375rem] focus:outline-none focus:border-coral transition-colors"
                          style={{ fontFamily: "var(--font-jakarta)" }}
                          placeholder="Karkoukly"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[0.75rem] font-semibold text-slate mb-1.5" style={{ fontFamily: "var(--font-jakarta)" }}>
                        Email <span className="text-coral">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border-2 border-sand-2 rounded-lg px-4 py-3 text-navy text-[0.9375rem] focus:outline-none focus:border-coral transition-colors"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[0.75rem] font-semibold text-slate mb-1.5" style={{ fontFamily: "var(--font-jakarta)" }}>Phone (optional)</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border-2 border-sand-2 rounded-lg px-4 py-3 text-navy text-[0.9375rem] focus:outline-none focus:border-coral transition-colors"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                        placeholder="416-000-0000"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div>
                  <p className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>Step 3 of 5</p>
                  <h3 className="text-[1.375rem] font-bold text-navy mb-6" style={{ fontFamily: "var(--font-spectral)" }}>Which days work best?</h3>
                  <div className="flex flex-wrap gap-3">
                    {DAYS.map((day) => (
                      <button
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`px-5 py-3 rounded-lg border-2 font-semibold text-[0.9375rem] transition-all duration-150 cursor-pointer ${
                          days.includes(day)
                            ? "border-coral bg-coral text-white"
                            : "border-sand-2 text-navy hover:border-coral"
                        }`}
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div>
                  <p className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>Step 4 of 5</p>
                  <h3 className="text-[1.375rem] font-bold text-navy mb-6" style={{ fontFamily: "var(--font-spectral)" }}>What time works best?</h3>
                  <div className="flex flex-col gap-3">
                    {TIMES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={`text-left px-5 py-4 rounded-xl border-2 font-semibold text-[0.9375rem] transition-all duration-150 cursor-pointer ${
                          time === t
                            ? "border-coral bg-coral/5 text-coral"
                            : "border-sand-2 text-navy hover:border-coral"
                        }`}
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5 */}
              {step === 5 && (
                <div>
                  <p className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>Step 5 of 5</p>
                  <h3 className="text-[1.375rem] font-bold text-navy mb-6" style={{ fontFamily: "var(--font-spectral)" }}>How should I reach you?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                    {CONTACT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setContactMethod(opt.value as ContactMethod)}
                        className={`text-left px-5 py-4 rounded-xl border-2 font-semibold text-[0.9375rem] transition-all duration-150 cursor-pointer ${
                          contactMethod === opt.value
                            ? "border-coral bg-coral/5 text-coral"
                            : "border-sand-2 text-navy hover:border-coral"
                        }`}
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="block text-[0.75rem] font-semibold text-slate mb-1.5" style={{ fontFamily: "var(--font-jakarta)" }}>Anything else? (optional)</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="w-full border-2 border-sand-2 rounded-lg px-4 py-3 text-navy text-[0.9375rem] focus:outline-none focus:border-coral transition-colors resize-none"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                      placeholder="Quick context about your situation..."
                    />
                  </div>
                  {error && (
                    <p className="text-coral text-sm mt-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                      {error}
                    </p>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className={`mt-7 flex ${step === 1 ? "justify-end" : "justify-between"} items-center`}>
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="text-slate text-[0.875rem] font-semibold hover:text-navy transition-colors cursor-pointer flex items-center gap-1"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back
                  </button>
                )}

                {step < 5 && step > 1 && (
                  <button
                    onClick={() => {
                      if (step === 2 && !email) return;
                      setStep(step + 1);
                    }}
                    disabled={step === 2 && !email}
                    className="bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-navy-2 disabled:opacity-40 transition-colors cursor-pointer"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    Continue
                  </button>
                )}

                {step === 5 && (
                  <button
                    onClick={handleSubmit}
                    disabled={!contactMethod || submitting}
                    className="bg-coral text-white font-semibold px-8 py-3 rounded-lg hover:bg-coral-dark disabled:opacity-40 transition-colors cursor-pointer"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    {submitting ? "Booking..." : "Book My Call"}
                  </button>
                )}
              </div>

              {/* Trust row: step 5 only */}
              {step === 5 && (
                <p
                  className="text-center text-[0.75rem] text-slate mt-4"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  15-30 min call&nbsp;&nbsp;&middot;&nbsp;&nbsp;
                  <a href="tel:4162762666" className="hover:text-navy transition-colors">
                    416-276-2666
                  </a>
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
