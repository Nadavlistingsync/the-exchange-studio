import type { MetadataRoute } from "next";
import { CONFIRMED_GUESTS } from "@/lib/guests";
import { getEpisodes } from "@/lib/rss";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://theexchange.studio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const episodes = await getEpisodes();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/episodes",
    "/guests",
    "/network",
    "/sponsors",
    "/listen/apple",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const episodeRoutes: MetadataRoute.Sitemap = episodes.map((episode) => ({
    url: `${siteUrl}/episodes/${episode.slug}`,
    lastModified: new Date(episode.pubDate),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const guestRoutes: MetadataRoute.Sitemap = CONFIRMED_GUESTS.map((guest) => ({
    url: `${siteUrl}/guests/${guest.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...episodeRoutes, ...guestRoutes];
}
