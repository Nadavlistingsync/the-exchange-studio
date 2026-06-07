import Parser from "rss-parser";
import { Episode, slugify, stripHtml } from "./episodes";
import {
  extractYouTubeId,
  getYouTubeFeedUrl,
  isFullYouTubeVideo,
} from "./youtube";

const parser = new Parser({
  customFields: {
    item: [
      ["itunes:duration", "duration"],
      ["itunes:image", "itunesImage", { keepArray: false }],
      ["enclosure", "enclosure", { keepArray: false }],
      ["yt:videoId", "videoId"],
      ["media:group", "mediaGroup"],
    ],
  },
});

type MediaThumbnail = { $?: { url?: string } };
type MediaGroup = {
  "media:thumbnail"?: MediaThumbnail[];
  "media:description"?: string[];
};

type RssItem = {
  title?: string;
  link?: string;
  guid?: string;
  pubDate?: string;
  isoDate?: string;
  content?: string;
  contentSnippet?: string;
  description?: string;
  enclosure?: { url?: string; type?: string };
  itunes?: { duration?: string; image?: string };
  duration?: string;
  itunesImage?: { $?: { href?: string } } | string;
  videoId?: string;
  mediaGroup?: MediaGroup;
};

function getImageUrl(item: RssItem): string | undefined {
  const youtubeThumb = item.mediaGroup?.["media:thumbnail"]?.[0]?.$?.url;
  if (youtubeThumb) return youtubeThumb;

  if (typeof item.itunesImage === "string") return item.itunesImage;
  if (item.itunesImage?.$?.href) return item.itunesImage.$.href;
  if (item.itunes?.image) return item.itunes.image;

  const youtubeId = extractYouTubeId(item.link, item.videoId);
  if (youtubeId) {
    return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
  }

  return undefined;
}

function getDescription(item: RssItem): string {
  const youtubeDescription = item.mediaGroup?.["media:description"]?.[0];
  const raw =
    youtubeDescription ||
    item.contentSnippet ||
    item.description ||
    item.content ||
    "";

  return stripHtml(raw).replace(/#\w+/g, "").trim();
}

function getAudioUrl(item: RssItem): string | undefined {
  if (item.enclosure?.url && item.enclosure.type?.startsWith("audio")) {
    return item.enclosure.url;
  }
  return undefined;
}

function buildSlug(title: string, youtubeId?: string, index?: number): string {
  const base = slugify(title) || `episode-${index ?? 0}`;
  if (youtubeId) {
    return `${base}-${youtubeId.toLowerCase()}`;
  }
  return base;
}

function mapItemToEpisode(item: RssItem, index: number): Episode | null {
  const title = item.title?.trim();
  if (!title) return null;

  const youtubeId = extractYouTubeId(item.link, item.videoId);
  const videoUrl = item.link || (youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : undefined);
  const slug = buildSlug(title, youtubeId, index);
  const description = getDescription(item);
  const isShort = Boolean(videoUrl && !isFullYouTubeVideo(videoUrl));

  return {
    title,
    slug,
    description,
    pubDate: item.isoDate || item.pubDate || new Date().toISOString(),
    audioUrl: getAudioUrl(item),
    videoUrl,
    youtubeId,
    imageUrl: getImageUrl(item),
    duration: item.duration || item.itunes?.duration,
    isShort,
  };
}

function hasPlayableMedia(episode: Episode): boolean {
  return Boolean(episode.youtubeId || episode.audioUrl);
}

export async function getEpisodes(): Promise<Episode[]> {
  const feedUrl = getYouTubeFeedUrl();

  try {
    const feed = await parser.parseURL(feedUrl);
    const episodes = (feed.items as RssItem[])
      .map((item, index) => mapItemToEpisode(item, index))
      .filter((ep): ep is Episode => ep !== null && hasPlayableMedia(ep));

    if (episodes.length === 0) {
      return getPlaceholderEpisodes();
    }

    return episodes;
  } catch {
    return getPlaceholderEpisodes();
  }
}

export async function getEpisodeBySlug(slug: string): Promise<Episode | null> {
  const episodes = await getEpisodes();
  return episodes.find((ep) => ep.slug === slug) ?? null;
}

export function getFeaturedEpisode(episodes: Episode[]): Episode | undefined {
  return episodes.find((ep) => !ep.isShort) ?? episodes[0];
}

function getPlaceholderEpisodes(): Episode[] {
  return [];
}
