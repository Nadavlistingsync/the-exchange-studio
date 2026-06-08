import Image from "next/image";
import Link from "next/link";
import { formatEpisodeDate } from "@/lib/episodes";
import type { Episode } from "@/lib/episodes";
import { getGuestForEpisode } from "@/lib/guests";

type EpisodeCardProps = {
  episode: Episode;
};

export function EpisodeCard({ episode }: EpisodeCardProps) {
  const guest = getGuestForEpisode(episode);
  const imageSrc = guest?.imagePath ?? episode.imageUrl;
  const displayTitle = guest?.name ?? episode.title;

  return (
    <Link href={`/episodes/${episode.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] transition-colors group-hover:border-white/20">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={displayTitle}
            fill
            className={`object-cover object-center ${
              guest ? "" : "brightness-[0.7] saturate-[0.6]"
            }`}
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-2.5 pb-2.5 pt-8">
          <time className="text-[10px] font-extralight text-white/45">
            {formatEpisodeDate(episode.pubDate)}
          </time>
          <h3 className="mt-1 line-clamp-2 text-sm font-extralight leading-snug text-white/90">
            {displayTitle}
          </h3>
        </div>
      </div>
    </Link>
  );
}
