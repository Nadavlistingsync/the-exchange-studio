"use client";

import { FormEvent, useEffect, useState } from "react";
import { SITE } from "@/lib/site";

const STORAGE_KEY = "exchange-newsletter-dismissed";

function subscribeUrl(email: string) {
  const base = SITE.newsletter.replace(/\/$/, "");
  return `${base}?email=${encodeURIComponent(email)}`;
}

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = window.setTimeout(() => setOpen(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    window.open(subscribeUrl(trimmed), "_blank", "noopener,noreferrer");
    dismiss();
  }

  if (!open) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-50 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md"
      role="dialog"
      aria-modal="false"
      aria-labelledby="newsletter-popup-title"
    >
      <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.55)] sm:px-6 sm:py-7">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center text-white/35 transition-colors hover:text-white/70"
        >
          <span className="block h-px w-3.5 bg-current" aria-hidden />
        </button>

        <p className="text-[10px] font-extralight tracking-[0.22em] uppercase text-white/40">
          Never miss an episode
        </p>
        <h2
          id="newsletter-popup-title"
          className="font-serif mt-3 pr-8 text-xl font-normal leading-snug tracking-tight text-white sm:text-[1.35rem]"
        >
          Get episode updates, operator insights, and interviews from The
          Exchange.
        </h2>

        <form onSubmit={handleSubmit} className="mt-5 flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            required
            autoComplete="email"
            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-extralight text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/25"
          />
          <button
            type="submit"
            aria-label="Subscribe on Substack"
            className="flex shrink-0 items-center justify-center rounded-xl bg-[#1a3a34] px-4 py-3 text-white transition-opacity hover:opacity-90"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
