import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { EpisodePlayer } from "@/components/EpisodePlayer";
import { SubpageNav } from "@/components/SubpageNav";
import { formatEpisodeDate } from "@/lib/episodes";
import { getEpisodeBySlug, getEpisodes } from "@/lib/rss";

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const episodes = await getEpisodes();
  return episodes.map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);

  if (!episode) {
    return { title: "Episode Not Found" };
  }

  return {
    title: episode.title,
    description: episode.description,
  };
}

export default async function EpisodePage({ params }: PageProps) {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  return (
    <>
      <SubpageNav />
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-40 md:pt-48">
      <div className="fade-in">
        <p className="mb-4 text-xs font-extralight tracking-[0.25em] uppercase text-white/50">
          Episode
        </p>
        <time className="text-xs font-extralight text-white/40">
          {formatEpisodeDate(episode.pubDate)}
        </time>
        <h1 className="mt-4 text-3xl font-extralight leading-tight tracking-tight text-white md:text-4xl">
          {episode.title}
        </h1>

        {episode.imageUrl && (
          <div className="relative mt-10 aspect-square overflow-hidden border border-white/10">
            <Image
              src={episode.imageUrl}
              alt={episode.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
          </div>
        )}

        {(episode.youtubeId || episode.audioUrl) && (
          <div className="mt-10">
            <EpisodePlayer episode={episode} />
          </div>
        )}

        {episode.videoUrl && (
          <p className="mt-6">
            <a
              href={episode.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-extralight tracking-[0.15em] uppercase text-white/50 transition-colors hover:text-white"
            >
              Watch on YouTube
            </a>
          </p>
        )}

        <div className="mt-10 border-t border-white/10 pt-10">
          <p className="whitespace-pre-line text-sm font-extralight leading-relaxed text-white/60">
            {episode.description}
          </p>
        </div>
      </div>
    </article>
    </>
  );
}
