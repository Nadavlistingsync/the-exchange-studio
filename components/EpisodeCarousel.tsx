import Link from "next/link";
import type { Episode } from "@/lib/episodes";
import { getFeaturedEpisode } from "@/lib/rss";
import { EpisodeCard } from "./EpisodeCard";
import { FeaturedEpisode } from "./FeaturedEpisode";

type EpisodeCarouselProps = {
  episodes: Episode[];
};

export function EpisodeCarousel({ episodes }: EpisodeCarouselProps) {
  if (episodes.length === 0) return null;

  const featured = getFeaturedEpisode(episodes)!;
  const recent = episodes.filter((ep) => ep.slug !== featured.slug);

  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="fade-in mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="section-eyebrow mb-4">Podcast</p>
            <h2 className="text-3xl font-extralight tracking-tight text-white md:text-4xl">
              Episodes
            </h2>
            <p className="mt-3 text-sm font-extralight leading-relaxed text-white/50">
              Conversations with the operators and principals shaping New York
              commercial real estate.
            </p>
          </div>
          <Link
            href="/episodes"
            className="text-[11px] font-extralight tracking-[0.15em] uppercase text-white/40 transition-colors hover:text-white"
          >
            View all episodes
          </Link>
        </div>

        <FeaturedEpisode episode={featured} />

        {recent.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recent.slice(0, 3).map((episode) => (
              <EpisodeCard key={episode.slug} episode={episode} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
