import type { Metadata } from "next";
import { EpisodeCard } from "@/components/EpisodeCard";
import { SubpageNav } from "@/components/SubpageNav";
import { getEpisodes } from "@/lib/rss";

export const metadata: Metadata = {
  title: "Episodes",
  description:
    "Conversations with the operators and principals shaping New York commercial real estate.",
};

export const revalidate = 3600;

export default async function EpisodesPage() {
  const episodes = await getEpisodes();

  return (
    <>
      <SubpageNav />
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-28 md:px-12 md:pt-32">
      <div className="fade-in mb-16 max-w-2xl">
        <p className="section-eyebrow mb-4">Episodes</p>
        <h1 className="text-4xl font-extralight tracking-tight text-white md:text-5xl">
          Episodes
        </h1>
        <p className="mt-4 text-sm font-extralight leading-relaxed text-white/50">
          Conversations with the operators and principals shaping New York
          commercial real estate.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {episodes.map((episode) => (
          <EpisodeCard key={episode.slug} episode={episode} />
        ))}
      </div>
    </section>
    </>
  );
}
