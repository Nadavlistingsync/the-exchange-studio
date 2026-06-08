import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { EpisodeView } from "@/components/EpisodeView";
import { JsonLd } from "@/components/JsonLd";
import { SubpageNav } from "@/components/SubpageNav";
import { getGuestForEpisode } from "@/lib/guests";
import { getEpisodeBySlug, getEpisodes } from "@/lib/rss";
import { getEpisodeJsonLd } from "@/lib/structured-data";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://theexchange.studio";

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

  const guest = getGuestForEpisode(episode);
  const title = guest?.name ?? episode.title;
  const description = guest?.bio ?? episode.description;
  const imagePath = guest?.imagePath ?? episode.imageUrl;
  const imageUrl = imagePath
    ? imagePath.startsWith("http")
      ? imagePath
      : `${siteUrl}${imagePath}`
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      type: "article",
      ...(imageUrl ? { images: [{ url: imageUrl, alt: title }] } : {}),
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: `${title} | ${SITE.name}`,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

export default async function EpisodePage({ params }: PageProps) {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  const guest = getGuestForEpisode(episode);

  if (guest) {
    redirect(`/guests/${guest.slug}`);
  }

  return (
    <>
      <JsonLd data={getEpisodeJsonLd(episode)} />
      <SubpageNav />
      <EpisodeView episode={episode} />
    </>
  );
}
