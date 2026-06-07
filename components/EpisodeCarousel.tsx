import Link from "next/link";
import type { Episode } from "@/lib/episodes";
import { EpisodeCard } from "./EpisodeCard";
import { FeaturedEpisode } from "./FeaturedEpisode";

type EpisodeCarouselProps = {
  episodes: Episode[];
};

export function EpisodeCarousel({ episodes }: EpisodeCarouselProps) {
  if (episodes.length === 0) return null;

  const [featured, ...recent] = episodes;

  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="fade-in mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-extralight tracking-[0.25em] uppercase text-white/50">
              Podcast
            </p>
            <h2 className="text-3xl font-extralight tracking-tight text-white md:text-4xl">
              Proof of access.
            </h2>
            <p className="mt-4 text-sm font-extralight leading-relaxed text-white/50">
              Conversations with the operators and principals shaping New York
              commercial real estate.
            </p>
          </div>
          <Link
            href="/episodes"
            className="text-xs font-extralight tracking-[0.15em] uppercase text-white/50 transition-colors hover:text-white"
          >
            View all episodes
          </Link>
        </div>

        <FeaturedEpisode episode={featured} />

        {recent.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recent.slice(0, 3).map((episode) => (
              <EpisodeCard key={episode.slug} episode={episode} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
