"use client";

import Link from "next/link";
import { useState } from "react";
import { SiteBanner } from "./SiteBanner";

const menuLinks = [
  { href: "/guests", label: "Guests" },
  { href: "/network", label: "Network" },
  { href: "/episodes", label: "Episodes" },
];

type MosaicNavProps = {
  query: string;
  onQueryChange: (value: string) => void;
};

export function MosaicNav({ query, onQueryChange }: MosaicNavProps) {
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

      <div className="px-4 pb-4 md:px-6">
        <div className="relative mx-auto max-w-md">
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search guests"
            className="w-full rounded-full border border-white/20 bg-white/5 py-2.5 pl-4 pr-10 text-sm font-extralight text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/40"
          />
          <svg
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
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
