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
    <section className="border-t border-white/10 bg-[#0a0a0a]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-24">
        <div className="fade-in mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-eyebrow mb-3">Podcast</p>
            <h2 className="text-3xl font-extralight tracking-tight text-white md:text-4xl">
              Episodes
            </h2>
          </div>
          <Link href="/episodes" className="link-subtle">
            View all →
          </Link>
        </div>

        <FeaturedEpisode episode={featured} />

        {recent.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {recent.slice(0, 3).map((episode) => (
              <EpisodeCard key={episode.slug} episode={episode} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
