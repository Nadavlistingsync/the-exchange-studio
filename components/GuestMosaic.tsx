"use client";

import { useMemo, useState } from "react";
import type { Episode } from "@/lib/episodes";
import { getGuestsWithEpisodes, type GuestWithEpisode } from "@/lib/guests";
import { GuestImage } from "./GuestImage";
import { GuestPreviewModal } from "./GuestPreviewModal";
import { MosaicNav } from "./MosaicNav";

type GuestMosaicProps = {
  episodes: Episode[];
};

function MosaicTile({
  guest,
  isActive,
  onSelect,
}: {
  guest: GuestWithEpisode;
  isActive: boolean;
  onSelect: () => void;
}) {
  const initials = guest.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const hasEpisode = Boolean(guest.episode);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative h-full w-full overflow-hidden text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
        isActive ? "ring-2 ring-white/60" : ""
      } ${hasEpisode ? "cursor-pointer" : "cursor-default"}`}
      style={{ backgroundColor: guest.accentColor }}
      aria-label={
        hasEpisode
          ? `Watch ${guest.name}: ${guest.episode?.title}`
          : `${guest.name}, episode coming soon`
      }
    >
      <GuestImage
        key={guest.displayImage}
        src={guest.displayImage}
        alt={guest.name}
        initials={initials}
      />

      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25" />

      <span className="absolute right-2 top-2 text-[10px] font-extralight tracking-[0.15em] text-white/80 md:right-3 md:top-3 md:text-xs">
        {guest.shortLabel}
      </span>

      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black via-black/90 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
        <p className="text-sm font-light text-white">{guest.name}</p>
        {guest.title && (
          <p className="mt-0.5 text-xs font-extralight text-white/60">
            {guest.title}
          </p>
        )}
        {hasEpisode && (
          <p className="mt-2 text-[10px] font-extralight tracking-[0.2em] uppercase text-white/80">
            Watch →
          </p>
        )}
      </div>
    </button>
  );
}

export function GuestMosaic({ episodes }: GuestMosaicProps) {
  const [query, setQuery] = useState("");
  const [previewGuest, setPreviewGuest] = useState<GuestWithEpisode | null>(
    null
  );
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

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
        g.title?.toLowerCase().includes(q) ||
        g.episode?.title.toLowerCase().includes(q)
    );
  }, [guests, query]);

  function handleSelect(guest: GuestWithEpisode) {
    setActiveSlug(guest.slug);
    if (guest.episode) {
      setPreviewGuest(guest);
    }
  }

  return (
    <>
      <section className="flex min-h-screen flex-col bg-[#0a0a0a]">
        <MosaicNav query={query} onQueryChange={setQuery} />

        <div className="grid flex-1 grid-cols-2 grid-rows-4 gap-1 p-1 md:grid-cols-4 md:grid-rows-2 md:gap-1.5 md:p-1.5">
          {filteredGuests.map((guest) => (
            <MosaicTile
              key={guest.slug}
              guest={guest}
              isActive={activeSlug === guest.slug}
              onSelect={() => handleSelect(guest)}
            />
          ))}
          {filteredGuests.length === 0 && (
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

      {previewGuest && (
        <GuestPreviewModal
          guest={previewGuest}
          onClose={() => {
            setPreviewGuest(null);
            setActiveSlug(null);
          }}
        />
      )}
    </>
  );
}
