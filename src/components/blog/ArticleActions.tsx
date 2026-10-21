"use client";

import { useState } from "react";

export function BookCallButton({ className = "btn btn-coral" }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent("open-booking-modal", { detail: { goal: "self_employed" } }))}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M3 9h18M8 2v4M16 2v4" />
      </svg>
      Schedule a call
    </button>
  );
}

export function CopyEmail({ email }: { email: string }) {
  const [label, setLabel] = useState("Copy");
  return (
    <>
      <code id="article-email">{email}</code>
      <button
        type="button"
        className="copy"
        onClick={() => {
          const done = () => {
            setLabel("Copied");
            setTimeout(() => setLabel("Copy"), 1600);
          };
          try {
            navigator.clipboard.writeText(email).then(done, () => setLabel("Select and copy"));
          } catch {
            setLabel("Select and copy");
          }
        }}
      >
        {label}
      </button>
    </>
  );
}
