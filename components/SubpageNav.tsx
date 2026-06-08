"use client";

import Link from "next/link";
import { useState } from "react";
import { SiteBanner } from "./SiteBanner";

const links = [
  { href: "/network", label: "Network" },
  { href: "/episodes", label: "Episodes" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/#listen", label: "Listen" },
];

export function SubpageNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md">
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="hidden w-32 md:block" aria-hidden />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <SiteBanner className="pointer-events-auto" />
        </div>

        <div className="relative z-10 hidden items-center gap-10 md:flex md:ml-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-extralight tracking-wide text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="relative z-10 flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block h-px w-6 bg-white" />
          <span className="block h-px w-6 bg-white" />
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[#0a0a0a] px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-extralight tracking-wide text-white/70"
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
