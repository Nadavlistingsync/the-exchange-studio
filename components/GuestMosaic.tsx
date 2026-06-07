"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CONFIRMED_GUESTS,
  matchGuestToEpisodeSlug,
  type Guest,
} from "@/lib/guests";
import { GuestImage } from "./GuestImage";
import { MosaicNav } from "./MosaicNav";

type GuestMosaicProps = {
  episodeTitles: { title: string; slug: string }[];
};

function MosaicTile({
  guest,
  episodeSlug,
}: {
  guest: Guest;
  episodeSlug?: string;
}) {
  const initials = guest.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const tile = (
    <div
      className="group relative h-full w-full overflow-hidden transition-opacity hover:opacity-90"
      style={{ backgroundColor: guest.accentColor }}
    >
      <GuestImage
        src={guest.imagePath}
        alt={guest.name}
        initials={initials}
      />
      <span className="absolute right-2 top-2 text-[10px] font-extralight tracking-[0.15em] text-white/70 md:right-3 md:top-3 md:text-xs">
        {guest.shortLabel}
      </span>
    </div>
  );

  if (episodeSlug) {
    return (
      <Link href={`/episodes/${episodeSlug}`} className="block h-full w-full">
        {tile}
      </Link>
    );
  }

  return tile;
}

export function GuestMosaic({ episodeTitles }: GuestMosaicProps) {
  const [query, setQuery] = useState("");

  const guests = useMemo(() => {
    if (!query.trim()) return CONFIRMED_GUESTS;
    const q = query.toLowerCase();
    return CONFIRMED_GUESTS.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.shortLabel.toLowerCase().includes(q) ||
        g.title?.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section className="flex min-h-screen flex-col bg-[#0a0a0a]">
      <MosaicNav query={query} onQueryChange={setQuery} />

      <div className="grid flex-1 grid-cols-2 grid-rows-4 gap-1 p-1 md:grid-cols-4 md:grid-rows-2 md:gap-1.5 md:p-1.5">
        {guests.map((guest) => (
          <MosaicTile
            key={guest.slug}
            guest={guest}
            episodeSlug={matchGuestToEpisodeSlug(guest.name, episodeTitles)}
          />
        ))}
        {guests.length === 0 && (
          <div className="col-span-full flex items-center justify-center text-sm font-extralight text-white/40">
            No guests match your search.
          </div>
        )}
      </div>

      <div className="flex justify-center px-6 py-8">
        <a
          href="#explore"
          className="rounded-full border border-white/30 px-6 py-2.5 text-xs font-extralight tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black"
        >
          EXPLORE THE EXCHANGE ↓
        </a>
      </div>
    </section>
  );
}
