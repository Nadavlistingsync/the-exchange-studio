export const SITE = {
  name: "The Exchange",
  description:
    "An invitation-only network for principals and operators who move New York commercial real estate.",
  email: "nadav@theexchange.studio",
  linkedin:
    process.env.LINKEDIN_URL ||
    "https://www.linkedin.com/company/theexchangenpod",
  beehiiv: "https://the-exchange-studio.beehiiv.com/",
  listen: {
    apple: process.env.APPLE_PODCASTS_URL || "#",
    spotify: process.env.SPOTIFY_URL || "#",
    youtube: process.env.YOUTUBE_URL || "#",
    rss: process.env.RSS_FEED_URL || "#",
  },
} as const;
