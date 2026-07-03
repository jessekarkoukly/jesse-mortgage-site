export const metadata = {
  title: "Open House QR Code | Jesse Karkoukly",
  robots: { index: false, follow: false },
};

const LANDING_URL = "https://jessekarkoukly.com/open-house";
const QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(LANDING_URL)}&size=400x400&margin=20&color=1E2D3D&bgcolor=F4F4F2`;

export default function QRPage() {
  return (
    <main className="min-h-screen bg-sand flex flex-col items-center justify-center px-6 py-20 gap-8">
      <div className="text-center max-w-sm">
        <p
          className="text-[0.75rem] font-bold text-coral tracking-[0.18em] uppercase mb-3"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Open House QR Code
        </p>
        <h1
          className="text-[1.75rem] font-bold text-navy mb-2"
          style={{ fontFamily: "var(--font-spectral)" }}
        >
          Right-click → Save Image
        </h1>
        <p
          className="text-[0.9375rem] text-slate"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Drop this into your feature sheet. Points to:
          <br />
          <span className="text-navy font-semibold">jessekarkoukly.com/open-house</span>
        </p>
      </div>

      {/* QR Code */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={QR_SRC}
          alt="QR code linking to jessekarkoukly.com/open-house"
          width={300}
          height={300}
          className="block"
        />
      </div>

      <p
        className="text-[0.8125rem] text-slate text-center max-w-xs"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        This page is not indexed. Only you need this URL.
      </p>
    </main>
  );
}
