"use client";

import Link from "next/link";
import { useState } from "react";
import { SiteBanner } from "./SiteBanner";

const menuLinks = [
  { href: "/network", label: "Network" },
  { href: "/episodes", label: "Episodes" },
  { href: "/sponsors", label: "Sponsors" },
];

export function MosaicNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-10 shrink-0 border-b border-white/10 bg-[#0a0a0a]">
      <div className="relative flex items-center justify-end px-4 py-3.5 md:px-6 md:py-4">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <SiteBanner priority className="pointer-events-auto" />
        </div>

        <div className="relative z-10 flex shrink-0 items-center gap-5">
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
