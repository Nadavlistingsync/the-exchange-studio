import Link from "next/link";
import { formatEpisodeDate, type Episode } from "@/lib/episodes";
import { getEpisodeHref } from "@/lib/episode-links";
import { getGuestForEpisode } from "@/lib/guests";

type LatestEpisodeStripProps = {
  episode: Episode;
};

export function LatestEpisodeStrip({ episode }: LatestEpisodeStripProps) {
  const guest = getGuestForEpisode(episode);
  const label = guest?.name ?? episode.title;

  return (
    <div className="border-t border-white/10 bg-[#0a0a0a]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-3.5 sm:flex-row sm:items-center sm:justify-between md:px-12">
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm font-extralight text-white/45">
          <span className="text-[9.5px] font-light uppercase tracking-[0.24em] text-[#e8e4dc]/55">
            Latest episode
          </span>
          <span className="font-serif text-[15px] text-white/85">{label}</span>
          <time className="hidden text-xs text-white/35 sm:inline">
            {formatEpisodeDate(episode.pubDate)}
          </time>
        </p>
        <Link href={getEpisodeHref(episode)} className="link-quiet shrink-0">
          Listen →
        </Link>
      </div>
    </div>
  );
}
