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
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-14 md:px-12 md:pb-24 md:pt-16">
        <div className="fade-in mb-10 flex items-end justify-between md:mb-12">
          <div>
            <p className="section-eyebrow mb-3">The podcast</p>
            <h2 className="font-serif text-3xl font-light tracking-tight text-white md:text-4xl">
              Episodes
            </h2>
          </div>
          <Link href="/episodes" className="link-subtle mb-1">
            View all →
          </Link>
        </div>

        <FeaturedEpisode episode={featured} />

        {recent.length > 0 && (
          <div className="mt-12 border-t border-white/10 pt-10 md:mt-14">
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4">
              {recent.slice(0, 3).map((episode) => (
                <EpisodeCard key={episode.slug} episode={episode} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
