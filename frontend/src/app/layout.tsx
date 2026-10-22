import type { Metadata } from "next";
import { cookies } from "next/headers";
import { SiteThemeProvider, type SiteTheme } from "@/components/site-theme";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const savedTheme = (await cookies()).get("penu-site-theme")?.value;
  const theme: SiteTheme = savedTheme === "heritage" ? "heritage" : "editorial";

  return (
    <html lang="en">
      <body>
        <SiteThemeProvider theme={theme}>{children}</SiteThemeProvider>
      </body>
    </html>
  );
}
