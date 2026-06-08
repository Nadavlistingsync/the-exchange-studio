import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuestEpisodeView } from "@/components/GuestEpisodeView";
import { SubpageNav } from "@/components/SubpageNav";
import { CONFIRMED_GUESTS, findBestEpisodeForGuest, findEpisodesForGuest } from "@/lib/guests";
import { getEpisodes } from "@/lib/rss";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://theexchange.studio";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return CONFIRMED_GUESTS.map((guest) => ({ slug: guest.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guest = CONFIRMED_GUESTS.find((g) => g.slug === slug);

  if (!guest) {
    return { title: "Guest Not Found" };
  }

  const imageUrl = guest.imagePath.startsWith("http")
    ? guest.imagePath
    : `${siteUrl}${guest.imagePath}`;

  return {
    title: guest.name,
    description: guest.bio,
    openGraph: {
      title: `${guest.name} | ${SITE.name}`,
      description: guest.bio,
      type: "profile",
      images: [{ url: imageUrl, alt: guest.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${guest.name} | ${SITE.name}`,
      description: guest.bio,
      images: [imageUrl],
    },
  };
}

export default async function GuestPage({ params }: PageProps) {
  const { slug } = await params;
  const guest = CONFIRMED_GUESTS.find((g) => g.slug === slug);

  if (!guest) {
    notFound();
  }

  const episodes = await getEpisodes();
  const episode = findBestEpisodeForGuest(guest, episodes);
  const relatedEpisodes = findEpisodesForGuest(guest, episodes);

  return (
    <>
      <SubpageNav />
      <GuestEpisodeView
        guest={guest}
        episode={episode}
        relatedEpisodes={relatedEpisodes}
      />
    </>
  );
}
