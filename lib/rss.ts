import Parser from "rss-parser";
import { Episode, slugify, stripHtml } from "./episodes";

const parser = new Parser({
  customFields: {
    item: [
      ["itunes:duration", "duration"],
      ["itunes:image", "itunesImage", { keepArray: false }],
      ["enclosure", "enclosure", { keepArray: false }],
    ],
  },
});

type RssItem = {
  title?: string;
  link?: string;
  guid?: string;
  pubDate?: string;
  content?: string;
  contentSnippet?: string;
  description?: string;
  enclosure?: { url?: string; type?: string };
  itunes?: { duration?: string; image?: string };
  duration?: string;
  itunesImage?: { $?: { href?: string } } | string;
};

function getImageUrl(item: RssItem): string | undefined {
  if (typeof item.itunesImage === "string") return item.itunesImage;
  if (item.itunesImage?.$?.href) return item.itunesImage.$.href;
  if (item.itunes?.image) return item.itunes.image;
  return undefined;
}

function getAudioUrl(item: RssItem): string {
  if (item.enclosure?.url) return item.enclosure.url;
  return "";
}

function mapItemToEpisode(item: RssItem, index: number): Episode | null {
  const title = item.title?.trim();
  if (!title) return null;

  const slug = slugify(title) || `episode-${index}`;
  const description = stripHtml(
    item.contentSnippet || item.description || item.content || ""
  );

  return {
    title,
    slug,
    description,
    pubDate: item.pubDate || new Date().toISOString(),
    audioUrl: getAudioUrl(item),
    imageUrl: getImageUrl(item),
    duration: item.duration || item.itunes?.duration,
  };
}

export async function getEpisodes(): Promise<Episode[]> {
  const feedUrl = process.env.RSS_FEED_URL;

  if (!feedUrl) {
    return getPlaceholderEpisodes();
  }

  try {
    const feed = await parser.parseURL(feedUrl);
    const episodes = (feed.items as RssItem[])
      .map((item, index) => mapItemToEpisode(item, index))
      .filter((ep): ep is Episode => ep !== null && ep.audioUrl !== "");

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

function getPlaceholderEpisodes(): Episode[] {
  return [
    {
      title: "Bob Knakal on Building JLL Capital Markets",
      slug: "bob-knakal-on-building-jll-capital-markets",
      description:
        "A conversation on deal flow, market cycles, and what separates the operators who move New York commercial real estate.",
      pubDate: "2026-01-15T00:00:00.000Z",
      audioUrl: "",
      imageUrl: "/guests/bob-knakal.png",
    },
    {
      title: "Eric Brody on Adams & Company",
      slug: "eric-brody-on-adams-and-company",
      description:
        "How one of New York's most respected brokerage firms thinks about talent, culture, and closing in a shifting market.",
      pubDate: "2026-02-01T00:00:00.000Z",
      audioUrl: "",
      imageUrl: "/guests/eric-brody.jpg",
    },
    {
      title: "Eric Benaim on Modern Spaces",
      slug: "eric-benaim-on-modern-spaces",
      description:
        "Building a development and brokerage platform in Queens and Brooklyn, and what operators get right when they scale.",
      pubDate: "2026-02-20T00:00:00.000Z",
      audioUrl: "",
      imageUrl: "/guests/eric-benaim.jpg",
    },
    {
      title: "Michael Shah on DelShah Capital",
      slug: "michael-shah-on-delshah-capital",
      description:
        "From acquisitions to operations, how DelShah approaches multifamily and hospitality across New York.",
      pubDate: "2026-03-05T00:00:00.000Z",
      audioUrl: "",
      imageUrl: "/guests/michael-shah.jpg",
    },
  ];
}
