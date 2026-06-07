import Link from "next/link";
import { CONFIRMED_GUESTS, matchGuestToEpisodeSlug } from "@/lib/guests";
import type { Episode } from "@/lib/episodes";
import { GuestImage } from "./GuestImage";

type GuestWallProps = {
  episodes?: Episode[];
};

export function GuestWall({ episodes = [] }: GuestWallProps) {
  const episodeTitles = episodes.map((ep) => ({
    title: ep.title,
    slug: ep.slug,
  }));

  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="fade-in mb-16 max-w-2xl">
          <p className="mb-4 text-xs font-extralight tracking-[0.25em] uppercase text-white/50">
            In the Room
          </p>
          <h2 className="text-3xl font-extralight tracking-tight text-white md:text-4xl">
            The people already at the table.
          </h2>
          <p className="mt-4 text-sm font-extralight leading-relaxed text-white/50">
            Confirmed guests from The Exchange podcast.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {CONFIRMED_GUESTS.map((guest, i) => {
            const delayClass =
              i % 3 === 1
                ? "fade-in-delay-1"
                : i % 3 === 2
                  ? "fade-in-delay-2"
                  : "";
            const episodeSlug = matchGuestToEpisodeSlug(
              guest.name,
              episodeTitles
            );
            const initials = guest.name
              .split(" ")
              .map((n) => n[0])
              .join("");

            const card = (
              <div className="group relative aspect-[3/4] overflow-hidden border border-white/10 bg-white/5">
                <GuestImage
                  src={guest.imagePath}
                  alt={guest.name}
                  initials={initials}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                  <p className="text-sm font-light text-white">{guest.name}</p>
                  {guest.title && (
                    <p className="mt-1 text-xs font-extralight text-white/50">
                      {guest.title}
                    </p>
                  )}
                </div>
              </div>
            );

            return episodeSlug ? (
              <Link
                key={guest.slug}
                href={`/episodes/${episodeSlug}`}
                className={`fade-in ${delayClass}`}
              >
                {card}
              </Link>
            ) : (
              <div key={guest.slug} className={`fade-in ${delayClass}`}>
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
