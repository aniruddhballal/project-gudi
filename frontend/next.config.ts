import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "3000" },
      { protocol: "http", hostname: "127.0.0.1", port: "3000" },
    ],
  },
};

export default nextConfig;
