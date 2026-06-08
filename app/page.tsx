import { GuestMosaic } from "@/components/GuestMosaic";
import { NetworkIntro } from "@/components/NetworkIntro";
import { EpisodeCarousel } from "@/components/EpisodeCarousel";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import { getEpisodes } from "@/lib/rss";

export const revalidate = 3600;

export default async function HomePage() {
  const episodes = await getEpisodes();

  return (
    <>
      <GuestMosaic episodes={episodes} />
      <NetworkIntro />
      <EpisodeCarousel episodes={episodes} />
      <NewsletterPopup />
    </>
  );
}
