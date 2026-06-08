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

const ROW_COUNT = 3;
const ROW_DURATIONS = ["40s", "48s", "56s"];

const TILE_CLASS =
  "aspect-[3/4] w-[72px] shrink-0 sm:w-[84px] md:w-[96px]";

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

  const sizeClass = layout === "rolling" ? TILE_CLASS : "aspect-[3/4] w-full";

  return (
    <Link
      href={`/guests/${guest.slug}`}
      className={`group relative block bg-black p-0.5 transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:p-1 ${sizeClass}`}
      aria-label={`${guest.name}, ${guest.role} at ${guest.company}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-lg bg-black sm:rounded-xl">
        <GuestImage
          src={guest.displayImage}
          alt={guest.name}
          initials={initials}
          variant="mosaic"
        />

        <div className="pointer-events-none absolute inset-0 rounded-lg bg-black/0 transition-colors duration-300 group-hover:bg-black/20 sm:rounded-xl" />

        <span className="pointer-events-none absolute right-1 top-1 z-10 rounded bg-[#e8e4dc] px-1.5 py-0.5 text-[8px] font-normal tracking-[0.14em] text-black sm:right-1.5 sm:top-1.5 sm:px-2 sm:py-1 sm:text-[9px]">
          {guest.shortLabel}
        </span>

        <div className="pointer-events-none absolute inset-x-1.5 bottom-1.5 z-10 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:inset-x-2 sm:bottom-2">
          <div className="rounded-sm border border-white/15 bg-black/90 px-2 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:px-3 sm:py-2">
            <p className="text-[10px] font-light leading-snug text-white sm:text-xs">
              {guest.name}
            </p>
            {hasEpisode && (
              <p className="mt-1 text-[9px] font-extralight tracking-[0.1em] text-white/60">
                Episode →
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function RollingRows({ guests }: { guests: GuestWithEpisode[] }) {
  const rows = useMemo(() => splitIntoRows(guests, ROW_COUNT), [guests]);

  return (
    <div className="flex flex-col gap-1.5 overflow-hidden p-2 sm:gap-2 sm:p-3">
      {rows.map((rowGuests, rowIndex) => {
        const loopGuests = [...rowGuests, ...rowGuests];
        const direction =
          rowIndex % 2 === 0 ? "marquee-track-left" : "marquee-track-right";

        return (
          <div key={rowIndex} className="marquee-row shrink-0 overflow-hidden">
            <div
              className={`marquee-track flex w-max items-center gap-1 sm:gap-1.5 ${direction}`}
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
    <div className="grid max-h-[calc(3*6.5rem+1rem)] grid-cols-4 gap-1 overflow-y-auto p-2 sm:max-h-[calc(3*7.5rem+1.25rem)] sm:grid-cols-5 sm:gap-1.5 sm:p-3 md:grid-cols-6">
      {guests.map((guest) => (
        <MosaicTile key={guest.slug} guest={guest} layout="grid" />
      ))}
      {guests.length === 0 && (
        <div className="col-span-full flex items-center justify-center py-8 text-sm font-extralight text-white/40">
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
        g.company.toLowerCase().includes(q) ||
        g.role.toLowerCase().includes(q) ||
        g.episode?.title.toLowerCase().includes(q)
    );
  }, [guests, query]);

  const isSearching = query.trim().length > 0;

  return (
    <section className="flex flex-col bg-[#0a0a0a] pb-10 pt-0">
      <MosaicNav />

      <div className="mx-auto w-full max-w-3xl px-4 pt-6 sm:max-w-4xl sm:pt-8">
        <div className="overflow-hidden border border-white/10 bg-black">
          {isSearching ? (
            <SearchGrid guests={filteredGuests} />
          ) : (
            <RollingRows guests={guests} />
          )}

          <div className="border-t border-white/10 px-3 py-3 sm:px-4 sm:py-4">
            <label
              htmlFor="guest-search"
              className="mb-2 block text-xs font-extralight tracking-[0.12em] text-white/50"
            >
              Search guests:
            </label>
            <GuestSearch
              id="guest-search"
              value={query}
              onChange={setQuery}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href="#explore"
            className="rounded-full border border-white/30 px-6 py-2.5 text-xs font-extralight tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black"
          >
            EXPLORE THE EXCHANGE ↓
          </a>
        </div>
      </div>
    </section>
  );
}
