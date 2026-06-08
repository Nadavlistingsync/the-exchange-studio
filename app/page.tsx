import { GuestMosaic } from "@/components/GuestMosaic";
import { LatestEpisodeStrip } from "@/components/LatestEpisodeStrip";
import { NetworkIntro } from "@/components/NetworkIntro";
import { EpisodeCarousel } from "@/components/EpisodeCarousel";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import { getEpisodes, getFeaturedEpisode } from "@/lib/rss";

export const revalidate = 3600;

export default async function HomePage() {
  const episodes = await getEpisodes();
  const featured = episodes.length > 0 ? getFeaturedEpisode(episodes) : undefined;

  return (
    <>
      <GuestMosaic episodes={episodes} />
      {featured && <LatestEpisodeStrip episode={featured} />}
      <NetworkIntro />
      <EpisodeCarousel episodes={episodes} />
      <NewsletterPopup />
    </>
  );
}
