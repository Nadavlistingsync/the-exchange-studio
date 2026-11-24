import { GuestMosaic } from "@/components/GuestMosaic";
import { LatestEpisodeStrip } from "@/components/LatestEpisodeStrip";
import { EpisodeCarousel } from "@/components/EpisodeCarousel";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import { getEpisodes, getFeaturedEpisode } from "@/lib/rss";

// Keep the mosaic fresh so guest-label fixes ship without waiting on a long ISR window.
export const revalidate = 0;

export default async function HomePage() {
  const episodes = await getEpisodes();
  const featured = episodes.length > 0 ? getFeaturedEpisode(episodes) : undefined;

  return (
    <>
      <GuestMosaic episodes={episodes} />
      {featured && <LatestEpisodeStrip episode={featured} />}
      <EpisodeCarousel episodes={episodes} />
      <NewsletterPopup />
    </>
  );
}
