"use client";

import { FormEvent, useEffect, useState } from "react";
import { SITE } from "@/lib/site";

const STORAGE_KEY = "exchange-newsletter-dismissed";

function subscribeUrl(email: string) {
  const base = SITE.newsletter.replace(/\/$/, "");
  return `${base}?email=${encodeURIComponent(email)}`;
}

export function NewsletterPopup() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    window.open(subscribeUrl(trimmed), "_blank", "noopener,noreferrer");
    dismiss();
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

        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            required
            autoComplete="email"
            className="min-w-0 flex-1 rounded-full border border-white/10 bg-transparent px-4 py-2 text-sm font-extralight text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/20"
          />
          <button
            type="submit"
            aria-label="Subscribe on Substack"
            className="flex shrink-0 items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm font-extralight tracking-wide text-white/50 transition-colors hover:border-white hover:bg-white hover:text-black focus-visible:border-white/30 focus-visible:text-white/80"
          >
            <span aria-hidden>→</span>
          </button>
        </form>
      </div>
    </div>
  );
}
