export const YOUTUBE_CHANNEL_ID = "UCTrA61Wc5aZtorudu_2JRaw";

export const YOUTUBE_PLAYLIST_ID = "PLw44OCKOLKLQpbntYLrJHl8zEf3TA13Tv";

export const YOUTUBE_CHANNEL_URL =
  process.env.YOUTUBE_URL || "https://www.youtube.com/@TheExchange.Studio";

export const YOUTUBE_PLAYLIST_URL = `https://www.youtube.com/playlist?list=${YOUTUBE_PLAYLIST_ID}`;

/** Curated full episodes — avoids shorts/clips from the channel upload feed. */
export const YOUTUBE_RSS_FEED_URL = `https://www.youtube.com/feeds/videos.xml?playlist_id=${YOUTUBE_PLAYLIST_ID}`;

type YouTubeEpisodeCatalogEntry = {
  id: string;
  title: string;
  publishedAt?: string;
};

/** Stable guest-to-video fallbacks for production builds. */
const YOUTUBE_EPISODE_CATALOG: Record<string, YouTubeEpisodeCatalogEntry> = {
  "bob-knakal": {
    id: "ghvy21vXX3s",
    title: "How Bob Knakal sold 2,391 buildings | TEWN EP #14",
  },
  "jeff-gural": {
    id: "7XJ0bMa9pzI",
    title: "The Man Who Owns The Flatiron Building | Jeff Gural",
  },
  "stephen-siegel": {
    id: "vFJ_ZiXT6j8",
    title:
      "How he became the CEO of Cushman & Wakefield at 37 | Stephen Siegel",
  },
  "bess-freedman": {
    id: "jyGXd8Y8BbI",
    title: "Inside Brown Harris Stevens With CEO Bess Freedman | Episode",
  },
  "michael-shah": {
    id: "GOxIF0rSDeg",
    title: "How Michael Shah Paid Off $1B in Debt With Zero Foreclosures",
  },
  "eric-benaim": {
    id: "qJmmA5M0JgA",
    title:
      "From High School Dropout to $10B+ in Real Estate Deals | Eric Benaim, NGDR Ep. 6",
  },
  "jay-neveloff": {
    id: "r7u9YEZf-y0",
    title: "The Lawyer Behind $100B in NYC Real Estate Deals | Jay Neveloff",
  },
  "eric-brody": {
    id: "_8NFmsPlKnA",
    title: "How he came back from -$15M in real estate | Eric Brody",
    publishedAt: "2026-02-26T00:00:00.000Z",
  },
  "howard-fiddle": {
    id: "2mkd77rg1oY",
    title: "NYC's number one leasing broker | Howard Fiddle",
  },
  "beth-benalloul": {
    id: "Hb1RVpzbVPY",
    title:
      "She left personal training and sold $1 billion in real estate | Beth Benalloul",
  },
  "ari-harkov": {
    id: "gK5bDVhcAAw",
    title: "From Opera Singer to #1 at Brown Harris Stevens | Ari Harkov",
  },
  "michael-iuculano": {
    id: "1pu3svzsKJU",
    title:
      "How Michael Iuculano built a $2.2B real estate lending company. | Episode 16",
  },
  "daniella-schlisser": {
    id: "FjtOY2uc1b8",
    title:
      "From broke with 3 kids to 1 Billion+ in real estate sales, Daniella Schlisser | NGDR Ep #5",
  },
  "nate-weiland": {
    id: "un6osPRGumY",
    title: "From the NFL to 40 Million dollar real estate Deals | Nate Weiland",
  },
  "jeffery-berman": {
    id: "pRsLsJkZvlw",
    title: "Why Camber Creek is backing SERHANT | Jeffery Berman | Ep 13",
  },
  "eyal-mehaber": {
    id: "Lo5IP3JmcOI",
    title:
      "How an Israeli immigrant built a real estate empire from scratch | Eyal Mehaber Ep.13",
  },
  "jake-sisk": {
    id: "gvNQBDMBQ5U",
    title:
      "How Jake Sisk built a 10 Million Dollar Real Estate Empire at 23 | NGDR #4",
  },
  "jack-stone": {
    id: "diXpZmFyuyI",
    title: "How Jack Stone built one of the biggest brands in CRE.",
  },
  "rena-kliot": {
    id: "f_Ao0WBSh6M",
    title: "How Rena Kliot went from a divorce to 2 Billion in sales",
  },
  "michael-wagman": {
    id: "wTEFh9pc_Zs",
    title:
      "From Flipping houses in his free time to $90M in AUM | Michael Wagman NGDR Ep #7",
  },
  "anne-lusk": {
    id: "_DCHhp4m8bQ",
    title:
      '"Believe in yourself" How Anne Lusk Sold over 1 Billion Dollars as a agent NGDR Episode #3',
  },
  "matthew-teifke": {
    id: "ARs56u0HmBI",
    title:
      '"invest, invest, invest." Matthew Teifke from 0-120 Million at 34 | NGDR Ep #2',
  },
  "patti-m-williams": {
    id: "uD0ug4POrVg",
    title: "How She Closed $500M in Real Estate | NGDR Ep. 1",
  },
  "nkem-ezeamama": {
    id: "CKyJBa3Fu4M",
    title:
      "How an immigrant doctor started a $120M real estate fund in her free time | Nkem Ezemama | Ep. 8",
  },
};

export function getYouTubeEpisodeForGuest(
  guestSlug: string
): YouTubeEpisodeCatalogEntry | undefined {
  return YOUTUBE_EPISODE_CATALOG[guestSlug];
}

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
