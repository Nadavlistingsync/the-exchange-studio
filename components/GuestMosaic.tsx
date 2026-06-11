"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Episode } from "@/lib/episodes";
import {
  getGuestCompactLabel,
  getGuestFirstName,
  getGuestsWithEpisodes,
  type GuestWithEpisode,
} from "@/lib/guests";
import { GuestImage } from "./GuestImage";
import { GuestNameBadge } from "./GuestNameBadge";
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

  return (
    <div className={`group relative bg-[#0a0a0a] p-0.5 ${sizeClass}`}>
      <Link
        href={`/guests/${guest.slug}`}
        className={`relative block h-full w-full overflow-hidden rounded-xl border bg-[#0a0a0a] transition-colors hover:border-white/20 focus:outline-none focus-visible:border-white/20 ${
          guest.episode
            ? "border-white/10"
            : "border-white/10 border-dashed opacity-85"
        }`}
        aria-label={`${guest.name}, ${guest.role} at ${guest.company}`}
      >
        <GuestImage
          src={guest.displayImage}
          alt={guest.name}
          initials={initials}
          variant="mosaic"
        />

        <div className="pointer-events-none absolute inset-0 rounded-xl bg-black/0 transition-colors duration-200 group-hover:bg-black/10 group-has-[:focus-visible]:bg-black/10" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-2.5 pb-2.5 pt-10 sm:px-3 sm:pb-3">
          <span className="block truncate text-[9px] font-light uppercase leading-snug tracking-[0.14em] text-white/75 sm:text-[10px]">
            {guest.episode
              ? getGuestCompactLabel(guest)
              : "Episode coming soon"}
          </span>
        </div>
      </Link>

      <GuestNameBadge
        firstName={getGuestFirstName(guest)}
        name={guest.name}
        className="pointer-events-none absolute right-2 top-2 z-20 sm:right-2.5 sm:top-2.5"
      />
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
    return guests.filter((g) => g.name.toLowerCase().includes(q));
  }, [guests, query]);

  const isSearching = query.trim().length > 0;

  return (
    <section
      data-mosaic-section
      className="grid h-[100svh] grid-rows-[auto_1fr_auto] bg-[#0a0a0a]"
    >
      <MosaicNav />

      <div className="min-h-0 overflow-hidden">
        {isSearching ? (
          <SearchGrid guests={filteredGuests} />
        ) : (
          <RollingRows guests={guests} />
        )}
      </div>

      <div className="shrink-0 border-t border-white/10 px-4 py-3">
        <GuestSearch
          id="guest-search"
          value={query}
          onChange={setQuery}
          resultCount={isSearching ? filteredGuests.length : undefined}
          className="mx-auto max-w-sm"
        />
      </div>
    </section>
  );
}
