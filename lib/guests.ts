import type { Episode } from "./episodes";

export type Guest = {
  name: string;
  slug: string;
  shortLabel: string;
  title?: string;
  imagePath: string;
  accentColor: string;
  matchTerms: string[];
};

export type GuestWithEpisode = Guest & {
  episode?: Episode;
  displayImage: string;
};

export const CONFIRMED_GUESTS: Guest[] = [
  {
    name: "Bob Knakal",
    slug: "bob-knakal",
    shortLabel: "BOB",
    title: "Chairman, JLL Capital Markets",
    imagePath: "/guests/bob-knakal.jpg",
    accentColor: "#1a2332",
    matchTerms: ["bob knakal", "knakal"],
  },
  {
    name: "Jeff Gural",
    slug: "jeff-gural",
    shortLabel: "JEFF",
    title: "Chairman, GFP Real Estate",
    imagePath: "/guests/jeff-gural.jpg",
    accentColor: "#222222",
    matchTerms: ["jeff gural", "gural"],
  },
  {
    name: "Stephen Siegel",
    slug: "stephen-siegel",
    shortLabel: "STEPHEN",
    title: "Chairman, Global Holdings",
    imagePath: "/guests/stephen-siegel.jpg",
    accentColor: "#1f2d2d",
    matchTerms: ["stephen siegel", "siegel"],
  },
  {
    name: "Bess Freedman",
    slug: "bess-freedman",
    shortLabel: "BESS",
    title: "CEO, Brown Harris Stevens",
    imagePath: "/guests/bess-freedman.jpg",
    accentColor: "#2d2424",
    matchTerms: ["bess freedman", "freedman"],
  },
  {
    name: "Eric Benaim",
    slug: "eric-benaim",
    shortLabel: "ERIC B",
    title: "Founder, Modern Spaces",
    imagePath: "/guests/eric-benaim.jpg",
    accentColor: "#242430",
    matchTerms: ["eric benaim", "benaim", "modern spaces"],
  },
  {
    name: "Michael Shah",
    slug: "michael-shah",
    shortLabel: "MICHAEL",
    title: "CEO, DelShah Capital",
    imagePath: "/guests/michael-shah.jpg",
    accentColor: "#1e2a1e",
    matchTerms: ["michael shah", "delshah", "shah"],
  },
  {
    name: "Jay Neveloff",
    slug: "jay-neveloff",
    shortLabel: "JAY",
    title: "Partner, Kramer Levin",
    imagePath: "/guests/jay-neveloff.jpg",
    accentColor: "#2a2420",
    matchTerms: ["jay neveloff", "neveloff"],
  },
  {
    name: "Eric Brody",
    slug: "eric-brody",
    shortLabel: "ERIC",
    title: "Founder, Adams & Company",
    imagePath: "/guests/eric-brody.jpg",
    accentColor: "#282828",
    matchTerms: ["eric brody", "brody"],
  },
];

function episodeMatchesGuest(episode: Episode, guest: Guest): boolean {
  const title = episode.title.toLowerCase();
  return guest.matchTerms.some((term) => title.includes(term));
}

export function findBestEpisodeForGuest(
  guest: Guest,
  episodes: Episode[]
): Episode | undefined {
  const matches = episodes.filter((ep) => episodeMatchesGuest(ep, guest));
  if (matches.length === 0) return undefined;

  return (
    matches.find((ep) => !ep.isShort) ??
    matches.sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    )[0]
  );
}

export function getYouTubeThumbnail(youtubeId: string): string {
  return `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;
}

export function getGuestsWithEpisodes(episodes: Episode[]): GuestWithEpisode[] {
  return CONFIRMED_GUESTS.map((guest) => {
    const episode = findBestEpisodeForGuest(guest, episodes);
    const displayImage =
      episode?.youtubeId
        ? getYouTubeThumbnail(episode.youtubeId)
        : episode?.imageUrl || guest.imagePath;

    return {
      ...guest,
      episode,
      displayImage,
    };
  });
}

export function matchGuestToEpisodeSlug(
  guestName: string,
  episodeTitles: { title: string; slug: string }[]
): string | undefined {
  const guest = CONFIRMED_GUESTS.find(
    (g) => g.name.toLowerCase() === guestName.toLowerCase()
  );
  if (!guest) return undefined;

  const terms = guest.matchTerms;
  const match = episodeTitles.find((ep) =>
    terms.some((term) => ep.title.toLowerCase().includes(term))
  );
  return match?.slug;
}
