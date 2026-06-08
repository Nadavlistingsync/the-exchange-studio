import Image from "next/image";
import Link from "next/link";
import { formatEpisodeDate } from "@/lib/episodes";
import type { Episode } from "@/lib/episodes";

type FeaturedEpisodeProps = {
  episode: Episode;
};

export function FeaturedEpisode({ episode }: FeaturedEpisodeProps) {
  return (
    <div className="fade-in border-t border-white/10 pt-10">
      <p className="section-eyebrow mb-6">Latest Episode</p>
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
        {episode.imageUrl && (
          <div className="relative h-44 w-full shrink-0 overflow-hidden md:h-52 md:w-52">
            <Image
              src={episode.imageUrl}
              alt={episode.title}
              fill
              className="object-cover"
              sizes="208px"
            />
          </div>
        )}
        <div className="flex-1">
          <time className="text-[11px] font-extralight text-white/40">
            {formatEpisodeDate(episode.pubDate)}
          </time>
          <h3 className="mt-2 text-2xl font-extralight tracking-tight text-white md:text-3xl">
            <Link
              href={`/episodes/${episode.slug}`}
              className="transition-opacity hover:opacity-70"
            >
              {episode.title}
            </Link>
          </h3>
          <p className="mt-3 line-clamp-3 text-sm font-extralight leading-relaxed text-white/50">
            {episode.description}
          </p>
          <Link
            href={`/episodes/${episode.slug}`}
            className="mt-5 inline-block text-[11px] font-extralight tracking-[0.15em] uppercase text-white/40 transition-colors hover:text-white"
          >
            Watch episode →
          </Link>
        </div>
      </div>
    </div>
  );
}
