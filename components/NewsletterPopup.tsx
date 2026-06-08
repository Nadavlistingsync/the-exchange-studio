"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

const STORAGE_KEY = "exchange-newsletter-dismissed";

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = window.setTimeout(() => setOpen(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-popup-title"
    >
      <button
        type="button"
        aria-label="Close newsletter popup"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={dismiss}
      />

      <div className="relative w-full max-w-md border border-white/15 bg-[#0a0a0a] px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.6)] sm:px-8 sm:py-10">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 text-lg font-extralight leading-none text-white/40 transition-colors hover:text-white"
        >
          ×
        </button>

        <p className="text-xs font-extralight tracking-[0.25em] uppercase text-white/45">
          Newsletter
        </p>
        <h2
          id="newsletter-popup-title"
          className="mt-3 text-2xl font-extralight tracking-tight text-white"
        >
          Stay in the room.
        </h2>
        <p className="mt-3 text-sm font-extralight leading-relaxed text-white/55">
          Episode updates and interviews, delivered to your inbox.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={SITE.newsletter}
            target="_blank"
            rel="noopener noreferrer"
            onClick={dismiss}
            className="rounded-full bg-white px-6 py-3 text-center text-xs font-light tracking-[0.18em] text-black transition-opacity hover:opacity-90"
          >
            SUBSCRIBE ON SUBSTACK
          </a>
          <button
            type="button"
            onClick={dismiss}
            className="rounded-full border border-white/25 px-6 py-3 text-xs font-extralight tracking-[0.15em] text-white/60 transition-colors hover:border-white/40 hover:text-white"
          >
            NOT NOW
          </button>
        </div>
      </div>
    </div>
  );
}
