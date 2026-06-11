import Image from "next/image";
import Link from "next/link";
import { formatEpisodeDate } from "@/lib/episodes";
import type { Episode } from "@/lib/episodes";
import { getEpisodeHref } from "@/lib/episode-links";
import { getGuestCompactLabel, getGuestForEpisode } from "@/lib/guests";

type EpisodeCardProps = {
  episode: Episode;
};

export function EpisodeCard({ episode }: EpisodeCardProps) {
  const guest = getGuestForEpisode(episode);
  const imageSrc = guest?.imagePath ?? episode.imageUrl;
  const displayTitle = guest?.name ?? episode.title;

  return (
    <Link href={getEpisodeHref(episode)} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] transition-colors duration-300 group-hover:border-[#e8e4dc]/25">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={displayTitle}
            fill
            className={`object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.045] ${
              guest ? "" : "brightness-[0.7] saturate-[0.6]"
            }`}
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-3 pb-3 pt-10 sm:px-3.5 sm:pb-3.5">
          <time className="block text-[9px] font-light uppercase tracking-[0.2em] text-white/40">
            {formatEpisodeDate(episode.pubDate)}
          </time>
          <h3 className="mt-1.5 line-clamp-2 font-serif text-base font-light leading-snug text-white/95 sm:text-lg">
            {displayTitle}
          </h3>
          {guest && (
            <p className="mt-0.5 hidden text-[10px] font-extralight tracking-wide text-white/45 sm:block">
              {getGuestCompactLabel(guest)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
