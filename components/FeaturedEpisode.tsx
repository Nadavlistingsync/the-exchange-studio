import Image from "next/image";
import Link from "next/link";
import { formatEpisodeDate } from "@/lib/episodes";
import type { Episode } from "@/lib/episodes";

type FeaturedEpisodeProps = {
  episode: Episode;
};

export function FeaturedEpisode({ episode }: FeaturedEpisodeProps) {
  return (
    <div className="fade-in border border-white/10 p-6 md:p-10">
      <p className="mb-4 text-xs font-extralight tracking-[0.25em] uppercase text-white/50">
        Latest Episode
      </p>
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        {episode.imageUrl && (
          <div className="relative h-48 w-full shrink-0 overflow-hidden border border-white/10 md:h-56 md:w-56">
            <Image
              src={episode.imageUrl}
              alt={episode.title}
              fill
              className="object-cover"
              sizes="224px"
            />
          </div>
        )}
        <div className="flex-1">
          <time className="text-xs font-extralight text-white/40">
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
          <p className="mt-4 line-clamp-3 text-sm font-extralight leading-relaxed text-white/50">
            {episode.description}
          </p>
          <Link
            href={`/episodes/${episode.slug}`}
            className="mt-6 inline-block border border-white px-6 py-2.5 text-xs font-light tracking-[0.2em] uppercase transition-colors hover:bg-white hover:text-black"
          >
            Watch Episode
          </Link>
        </div>
      </div>
    </div>
  );
}
