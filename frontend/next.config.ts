import type { NextConfig } from "next";

const payloadUrl = new URL(process.env.PAYLOAD_API_URL ?? "http://localhost:3000");

if (payloadUrl.protocol !== "http:" && payloadUrl.protocol !== "https:") {
  throw new Error("PAYLOAD_API_URL must use HTTP or HTTPS.");
}

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
    remotePatterns: [
      {
        protocol: payloadUrl.protocol.slice(0, -1) as "http" | "https",
        hostname: payloadUrl.hostname,
        port: payloadUrl.port,
      },
      { protocol: "http", hostname: "localhost", port: "3000" },
      { protocol: "http", hostname: "127.0.0.1", port: "3000" },
    ],
  },
};

export default nextConfig;
