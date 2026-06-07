import { YOUTUBE_CHANNEL_URL, YOUTUBE_RSS_FEED_URL } from "./youtube";

export const SITE = {
  name: "The Exchange",
  description:
    "An invitation-only network for principals and operators who move New York commercial real estate.",
  email: "nadav@theexchange.studio",
  linkedin:
    process.env.LINKEDIN_URL ||
    "https://www.linkedin.com/company/theexchangenpod",
  beehiiv: "https://the-exchange-studio.beehiiv.com/",
  youtube: YOUTUBE_CHANNEL_URL,
  listen: {
    apple: process.env.APPLE_PODCASTS_URL || "#",
    spotify: process.env.SPOTIFY_URL || "#",
    youtube: process.env.YOUTUBE_URL || YOUTUBE_CHANNEL_URL,
    rss: process.env.RSS_FEED_URL || YOUTUBE_RSS_FEED_URL,
  },
} as const;
