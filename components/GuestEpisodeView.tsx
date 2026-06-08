"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Episode } from "@/lib/episodes";
import type { Guest } from "@/lib/guests";
import { getGuestListenUrl } from "@/lib/guests";
import { EpisodePlayer } from "./EpisodePlayer";
import { GuestImage } from "./GuestImage";
import { SITE } from "@/lib/site";

type GuestEpisodeViewProps = {
  guest: Guest;
  episode?: Episode;
};

const showLinks = [
  { label: "Spotify", href: SITE.listen.spotify },
  { label: "YouTube", href: SITE.listen.youtube },
  { label: "Apple Podcasts", href: SITE.listen.apple },
];

export function GuestEpisodeView({ guest, episode }: GuestEpisodeViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  const listenHref = getGuestListenUrl(guest, episode);

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
          <Link href="/" className="link-subtle mb-10 inline-block md:mb-14">
            ← Back
          </Link>

          <p className="text-sm font-extralight text-white/45">
            {guest.role}, {guest.company}
          </p>
          <h1 className="font-serif mt-3 text-5xl font-light leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
            {guest.name}
          </h1>

          <p className="mt-8 max-w-lg text-sm font-extralight leading-relaxed text-white/55 md:text-base">
            {guest.bio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            {listenHref && (
              <a
                href={listenHref}
                target="_blank"
                rel="noopener noreferrer"
                className="link-quiet"
              >
                Listen on Spotify →
              </a>
            )}
            {canPlay && (
              <button
                type="button"
                onClick={handlePlay}
                className="link-quiet"
              >
                Play here →
              </button>
            )}
            {episode && (
              <Link
                href={`/episodes/${episode.slug}`}
                className="link-quiet"
              >
                Episode page →
              </Link>
            )}
          </div>

          {!episode && (
            <div className="mt-10 border-t border-white/10 pt-8">
              <p className="section-eyebrow mb-2">Episode coming soon</p>
              <p className="max-w-md text-sm font-extralight leading-relaxed text-white/50">
                This conversation is on the way. Listen to the show in the
                meantime.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {showLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="link-subtle"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {episode && (
            <p className="mt-8 text-sm font-extralight leading-relaxed text-white/40">
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
            <p className="section-eyebrow mb-6">Now playing</p>
            <EpisodePlayer episode={episode} />
          </div>
        </section>
      )}
    </div>
  );
}
