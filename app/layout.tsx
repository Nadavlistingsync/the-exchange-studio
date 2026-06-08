import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";
import "./globals.css";

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
  metadataBase: new URL("https://theexchange.studio"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
