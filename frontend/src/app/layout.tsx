import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vasavi Penugonda Temple Trust",
    template: "%s | Vasavi Penugonda Temple Trust",
  },
  description: "Visit Vasavi Penugonda Temple Trust for information about the Trust, Vasavi Dham, seva, public notices, and visiting Penugonda.",
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
