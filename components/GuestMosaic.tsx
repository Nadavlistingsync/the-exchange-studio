"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Episode } from "@/lib/episodes";
import {
  getGuestCompactLabel,
  getGuestRoleCompanyLabel,
  getGuestsWithEpisodes,
  type GuestWithEpisode,
} from "@/lib/guests";
import { GuestImage } from "./GuestImage";
import { GuestSearch } from "./GuestSearch";
import { MosaicNav } from "./MosaicNav";

type GuestMosaicProps = {
  episodes: Episode[];
};

const ROW_COUNT = 2;
const ROW_DURATIONS = ["44s", "52s"];

const ROLLING_TILE_CLASS = "aspect-[3/4] h-full w-auto shrink-0";

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

  const sizeClass =
    layout === "rolling" ? ROLLING_TILE_CLASS : "aspect-[3/4] w-full";

  const listenUrl = guest.listenUrl;

  return (
    <div
      className={`group relative bg-[#0a0a0a] p-0.5 ${sizeClass}`}
    >
      <Link
        href={`/guests/${guest.slug}`}
        className="relative block h-full w-full overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] transition-colors hover:border-white/20 focus:outline-none focus-visible:border-white/20 focus-visible:ring-1 focus-visible:ring-white/40"
        aria-label={`${guest.name}, ${guest.role} at ${guest.company}`}
      >
        <GuestImage
          src={guest.displayImage}
          alt={guest.name}
          initials={initials}
          variant="mosaic"
        />

        <div className="pointer-events-none absolute inset-0 rounded-xl bg-black/0 transition-colors duration-200 group-hover:bg-black/15 group-focus-visible:bg-black/15" />

        <span className="pointer-events-none absolute right-1.5 top-1.5 z-10 rounded-sm bg-[#e8e4dc] px-1.5 py-0.5 text-[9px] font-normal leading-none tracking-[0.08em] text-black sm:right-2 sm:top-2 sm:px-2 sm:py-1 sm:text-[10px]">
          {guest.shortLabel}
        </span>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-1.5 bg-gradient-to-t from-black/75 via-black/40 to-transparent px-1.5 pb-1.5 pt-6 sm:gap-2 sm:px-2 sm:pb-2 sm:pt-8">
          <span className="min-w-0 flex-1 truncate text-[10px] font-extralight leading-snug tracking-wide text-white/90 sm:text-xs">
            {getGuestCompactLabel(guest)}
          </span>
          {!listenUrl && (
            <span
              aria-hidden
              className="flex shrink-0 items-center justify-center rounded-full border border-white/30 px-2 py-0.5 text-[10px] font-extralight leading-none text-white/90 sm:px-2.5 sm:py-1 sm:text-[11px]"
            >
              →
            </span>
          )}
        </div>
      </Link>

      {listenUrl && (
        <a
          href={listenUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Listen to ${guest.name}'s episode`}
          onClick={(event) => event.stopPropagation()}
          className="absolute bottom-2 right-2 z-20 flex items-center justify-center rounded-full border border-white/30 bg-black/40 px-2 py-0.5 text-[10px] font-extralight leading-none text-white/90 backdrop-blur-sm transition-colors hover:bg-white hover:text-black sm:bottom-2.5 sm:right-2.5 sm:px-2.5 sm:py-1 sm:text-[11px]"
        >
          →
        </a>
      )}
    </div>
  );
}

function RollingRows({ guests }: { guests: GuestWithEpisode[] }) {
  const rows = useMemo(() => splitIntoRows(guests, ROW_COUNT), [guests]);

  return (
    <div className="flex h-full min-h-0 flex-col gap-0.5 p-0.5 md:gap-1 md:p-1">
      {rows.map((rowGuests, rowIndex) => {
        const loopGuests = [...rowGuests, ...rowGuests];
        const direction =
          rowIndex % 2 === 0 ? "marquee-track-left" : "marquee-track-right";

        return (
          <div key={rowIndex} className="marquee-row min-h-0 flex-1 overflow-hidden">
            <div
              className={`marquee-track flex h-full w-max items-center gap-0.5 md:gap-1 ${direction}`}
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

function SearchGrid({ guests }: { guests: GuestWithEpisode[] }) {
  return (
    <div className="grid h-full min-h-0 grid-cols-3 gap-0.5 overflow-y-auto p-0.5 sm:grid-cols-4 md:grid-cols-5 md:gap-1 md:p-1 lg:grid-cols-6">
      {guests.map((guest) => (
        <MosaicTile key={guest.slug} guest={guest} layout="grid" />
      ))}
      {guests.length === 0 && (
        <div className="col-span-full flex items-center justify-center py-16 text-sm font-extralight text-white/40">
          No guests match your search.
        </div>
      )}
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
        getGuestRoleCompanyLabel(g).toLowerCase().includes(q) ||
        getGuestCompactLabel(g).toLowerCase().includes(q) ||
        g.company.toLowerCase().includes(q) ||
        g.role.toLowerCase().includes(q) ||
        g.episode?.title.toLowerCase().includes(q)
    );
  }, [guests, query]);

  const isSearching = query.trim().length > 0;

  return (
    <section
      data-mosaic-section
      className="grid h-[100svh] grid-rows-[auto_1fr_auto_auto] bg-[#0a0a0a]"
    >
      <MosaicNav />

      <div className="min-h-0 overflow-hidden">
        {isSearching ? (
          <SearchGrid guests={filteredGuests} />
        ) : (
          <RollingRows guests={guests} />
        )}
      </div>

      <div className="shrink-0 border-t border-white/10 px-4 py-4">
        <GuestSearch
          id="guest-search"
          value={query}
          onChange={setQuery}
          resultCount={isSearching ? filteredGuests.length : undefined}
          className="mx-auto max-w-sm"
        />
      </div>

      <div className="flex shrink-0 justify-center pb-6 pt-0">
        <a
          href="#explore"
          className="text-[11px] font-extralight tracking-[0.15em] text-white/40 transition-colors hover:text-white"
        >
          Explore the exchange ↓
        </a>
      </div>
    </section>
  );
}
