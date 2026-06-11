"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

const STORAGE_KEY = "exchange-newsletter-dismissed";

export function NewsletterPopup() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const scrollTarget =
      document.getElementById("explore") ??
      document.querySelector<HTMLElement>("[data-mosaic-section]");

    if (!scrollTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setOpen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(scrollTarget);
    return () => observer.disconnect();
  }, [mounted]);

  function dismiss() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  if (!mounted || !open) return null;

  return (
    <div
      className="fade-in fixed bottom-4 left-4 right-4 z-50 sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm"
      role="dialog"
      aria-modal="false"
      aria-labelledby="newsletter-popup-title"
    >
      <div className="relative overflow-hidden rounded-xl border border-white/12 bg-[#0c0b0a]/95 px-6 py-6 shadow-2xl shadow-black/60 backdrop-blur-xl">
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e8e4dc]/40 to-transparent"
          aria-hidden
        />
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center text-white/30 transition-colors hover:text-white"
        >
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden
          >
            <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="section-eyebrow">Newsletter</p>
        <h2
          id="newsletter-popup-title"
          className="mt-3 pr-6 font-serif text-lg font-light leading-snug text-white"
        >
          Episode updates from The Exchange.
        </h2>

        <a
          href={SITE.newsletter}
          target="_blank"
          rel="noopener noreferrer"
          onClick={dismiss}
          className="link-quiet mt-5 inline-block"
        >
          Subscribe on Substack →
        </a>
      </div>
    </div>
  );
}
