"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE } from "@/lib/site";
import { SiteTitle } from "./SiteTitle";

const menuLinks = [
  { href: "/guests", label: "Guests" },
  { href: "/network", label: "Network" },
  { href: "/episodes", label: "Episodes" },
  { href: "/sponsors", label: "Sponsors" },
];

export function MosaicNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-10 shrink-0 border-b border-white/10 bg-[#0a0a0a]">
      <div className="flex items-center justify-between px-4 py-4 md:px-6 md:py-5">
        <SiteTitle />

        <div className="flex shrink-0 items-center gap-5">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="link-subtle"
          >
            Menu
          </button>
          <Link href="/#listen" className="link-subtle">
            Listen
          </Link>
          <a
            href={SITE.newsletter}
            target="_blank"
            rel="noopener noreferrer"
            className="link-subtle hidden sm:inline"
          >
            Substack
          </a>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-white/10 bg-[#0a0a0a] px-6 py-5">
          <div className="flex flex-col gap-3">
            {menuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="link-quiet"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
