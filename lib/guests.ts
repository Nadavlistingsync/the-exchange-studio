import type { Episode } from "./episodes";

export type Guest = {
  name: string;
  slug: string;
  shortLabel: string;
  role: string;
  company: string;
  bio: string;
  rank: number;
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
    role: "Chairman",
    company: "JLL Capital Markets",
    rank: 1,
    bio: "The most prolific investment sales broker in New York City history. Over four decades he has sold more than $30 billion in commercial assets and shaped how deals get done in every borough.",
    imagePath: "/guests/bob-knakal.jpg",
    accentColor: "#1a2332",
    matchTerms: ["bob knakal", "knakal"],
  },
  {
    name: "Jeff Gural",
    slug: "jeff-gural",
    shortLabel: "JEFF",
    role: "Chairman",
    company: "GFP Real Estate",
    rank: 2,
    bio: "Chairman of GFP Real Estate and one of the most visible landlords in New York. Known for the Flatiron Building and a portfolio that spans Manhattan and beyond.",
    imagePath: "/guests/jeff-gural.jpg",
    accentColor: "#222222",
    matchTerms: ["jeff gural", "gural"],
  },
  {
    name: "Stephen Siegel",
    slug: "stephen-siegel",
    shortLabel: "STEPHEN",
    role: "Chairman",
    company: "Global Holdings",
    rank: 3,
    bio: "Chairman of Global Holdings and a veteran operator who helped build Cushman & Wakefield into a global platform before leading one of New York's largest private real estate companies.",
    imagePath: "/guests/stephen-siegel.jpg",
    accentColor: "#1f2d2d",
    matchTerms: ["stephen siegel", "siegel"],
  },
  {
    name: "Bess Freedman",
    slug: "bess-freedman",
    shortLabel: "BESS",
    role: "CEO",
    company: "Brown Harris Stevens",
    rank: 4,
    bio: "CEO of Brown Harris Stevens, one of New York's oldest and most prestigious residential brokerages. She leads the firm through a market defined by record deals and rapid change.",
    imagePath: "/guests/bess-freedman.jpg",
    accentColor: "#2d2424",
    matchTerms: ["bess freedman", "freedman"],
  },
  {
    name: "Michael Shah",
    slug: "michael-shah",
    shortLabel: "MICHAEL",
    role: "CEO",
    company: "DelShah Capital",
    rank: 5,
    bio: "CEO of DelShah Capital, a vertically integrated owner and operator known for disciplined acquisitions, heavy value-add, and navigating complex capital structures without losing a single asset.",
    imagePath: "/guests/michael-shah.jpg",
    accentColor: "#1e2a1e",
    matchTerms: ["michael shah", "delshah", "shah"],
  },
  {
    name: "Eric Benaim",
    slug: "eric-benaim",
    shortLabel: "ERIC B",
    role: "Founder",
    company: "Modern Spaces",
    rank: 6,
    bio: "Founder of Modern Spaces, the Queens-born brokerage that grew into one of the city's fastest-scaling residential platforms through brokerage, development, and marketing under one roof.",
    imagePath: "/guests/eric-benaim.jpg",
    accentColor: "#242430",
    matchTerms: ["eric benaim", "benaim", "modern spaces"],
  },
  {
    name: "Jay Neveloff",
    slug: "jay-neveloff",
    shortLabel: "JAY",
    role: "Partner",
    company: "Kramer Levin",
    rank: 7,
    bio: "Partner at Kramer Levin and one of the most cited real estate attorneys in New York. He has structured transactions across every asset class for institutional owners and developers.",
    imagePath: "/guests/jay-neveloff.jpg",
    accentColor: "#2a2420",
    matchTerms: ["jay neveloff", "neveloff"],
  },
  {
    name: "Eric Brody",
    slug: "eric-brody",
    shortLabel: "ERIC",
    role: "Founder",
    company: "Adams & Company",
    rank: 8,
    bio: "Founder of Adams & Company, a boutique commercial brokerage built on deep market knowledge and long relationships across Manhattan's office and retail corridors.",
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

  return matches.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  )[0];
}

export function getGuestBySlug(slug: string): Guest | undefined {
  return CONFIRMED_GUESTS.find((guest) => guest.slug === slug);
}

export function getRankedGuests(): Guest[] {
  return [...CONFIRMED_GUESTS].sort((a, b) => a.rank - b.rank);
}

export function getGuestsWithEpisodes(episodes: Episode[]): GuestWithEpisode[] {
  return getRankedGuests().map((guest) => {
    const episode = findBestEpisodeForGuest(guest, episodes);

    return {
      ...guest,
      episode,
      displayImage: guest.imagePath,
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
