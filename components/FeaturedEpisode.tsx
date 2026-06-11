import Image from "next/image";
import Link from "next/link";
import { formatEpisodeDate } from "@/lib/episodes";
import type { Episode } from "@/lib/episodes";
import { getGuestCompactLabel, getGuestForEpisode } from "@/lib/guests";
import { getEpisodeHref } from "@/lib/episode-links";

type FeaturedEpisodeProps = {
  episode: Episode;
};

export function FeaturedEpisode({ episode }: FeaturedEpisodeProps) {
  const guest = getGuestForEpisode(episode);
  const imageSrc = guest?.imagePath ?? episode.imageUrl;

  return (
    <div className="fade-in">
      <div className="grid gap-8 md:grid-cols-[minmax(0,260px)_1fr] md:items-center md:gap-12">
        {imageSrc && (
          <Link
            href={getEpisodeHref(episode)}
            className="group relative mx-auto aspect-[3/4] w-full max-w-[260px] overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] transition-colors duration-300 hover:border-[#e8e4dc]/25 md:mx-0"
          >
            <Image
              src={imageSrc}
              alt={guest?.name ?? episode.title}
              fill
              className={`object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.045] ${
                guest ? "" : "brightness-[0.7] saturate-[0.6]"
              }`}
              sizes="260px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </Link>
        )}

        <div className="flex flex-col justify-center">
          <p className="section-eyebrow mb-4">Latest episode</p>

          {guest ? (
            <>
              <h3 className="font-serif text-3xl font-light leading-tight tracking-tight text-white md:text-5xl">
                <Link
                  href={`/guests/${guest.slug}`}
                  className="transition-colors duration-300 hover:text-[#e8e4dc]"
                >
                  {guest.name}
                </Link>
              </h3>
              <p className="mt-2.5 text-[11px] font-light uppercase tracking-[0.2em] text-white/45">
                {getGuestCompactLabel(guest)}
                <span className="mx-2.5 text-white/20" aria-hidden>
                  ·
                </span>
                <time className="normal-case tracking-normal">
                  {formatEpisodeDate(episode.pubDate)}
                </time>
              </p>
            </>
          ) : (
            <>
              <h3 className="font-serif text-3xl font-light leading-tight tracking-tight text-white md:text-5xl">
                <Link
                  href={getEpisodeHref(episode)}
                  className="transition-colors duration-300 hover:text-[#e8e4dc]"
                >
                  {episode.title}
                </Link>
              </h3>
              <time className="mt-2.5 text-sm font-extralight text-white/40">
                {formatEpisodeDate(episode.pubDate)}
              </time>
            </>
          )}

          <p className="mt-5 line-clamp-3 max-w-xl text-sm font-extralight leading-[1.8] text-white/50">
            {guest ? episode.title : episode.description}
          </p>

          <Link
            href={getEpisodeHref(episode)}
            className="link-quiet mt-7 w-fit"
          >
            Listen →
          </Link>
        </div>
      </div>
    </div>
  );
}
