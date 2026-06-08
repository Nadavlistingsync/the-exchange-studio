import Image from "next/image";
import Link from "next/link";
import { formatEpisodeDate } from "@/lib/episodes";
import type { Episode } from "@/lib/episodes";
import { getGuestCompactLabel, getGuestForEpisode } from "@/lib/guests";

type FeaturedEpisodeProps = {
  episode: Episode;
};

export function FeaturedEpisode({ episode }: FeaturedEpisodeProps) {
  const guest = getGuestForEpisode(episode);
  const imageSrc = guest?.imagePath ?? episode.imageUrl;

  return (
    <div className="fade-in border-t border-white/10 pt-10">
      <div className="grid gap-8 md:grid-cols-[minmax(0,240px)_1fr] md:items-start md:gap-10">
        {imageSrc && (
          <Link
            href={`/episodes/${episode.slug}`}
            className="group relative mx-auto aspect-[3/4] w-full max-w-[240px] overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] transition-colors hover:border-white/20 md:mx-0"
          >
            <Image
              src={imageSrc}
              alt={guest?.name ?? episode.title}
              fill
              className={`object-cover object-center ${
                guest ? "" : "brightness-[0.7] saturate-[0.6]"
              }`}
              sizes="240px"
              priority
            />
          </Link>
        )}

        <div className="flex flex-col justify-center">
          <p className="section-eyebrow mb-3">Latest episode</p>
          <time className="text-sm font-extralight text-white/40">
            {formatEpisodeDate(episode.pubDate)}
          </time>

          {guest ? (
            <>
              <h3 className="mt-2 text-2xl font-extralight leading-snug tracking-tight text-white md:text-3xl">
                <Link
                  href={`/guests/${guest.slug}`}
                  className="transition-opacity hover:opacity-70"
                >
                  {guest.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm font-extralight text-white/45">
                {getGuestCompactLabel(guest)}
              </p>
            </>
          ) : (
            <h3 className="mt-2 text-2xl font-extralight leading-snug tracking-tight text-white md:text-3xl">
              <Link
                href={`/episodes/${episode.slug}`}
                className="transition-opacity hover:opacity-70"
              >
                {episode.title}
              </Link>
            </h3>
          )}

          <p className="mt-4 line-clamp-3 max-w-xl text-sm font-extralight leading-relaxed text-white/50">
            {guest ? episode.title : episode.description}
          </p>

          <Link
            href={`/episodes/${episode.slug}`}
            className="link-quiet mt-6 inline-block"
          >
            Watch episode →
          </Link>
        </div>
      </div>
    </div>
  );
}
