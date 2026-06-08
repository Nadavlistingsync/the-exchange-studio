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
      className="fixed bottom-4 left-4 right-4 z-50 sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm"
      role="dialog"
      aria-modal="false"
      aria-labelledby="newsletter-popup-title"
    >
      <div className="relative rounded-xl border border-white/10 bg-[#0a0a0a] px-5 py-5">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 text-white/30 transition-colors hover:text-white/60"
        >
          <span className="block h-px w-3 bg-current" aria-hidden />
        </button>

        <p className="text-[11px] font-extralight tracking-[0.15em] uppercase text-white/40">
          Newsletter
        </p>
        <h2
          id="newsletter-popup-title"
          className="mt-2 pr-6 text-base font-extralight leading-snug tracking-tight text-white"
        >
          Episode updates from The Exchange.
        </h2>

        <a
          href={SITE.newsletter}
          target="_blank"
          rel="noopener noreferrer"
          onClick={dismiss}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2 text-sm font-extralight tracking-wide text-white/70 transition-colors hover:border-white hover:bg-white hover:text-black"
        >
          Subscribe on Substack
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
