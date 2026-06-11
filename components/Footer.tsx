import Link from "next/link";
import { SITE } from "@/lib/site";

const navLinks = [
  { href: "/guests", label: "Guests" },
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
      <div className="mx-auto max-w-6xl px-6 pb-12 pt-16 md:px-12 md:pb-14 md:pt-20">
        {/* Masthead */}
        <Link
          href="/"
          className="block font-serif text-[clamp(2.75rem,8vw,6.5rem)] font-light leading-[0.95] tracking-tight text-white/90 transition-colors duration-500 hover:text-[#e8e4dc]"
        >
          The Exchange
        </Link>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-sm font-extralight leading-relaxed text-white/40">
            {SITE.description}
          </p>
          <a
            href={SITE.newsletter}
            target="_blank"
            rel="noopener noreferrer"
            className="link-quiet shrink-0"
          >
            Subscribe on Substack →
          </a>
        </div>

        <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-3 sm:gap-6">
          <div>
            <p className="section-eyebrow mb-4">Navigate</p>
            <nav className="flex flex-col items-start gap-2.5">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="link-quiet">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div id="listen">
            <p className="section-eyebrow mb-4">Listen</p>
            <div className="flex flex-col items-start gap-2.5">
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
            <p className="section-eyebrow mb-4">Follow</p>
            <div className="flex flex-col items-start gap-2.5">
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

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] font-extralight tracking-[0.08em] text-white/30">
            &copy; {new Date().getFullYear()} The Exchange · New York City
          </p>
          <a href={`mailto:${SITE.email}`} className="link-subtle">
            {SITE.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
