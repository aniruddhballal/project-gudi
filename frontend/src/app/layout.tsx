import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vasavi Penugonda Temple",
  description: "The new frontend for the Vasavi Penugonda temple website.",
  icons: {
    icon: "/legacy/home/logo.png",
    apple: "/legacy/home/logo.png",
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
