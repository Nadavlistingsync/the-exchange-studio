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
    publishedAt: "2026-03-19T13:00:00.000Z",
  },
  "jeff-gural": {
    id: "7XJ0bMa9pzI",
    title: "The Man Who Owns The Flatiron Building | Jeff Gural",
    publishedAt: "2026-05-14T13:00:00.000Z",
  },
  "stephen-siegel": {
    id: "vFJ_ZiXT6j8",
    title:
      "How he became the CEO of Cushman & Wakefield at 37 | Stephen Siegel",
    publishedAt: "2026-06-04T13:00:00.000Z",
  },
  "bess-freedman": {
    id: "jyGXd8Y8BbI",
    title: "Inside Brown Harris Stevens With CEO Bess Freedman | Episode",
    publishedAt: "2026-05-28T13:00:00.000Z",
  },
  "michael-shah": {
    id: "GOxIF0rSDeg",
    title: "How Michael Shah Paid Off $1B in Debt With Zero Foreclosures",
    publishedAt: "2026-05-21T13:00:00.000Z",
  },
  "eric-benaim": {
    id: "qJmmA5M0JgA",
    title:
      "From High School Dropout to $10B+ in Real Estate Deals | Eric Benaim, NGDR Ep. 6",
    publishedAt: "2026-02-05T13:00:00.000Z",
  },
  "jay-neveloff": {
    id: "r7u9YEZf-y0",
    title: "The Lawyer Behind $100B in NYC Real Estate Deals | Jay Neveloff",
    publishedAt: "2026-06-18T13:00:00.000Z",
  },
  "eric-brody": {
    id: "_8NFmsPlKnA",
    title: "How he came back from -$15M in real estate | Eric Brody",
    publishedAt: "2026-02-26T00:00:00.000Z",
  },
  "howard-fiddle": {
    id: "2mkd77rg1oY",
    title: "NYC's number one leasing broker | Howard Fiddle",
    publishedAt: "2026-06-25T13:00:00.000Z",
  },
  "beth-benalloul": {
    id: "Hb1RVpzbVPY",
    title:
      "She left personal training and sold $1 billion in real estate | Beth Benalloul",
    publishedAt: "2026-05-07T13:00:00.000Z",
  },
  "ari-harkov": {
    id: "gK5bDVhcAAw",
    title: "From Opera Singer to #1 at Brown Harris Stevens | Ari Harkov",
    publishedAt: "2026-04-02T13:00:00.000Z",
  },
  "michael-iuculano": {
    id: "1pu3svzsKJU",
    title:
      "How Michael Iuculano built a $2.2B real estate lending company. | Episode 16",
    publishedAt: "2026-04-23T13:00:00.000Z",
  },
  "daniella-schlisser": {
    id: "FjtOY2uc1b8",
    title:
      "From broke with 3 kids to 1 Billion+ in real estate sales, Daniella Schlisser | NGDR Ep #5",
    publishedAt: "2026-01-29T13:00:00.000Z",
  },
  "nate-weiland": {
    id: "un6osPRGumY",
    title: "From the NFL to 40 Million dollar real estate Deals | Nate Weiland",
    publishedAt: "2026-04-09T13:00:00.000Z",
  },
  "jeffery-berman": {
    id: "pRsLsJkZvlw",
    title: "Why Camber Creek is backing SERHANT | Jeffery Berman | Ep 13",
    publishedAt: "2026-03-12T13:00:00.000Z",
  },
  "eyal-mehaber": {
    id: "Lo5IP3JmcOI",
    title:
      "How an Israeli immigrant built a real estate empire from scratch | Eyal Mehaber Ep.13",
    publishedAt: "2026-03-05T13:00:00.000Z",
  },
  "jake-sisk": {
    id: "gvNQBDMBQ5U",
    title:
      "How Jake Sisk built a 10 Million Dollar Real Estate Empire at 23 | NGDR #4",
    publishedAt: "2026-01-22T13:00:00.000Z",
  },
  "jack-stone": {
    id: "diXpZmFyuyI",
    title: "How Jack Stone built one of the biggest brands in CRE.",
    publishedAt: "2026-06-11T13:00:00.000Z",
  },
  "rena-kliot": {
    id: "f_Ao0WBSh6M",
    title: "How Rena Kliot went from a divorce to 2 Billion in sales",
    publishedAt: "2026-04-30T13:00:00.000Z",
  },
  "michael-wagman": {
    id: "wTEFh9pc_Zs",
    title:
      "From Flipping houses in his free time to $90M in AUM | Michael Wagman NGDR Ep #7",
    publishedAt: "2026-02-12T13:00:00.000Z",
  },
  "anne-lusk": {
    id: "_DCHhp4m8bQ",
    title:
      '"Believe in yourself" How Anne Lusk Sold over 1 Billion Dollars as a agent NGDR Episode #3',
    publishedAt: "2026-01-16T13:00:00.000Z",
  },
  "matthew-teifke": {
    id: "ARs56u0HmBI",
    title:
      '"invest, invest, invest." Matthew Teifke from 0-120 Million at 34 | NGDR Ep #2',
    publishedAt: "2026-01-08T13:00:00.000Z",
  },
  "patti-m-williams": {
    id: "uD0ug4POrVg",
    title: "How She Closed $500M in Real Estate | NGDR Ep. 1",
    publishedAt: "2025-12-18T13:00:00.000Z",
  },
  "nkem-ezeamama": {
    id: "CKyJBa3Fu4M",
    title:
      "How an immigrant doctor started a $120M real estate fund in her free time | Nkem Ezemama | Ep. 8",
    publishedAt: "2026-02-19T13:00:00.000Z",
  },
  "leonard-steinberg": {
    id: "FBz3oU7rf3A",
    title:
      "Inside Compass: Building a Brokerage and Selling Luxury Real Estate | Leonard Steinberg",
    publishedAt: "2026-10-22T21:15:00.000Z",
  },
  "james-nelson": {
    id: "KIbsDipPCHA",
    title:
      "Inside New York Real Estate: Selling Buildings and Building a Business | James Nelson (Podcast)",
    publishedAt: "2026-10-08T13:00:00.000Z",
  },
  "sean-dalfen": {
    id: "MgNFNQHooRk",
    title:
      "Inside Dalfen Industrial: Buying, Building and Investing in Warehouses | Sean Dalfen",
    publishedAt: "2026-09-24T13:00:00.000Z",
  },
  "marc-zegen": {
    id: "K5hn6k-ntw4",
    title:
      "Inside Madison Realty Capital: Real Estate Lending and Private Credit | Marc Zegen",
    publishedAt: "2026-11-03T17:00:00.000Z",
  },
  "bernard-raskin": {
    id: "16TQvzis9j4",
    title: "How Bernard Raskin built the largest brokerage in Israel | The Exchange",
    publishedAt: "2026-07-16T13:00:00.000Z",
  },
  "jonathan-steinberg": {
    id: "xb7657jUmjs",
    title: "How Jonathan Steinberg Built Israel's Largest CRE brokerage | Podcast",
    publishedAt: "2026-07-02T13:00:00.000Z",
  },
};

export function getYouTubeEpisodeForGuest(
  guestSlug: string
): YouTubeEpisodeCatalogEntry | undefined {
  return YOUTUBE_EPISODE_CATALOG[guestSlug];
}

/** Full catalog entries used to backfill episodes missing from the playlist RSS. */
export function getYouTubeEpisodeCatalog(): Record<
  string,
  YouTubeEpisodeCatalogEntry
> {
  return YOUTUBE_EPISODE_CATALOG;
}

export function getYouTubeFeedUrl(): string {
  const override = process.env.RSS_FEED_URL?.trim();
  if (
    override &&
    /channel_id=/i.test(override) &&
    !/playlist_id=/i.test(override)
  ) {
    // Channel uploads include shorts/clips; always prefer the curated playlist.
    return YOUTUBE_RSS_FEED_URL;
  }
  return override || YOUTUBE_RSS_FEED_URL;
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
