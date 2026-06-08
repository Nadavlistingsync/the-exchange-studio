import Link from "next/link";
import { SITE } from "@/lib/site";
import { SiteBanner } from "./SiteBanner";

const navLinks = [
  { href: "/network", label: "Network" },
  { href: "/episodes", label: "Episodes" },
  { href: "/sponsors", label: "Sponsors" },
];

const listenLinks = [
  { label: "Spotify", href: SITE.listen.spotify },
  { label: "YouTube", href: SITE.listen.youtube },
  { label: "Apple Podcasts", href: SITE.listen.apple },
  { label: "RSS", href: SITE.listen.rss },
];

const socialLinks = [
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
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-12 md:py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <SiteBanner />
            <p className="mt-4 text-sm font-extralight leading-relaxed text-white/45">
              {SITE.description}
            </p>
          </div>

          <a
            href={SITE.newsletter}
            target="_blank"
            rel="noopener noreferrer"
            className="link-quiet shrink-0"
          >
            Subscribe on Substack →
          </a>
        </div>

        <div className="mt-10 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-3 sm:gap-6">
          <div>
            <p className="section-eyebrow mb-3">Navigate</p>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="link-quiet">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div id="listen">
            <p className="section-eyebrow mb-3">Listen</p>
            <div className="flex flex-col gap-2">
              {listenLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...externalLinkProps(link.href)}
                  className="link-quiet"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="section-eyebrow mb-3">Follow</p>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-extralight text-white/35">
            &copy; {new Date().getFullYear()} The Exchange · NYC
          </p>
          <a href={`mailto:${SITE.email}`} className="link-subtle">
            {SITE.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
