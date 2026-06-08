import type { Metadata } from "next";
import { GuestCard } from "@/components/GuestCard";
import { SubpageNav } from "@/components/SubpageNav";
import {
  getRankedGuests,
  guestHasPublishedEpisode,
} from "@/lib/guests";
import { getEpisodes } from "@/lib/rss";

export const metadata: Metadata = {
  title: "Guests",
  description:
    "The operators and principals featured on The Exchange — New York commercial real estate.",
};

export const revalidate = 3600;

export default async function GuestsPage() {
  const episodes = await getEpisodes();
  const guests = getRankedGuests();

  return (
    <>
      <SubpageNav />
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-28 md:px-12 md:pt-32">
        <div className="fade-in mb-12 max-w-2xl">
          <p className="section-eyebrow mb-4">Network</p>
          <h1 className="font-serif text-4xl font-light tracking-tight text-white md:text-5xl">
            Guests
          </h1>
          <p className="mt-4 text-sm font-extralight leading-relaxed text-white/50">
            The brokers, developers, and operators shaping New York commercial
            real estate.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {guests.map((guest) => (
            <GuestCard
              key={guest.slug}
              guest={guest}
              hasEpisode={guestHasPublishedEpisode(guest, episodes)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
