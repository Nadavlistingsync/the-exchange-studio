import Link from "next/link";
import { formatEpisodeDate, type Episode } from "@/lib/episodes";
import { getGuestForEpisode } from "@/lib/guests";

type LatestEpisodeStripProps = {
  episode: Episode;
};

export function LatestEpisodeStrip({ episode }: LatestEpisodeStripProps) {
  const guest = getGuestForEpisode(episode);
  const label = guest?.name ?? episode.title;

  return (
    <div className="border-t border-white/10 bg-[#0a0a0a]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-3 sm:flex-row sm:items-center sm:justify-between md:px-12">
        <p className="text-sm font-extralight text-white/45">
          <span className="text-white/60">Latest episode</span>
          <span className="mx-2 text-white/20" aria-hidden>
            ·
          </span>
          <span className="text-white/75">{label}</span>
          <span className="mx-2 hidden text-white/20 sm:inline" aria-hidden>
            ·
          </span>
          <time className="hidden text-white/40 sm:inline">
            {formatEpisodeDate(episode.pubDate)}
          </time>
        </p>
        <Link href={`/episodes/${episode.slug}`} className="link-quiet shrink-0">
          Listen →
        </Link>
      </div>
    </div>
  );
}
