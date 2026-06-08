"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { GuestWithEpisode } from "@/lib/guests";
import { GuestImage } from "./GuestImage";
import { GuestSearch } from "./GuestSearch";

type GuestIndexProps = {
  guests: GuestWithEpisode[];
};

function GuestRow({
  guest,
  featured = false,
}: {
  guest: GuestWithEpisode;
  featured?: boolean;
}) {
  const initials = guest.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Link
      href={`/guests/${guest.slug}`}
      className={`group grid overflow-hidden border border-white/10 transition-colors hover:border-white/25 ${
        featured ? "lg:grid-cols-2" : "grid-cols-[120px_1fr] md:grid-cols-[160px_1fr]"
      }`}
    >
      <div
        className={`relative bg-black ${
          featured ? "min-h-[320px] lg:min-h-[480px]" : "min-h-[120px] md:min-h-[160px]"
        }`}
      >
        <GuestImage
          src={guest.displayImage}
          alt={guest.name}
          initials={initials}
          variant={featured ? "featured" : "row"}
        />
      </div>

      <div
        className={`flex flex-col justify-center ${
          featured ? "p-8 md:p-12 lg:p-16" : "p-5 md:p-8"
        }`}
      >
        <p className="text-xs font-extralight tracking-[0.25em] uppercase text-white/45">
          {guest.role}, {guest.company}
        </p>
        <h2
          className={`font-serif font-light tracking-tight text-white ${
            featured
              ? "mt-3 text-4xl md:text-5xl lg:text-6xl"
              : "mt-2 text-2xl md:text-3xl"
          }`}
        >
          {guest.name}
        </h2>
        <p
          className={`mt-4 font-extralight leading-relaxed text-white/55 ${
            featured ? "max-w-xl text-sm md:text-base" : "line-clamp-2 text-sm"
          }`}
        >
          {guest.bio}
        </p>
        <span className="mt-6 inline-flex w-fit items-center gap-2 text-xs font-extralight tracking-[0.15em] text-white/50 transition-colors group-hover:text-white">
          View guest
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}

export function GuestIndex({ guests }: GuestIndexProps) {
  const [query, setQuery] = useState("");

  const filteredGuests = useMemo(() => {
    if (!query.trim()) return guests;
    const q = query.toLowerCase();
    return guests.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.company.toLowerCase().includes(q) ||
        g.role.toLowerCase().includes(q) ||
        g.bio.toLowerCase().includes(q)
    );
  }, [guests, query]);

  if (guests.length === 0) return null;

  const [featured, ...rest] = filteredGuests;
  const hasFeatured = Boolean(featured);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-40 md:pt-48">
      <div className="fade-in mb-10 max-w-2xl">
        <p className="mb-4 text-xs font-extralight tracking-[0.25em] uppercase text-white/50">
          Guests
        </p>
        <h1 className="text-4xl font-extralight tracking-tight text-white md:text-5xl">
          In the room.
        </h1>
        <p className="mt-4 text-sm font-extralight leading-relaxed text-white/50">
          The operators and principals who have sat down with The Exchange,
          ranked by stature in New York commercial real estate.
        </p>
      </div>

      <GuestSearch
        value={query}
        onChange={setQuery}
        className="fade-in mb-10 max-w-md"
      />

      {filteredGuests.length === 0 ? (
        <p className="text-sm font-extralight text-white/40">
          No guests match your search.
        </p>
      ) : (
        <div className="fade-in space-y-4">
          {hasFeatured && <GuestRow guest={featured} featured />}
          {rest.map((guest) => (
            <GuestRow key={guest.slug} guest={guest} />
          ))}
        </div>
      )}
    </section>
  );
}
