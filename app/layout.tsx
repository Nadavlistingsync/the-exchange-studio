import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { getPodcastSeriesJsonLd } from "@/lib/structured-data";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://theexchange.studio";

const geistSans = Geist({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  variable: "--font-geist-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: siteUrl,
    siteName: SITE.name,
    type: "website",
    images: [
      {
        url: "/the-exchange-banner.png",
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: ["/the-exchange-banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <JsonLd data={getPodcastSeriesJsonLd()} />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
