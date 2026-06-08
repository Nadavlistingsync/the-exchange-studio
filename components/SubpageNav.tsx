"use client";

import Link from "next/link";
import { useState } from "react";
import { SiteTitle } from "./SiteTitle";

const links = [
  { href: "/guests", label: "Guests" },
  { href: "/network", label: "Network" },
  { href: "/episodes", label: "Episodes" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/#listen", label: "Listen" },
];

export function SubpageNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:py-5">
        <SiteTitle />

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="link-quiet">
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block h-px w-6 bg-white" />
          <span className="block h-px w-6 bg-white" />
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[#0a0a0a] px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
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
