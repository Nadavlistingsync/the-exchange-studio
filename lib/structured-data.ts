import type { Episode } from "./episodes";
import { SITE } from "./site";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://theexchange.studio";

export function getPodcastSeriesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: SITE.name,
    description: SITE.description,
    url: siteUrl,
    webFeed: SITE.listen.rss.startsWith("http") ? SITE.listen.rss : `${siteUrl}${SITE.listen.rss}`,
    author: {
      "@type": "Organization",
      name: SITE.name,
    },
  };
}

export function getEpisodeJsonLd(episode: Episode, guestName?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: guestName ?? episode.title,
    description: episode.description,
    datePublished: episode.pubDate,
    url: `${siteUrl}/episodes/${episode.slug}`,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: SITE.name,
      url: siteUrl,
    },
    ...(episode.videoUrl
      ? {
          associatedMedia: {
            "@type": "VideoObject",
            contentUrl: episode.videoUrl,
          },
        }
      : {}),
  };
}
