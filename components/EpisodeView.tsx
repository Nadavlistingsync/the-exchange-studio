import Link from "next/link";
import { formatEpisodeDate, type Episode } from "@/lib/episodes";
import { getEpisodeShowNotes } from "@/lib/episode-notes";
import {
  getGuestCompactLabel,
  getGuestFirstName,
  type Guest,
} from "@/lib/guests";
import { EpisodePlayer } from "./EpisodePlayer";

type EpisodeViewProps = {
  episode: Episode;
  guest?: Guest;
};

export function EpisodeView({ episode, guest }: EpisodeViewProps) {
  const canPlay = Boolean(episode.youtubeId || episode.audioUrl);
  const showNotes = getEpisodeShowNotes(episode.slug);

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-28 md:px-12 md:pt-32">
      <Link href="/episodes" className="link-subtle mb-10 inline-block">
        ← Episodes
      </Link>

      <header className="mb-10">
        {guest ? (
          <>
            <p className="section-eyebrow">{getGuestCompactLabel(guest)}</p>
            <h1 className="font-serif mt-4 text-4xl font-light leading-[1.08] tracking-tight text-white md:text-5xl">
              <Link
                href={`/guests/${guest.slug}`}
                className="transition-opacity hover:opacity-70"
              >
                {guest.name}
              </Link>
            </h1>
            <p className="mt-4 text-sm font-extralight leading-relaxed text-white/45">
              <time dateTime={episode.pubDate}>{formatEpisodeDate(episode.pubDate)}</time>
              <span className="mx-2 text-white/20" aria-hidden>
                ·
              </span>
              <span>{episode.title}</span>
            </p>
          </>
        ) : (
          <>
            <p className="section-eyebrow">Episode</p>
            <h1 className="font-serif mt-3 text-4xl font-light leading-[1.1] tracking-tight text-white md:text-5xl">
              {episode.title}
            </h1>
            <time
              dateTime={episode.pubDate}
              className="mt-4 block text-sm font-extralight text-white/45"
            >
              {formatEpisodeDate(episode.pubDate)}
            </time>
          </>
        )}
      </header>

      {canPlay && <EpisodePlayer episode={episode} />}

      {showNotes && (
        <p className="mt-8 max-w-2xl text-sm font-extralight leading-relaxed text-white/50">
          {showNotes}
        </p>
      )}

      <nav
        aria-label="Episode links"
        className="mt-8 flex flex-col gap-2.5 border-t border-white/10 pt-8"
      >
        {guest && (
          <Link href={`/guests/${guest.slug}`} className="link-quiet w-fit">
            About {getGuestFirstName(guest)} →
          </Link>
        )}
        {episode.spotifyUrl && (
          <a
            href={episode.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-quiet w-fit"
          >
            Listen on Spotify →
          </a>
        )}
        {episode.videoUrl && (
          <a
            href={episode.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-quiet w-fit"
          >
            Watch on YouTube →
          </a>
        )}
      </nav>
    </article>
  );
}
