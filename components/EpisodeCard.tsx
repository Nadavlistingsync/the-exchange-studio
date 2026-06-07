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
      className="group block border border-white/10 transition-colors hover:border-white/25"
    >
      {episode.imageUrl && (
        <div className="relative aspect-square overflow-hidden border-b border-white/10">
          <Image
            src={episode.imageUrl}
            alt={episode.title}
            fill
            className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-5">
        <time className="text-xs font-extralight text-white/40">
          {formatEpisodeDate(episode.pubDate)}
        </time>
        <h3 className="mt-2 text-base font-extralight leading-snug text-white">
          {episode.title}
        </h3>
      </div>
    </Link>
  );
}
