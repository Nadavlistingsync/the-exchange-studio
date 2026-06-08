import type { Episode } from "./episodes";

export type Guest = {
  name: string;
  slug: string;
  shortLabel: string;
  role: string;
  company: string;
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
    imagePath: "/guests/jeff-gural.png",
    accentColor: "#222222",
    matchTerms: ["jeff gural", "gural"],
  },
  {
    name: "Stephen Siegel",
    slug: "stephen-siegel",
    shortLabel: "STEPHEN",
    role: "Chairman",
    company: "Global Holdings",
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
    imagePath: "/guests/bess-freedman.png",
    accentColor: "#2d2424",
    matchTerms: ["bess freedman", "freedman"],
  },
  {
    name: "Eric Benaim",
    slug: "eric-benaim",
    shortLabel: "ERIC B",
    role: "Founder",
    company: "Modern Spaces",
    imagePath: "/guests/eric-benaim.png",
    accentColor: "#242430",
    matchTerms: ["eric benaim", "benaim", "modern spaces"],
  },
  {
    name: "Michael Shah",
    slug: "michael-shah",
    shortLabel: "MICHAEL",
    role: "CEO",
    company: "DelShah Capital",
    imagePath: "/guests/michael-shah.png",
    accentColor: "#1e2a1e",
    matchTerms: ["michael shah", "delshah", "shah"],
  },
  {
    name: "Jay Neveloff",
    slug: "jay-neveloff",
    shortLabel: "JAY",
    role: "Partner",
    company: "Kramer Levin",
    imagePath: "/guests/jay-neveloff.png",
    accentColor: "#2a2420",
    matchTerms: ["jay neveloff", "neveloff"],
  },
  {
    name: "Eric Brody",
    slug: "eric-brody",
    shortLabel: "ERIC",
    role: "Founder",
    company: "Adams & Company",
    imagePath: "/guests/eric-brody.png",
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


export function getGuestsWithEpisodes(episodes: Episode[]): GuestWithEpisode[] {
  return CONFIRMED_GUESTS.map((guest) => {
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
