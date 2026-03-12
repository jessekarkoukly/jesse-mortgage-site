'use client';

import { useState } from 'react';

/*
  Supabase table SQL:

  create table calculator_leads (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default now(),
    report_name text,
    first_name text,
    last_name text,
    phone text,
    email text,
    calculator_type text,
    calculator_snapshot jsonb
  );
*/

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculatorType: string;
  calculatorSnapshot: Record<string, unknown>;
}

export default function ReportModal({
  isOpen,
  onClose,
  calculatorType,
  calculatorSnapshot,
}: ReportModalProps) {
  const [reportName, setReportName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName) {
      setError('Please fill in your name and email.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/calculator-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          report_name: reportName,
          first_name: firstName,
          last_name: lastName,
          phone,
          email,
          calculator_type: calculatorType,
          calculator_snapshot: calculatorSnapshot,
        }),
      });

      if (!res.ok) throw new Error('Failed to submit');

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setReportName('');
        setFirstName('');
        setLastName('');
        setPhone('');
        setEmail('');
        onClose();
      }, 3000);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full border border-sand-2 rounded-lg px-4 py-3 text-[0.875rem] text-navy bg-white focus:outline-none focus:ring-2 focus:ring-coral/40 focus:border-coral transition-colors';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-sand transition-colors"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#1E2D3D" strokeWidth="2">
            <path d="M12 4L4 12M4 4l8 8" />
          </svg>
        </button>

        {success ? (
          <div className="text-center py-8">
            <p
              className="text-[1.25rem] font-bold text-navy mb-2"
              style={{ fontFamily: 'var(--font-spectral)' }}
            >
              Thanks {firstName}.
            </p>
            <p
              className="text-[0.9375rem] text-slate"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              Jesse will send your report shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3
              className="text-[1.25rem] font-bold text-navy mb-6"
              style={{ fontFamily: 'var(--font-spectral)' }}
            >
              Where should we send your personal report?
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Report name"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                className={inputClass}
                style={{ fontFamily: 'var(--font-jakarta)' }}
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputClass}
                  style={{ fontFamily: 'var(--font-jakarta)' }}
                  required
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={inputClass}
                  style={{ fontFamily: 'var(--font-jakarta)' }}
                />
              </div>

              <input
                type="tel"
                placeholder="416-555-2369"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
                style={{ fontFamily: 'var(--font-jakarta)' }}
              />

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                style={{ fontFamily: 'var(--font-jakarta)' }}
                required
              />
            </div>

            <p
              className="text-[0.6875rem] text-slate mt-3 mb-5"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              Reports are subject to our Terms and Conditions
            </p>

            {error && (
              <p
                className="text-[0.8125rem] text-red-600 mb-3"
                style={{ fontFamily: 'var(--font-jakarta)' }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-coral text-white font-semibold py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem] disabled:opacity-60"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              {submitting ? 'Sending...' : 'Get the report'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
