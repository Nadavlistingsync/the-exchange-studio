export const YOUTUBE_CHANNEL_ID = "UCTrA61Wc5aZtorudu_2JRaw";

export const YOUTUBE_PLAYLIST_ID = "PLw44OCKOLKLQpbntYLrJHl8zEf3TA13Tv";

export const YOUTUBE_CHANNEL_URL =
  process.env.YOUTUBE_URL || "https://www.youtube.com/@TheExchange.Studio";

export const YOUTUBE_PLAYLIST_URL = `https://www.youtube.com/playlist?list=${YOUTUBE_PLAYLIST_ID}`;

/** Curated full episodes — avoids shorts/clips from the channel upload feed. */
export const YOUTUBE_RSS_FEED_URL = `https://www.youtube.com/feeds/videos.xml?playlist_id=${YOUTUBE_PLAYLIST_ID}`;

export function getYouTubeFeedUrl(): string {
  return process.env.RSS_FEED_URL || YOUTUBE_RSS_FEED_URL;
}

export function isFullYouTubeVideo(link?: string): boolean {
  return Boolean(link?.includes("/watch?v="));
}

export function extractYouTubeId(link?: string, fallback?: string): string | undefined {
  if (fallback) return fallback;
  if (!link) return undefined;

  const watchMatch = link.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];

  const shortsMatch = link.match(/\/shorts\/([^/?]+)/);
  if (shortsMatch) return shortsMatch[1];

  return undefined;
}
