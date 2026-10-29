import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { siteUrl } from "@/lib/site";
import "./globals.css";

// Body and interface: DM Sans 400 and 500 (labels).
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Headings and product names: Cormorant Garamond, one upright weight only to keep
// the font download small (italics are not used).
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
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
    <html lang="en" dir="ltr" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="min-h-dvh">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
