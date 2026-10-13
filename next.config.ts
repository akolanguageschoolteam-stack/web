import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev-estay.thewrteam.in",
      },
      {
        protocol: "https",
        hostname: "admin.akolanguageschool.online",
      },
      {
        protocol: "https",
        hostname: "booking.akolanguageschool.online",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/firebase-messaging-sw.js',
        destination: '/api/sw',
      },
    ];
  },
};

export default nextConfig;
