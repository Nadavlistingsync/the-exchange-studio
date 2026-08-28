import type { Episode } from "./episodes";
import { slugify } from "./episodes";
import { matchGuestSlugFromEpisode } from "./guests";

export const SPOTIFY_SHOW_ID = "2zqF7Nd90IqgRH5O1AC6wz";

export const SPOTIFY_SHOW_URL = `https://open.spotify.com/show/${SPOTIFY_SHOW_ID}`;

const SPOTIFY_EPISODE_URL_PATTERN =
  /https?:\/\/open\.spotify\.com\/episode\/[A-Za-z0-9]+/i;

/** Fallback catalog when Spotify show HTML is client-rendered (The Exchange Pod). */
const SPOTIFY_EPISODE_CATALOG: { title: string; id: string }[] = [
  {
    title: "How Bernard Raskin built the largest brokerage in Israel | The Exchange",
    id: "2HLg6wwo6Fl9kUY1vw61CI",
  },
  {
    title: "How Jonathan Steinberg Built Israel's Largest CRE brokerage | Podcast",
    id: "38iKJItDTput1jlFpMf63H",
  },
  {
    title: "Special episode with: Rahel Benguigui.",
    id: "6fNZK55tbJFWIKKQoR7Nlz",
  },
  {
    title: "NYC's number one leasing broker | Howard Fiddle",
    id: "5CV4q87Gfqaeu7dnAe9r7a",
  },
  {
    title: "The Lawyer Behind $100B in NYC Real Estate Deals | Jay Neveloff",
    id: "0nfuL2rFJswrb1zHLcLE4C",
  },
  {
    title: "How Jack Stone Built One Of Real Estate’s Top Podcasts",
    id: "2WzUC3iDPL2G1Ka3Sgkh87",
  },
  {
    title: "How he became the CEO of Cushman & Wakefield at 37 | Stephen Siegel",
    id: "5RWYTWfFyBOSBHTvHTkxKy",
  },
  {
    title: "Inside Brown Harris Stevens with Bess Freedman",
    id: "5joLlf8YOuFtxbVRp8chhj",
  },
  {
    title: "How Michael Shah Paid Off $1B in Debt With Zero Foreclosures",
    id: "1LeLDwZkXilJQUmRCOPdjn",
  },
  {
    title: "The Man Who Owns The Flatiron Building | Jeff Gural",
    id: "7e52GydC9m9Uy6TVvYyprh",
  },
  {
    title:
      "She left personal training to sell $1 billion in real estate | Beth Benalloul",
    id: "1uvun2vZyW9HeV9LZdmpHv",
  },
  {
    title: "How Rena Kliot went from a divorce to 2 Billion in sales",
    id: "5fEUouNLTZRQiDCu9QQrQN",
  },
  {
    title:
      "How Michael Iuculano built a $2.2B real estate lending company. | Episode 16",
    id: "3BKfu0K1EPRe2CPflHBGYV",
  },
  {
    title: "From the NFL to 40 Million dollar real estate Deals | Nate Weiland",
    id: "6HEwfaoQGoDkON6w9AA55X",
  },
  {
    title: "From Opera Singer to #1 at Brown Harris Stevens | Ari Harkov",
    id: "4j74jlxTICaUHB65cUNV8s",
  },
  {
    title: "How Bob Knakal sold 2,391 buildings | TEWN EP #14",
    id: "0gzI4wNiPeyVsZQ7wHm5VO",
  },
  {
    title: "Why Camber Creek is backing SERHANT | Jeffery Berman Ep 12",
    id: "56NK5HhGo7HVcWdzN2Suwv",
  },
  {
    title:
      "How an Israeli immigrant built a real estate empire from scratch | Eyal Mehaber Ep.13",
    id: "3UFIMwaFy8Za8ZOq6lgUCv",
  },
  {
    title: "How he came back from -$15M in real estate | Eric Brody | Ep. 9",
    id: "6BmuhV83wxLxZkHrexuhMI",
  },
  {
    title:
      "How a immigrant doctor started a $120M AUM Fund in her free time | Nkem Ezeamama Ep #8",
    id: "0t0apUraNSJI5p5ODRmZgj",
  },
  {
    title:
      "From Flipping houses in his free time to $90M in AUM | Michael Wagman NGDR Ep #7",
    id: "6dVv7YkPvFN9h2EWpofj19",
  },
  {
    title:
      "From High School Dropout to $10B+ in Real Estate Deals | Eric Benaim, NGDR Ep. 6",
    id: "1ZOIBNCqryES0ssj45cohm",
  },
  {
    title:
      "From broke with 3 kids to 1 Billion+ in real estate sales, Daniella Schlisser | NGDR Ep #5",
    id: "6npqyXHweZus7GQGI3aH2G",
  },
  {
    title:
      "How Jake Sisk built a 10 Million Dollar Real Estate Empire at 23 | NGDR #4",
    id: "3HGuO8ZiyJYrdowdnzoTry",
  },
  {
    title:
      '"Believe in yourself" How Anne Lusk Sold over 1 Billion Dollars as a agent NGDR Episode #3',
    id: "5jqNMFuYA7EP0lH0dIuQ4w",
  },
  {
    title:
      '"invest, invest, invest." Matthew Teifke from 0-120 Million at 34 | NGDR Ep #2',
    id: "65vsDd6GzBKMyBY9mIkkLu",
  },
  {
    title: "How Patti Williams Closed $500M in Real Estate | NGDR Ep. 1",
    id: "2aDeeF9tNk2hoD3m7yefdm",
  },
];

type SpotifyEpisode = {
  id: string;
  title: string;
};

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function normalizeTitle(title: string): string {
  return decodeHtmlEntities(title)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getSignificantWords(title: string): string[] {
  return normalizeTitle(title)
    .split(" ")
    .filter((word) => word.length > 3);
}

function titlesMatch(a: string, b: string): boolean {
  const left = normalizeTitle(a);
  const right = normalizeTitle(b);

  if (!left || !right) return false;
  if (left === right) return true;
  if (left.includes(right) || right.includes(left)) return true;

  const leftWords = getSignificantWords(a);
  const rightWords = new Set(getSignificantWords(b));
  if (leftWords.length === 0 || rightWords.size === 0) return false;

  const overlap = leftWords.filter((word) => rightWords.has(word)).length;
  const threshold = Math.max(
    3,
    Math.ceil(Math.min(leftWords.length, rightWords.size) * 0.55)
  );

  return overlap >= threshold;
}

function getSpotifyShowUrl(): string {
  return process.env.SPOTIFY_URL || SPOTIFY_SHOW_URL;
}

export function getSpotifyEpisodeUrl(id: string): string {
  return `https://open.spotify.com/episode/${id}`;
}

export function getCatalogEntryById(
  id: string
): { title: string; id: string } | undefined {
  return SPOTIFY_EPISODE_CATALOG.find((entry) => entry.id === id);
}

/** Spotify catalog entries not yet in the YouTube RSS feed. */
export function getSupplementalEpisodes(): Episode[] {
  return SPOTIFY_EPISODE_CATALOG.map((entry, index) => ({
    title: entry.title,
    slug: slugify(entry.title),
    description: "",
    pubDate: new Date(Date.UTC(2024, 0, 20 - index)).toISOString(),
    spotifyUrl: getSpotifyEpisodeUrl(entry.id),
  }));
}

export function episodeTitlesMatch(a: string, b: string): boolean {
  return titlesMatch(a, b);
}

export function extractSpotifyEpisodeUrl(text: string): string | undefined {
  const match = text.match(SPOTIFY_EPISODE_URL_PATTERN);
  return match?.[0];
}

function parseSpotifyEpisodes(html: string): SpotifyEpisode[] {
  const episodes: SpotifyEpisode[] = [];
  const pattern =
    /href="\/episode\/([A-Za-z0-9]+)"[\s\S]*?data-testid="episodeTitle"[^>]*>(?:<span[^>]*><\/span>)?([^<]+)</g;

  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html)) !== null) {
    episodes.push({
      id: match[1],
      title: decodeHtmlEntities(match[2].trim()),
    });
  }

  return episodes;
}

function getCatalogEpisodes(): SpotifyEpisode[] {
  return SPOTIFY_EPISODE_CATALOG.map((entry) => ({
    id: entry.id,
    title: entry.title,
  }));
}

async function fetchSpotifyEpisodes(): Promise<SpotifyEpisode[]> {
  try {
    const response = await fetch(getSpotifyShowUrl(), {
      next: { revalidate: 3600 },
    });

    if (!response.ok) return getCatalogEpisodes();

    const html = await response.text();
    const parsed = parseSpotifyEpisodes(html);
    return parsed.length > 0 ? parsed : getCatalogEpisodes();
  } catch {
    return getCatalogEpisodes();
  }
}

function findSpotifyEpisode(
  episode: Episode,
  spotifyEpisodes: SpotifyEpisode[]
): SpotifyEpisode | undefined {
  const guestSlug = matchGuestSlugFromEpisode(episode);

  return spotifyEpisodes.find((spotifyEpisode) => {
    if (titlesMatch(episode.title, spotifyEpisode.title)) {
      return true;
    }

    if (!guestSlug) return false;

    const normalizedTitle = normalizeTitle(spotifyEpisode.title);
    const guestToken = guestSlug.replace(/-/g, " ");
    return normalizedTitle.includes(guestToken);
  });
}

export async function enrichEpisodesWithSpotify(
  episodes: Episode[]
): Promise<Episode[]> {
  const spotifyEpisodes = await fetchSpotifyEpisodes();
  if (spotifyEpisodes.length === 0) return episodes;

  return episodes.map((episode) => {
    if (episode.spotifyUrl) return episode;

    const match = findSpotifyEpisode(episode, spotifyEpisodes);
    if (!match) return episode;

    return {
      ...episode,
      spotifyUrl: getSpotifyEpisodeUrl(match.id),
    };
  });
}

export function getEpisodeListenUrl(episode?: Episode): string | undefined {
  if (!episode) return undefined;
  if (episode.spotifyUrl) return episode.spotifyUrl;
  if (episode.videoUrl) return episode.videoUrl;
  if (episode.audioUrl) return episode.audioUrl;
  return undefined;
}
