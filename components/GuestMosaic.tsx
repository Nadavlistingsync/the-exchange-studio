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

const ROW_COUNT = 4;
const ROW_DURATIONS = ["38s", "44s", "50s", "56s"];

function splitIntoRows(
  guests: GuestWithEpisode[],
  rowCount: number
): GuestWithEpisode[][] {
  const rows: GuestWithEpisode[][] = Array.from({ length: rowCount }, () => []);
  guests.forEach((guest, index) => {
    rows[index % rowCount].push(guest);
  });
  return rows;
}

function MosaicTile({
  guest,
  layout = "rolling",
}: {
  guest: GuestWithEpisode;
  layout?: "rolling" | "grid";
}) {
  const initials = guest.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const hasEpisode = Boolean(guest.episode);

  const sizeClass =
    layout === "rolling"
      ? "h-full w-[calc((100vw-1.25rem)/3)] min-w-[100px] sm:w-[calc((100vw-2rem)/4)] md:w-[calc((100vw-2.5rem)/5)] lg:w-[calc((100vw-3rem)/6)]"
      : "aspect-[3/4] w-full";

  return (
    <Link
      href={`/guests/${guest.slug}`}
      className={`group relative block shrink-0 overflow-hidden bg-black transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${sizeClass}`}
      aria-label={`${guest.name}, ${guest.role} at ${guest.company}`}
    >
      <GuestImage
        src={guest.displayImage}
        alt={guest.name}
        initials={initials}
        variant="mosaic"
      />

      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />

      <span className="pointer-events-none absolute right-1.5 top-1.5 text-[9px] font-extralight tracking-[0.12em] text-white/70 transition-opacity duration-300 group-hover:opacity-0 sm:right-2 sm:top-2 sm:text-[10px] md:text-xs">
        {guest.shortLabel}
      </span>

      <div className="pointer-events-none absolute inset-x-2 bottom-2 z-10 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:inset-x-3 sm:bottom-3">
        <div className="rounded-sm border border-white/15 bg-black/90 px-3 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:px-4 sm:py-3">
          <p className="text-xs font-light leading-snug text-white sm:text-sm">
            {guest.name}
          </p>
          <p className="mt-0.5 text-[10px] font-extralight text-white/55 sm:mt-1 sm:text-xs">
            {guest.company}
          </p>
          {hasEpisode && (
            <div className="mt-2 flex items-center justify-between gap-2 border-t border-white/10 pt-2 text-[10px] font-extralight tracking-[0.12em] text-white/70 sm:mt-3 sm:pt-3 sm:text-xs">
              <span>Episode</span>
              <span aria-hidden>→</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

function RollingRows({ guests }: { guests: GuestWithEpisode[] }) {
  const rows = useMemo(() => splitIntoRows(guests, ROW_COUNT), [guests]);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-1 p-1 md:gap-1.5 md:p-1.5">
      {rows.map((rowGuests, rowIndex) => {
        const loopGuests = [...rowGuests, ...rowGuests];
        const direction =
          rowIndex % 2 === 0 ? "marquee-track-left" : "marquee-track-right";

        return (
          <div
            key={rowIndex}
            className="marquee-row min-h-0 flex-1 overflow-hidden"
          >
            <div
              className={`marquee-track flex h-full gap-1 md:gap-1.5 ${direction}`}
              style={{ animationDuration: ROW_DURATIONS[rowIndex] }}
            >
              {loopGuests.map((guest, index) => (
                <MosaicTile
                  key={`${guest.slug}-${index}`}
                  guest={guest}
                  layout="rolling"
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
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

  const isSearching = query.trim().length > 0;

  return (
    <section className="flex min-h-screen flex-col bg-[#0a0a0a]">
      <MosaicNav />

      {isSearching ? (
        <div className="grid flex-1 grid-cols-3 gap-1 p-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 md:gap-1.5 md:p-1.5">
          {filteredGuests.map((guest) => (
            <MosaicTile key={guest.slug} guest={guest} layout="grid" />
          ))}
          {filteredGuests.length === 0 && (
            <div className="col-span-full flex items-center justify-center text-sm font-extralight text-white/40">
              No guests match your search.
            </div>
          )}
        </div>
      ) : (
        <RollingRows guests={guests} />
      )}

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
