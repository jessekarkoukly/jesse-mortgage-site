import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/services/self-employed-mortgages", destination: "/services/self-employed", permanent: true },
      { source: "/services/cottage-vacation", destination: "/services/cottage", permanent: true },
      { source: "/services/renewals-and-refinancing", destination: "/services/renewal", permanent: true },
      { source: "/process", destination: "/working-with-jesse", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
