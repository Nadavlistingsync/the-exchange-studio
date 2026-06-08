import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuestEpisodeView } from "@/components/GuestEpisodeView";
import { SubpageNav } from "@/components/SubpageNav";
import { CONFIRMED_GUESTS, findBestEpisodeForGuest } from "@/lib/guests";
import { getEpisodes } from "@/lib/rss";

export const revalidate = 3600;

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

  return {
    title: guest.name,
    description: guest.bio,
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

  return (
    <>
      <SubpageNav />
      <GuestEpisodeView guest={guest} episode={episode} />
    </>
  );
}
