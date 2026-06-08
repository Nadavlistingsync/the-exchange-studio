import Link from "next/link";
import { SITE } from "@/lib/site";
import { SiteBanner } from "./SiteBanner";

const navLinks = [
  { href: "/network", label: "Network" },
  { href: "/episodes", label: "Episodes" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/#listen", label: "Listen" },
];

const listenLinks = [
  { label: "Spotify", href: SITE.listen.spotify },
  { label: "YouTube", href: SITE.listen.youtube },
  { label: "Apple Podcasts", href: SITE.listen.apple },
  { label: "RSS", href: SITE.listen.rss },
];

const socialLinks = [
  { label: "Instagram", href: SITE.social.instagram },
  { label: "YouTube", href: SITE.social.youtube },
  { label: "TikTok", href: SITE.social.tiktok },
  { label: "LinkedIn", href: SITE.social.linkedin },
];

function externalLinkProps(href: string) {
  if (href.startsWith("http")) {
    return { target: "_blank" as const, rel: "noopener noreferrer" };
  }
  return {};
}

const pillClassName =
  "inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-xs font-extralight tracking-wide text-white/70 transition-colors hover:border-white hover:bg-white hover:text-black";

const linkClassName =
  "group inline-flex items-center gap-2 text-sm font-extralight text-white/55 transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a]">
      <div className="mx-auto max-w-6xl px-6 pb-8 pt-16 md:px-12 md:pb-10 md:pt-20">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <div>
            <SiteBanner />
            <h2 className="font-serif mt-8 max-w-lg text-3xl font-light leading-[1.15] tracking-tight text-white md:text-4xl">
              The people who move New York commercial real estate.
            </h2>
            <p className="mt-5 max-w-md text-sm font-extralight leading-relaxed text-white/45">
              {SITE.description}
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:items-end lg:text-right">
            <div>
              <p className="section-eyebrow mb-4 lg:text-right">Newsletter</p>
              <a
                href={SITE.newsletter}
                target="_blank"
                rel="noopener noreferrer"
                className={`${pillClassName} lg:ml-auto`}
              >
                Subscribe on Substack
                <span aria-hidden className="ml-2">
                  →
                </span>
              </a>
            </div>
            <a
              href={`mailto:${SITE.email}`}
              className="text-sm font-extralight text-white/45 transition-colors hover:text-white"
            >
              {SITE.email}
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-12 border-t border-white/10 pt-12 md:grid-cols-3 md:gap-10">
          <div>
            <p className="section-eyebrow mb-5">Navigate</p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={linkClassName}>
                  <span>{link.label}</span>
                  <span
                    aria-hidden
                    className="text-white/25 transition-transform group-hover:translate-x-0.5 group-hover:text-white/60"
                  >
                    →
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="section-eyebrow mb-5">Listen</p>
            <div className="flex flex-wrap gap-2">
              {listenLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...externalLinkProps(link.href)}
                  className={pillClassName}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="section-eyebrow mb-5">Follow</p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={pillClassName}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] font-extralight tracking-[0.12em] text-white/35">
            &copy; {new Date().getFullYear()} The Exchange. All rights reserved.
          </p>
          <p className="text-[11px] font-extralight tracking-[0.12em] text-white/35">
            New York City
          </p>
        </div>
      </div>
    </footer>
  );
}
