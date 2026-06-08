"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { GuestWithEpisode } from "@/lib/guests";

type GuestPreviewModalProps = {
  guest: GuestWithEpisode;
  onClose: () => void;
};

export function GuestPreviewModal({ guest, onClose }: GuestPreviewModalProps) {
  const { episode } = guest;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Preview ${guest.name}`}
    >
      <div
        className="relative w-full max-w-4xl border border-white/20 bg-[#0a0a0a]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-xs font-extralight tracking-[0.2em] text-white/60 transition-colors hover:text-white"
          aria-label="Close preview"
        >
          CLOSE
        </button>

        {episode?.youtubeId ? (
          <div className="relative aspect-video w-full bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${episode.youtubeId}?autoplay=1`}
              title={episode.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        ) : (
          <div className="flex aspect-video items-center justify-center border-b border-white/10">
            <p className="text-sm font-extralight text-white/50">
              Episode coming soon.
            </p>
          </div>
        )}

        <div className="p-6 md:p-8">
          <p className="text-xs font-extralight tracking-[0.25em] uppercase text-white/50">
            {guest.name}
          </p>
          {guest.title && (
            <p className="mt-1 text-sm font-extralight text-white/40">
              {guest.title}
            </p>
          )}
          {episode && (
            <>
              <h3 className="mt-4 text-xl font-extralight text-white md:text-2xl">
                {episode.title}
              </h3>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href={`/episodes/${episode.slug}`}
                  className="border border-white px-6 py-2.5 text-xs font-light tracking-[0.2em] uppercase transition-colors hover:bg-white hover:text-black"
                >
                  View Episode
                </Link>
                {episode.videoUrl && (
                  <a
                    href={episode.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-extralight tracking-[0.15em] uppercase text-white/50 transition-colors hover:text-white"
                  >
                    Open on YouTube
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
