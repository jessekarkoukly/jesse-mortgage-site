"use client";

import { useEffect, useState, useCallback } from "react";

/* ── Types ── */
type Pageview = {
  page: string;
  session_id: string | null;
  duration_seconds: number | null;
  device: string | null;
  created_at: string;
  referrer?: string | null;
  utm_source?: string | null;
  landing_page?: string | null;
};

type AnalyticsEvent = {
  page: string;
  event_name: string;
  created_at: string;
  session_id?: string | null;
};

type SourceStat = { channel: string; visitors: number; actions: number; booked: number };

type PageStat = {
  page: string;
  label: string;
  visits: number;
  uniqueVisitors: number;
  avgDuration: number | null;
  mobilePercent: number;
  lastSeen: string;
};

type EventStat = { name: string; count: number };

type Range = "7d" | "30d" | "90d" | "all";

/* ── Page name map ── */
const PAGE_LABELS: Record<string, string> = {
  "/": "Homepage",
  "/about": "About Jesse",
  "/services": "Services",
  "/services/first-time-buyers": "First-Time Buyers",
  "/services/pre-approval": "Pre-Approval",
  "/services/renewal": "Renewal",
  "/services/self-employed": "Self-Employed",
  "/services/refinancing": "Refinancing",
  "/services/debt-consolidation": "Debt Consolidation",
  "/services/cottage": "Cottage & Vacation",
  "/services/specialty": "Specialty Programs",
  "/calculators": "Calculators",
  "/calculators/mortgage-payment": "Payment Calculator",
  "/calculators/mortgage-calculator": "Mortgage Calculator",
  "/calculators/affordability": "Affordability",
  "/calculators/closing-costs": "Closing Costs",
  "/calculators/land-transfer-tax": "Land Transfer Tax",
  "/calculators/debt-service": "Debt Service",
  "/calculators/prepayment-penalty": "Prepayment Penalty",
  "/calculators/required-income": "Required Income",
  "/calculators/compare": "Compare Scenarios",
  "/working-with-jesse": "Working With Jesse",
  "/blog": "Blog",
  "/open-house": "Open House",
  "/contact": "Contact",
  "/neighbourhoods": "Neighbourhoods",
};

function pageLabel(page: string): string {
  if (PAGE_LABELS[page]) return PAGE_LABELS[page];
  if (page.startsWith("/open-house/")) return `Open House: ${page.replace("/open-house/", "")}`;
  if (page.startsWith("/neighbourhoods/")) return `Neighbourhood: ${page.replace("/neighbourhoods/", "").replace(/-/g, " ")}`;
  if (page.startsWith("/blog/")) return `Blog: ${page.replace("/blog/", "").replace(/-/g, " ")}`;
  return page;
}

function formatDuration(s: number | null): string {
  if (s == null) return "—";
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}d ago`;
  return d.toLocaleDateString("en-CA", { month: "short", day: "numeric" });
}

/* ── Where visitors came from ── */
const CHANNELS = ["AI assistants", "Google", "Bing", "Social", "Direct", "Other"] as const;

function channelFor(referrer: string | null | undefined, utm: string | null | undefined): string {
  const r = `${utm ?? ""} ${referrer ?? ""}`.toLowerCase();
  if (/chatgpt|openai|perplexity|claude|anthropic|gemini|copilot/.test(r)) return "AI assistants";
  if (/google\./.test(r) || /\bgoogle\b/.test(r)) return "Google";
  if (/bing\.|\bbing\b|duckduckgo|yahoo/.test(r)) return "Bing";
  if (/instagram|facebook|linkedin|lnkd\.in|t\.co\b|twitter|x\.com|tiktok|youtube|reddit|medium/.test(r)) return "Social";
  if (!referrer && !utm) return "Direct";
  if (referrer && /jessekarkoukly\.com/.test(referrer)) return "Direct";
  return "Other";
}

const ACTION_EVENTS = new Set([
  "book_call_click",
  "call_click",
  "email_click",
  "start_application_click",
  "email_signup",
  "renewal_signup",
  "calculator_report",
]);

/* ── Data processing ── */
function processData(pageviews: Pageview[], events: AnalyticsEvent[]) {
  // Page stats
  const pageMap = new Map<string, {
    visits: number;
    sessions: Set<string>;
    durations: number[];
    mobileCount: number;
    lastSeen: string;
  }>();

  for (const pv of pageviews) {
    if (!pageMap.has(pv.page)) {
      pageMap.set(pv.page, { visits: 0, sessions: new Set(), durations: [], mobileCount: 0, lastSeen: pv.created_at });
    }
    const s = pageMap.get(pv.page)!;
    s.visits++;
    if (pv.session_id) s.sessions.add(pv.session_id);
    if (pv.duration_seconds != null && pv.duration_seconds > 0) s.durations.push(pv.duration_seconds);
    if (pv.device === "mobile") s.mobileCount++;
    if (pv.created_at > s.lastSeen) s.lastSeen = pv.created_at;
  }

  const pageStats: PageStat[] = Array.from(pageMap.entries())
    .map(([page, d]) => ({
      page,
      label: pageLabel(page),
      visits: d.visits,
      uniqueVisitors: d.sessions.size,
      avgDuration: d.durations.length > 0
        ? Math.round(d.durations.reduce((a, b) => a + b, 0) / d.durations.length)
        : null,
      mobilePercent: d.visits > 0 ? Math.round((d.mobileCount / d.visits) * 100) : 0,
      lastSeen: d.lastSeen,
    }))
    .sort((a, b) => b.visits - a.visits);

  // Event stats
  const eventMap = new Map<string, number>();
  for (const ev of events) {
    eventMap.set(ev.event_name, (eventMap.get(ev.event_name) ?? 0) + 1);
  }
  const eventStats: EventStat[] = Array.from(eventMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Totals
  const totalVisits = pageviews.length;
  const uniqueVisitors = new Set(pageviews.map((p) => p.session_id).filter(Boolean)).size;
  const allDurations = pageviews.map((p) => p.duration_seconds).filter((d): d is number => d != null && d > 0);
  const avgTime = allDurations.length > 0
    ? Math.round(allDurations.reduce((a, b) => a + b, 0) / allDurations.length)
    : null;
  const topPage = pageStats[0] ?? null;

  // Sources: a session's channel is set by its earliest pageview
  const sessionChannel = new Map<string, { at: string; channel: string }>();
  const hasSourceData = pageviews.some((p) => p.referrer !== undefined);
  for (const pv of pageviews) {
    if (!pv.session_id) continue;
    const ch = channelFor(pv.referrer, pv.utm_source);
    const cur = sessionChannel.get(pv.session_id);
    if (!cur || pv.created_at < cur.at) sessionChannel.set(pv.session_id, { at: pv.created_at, channel: ch });
  }
  const srcMap = new Map<string, SourceStat>(
    CHANNELS.map((c) => [c, { channel: c, visitors: 0, actions: 0, booked: 0 }])
  );
  for (const { channel } of sessionChannel.values()) srcMap.get(channel)!.visitors++;
  for (const ev of events) {
    if (!ACTION_EVENTS.has(ev.event_name)) continue;
    const ch = ev.session_id ? sessionChannel.get(ev.session_id)?.channel ?? "Other" : "Other";
    const st = srcMap.get(ch)!;
    st.actions++;
    if (ev.event_name === "book_call_click") st.booked++;
  }
  const sourceStats = Array.from(srcMap.values()).filter((s) => s.visitors > 0 || s.actions > 0);

  return { pageStats, eventStats, totalVisits, uniqueVisitors, avgTime, topPage, sourceStats, hasSourceData };
}

/* ── Range label ── */
const RANGE_LABELS: Record<Range, string> = {
  "7d": "7 Days",
  "30d": "30 Days",
  "90d": "90 Days",
  "all": "All Time",
};

/* ── Dashboard ── */
export default function AnalyticsDashboard() {
  const [range, setRange] = useState<Range>("30d");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ReturnType<typeof processData> | null>(null);
  const [error, setError] = useState(false);
  const [bingStatus, setBingStatus] = useState<string | null>(null);

  const notifyBing = useCallback(async () => {
    setBingStatus("Sending...");
    try {
      const res = await fetch("/admin/indexnow", { method: "POST" });
      const body = await res.json();
      setBingStatus(res.ok ? `Sent ${body.count} pages to Bing` : `Failed: ${body.error ?? res.status}`);
    } catch {
      setBingStatus("Failed to reach the server");
    }
  }, []);

  const fetchData = useCallback(async (r: Range) => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/admin/data?range=${r}`);
      if (!res.ok) throw new Error();
      const { pageviews, events } = await res.json();
      setData(processData(pageviews, events));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(range); }, [range, fetchData]);

  const maxVisits = data?.pageStats[0]?.visits ?? 1;

  return (
    <div className="min-h-screen bg-[#F5EFE8]" style={{ fontFamily: "var(--font-jakarta)" }}>

      {/* Header */}
      <div className="bg-[#352B26] px-6 py-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-[0.7rem] font-bold text-[#7E6352] tracking-[0.18em] uppercase mb-0.5">
              jessekarkoukly.com
            </p>
            <h1 className="text-[1.25rem] font-bold text-white" style={{ fontFamily: "var(--font-spectral)" }}>
              Analytics Dashboard
            </h1>
          </div>

          {/* Range selector */}
          <div className="flex gap-1 bg-white/10 rounded-lg p-1">
            {(["7d", "30d", "90d", "all"] as Range[]).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 rounded-md text-[0.8125rem] font-semibold transition-all cursor-pointer ${
                  range === r
                    ? "bg-[#7E6352] text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {RANGE_LABELS[r]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {loading && (
          <div className="flex items-center justify-center py-24 text-[#7F9BAA] text-[0.9375rem]">
            Loading...
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-24 text-[#7E6352] text-[0.9375rem]">
            Could not load data. Check your Supabase connection.
          </div>
        )}

        {!loading && !error && data && (
          <>
            {/* ── Summary cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Visits", value: data.totalVisits.toLocaleString() },
                { label: "Unique Visitors", value: data.uniqueVisitors.toLocaleString() },
                { label: "Top Page", value: data.topPage ? data.topPage.label : "—" },
                { label: "Avg Time on Site", value: formatDuration(data.avgTime) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white rounded-2xl px-5 py-5 shadow-sm">
                  <p className="text-[0.7rem] font-bold text-[#7F9BAA] tracking-[0.16em] uppercase mb-2">
                    {label}
                  </p>
                  <p className="text-[1.5rem] font-bold text-[#352B26] leading-tight truncate"
                     style={{ fontFamily: "var(--font-spectral)" }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* ── Page breakdown ── */}
            <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
              <div className="px-6 py-4 border-b border-[#F5EFE8]">
                <h2 className="text-[0.9375rem] font-bold text-[#352B26]">
                  Pages — ranked by traffic
                  <span className="ml-2 text-[0.8125rem] font-normal text-[#7F9BAA]">
                    {RANGE_LABELS[range]}
                  </span>
                </h2>
              </div>

              {data.pageStats.length === 0 ? (
                <div className="px-6 py-12 text-center text-[#7F9BAA] text-[0.9375rem]">
                  No data yet — tracking starts now.
                </div>
              ) : (
                <div className="divide-y divide-[#F5EFE8]">
                  {data.pageStats.map((page) => {
                    const barWidth = Math.max(2, Math.round((page.visits / maxVisits) * 100));
                    const isDead = page.visits <= 2;
                    return (
                      <div key={page.page} className="px-6 py-4 flex items-center gap-4 hover:bg-[#F5EFE8]/60 transition-colors">

                        {/* Page name */}
                        <div className="w-44 shrink-0">
                          <p className={`text-[0.875rem] font-semibold truncate ${isDead ? "text-[#7F9BAA]" : "text-[#352B26]"}`}>
                            {page.label}
                          </p>
                          <p className="text-[0.7rem] text-[#7F9BAA] truncate">{page.page}</p>
                        </div>

                        {/* Bar */}
                        <div className="flex-1 h-2 bg-[#F5EFE8] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${barWidth}%`,
                              backgroundColor: isDead ? "#E3D9CD" : "#7E6352",
                            }}
                          />
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-5 shrink-0 text-right">
                          <div className="w-12">
                            <p className="text-[0.9375rem] font-bold text-[#352B26]">{page.visits}</p>
                            <p className="text-[0.65rem] text-[#7F9BAA] uppercase tracking-wide">visits</p>
                          </div>
                          <div className="hidden sm:block w-14">
                            <p className="text-[0.875rem] font-medium text-[#352B26]">{formatDuration(page.avgDuration)}</p>
                            <p className="text-[0.65rem] text-[#7F9BAA] uppercase tracking-wide">avg time</p>
                          </div>
                          <div className="hidden md:block w-14">
                            <p className="text-[0.875rem] font-medium text-[#352B26]">{page.mobilePercent}%</p>
                            <p className="text-[0.65rem] text-[#7F9BAA] uppercase tracking-wide">mobile</p>
                          </div>
                          <div className="hidden lg:block w-20 text-left">
                            <p className="text-[0.8125rem] text-[#7F9BAA]">{formatDate(page.lastSeen)}</p>
                          </div>
                          {/* Status badge */}
                          <div className="w-16 text-right">
                            {isDead ? (
                              <span className="inline-block text-[0.65rem] font-bold text-[#7F9BAA] bg-[#F5EFE8] px-2 py-0.5 rounded-full uppercase tracking-wide">
                                Quiet
                              </span>
                            ) : (
                              <span className="inline-block text-[0.65rem] font-bold text-[#7E6352] bg-[#7E6352]/10 px-2 py-0.5 rounded-full uppercase tracking-wide">
                                Active
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── Sources ── */}
            <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
              <div className="px-6 py-4 border-b border-[#F5EFE8]">
                <h2 className="text-[0.9375rem] font-bold text-[#352B26]">
                  Where visitors came from
                  <span className="ml-2 text-[0.8125rem] font-normal text-[#7F9BAA]">
                    {RANGE_LABELS[range]}
                  </span>
                </h2>
              </div>
              {!data.hasSourceData ? (
                <div className="px-6 py-8 text-center text-[#7F9BAA] text-[0.875rem]">
                  Source tracking needs the new Supabase columns. Run the SQL in CLAUDE.md, then visits start showing here.
                </div>
              ) : data.sourceStats.length === 0 ? (
                <div className="px-6 py-8 text-center text-[#7F9BAA] text-[0.875rem]">No visits yet in this range.</div>
              ) : (
                <div className="divide-y divide-[#F5EFE8]">
                  <div className="px-6 py-2.5 flex items-center gap-4 text-[0.65rem] text-[#7F9BAA] uppercase tracking-wide">
                    <p className="flex-1">Channel</p>
                    <p className="w-20 text-right">Visitors</p>
                    <p className="w-20 text-right">Actions</p>
                    <p className="w-20 text-right">Book clicks</p>
                  </div>
                  {data.sourceStats.map((s) => (
                    <div key={s.channel} className="px-6 py-3.5 flex items-center gap-4">
                      <p className="flex-1 text-[0.875rem] font-semibold text-[#352B26]">{s.channel}</p>
                      <p className="w-20 text-right text-[0.9375rem] font-bold text-[#352B26]">{s.visitors}</p>
                      <p className="w-20 text-right text-[0.9375rem] text-[#352B26]">{s.actions}</p>
                      <p className="w-20 text-right text-[0.9375rem] text-[#7E6352] font-bold">{s.booked}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Top clicks ── */}
            {data.eventStats.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#F5EFE8]">
                  <h2 className="text-[0.9375rem] font-bold text-[#352B26]">
                    Top Clicks
                    <span className="ml-2 text-[0.8125rem] font-normal text-[#7F9BAA]">
                      {RANGE_LABELS[range]}
                    </span>
                  </h2>
                </div>
                <div className="divide-y divide-[#F5EFE8]">
                  {data.eventStats.slice(0, 10).map((ev) => {
                    const barWidth = Math.max(2, Math.round((ev.count / data.eventStats[0].count) * 100));
                    return (
                      <div key={ev.name} className="px-6 py-3.5 flex items-center gap-4">
                        <p className="w-52 text-[0.875rem] font-semibold text-[#352B26] truncate">
                          {ev.name.replace(/_/g, " ")}
                        </p>
                        <div className="flex-1 h-2 bg-[#F5EFE8] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#352B26] rounded-full"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                        <p className="w-10 text-right text-[0.9375rem] font-bold text-[#352B26]">{ev.count}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Footer note ── */}
            <div className="flex flex-col items-center gap-2 mt-8">
              <button
                onClick={notifyBing}
                className="px-4 py-2 rounded-lg bg-[#352B26] text-white text-[0.8125rem] font-semibold cursor-pointer hover:opacity-90"
              >
                Notify Bing of site updates
              </button>
              {bingStatus && <p className="text-[0.75rem] text-[#7F9BAA]">{bingStatus}</p>}
              <p className="text-center text-[0.75rem] text-[#7F9BAA]">
                Press after you publish new or changed pages. Data is live from Supabase.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
