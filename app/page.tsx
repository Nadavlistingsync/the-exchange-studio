import { GuestMosaic } from "@/components/GuestMosaic";
import { NetworkIntro } from "@/components/NetworkIntro";
import { EpisodeCarousel } from "@/components/EpisodeCarousel";
import { Press } from "@/components/Press";
import { RequestAccessForm } from "@/components/RequestAccessForm";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { ListenLinks } from "@/components/ListenLinks";
import { getEpisodes } from "@/lib/rss";

export const revalidate = 3600;

export default async function HomePage() {
  const episodes = await getEpisodes();

  return (
    <>
      <GuestMosaic episodes={episodes} />
      <NetworkIntro />
      <EpisodeCarousel episodes={episodes} />
      <Press />
      <RequestAccessForm />
      <NewsletterCTA />
      <ListenLinks />
    </>
  );
}
