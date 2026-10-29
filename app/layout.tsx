import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

// DESIGN.md names DM Sans as the substitute for the proprietary GP face; weight 400 only.
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "UY Studio — Fragrance", template: "%s — UY Studio" },
  description: "A quiet gallery of fine fragrance.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" dir="ltr" className={dmSans.variable}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
