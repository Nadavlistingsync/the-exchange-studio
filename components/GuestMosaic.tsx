"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Episode } from "@/lib/episodes";
import { getGuestsWithEpisodes, type GuestWithEpisode } from "@/lib/guests";
import { GuestImage } from "./GuestImage";
import { GuestSearch } from "./GuestSearch";
import { MosaicNav } from "./MosaicNav";

type GuestMosaicProps = {
  episodes: Episode[];
};

function MosaicTile({ guest }: { guest: GuestWithEpisode }) {
  const initials = guest.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const hasEpisode = Boolean(guest.episode);

  const tileContent = (
    <>
      <GuestImage
        src={guest.displayImage}
        alt={guest.name}
        initials={initials}
      />

      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />

      <span className="pointer-events-none absolute right-2 top-2 text-[10px] font-extralight tracking-[0.15em] text-white/80 transition-opacity duration-300 group-hover:opacity-0 md:right-3 md:top-3 md:text-xs">
        {guest.shortLabel}
      </span>

      <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        <div className="rounded-sm border border-white/15 bg-black/90 px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-sm">
          <p className="text-sm font-light leading-snug text-white">
            {guest.name}
          </p>
          <p className="mt-1 text-xs font-extralight text-white/55">
            {guest.company}
          </p>
          <p className="text-xs font-extralight text-white/40">{guest.role}</p>

          {hasEpisode && (
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/10 pt-3 text-xs font-extralight tracking-[0.12em] text-white/70">
              <span>Episode</span>
              <span aria-hidden className="text-base leading-none">
                →
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <Link
      href={`/guests/${guest.slug}`}
      className="group relative block min-h-[140px] overflow-hidden transition-transform duration-300 hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:min-h-[180px] md:min-h-[220px]"
      style={{ backgroundColor: guest.accentColor }}
      aria-label={`${guest.name}, ${guest.role} at ${guest.company}`}
    >
      {tileContent}
    </Link>
  );
}

export function GuestMosaic({ episodes }: GuestMosaicProps) {
  const [query, setQuery] = useState("");

  const guests = useMemo(
    () => getGuestsWithEpisodes(episodes),
    [episodes]
  );

  const filteredGuests = useMemo(() => {
    if (!query.trim()) return guests;
    const q = query.toLowerCase();
    return guests.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.shortLabel.toLowerCase().includes(q) ||
        g.company.toLowerCase().includes(q) ||
        g.role.toLowerCase().includes(q) ||
        g.episode?.title.toLowerCase().includes(q)
    );
  }, [guests, query]);

  return (
    <section className="flex min-h-screen flex-col bg-[#0a0a0a]">
      <MosaicNav />

      <div className="grid flex-1 grid-cols-2 gap-1 p-1 sm:grid-cols-3 md:grid-cols-4 md:gap-1.5 md:p-1.5">
        {filteredGuests.map((guest) => (
          <MosaicTile key={guest.slug} guest={guest} />
        ))}
        {filteredGuests.length === 0 && (
          <div className="col-span-full flex items-center justify-center text-sm font-extralight text-white/40">
            No guests match your search.
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 px-6 py-8">
        <GuestSearch
          value={query}
          onChange={setQuery}
          className="w-full max-w-md"
        />
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
