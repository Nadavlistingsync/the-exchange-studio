import Link from "next/link";
import { SITE } from "@/lib/site";
import { SiteBanner } from "./SiteBanner";

const navLinks = [
  { href: "/network", label: "Network" },
  { href: "/episodes", label: "Episodes" },
  { href: "/sponsors", label: "Sponsors" },
];

const listenLinks = [
  { label: "Apple Podcasts", href: SITE.listen.apple },
  { label: "Spotify", href: SITE.listen.spotify },
  { label: "YouTube", href: SITE.listen.youtube },
  { label: "RSS", href: SITE.listen.rss },
];

const socialLinks = [
  { label: "YouTube", href: SITE.social.youtube },
  { label: "Instagram", href: SITE.social.instagram },
  { label: "TikTok", href: SITE.social.tiktok },
  { label: "LinkedIn", href: SITE.social.linkedin },
];

function externalLinkProps(href: string) {
  if (href.startsWith("http")) {
    return { target: "_blank" as const, rel: "noopener noreferrer" };
  }
  return {};
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
            <SiteBanner />
            <a
              href={`mailto:${SITE.email}`}
              className="text-sm font-extralight text-white/50 transition-colors hover:text-white"
            >
              {SITE.email}
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <p className="section-eyebrow">Navigate</p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-extralight text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#listen"
                className="text-sm font-extralight text-white/60 transition-colors hover:text-white"
              >
                Listen
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <p className="section-eyebrow">Listen</p>
            <div className="flex flex-col gap-3">
              {listenLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...externalLinkProps(link.href)}
                  className="text-sm font-extralight text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="section-eyebrow">Follow</p>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-extralight text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="text-xs font-extralight tracking-wide text-white/40">
            &copy; 2026 The Exchange. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
