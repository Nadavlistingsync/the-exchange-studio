"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/network", label: "Network" },
  { href: "/episodes", label: "Episodes" },
  { href: "/#listen", label: "Listen" },
];

export function SubpageNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-sm font-extralight tracking-[0.2em] uppercase text-white transition-opacity hover:opacity-70"
        >
          The Exchange
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-extralight tracking-wide text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#request-access"
            className="border border-white/30 px-5 py-2 text-xs font-light tracking-[0.15em] uppercase text-white transition-colors hover:bg-white hover:text-black"
          >
            Request Access
          </Link>
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
            <Link
              href="/#request-access"
              onClick={() => setOpen(false)}
              className="border border-white/30 px-5 py-3 text-center text-xs font-light tracking-[0.15em] uppercase"
            >
              Request Access
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
