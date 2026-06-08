import { SPOTIFY_SHOW_URL } from "./spotify";
import { YOUTUBE_CHANNEL_URL, YOUTUBE_RSS_FEED_URL } from "./youtube";

export const SITE = {
  name: "The Exchange",
  description:
    "An invitation-only network for principals and operators who move New York commercial real estate.",
  email: "nadav@theexchange.studio",
  newsletter: "https://substack.com/@theexchangestudio",
  /** Luma events page — set when events are live. */
  eventsUrl: process.env.NEXT_PUBLIC_LUMA_EVENTS_URL || "",
  social: {
    youtube: process.env.YOUTUBE_URL || YOUTUBE_CHANNEL_URL,
    instagram:
      process.env.INSTAGRAM_URL || "https://www.instagram.com/theexchange.studio/",
    tiktok:
      process.env.TIKTOK_URL || "https://www.tiktok.com/@theexchange.studio",
    linkedin:
      process.env.LINKEDIN_URL ||
      "https://www.linkedin.com/company/theexchangenpod",
  },
  listen: {
    apple: process.env.APPLE_PODCASTS_URL || "/listen/apple",
    spotify: process.env.SPOTIFY_URL || SPOTIFY_SHOW_URL,
    youtube: process.env.YOUTUBE_URL || YOUTUBE_CHANNEL_URL,
    rss: process.env.RSS_FEED_URL || YOUTUBE_RSS_FEED_URL,
  },
} as const;
