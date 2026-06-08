"use client";

import Link from "next/link";
import { useState } from "react";
import { SiteBanner } from "./SiteBanner";

const menuLinks = [
  { href: "/guests", label: "Guests" },
  { href: "/network", label: "Network" },
  { href: "/episodes", label: "Episodes" },
];

export function MosaicNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-10 shrink-0 border-b border-white/10 bg-[#0a0a0a]">
      <div className="relative flex items-center justify-end px-4 py-4 md:px-6 md:py-5">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <SiteBanner priority className="pointer-events-auto" />
        </div>

        <div className="relative z-10 flex shrink-0 items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full border border-white/30 px-4 py-2 text-[10px] font-extralight tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-black md:px-5 md:text-xs"
          >
            MENU
          </button>
          <Link
            href="/#listen"
            className="rounded-full border border-white/30 px-4 py-2 text-[10px] font-extralight tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-black md:px-5 md:text-xs"
          >
            LISTEN
          </Link>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-white/10 bg-[#0a0a0a] px-6 py-6 shadow-xl">
          <div className="flex flex-col gap-4">
            {menuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-extralight tracking-wide text-white/70 transition-colors hover:text-white"
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
