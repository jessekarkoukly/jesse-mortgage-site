'use client';

import { useState } from 'react';

export interface ResultItem {
  label: string;
  value: string;
  note?: string;
  indent?: boolean;
  hidden?: boolean;
  separator?: boolean;
}

export interface ResultsTab {
  label: string;
  summaryValue: string;
  items: ResultItem[];
}

interface ResultsPanelProps {
  primaryLabel: string;
  primaryValue: string;
  items: ResultItem[];
  onDownloadReport: () => void;
  onBookStrategy?: () => void;
  settingsSlot?: React.ReactNode;
  tabs?: ResultsTab[];
}

function ItemList({ items }: { items: ResultItem[] }) {
  return (
    <div className="space-y-2.5">
      {items
        .filter((item) => !item.hidden)
        .map((item, i) => (
          <div key={i}>
            {item.separator && (
              <div className="border-t border-dashed border-gray-200 my-3" />
            )}
            <div className={item.indent ? 'pl-4' : ''}>
              <div className="flex items-baseline justify-between">
                <span
                  className="text-[0.8125rem] text-slate"
                  style={{ fontFamily: 'var(--font-jakarta)' }}
                >
                  {item.label}
                </span>
                <span
                  className="text-[0.8125rem] font-semibold text-navy tabular-nums"
                  style={{ fontFamily: 'var(--font-jakarta)' }}
                >
                  {item.value}
                </span>
              </div>
              {item.note && (
                <p
                  className="text-[0.625rem] text-slate mt-0.5"
                  style={{ fontFamily: 'var(--font-jakarta)' }}
                >
                  {item.note}
                </p>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default function ResultsPanel({
  primaryLabel,
  primaryValue,
  items,
  onDownloadReport,
  onBookStrategy,
  settingsSlot,
  tabs,
}: ResultsPanelProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleBookStrategy = () => {
    if (onBookStrategy) {
      onBookStrategy();
    } else {
      window.dispatchEvent(new CustomEvent('open-booking-modal'));
    }
  };

  return (
    <div className="md:sticky md:top-20">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 relative">
        {/* Settings gear */}
        {settingsSlot && (
          <>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-sand transition-colors"
              aria-label="Settings"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#1E2D3D" strokeWidth="1.5">
                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                <path d="M16.2 12.2a1.4 1.4 0 00.28 1.54l.05.05a1.7 1.7 0 01-1.2 2.9 1.7 1.7 0 01-1.2-.5l-.05-.05a1.4 1.4 0 00-1.54-.28 1.4 1.4 0 00-.84 1.28v.14a1.7 1.7 0 01-3.4 0v-.07a1.4 1.4 0 00-.91-1.28 1.4 1.4 0 00-1.54.28l-.05.05a1.7 1.7 0 01-2.4-2.4l.05-.05a1.4 1.4 0 00.28-1.54 1.4 1.4 0 00-1.28-.84H2.3a1.7 1.7 0 010-3.4h.07a1.4 1.4 0 001.28-.91 1.4 1.4 0 00-.28-1.54l-.05-.05a1.7 1.7 0 012.4-2.4l.05.05a1.4 1.4 0 001.54.28h.07a1.4 1.4 0 00.84-1.28V2.3a1.7 1.7 0 013.4 0v.07a1.4 1.4 0 00.84 1.28 1.4 1.4 0 001.54-.28l.05-.05a1.7 1.7 0 012.4 2.4l-.05.05a1.4 1.4 0 00-.28 1.54v.07a1.4 1.4 0 001.28.84h.14a1.7 1.7 0 010 3.4h-.07a1.4 1.4 0 00-1.28.84z" />
              </svg>
            </button>

            {/* Settings slide-out */}
            {settingsOpen && (
              <div className="absolute top-14 right-0 z-20 w-72 bg-white rounded-xl shadow-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4
                    className="text-[0.875rem] font-bold text-navy"
                    style={{ fontFamily: 'var(--font-jakarta)' }}
                  >
                    Settings
                  </h4>
                  <button
                    onClick={() => setSettingsOpen(false)}
                    className="p-1 hover:bg-sand rounded"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#1E2D3D" strokeWidth="1.5">
                      <path d="M12 4L4 12M4 4l8 8" />
                    </svg>
                  </button>
                </div>
                {settingsSlot}
              </div>
            )}
          </>
        )}

        {/* Primary result */}
        <p
          className="text-[0.6875rem] font-semibold text-slate uppercase tracking-widest mb-1"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          {primaryLabel}
        </p>
        <p
          className="text-[1.625rem] sm:text-[2rem] font-bold text-coral leading-tight mb-6"
          style={{ fontFamily: 'var(--font-spectral)' }}
        >
          {primaryValue}
        </p>

        {/* Top line items */}
        <div className="mb-5">
          <ItemList items={items} />
        </div>

        {/* Tabs (optional) */}
        {tabs && tabs.length > 0 && (
          <>
            {/* Tab headers */}
            <div className="flex border-b border-gray-200 mb-4">
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 pb-3 text-center cursor-pointer transition-colors ${
                    activeTab === i
                      ? 'border-b-2 border-navy'
                      : 'border-b-2 border-transparent'
                  }`}
                >
                  <span
                    className={`block text-[0.75rem] font-semibold ${
                      activeTab === i ? 'text-navy' : 'text-slate'
                    }`}
                    style={{ fontFamily: 'var(--font-jakarta)' }}
                  >
                    {tab.label}
                  </span>
                  <span
                    className={`block text-[0.875rem] font-bold tabular-nums ${
                      activeTab === i ? 'text-navy' : 'text-slate'
                    }`}
                    style={{ fontFamily: 'var(--font-jakarta)' }}
                  >
                    {tab.summaryValue}
                  </span>
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="mb-5">
              <h4
                className="text-[0.9375rem] font-bold text-navy mb-3"
                style={{ fontFamily: 'var(--font-jakarta)' }}
              >
                Details
              </h4>
              <ItemList items={tabs[activeTab].items} />
            </div>
          </>
        )}

        {/* No tabs: show items as before (divider) */}
        {!tabs && (
          <div className="border-t border-gray-200 mb-4" />
        )}

        {/* Tabs present: divider before buttons */}
        {tabs && (
          <div className="border-t border-gray-200 mb-4" />
        )}

        {/* CTA buttons */}
        <div className="space-y-2.5">
          <button
            onClick={handleBookStrategy}
            className="w-full bg-coral text-white font-semibold py-3 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.875rem]"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            Book a Call
          </button>
          <button
            onClick={onDownloadReport}
            className="w-full border-2 border-navy text-navy font-semibold py-3 rounded-lg hover:bg-navy hover:text-white transition-colors cursor-pointer text-[0.875rem]"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            Get My Report
          </button>
        </div>
      </div>
    </div>
  );
}
