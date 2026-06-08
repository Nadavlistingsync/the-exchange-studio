import type { Episode } from "./episodes";
import { slugify } from "./episodes";
import {
  getCatalogEntryById,
  getEpisodeListenUrl,
  getSpotifyEpisodeUrl,
} from "./spotify";

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
  /** Manual override when RSS slug differs from title matching. */
  episodeSlug?: string;
  /** Manual Spotify episode override when RSS title matching fails */
  spotifyEpisodeId?: string;
};

export type GuestWithEpisode = Guest & {
  episode?: Episode;
  displayImage: string;
  listenUrl?: string;
};

const COMPANY_ABBREVIATIONS: Record<string, string> = {
  "Brown Harris Stevens": "BHS",
  "The Harkov Lewis Team at Brown Harris Stevens": "BHS",
  "The Corcoran Group": "Corcoran",
  "ANAX Real Estate Partners": "ANAX",
  "GFP Real Estate": "GFP",
  "Delshah Capital": "Delshah",
  "MJI Capital": "MJI",
  "No Cap by CRE Daily": "CRE Daily",
  "Pulse International Realty": "Pulse",
  "Nimble Capital Group": "Nimble",
  "Lusk & Associates Sotheby's International Realty": "Lusk & Associates",
  "Teifke Real Estate": "Teifke",
  "LIV Sotheby's International Realty": "LIV Sotheby's",
  "Pheenyx Capital Investment": "Pheenyx",
  "Real Estate Investor": "RE Investor",
};

function getRoleAbbreviation(role: string): string {
  if (/\bCEO\b/i.test(role)) return "CEO";
  if (/Vice Chairman/i.test(role)) return "Vice Chairman";
  if (/Chairman/i.test(role)) return "Chairman";
  if (/Managing Partner/i.test(role)) return "Managing Partner";
  if (/General Partner/i.test(role)) return "Partner";
  if (/Licensed Associate Broker|Associate Broker/i.test(role)) return "Broker";
  if (/Co-Founder/i.test(role)) return "Co-Founder";
  if (/Co-Host/i.test(role)) return "Co-Host";
  if (/Founder/i.test(role)) return "Founder";
  if (/Partner/i.test(role)) return "Partner";
  if (/Former NFL/i.test(role)) return "NFL";
  if (/Broker/i.test(role)) return "Broker";
  return role.split(",")[0]?.split("&")[0]?.trim() || role;
}

function getCompanyAbbreviation(company: string): string {
  if (COMPANY_ABBREVIATIONS[company]) return COMPANY_ABBREVIATIONS[company];
  if (company.length <= 14) return company;
  return company;
}

/** Full mosaic tile label, e.g. "Bess Freedman CEO BHS →" */
export function getGuestBadgeLabel(
  guest: Pick<Guest, "name" | "role" | "company">
): string {
  const role = getRoleAbbreviation(guest.role);
  const company = getCompanyAbbreviation(guest.company);
  return `${guest.name} ${role} ${company} →`;
}

/** Concise role + company for mosaic tile footer, e.g. "Founder at EM Equity" */
export function getGuestRoleCompanyLabel(
  guest: Pick<Guest, "role" | "company">
): string {
  const role = getRoleAbbreviation(guest.role);
  const company = getCompanyAbbreviation(guest.company);
  return `${role} at ${company}`;
}

/** Short mosaic label, e.g. "CEO · EM Equity" */
export function getGuestMosaicLabel(
  guest: Pick<Guest, "role" | "company">
): string {
  const role = getRoleAbbreviation(guest.role);
  const company = getCompanyAbbreviation(guest.company);
  return `${role} · ${company}`;
}

/** Short mosaic footer label, e.g. "CEO · BHS" */
export function getGuestCompactLabel(
  guest: Pick<Guest, "role" | "company">
): string {
  const role = getRoleAbbreviation(guest.role);
  const company = getCompanyAbbreviation(guest.company);
  return `${role} · ${company}`;
}

export function getGuestListenUrl(
  guest: Guest,
  episode?: Episode
): string | undefined {
  const episodeUrl = getEpisodeListenUrl(episode);
  if (episodeUrl) return episodeUrl;
  if (guest.spotifyEpisodeId) {
    return getSpotifyEpisodeUrl(guest.spotifyEpisodeId);
  }
  return undefined;
}

export const CONFIRMED_GUESTS: Guest[] = [
  {
    name: "Bob Knakal",
    slug: "bob-knakal",
    shortLabel: "BOB",
    role: "Founder, Chairman & CEO",
    company: "BKREA",
    rank: 1,
    bio: "Bob Knakal is one of the most prolific investment sales brokers in US history. Since 1984 he has personally brokered the sale of more than 2,398 properties totaling over $24 billion in value across New York City. He co-founded Massey Knakal Realty Services in 1988 and built it into the city's leading building sales brokerage before its $100 million sale to Cushman & Wakefield in 2014, later leading investment sales at Cushman & Wakefield and JLL before launching BKREA in 2024.",
    imagePath: "/guests/bob-knakal.png",
    accentColor: "#1a2332",
    matchTerms: [
      "bob knakal",
      "knakal",
      "2391 buildings",
      "2398",
      "bkrea",
      "massey knakal",
    ],
  },
  {
    name: "Jeff Gural",
    slug: "jeff-gural",
    shortLabel: "JEFF",
    role: "Chairman & CEO",
    company: "GFP Real Estate",
    rank: 2,
    bio: "Jeff Gural is one of New York's most prominent landlords and the owner of the Flatiron Building. As Chairman of GFP Real Estate, he oversees an ownership interest in more than 50 properties, most of them in New York City. A founder of what became Newmark before its 2017 split from GFP, he is known for leading some of Manhattan's highest-profile office-to-residential conversions.",
    imagePath: "/guests/jeff-gural.png",
    accentColor: "#222222",
    matchTerms: [
      "jeff gural",
      "jeffrey gural",
      "gural",
      "flatiron",
      "flatiron building",
    ],
    spotifyEpisodeId: "7e52GydC9m9Uy6TVvYyprh",
  },
  {
    name: "Stephen Siegel",
    slug: "stephen-siegel",
    shortLabel: "STEPHEN",
    role: "Chairman of Global Brokerage",
    company: "CBRE",
    rank: 3,
    bio: "Stephen Siegel is among the most legendary brokers in New York commercial real estate history. As CBRE's Chairman of Global Brokerage, he advises major corporations and property owners on a broad range of real estate strategies. He first rose to prominence at Cushman & Wakefield, becoming President and CEO at age 37, and later served as Chairman and CEO of Insignia/ESG before its merger with CBRE.",
    imagePath: "/guests/stephen-siegel.png",
    accentColor: "#1f2d2d",
    matchTerms: [
      "stephen siegel",
      "siegel",
      "cushman",
      "ceo of cushman",
      "cushman & wakefield at 37",
    ],
    spotifyEpisodeId: "5RWYTWfFyBOSBHTvHTkxKy",
  },
  {
    name: "Bess Freedman",
    slug: "bess-freedman",
    shortLabel: "BESS",
    role: "CEO",
    company: "Brown Harris Stevens",
    rank: 4,
    bio: "Bess Freedman leads one of New York's most established luxury residential brokerages. She joined Brown Harris Stevens in 2013, was named co-president in 2017, and shortly after became the firm's first chief executive officer. She is a frequent voice in national real estate and business media, known for outspoken leadership on both market strategy and workplace values.",
    imagePath: "/guests/bess-freedman.png",
    accentColor: "#2d2424",
    matchTerms: [
      "bess freedman",
      "freedman",
      "brown harris",
      "inside brown harris stevens",
    ],
    spotifyEpisodeId: "5joLlf8YOuFtxbVRp8chhj",
  },
  {
    name: "Michael Shah",
    slug: "michael-shah",
    shortLabel: "MICHAEL",
    role: "Founder & CEO",
    company: "Delshah Capital",
    rank: 5,
    bio: "Michael Shah is the founder and chief executive of Delshah Capital, a vertically integrated New York real estate investment firm. Founded in 2006, Delshah specializes in acquiring, developing, and managing multifamily, retail, and hospitality properties as well as distressed CRE loans across New York City, with a portfolio of over 2 million square feet valued at more than $800 million.",
    imagePath: "/guests/michael-shah.png",
    accentColor: "#1e2a1e",
    matchTerms: [
      "michael shah",
      "delshah",
      "shah",
      "foreclosure",
      "$1b in debt",
      "zero foreclosures",
    ],
    spotifyEpisodeId: "1LeLDwZkXilJQUmRCOPdjn",
  },
  {
    name: "Eric Benaim",
    slug: "eric-benaim",
    shortLabel: "ERIC B",
    role: "CEO & Founder",
    company: "Modern Spaces",
    rank: 6,
    bio: "Eric Benaim built Modern Spaces into the dominant brokerage in one of New York's fastest-changing markets. Founding the firm in 2008, he helped transform Long Island City, where Modern Spaces holds roughly 70% market share and has managed over $10 billion in transactions. He is known as the Mayor of LIC.",
    imagePath: "/guests/eric-benaim.png",
    accentColor: "#242430",
    matchTerms: ["eric benaim", "benaim", "modern spaces", "lic"],
  },
  {
    name: "Jay Neveloff",
    slug: "jay-neveloff",
    shortLabel: "JAY",
    role: "Partner & Chair of Real Estate",
    company: "Kramer Levin",
    rank: 7,
    bio: "Jay Neveloff is one of New York's most influential real estate attorneys. A partner at Kramer Levin and chairman of the firm's Real Estate Department, he has sat on the firm's executive committee for more than two decades. He has advised on many of the city's marquee assets, including Trump Tower, the GM Building, and the Plaza Hotel, representing developers, lenders, and institutions across complex transactions.",
    imagePath: "/guests/jay-neveloff.png",
    accentColor: "#2a2420",
    matchTerms: ["jay neveloff", "neveloff", "kramer levin"],
  },
  {
    name: "Eric Brody",
    slug: "eric-brody",
    shortLabel: "ERIC",
    role: "Founder & Principal",
    company: "ANAX Real Estate Partners",
    rank: 8,
    bio: "Eric Brody is a New York developer and capital markets advisor with nearly two decades in mid-market multifamily. He has developed roughly 800 units across NYC totaling nearly $1 billion in real estate, and founded ANAX Real Estate Partners as a capital advisory firm alongside ANAX Ventures, an early-stage proptech fund.",
    imagePath: "/guests/eric-brody.png",
    accentColor: "#282828",
    matchTerms: ["eric brody", "brody", "anax"],
  },
  {
    name: "Howard Fiddle",
    slug: "howard-fiddle",
    shortLabel: "HOWARD",
    role: "Vice Chairman",
    company: "CBRE",
    rank: 9,
    bio: "Howard Fiddle is one of the most senior leasing brokers in New York. As a Vice Chairman who co-heads CBRE's New York City Agency Department, he has helped the firm hold the largest market share in the Tri-State market. A more than 30-year veteran of the firm and a three-time recipient of REBNY's Robert T. Lawrence Memorial award, he has significant experience representing major tenants and landlords, with long-running involvement in some of Manhattan's largest buildings, including 787 Seventh Avenue and 55 Water Street.",
    imagePath: "/guests/howard-fiddle.png",
    accentColor: "#1e2430",
    matchTerms: ["howard fiddle", "fiddle", "cbre"],
  },
  {
    name: "Beth Benalloul",
    slug: "beth-benalloul",
    shortLabel: "BETH",
    role: "Licensed Associate Broker",
    company: "The Corcoran Group",
    rank: 10,
    bio: "Beth Benalloul is a top-producing Manhattan luxury broker. A long-standing member of Corcoran's President's Council, she has worked at the firm for over 20 years, ranks consistently among its top 25 brokers companywide, and has surpassed $1 billion in career sales across cooperatives, condominiums, and townhomes.",
    imagePath: "/guests/beth-benalloul.png",
    accentColor: "#2d2a28",
    matchTerms: [
      "beth benalloul",
      "benalloul",
      "personal trainer",
      "billion in real estate",
      "sold $1 billion",
      "corcoran",
    ],
    spotifyEpisodeId: "1uvun2vZyW9HeV9LZdmpHv",
  },
  {
    name: "Ari Harkov",
    slug: "ari-harkov",
    shortLabel: "ARI",
    role: "Co-Founder & Principal",
    company: "The Harkov Lewis Team at Brown Harris Stevens",
    rank: 11,
    bio: "Ari Harkov is one of New York's elite residential power brokers. He leads the Harkov Lewis Team, consistently ranked among the top 250 teams in the US by the Wall Street Journal and REAL Trends, and recognized as the number one large team companywide at Brown Harris Stevens for 2025. He holds an MBA with honors from Columbia.",
    imagePath: "/guests/ari-harkov.png",
    accentColor: "#2a2824",
    matchTerms: ["ari harkov", "harkov", "harkov lewis", "opera singer"],
    spotifyEpisodeId: "4j74jlxTICaUHB65cUNV8s",
  },
  {
    name: "Michael Iuculano",
    slug: "michael-iuculano",
    shortLabel: "MICHAEL I",
    role: "Founder",
    company: "MJI Capital",
    rank: 12,
    bio: "Michael Iuculano is a private real estate lender with more than two decades in the market. He is the founder of MJI Capital and a partner at Barrett Capital Group, and his lending operation has funded more than $2.2 billion in private real estate loans across residential, commercial, construction, and fix-and-flip projects.",
    imagePath: "/guests/michael-iuculano.png",
    accentColor: "#1f1f1f",
    matchTerms: [
      "michael iuculano",
      "iuculano",
      "michael lu",
      "mji capital",
      "lending",
      "2.2b",
      "episode 16",
    ],
    spotifyEpisodeId: "3BKfu0K1EPRe2CPflHBGYV",
  },
  {
    name: "Daniella Schlisser",
    slug: "daniella-schlisser",
    shortLabel: "DANIELLA",
    role: "Licensed Associate Broker",
    company: "Brown Harris Stevens",
    rank: 13,
    bio: "Daniella Schlisser is a top-ranked Manhattan luxury broker. Recognized as an industry expert since 2001, she consistently ranks among the top 15 agents at the 2,700-plus-agent firm and has earned media attention domestically and internationally across primary, pied-a-terre, investment, and new development sales.",
    imagePath: "/guests/daniella-schlisser.png",
    accentColor: "#241f2a",
    matchTerms: ["daniella", "daniela", "schlisser"],
  },
  {
    name: "Nate Wieland",
    slug: "nate-weiland",
    shortLabel: "NATE",
    role: "Former NFL Player",
    company: "Real Estate Investor",
    rank: 14,
    bio: "Nate Wieland is a former NFL player turned real estate professional. He signed a three-year contract with the New England Patriots before transitioning into real estate, where he now works on investment and brokerage deals, the focus of his Exchange conversation on moving from the league to $40 million in transactions.",
    imagePath: "/guests/nate-weiland.png",
    accentColor: "#2a2418",
    matchTerms: ["nate weiland", "nate wieland", "weiland", "wieland", "nfl", "patriots", "40 million"],
    spotifyEpisodeId: "6HEwfaoQGoDkON6w9AA55X",
  },
  {
    name: "Jeffrey Berman",
    slug: "jeffery-berman",
    shortLabel: "JEFF B",
    role: "General Partner",
    company: "Camber Creek",
    rank: 15,
    bio: "Jeffrey Berman is a general partner at Camber Creek, one of the leading proptech-focused venture firms. He participates in all aspects of the firm's operations and portfolio management, serves on the boards of numerous portfolio companies, and has more than two decades of executive experience along with an active early-stage investing record backing more than three dozen startups.",
    imagePath: "/guests/jeffery-berman.png",
    accentColor: "#232830",
    matchTerms: ["jeffery berman", "jeffrey berman", "berman", "camber creek"],
  },
  {
    name: "Eyal Mehaber",
    slug: "eyal-mehaber",
    shortLabel: "EYAL",
    role: "Founder",
    company: "EM Equity",
    rank: 16,
    bio: "Eyal Mehaber is a commercial real estate investor and developer. He arrived in the US at 16 with no money and limited English and went on to build a substantial real estate portfolio as the owner of EM Equity, focusing on commercial acquisitions and development.",
    imagePath: "/guests/eyal-mehaber.png",
    accentColor: "#2b2828",
    matchTerms: ["eyal mehaber", "mehaber", "eyal", "em equity"],
  },
  {
    name: "Jake Sisk",
    slug: "jake-sisk",
    shortLabel: "JAKE",
    role: "Co-Founder",
    company: "oasisK Capital",
    rank: 17,
    bio: "Jake Sisk is a multifamily real estate investor. He is the co-founder of oasisK Capital, which specializes in multifamily real estate investments, and built his portfolio early in his career, the focus of his episode on building a real estate business at 23.",
    imagePath: "/guests/jake-sisk.png",
    accentColor: "#252528",
    matchTerms: ["jake sisk", "sisk", "oasisk", "bring your deal"],
  },
  {
    name: "Jack Stone",
    slug: "jack-stone",
    shortLabel: "JACK",
    role: "Co-Host",
    company: "No Cap by CRE Daily",
    rank: 18,
    bio: "Jack Stone is co-host of No Cap, the commercial real estate podcast from CRE Daily. Alongside co-host Alex Gornik, he breaks down the industry's biggest trends each week with influential figures in commercial real estate, under the CRE Daily media brand whose flagship newsletter reaches more than 65,000 investors, developers, brokers, and business leaders.",
    imagePath: "/guests/jack-stone.png",
    accentColor: "#242628",
    matchTerms: ["jack stone", "no cap", "cre daily"],
  },
  {
    name: "Rena Kliot",
    slug: "rena-kliot",
    shortLabel: "RENA",
    role: "Broker & Owner",
    company: "Pulse International Realty",
    rank: 19,
    bio: "Rena Kliot is the founder of boutique brokerage Pulse International Realty. She opened the firm nearly two decades ago and has built a team of around 30 agents and staff with offices in New York and Miami, backed by a personal track record of nearly $2 billion in career sales.",
    imagePath: "/guests/rena-kliot.png",
    accentColor: "#2d2624",
    matchTerms: [
      "rena kliot",
      "rena kilot",
      "kliot",
      "pulse international",
      "2 billion",
      "from a divorce",
    ],
    spotifyEpisodeId: "5fEUouNLTZRQiDCu9QQrQN",
  },
  {
    name: "Michael Wagman",
    slug: "michael-wagman",
    shortLabel: "MIKE W",
    role: "Managing Partner",
    company: "Nimble Capital Group",
    rank: 20,
    bio: "Michael Wagman is a multifamily syndicator and capital raiser. As managing partner of Nimble Capital Group, he transitioned from a corporate career into real estate, raising over $20 million in capital across multiple asset classes and now invests while running his business remotely.",
    imagePath: "/guests/michael-wagman.png",
    accentColor: "#1f2428",
    matchTerms: ["michael wagman", "wagman", "nimble capital"],
  },
  {
    name: "Anne Lusk",
    slug: "anne-lusk",
    shortLabel: "ANNE",
    role: "Founder & Owner",
    company: "Lusk & Associates Sotheby's International Realty",
    rank: 21,
    bio: "Anne Lusk is a leading agent and brokerage owner. She opened Lusk & Associates in 2006, having already been voted the number one Realtor in Lancaster County, and went on to become the top agent in Pennsylvania for closed sales volume, building a long career that she discussed on the show as surpassing $1 billion in sales.",
    imagePath: "/guests/anne-lusk.png",
    accentColor: "#2a2a24",
    matchTerms: ["anne lusk", "lusk"],
  },
  {
    name: "Matthew Teifke",
    slug: "matthew-teifke",
    shortLabel: "MATT",
    role: "Founder & CEO",
    company: "Teifke Real Estate",
    rank: 22,
    bio: "Matthew Teifke is an Austin-based real estate entrepreneur. He founded Teifke Real Estate, which employs over 175 agents and staff, and is also behind affiliated construction, property, and investment companies, holding a master's in real estate from Texas A&M.",
    imagePath: "/guests/matthew-teifke.png",
    accentColor: "#242820",
    matchTerms: ["matthew teifke", "teifke", "teifke real estate"],
  },
  {
    name: "Patti Maurer Williams",
    slug: "patti-m-williams",
    shortLabel: "PATTI",
    role: "Associate Broker",
    company: "LIV Sotheby's International Realty",
    rank: 23,
    bio: "Patti Maurer Williams is a luxury residential broker. A second-generation Colorado native, she is an associate broker with LIV Sotheby's International Realty, known for a design-driven, client-first approach, the focus of her episode on closing $500 million in real estate.",
    imagePath: "/guests/patti-m-williams.png",
    accentColor: "#2d2826",
    matchTerms: [
      "patti williams",
      "patricia williams",
      "patti m williams",
      "patti maurer",
    ],
  },
  {
    name: "Nkem Ezeamama",
    slug: "nkem-ezeamama",
    shortLabel: "NKEM",
    role: "Founder",
    company: "Pheenyx Capital Investment",
    rank: 24,
    bio: "Nkem Ezeamama is a board-certified emergency medicine physician and real estate fund manager. As the founder of Pheenyx Capital Investment, she helps busy professionals build wealth through passive multifamily real estate investing, with a portfolio spanning hundreds of units built largely alongside her medical career.",
    imagePath: "/guests/nkem-ezeamama.png",
    accentColor: "#28242a",
    matchTerms: ["nkem ezeamama", "nkem ezemama", "ezeamama", "pheenyx"],
  },
];

function episodeMatchesGuest(episode: Episode, guest: Guest): boolean {
  const title = episode.title.toLowerCase();
  return guest.matchTerms.some((term) => title.includes(term));
}

function getSyntheticEpisodeForGuest(guest: Guest): Episode | undefined {
  if (!guest.spotifyEpisodeId) return undefined;

  const entry = getCatalogEntryById(guest.spotifyEpisodeId);
  if (!entry) return undefined;

  return {
    title: entry.title,
    slug: slugify(entry.title),
    description: "",
    pubDate: new Date(0).toISOString(),
    spotifyUrl: getSpotifyEpisodeUrl(entry.id),
  };
}

export function findBestEpisodeForGuest(
  guest: Guest,
  episodes: Episode[]
): Episode | undefined {
  if (guest.episodeSlug) {
    const override = episodes.find((ep) => ep.slug === guest.episodeSlug);
    if (override) return override;
  }

  const matches = episodes.filter((ep) => episodeMatchesGuest(ep, guest));
  if (matches.length > 0) {
    return matches.sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    )[0];
  }

  return getSyntheticEpisodeForGuest(guest);
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
    const listenUrl = getGuestListenUrl(guest, episode);

    return {
      ...guest,
      episode,
      displayImage: guest.imagePath,
      listenUrl,
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

/** First name for mosaic badges, e.g. "Michael" from "Michael Iuculano" */
export function getGuestFirstName(guest: Pick<Guest, "name">): string {
  return guest.name.split(" ")[0] ?? guest.name;
}

export function getGuestForEpisode(episode: Episode): Guest | undefined {
  const slug = matchGuestSlugFromEpisode(episode);
  if (!slug) return undefined;
  return getGuestBySlug(slug);
}

export function matchGuestSlugFromEpisode(
  episode: Episode
): string | undefined {
  const guest = CONFIRMED_GUESTS.find((g) => episodeMatchesGuest(episode, g));
  return guest?.slug;
}
