import Image from "next/image";
import Link from "next/link";
import { formatEpisodeDate } from "@/lib/episodes";
import type { Episode } from "@/lib/episodes";

type EpisodeCardProps = {
  episode: Episode;
};

export function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <Link
      href={`/episodes/${episode.slug}`}
      className="group block border-t border-white/10 pt-4 transition-colors hover:border-white/20"
    >
      {episode.imageUrl && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={episode.imageUrl}
            alt={episode.title}
            fill
            className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="pt-4">
        <time className="text-[11px] font-extralight text-white/40">
          {formatEpisodeDate(episode.pubDate)}
        </time>
        <h3 className="mt-1.5 text-sm font-extralight leading-snug text-white/80 transition-colors group-hover:text-white">
          {episode.title}
        </h3>
      </div>
    </Link>
  );
}
