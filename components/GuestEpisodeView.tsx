"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Episode } from "@/lib/episodes";
import type { Guest } from "@/lib/guests";
import { SITE } from "@/lib/site";
import { EpisodePlayer } from "./EpisodePlayer";
import { GuestImage } from "./GuestImage";

type GuestEpisodeViewProps = {
  guest: Guest;
  episode?: Episode;
};

export function GuestEpisodeView({ guest, episode }: GuestEpisodeViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  const podcastHref = episode
    ? `/episodes/${episode.slug}`
    : SITE.listen.youtube;

  function handlePlay() {
    if (!episode?.youtubeId && !episode?.audioUrl) return;
    setIsPlaying(true);
    requestAnimationFrame(() => {
      playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const canPlay = Boolean(episode?.youtubeId || episode?.audioUrl);
  const initials = guest.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="bg-[#0a0a0a]">
      <section className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-16 md:px-12 lg:px-16 lg:py-24">
          <Link
            href="/guests"
            className="mb-10 inline-flex w-fit rounded-full border border-white/30 px-5 py-2 text-[10px] font-extralight tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black md:mb-14"
          >
            ← BACK
          </Link>

          <p className="text-xs font-extralight tracking-[0.25em] uppercase text-white/45">
            {guest.role}, {guest.company}
          </p>
          <h1 className="font-serif mt-4 text-5xl font-light leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
            {guest.name}
          </h1>

          <p className="mt-8 max-w-lg text-sm font-extralight leading-relaxed text-white/55 md:text-base">
            {guest.bio}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {canPlay && (
              <button
                type="button"
                onClick={handlePlay}
                className="rounded-full bg-white px-8 py-3 text-xs font-light tracking-[0.2em] text-black transition-opacity hover:opacity-90"
              >
                PLAY
              </button>
            )}
            <Link
              href={podcastHref}
              target={episode ? undefined : "_blank"}
              rel={episode ? undefined : "noopener noreferrer"}
              className="rounded-full border border-white/40 px-8 py-3 text-xs font-extralight tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black"
            >
              PODCAST →
            </Link>
          </div>

          {episode && (
            <p className="mt-8 text-xs font-extralight leading-relaxed text-white/35">
              {episode.title}
            </p>
          )}
        </div>

        <div className="relative min-h-[55vh] bg-black lg:min-h-full">
          <GuestImage
            src={guest.imagePath}
            alt={guest.name}
            initials={initials}
            priority
            variant="hero"
          />
        </div>
      </section>

      {isPlaying && episode && (
        <section
          ref={playerRef}
          className="border-t border-white/10 px-6 py-16 md:px-12 lg:px-16"
        >
          <div className="mx-auto max-w-5xl">
            <p className="mb-6 text-xs font-extralight tracking-[0.25em] uppercase text-white/45">
              Now Playing
            </p>
            <EpisodePlayer episode={episode} />
          </div>
        </section>
      )}
    </div>
  );
}
