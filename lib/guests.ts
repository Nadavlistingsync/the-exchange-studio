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
    role: "Founder & CEO",
    company: "BKREA",
    rank: 1,
    bio: "The most prolific investment sales broker in New York City history. Over four decades he has sold more than $30 billion in commercial assets and shaped how deals get done in every borough.",
    imagePath: "/guests/bob-knakal.png",
    accentColor: "#1a2332",
    matchTerms: ["bob knakal", "knakal", "2391 buildings"],
  },
  {
    name: "Jeff Gural",
    slug: "jeff-gural",
    shortLabel: "JEFF",
    role: "Chairman",
    company: "GFP Real Estate",
    rank: 2,
    bio: "Chairman of GFP Real Estate and one of the most visible landlords in New York. Known for the Flatiron Building and a portfolio that spans Manhattan and beyond.",
    imagePath: "/guests/jeff-gural.png",
    accentColor: "#222222",
    matchTerms: ["jeff gural", "jeffrey gural", "gural", "flatiron"],
  },
  {
    name: "Stephen Siegel",
    slug: "stephen-siegel",
    shortLabel: "STEPHEN",
    role: "Chairman",
    company: "Global Holdings",
    rank: 3,
    bio: "Chairman of Global Holdings and a veteran operator who helped build Cushman & Wakefield into a global platform before leading one of New York's largest private real estate companies.",
    imagePath: "/guests/stephen-siegel.png",
    accentColor: "#1f2d2d",
    matchTerms: ["stephen siegel", "siegel", "cushman"],
  },
  {
    name: "Bess Freedman",
    slug: "bess-freedman",
    shortLabel: "BESS",
    role: "CEO",
    company: "Brown Harris Stevens",
    rank: 4,
    bio: "CEO of Brown Harris Stevens, one of New York's oldest and most prestigious residential brokerages. She leads the firm through a market defined by record deals and rapid change.",
    imagePath: "/guests/bess-freedman.png",
    accentColor: "#2d2424",
    matchTerms: ["bess freedman", "freedman", "brown harris"],
  },
  {
    name: "Michael Shah",
    slug: "michael-shah",
    shortLabel: "MICHAEL",
    role: "CEO",
    company: "DelShah Capital",
    rank: 5,
    bio: "CEO of DelShah Capital, a vertically integrated owner and operator known for disciplined acquisitions, heavy value-add, and navigating complex capital structures without losing a single asset.",
    imagePath: "/guests/michael-shah.png",
    accentColor: "#1e2a1e",
    matchTerms: ["michael shah", "delshah", "shah", "foreclosure"],
  },
  {
    name: "Eric Benaim",
    slug: "eric-benaim",
    shortLabel: "ERIC B",
    role: "Founder",
    company: "Modern Spaces",
    rank: 6,
    bio: "Founder of Modern Spaces, the Queens-born brokerage that grew into one of the city's fastest-scaling residential platforms through brokerage, development, and marketing under one roof.",
    imagePath: "/guests/eric-benaim.png",
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
    imagePath: "/guests/jay-neveloff.png",
    accentColor: "#2a2420",
    matchTerms: ["jay neveloff", "neveloff", "kramer levin"],
  },
  {
    name: "Eric Brody",
    slug: "eric-brody",
    shortLabel: "ERIC",
    role: "Founder",
    company: "Anax Real Estate Partners",
    rank: 8,
    bio: "Founder of Anax Real Estate Partners and a builder who has navigated partnerships, capital markets, and complex deals across New York's commercial landscape.",
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
    bio: "Vice Chairman at CBRE and co-head of the firm's New York City agency department. A three-time REBNY Robert T. Lawrence Memorial Award winner with decades of major Manhattan leasing assignments.",
    imagePath: "/guests/howard-fiddle.png",
    accentColor: "#1e2430",
    matchTerms: ["howard fiddle", "fiddle", "cbre"],
  },
  {
    name: "Beth Benalloul",
    slug: "beth-benalloul",
    shortLabel: "BETH",
    role: "Top Producer",
    company: "Corcoran",
    rank: 10,
    bio: "One of New York's top residential brokers, who went from personal trainer to more than $1 billion in sales. She built a brand on discipline, consistency, and relentless client focus.",
    imagePath: "/guests/beth-benalloul.png",
    accentColor: "#2d2a28",
    matchTerms: ["beth benalloul", "benalloul", "personal trainer", "billion in real estate"],
  },
  {
    name: "Ari Harkov",
    slug: "ari-harkov",
    shortLabel: "ARI",
    role: "Team Leader",
    company: "Brown Harris Stevens",
    rank: 11,
    bio: "Leads the Harkov Lewis Team at Brown Harris Stevens, consistently ranked among the top-producing residential teams in New York and nationally by the Wall Street Journal and REAL Trends.",
    imagePath: "/guests/ari-harkov.png",
    accentColor: "#2a2824",
    matchTerms: ["ari harkov", "harkov", "harkov lewis"],
  },
  {
    name: "Michael Iuculano",
    slug: "michael-iuculano",
    shortLabel: "MICHAEL I",
    role: "Founder & CEO",
    company: "MJI Capital",
    rank: 12,
    bio: "Alternative lending expert and founder of MJI Capital. Over two decades he has facilitated billions in loans and brings a lender's perspective to how operators and developers get deals done.",
    imagePath: "/guests/michael-iuculano.png",
    accentColor: "#1f1f1f",
    matchTerms: [
      "michael iuculano",
      "iuculano",
      "michael lu",
      "mji capital",
      "lending",
    ],
  },
  {
    name: "Daniella Schlisser",
    slug: "daniella-schlisser",
    shortLabel: "DANIELLA",
    role: "Physician & Entrepreneur",
    company: "Independent",
    rank: 13,
    bio: "A physician who pivoted from medicine into entrepreneurship, bringing a rare perspective on discipline, risk, and building a second career from the ground up.",
    imagePath: "/guests/daniella-schlisser.png",
    accentColor: "#241f2a",
    matchTerms: ["daniella", "daniela", "schlisser", "doctor"],
  },
  {
    name: "Nate Weiland",
    slug: "nate-weiland",
    shortLabel: "NATE",
    role: "Professional Athlete",
    company: "UFL",
    rank: 14,
    bio: "A professional athlete who was told to quit, get a 9-to-5, and settle. Instead he rebuilt his body, his career, and his mindset on the other side of injury.",
    imagePath: "/guests/nate-weiland.png",
    accentColor: "#2a2418",
    matchTerms: ["nate weiland", "nate wieland", "weiland", "wieland", "nfl", "quad"],
  },
  {
    name: "Jeffery Berman",
    slug: "jeffery-berman",
    shortLabel: "JEFF B",
    role: "Principal",
    company: "Real Estate",
    rank: 15,
    bio: "A New York operator and investor whose career spans acquisitions, development, and the day-to-day decisions that separate durable operators from short-term players.",
    imagePath: "/guests/jeffery-berman.png",
    accentColor: "#232830",
    matchTerms: ["jeffery berman", "jeffrey berman", "berman"],
  },
  {
    name: "Eyal Mehaber",
    slug: "eyal-mehaber",
    shortLabel: "EYAL",
    role: "Principal",
    company: "Real Estate",
    rank: 16,
    bio: "An operator and dealmaker in New York commercial real estate, focused on finding opportunity where others see complexity and building relationships that outlast cycles.",
    imagePath: "/guests/eyal-mehaber.png",
    accentColor: "#2b2828",
    matchTerms: ["eyal mehaber", "mehaber", "eyal"],
  },
  {
    name: "Jake Sisk",
    slug: "jake-sisk",
    shortLabel: "JAKE",
    role: "CEO & Co-Founder",
    company: "Bring Your Deal",
    rank: 17,
    bio: "CEO and co-founder of Bring Your Deal, building a real estate platform while mentoring the next generation of operators on health, discipline, and execution.",
    imagePath: "/guests/jake-sisk.png",
    accentColor: "#252528",
    matchTerms: ["jake sisk", "sisk", "bring your deal"],
  },
  {
    name: "Jack Stone",
    slug: "jack-stone",
    shortLabel: "JACK",
    role: "Managing Director",
    company: "Greysteel",
    rank: 18,
    bio: "Managing Director at Greysteel and co-host of the No Cap podcast by CRE Daily. A former attorney turned multifamily broker covering Texas and national capital markets.",
    imagePath: "/guests/jack-stone.png",
    accentColor: "#242628",
    matchTerms: ["jack stone", "no cap", "greysteel"],
  },
  {
    name: "Rena Kliot",
    slug: "rena-kliot",
    shortLabel: "RENA",
    role: "Founder & Broker",
    company: "Pulse International Realty",
    rank: 19,
    bio: "Founder of Pulse International Realty with nearly $2 billion in career sales across New York and South Florida. A broker, developer consultant, and television personality.",
    imagePath: "/guests/rena-kliot.png",
    accentColor: "#2d2624",
    matchTerms: ["rena kliot", "rena kilot", "kliot", "pulse international"],
  },
  {
    name: "Michael Wagman",
    slug: "michael-wagman",
    shortLabel: "MIKE W",
    role: "Founder & Managing Partner",
    company: "Nimble Capital",
    rank: 20,
    bio: "Founder of Nimble Capital Group, building a multifamily and commercial portfolio across the Southwest through active management, syndications, and disciplined value-add execution.",
    imagePath: "/guests/michael-wagman.png",
    accentColor: "#1f2428",
    matchTerms: ["michael wagman", "wagman", "nimble capital"],
  },
  {
    name: "Anne Lusk",
    slug: "anne-lusk",
    shortLabel: "ANNE",
    role: "Owner & Broker",
    company: "Lusk & Associates SIR",
    rank: 21,
    bio: "Owner of Lusk & Associates Sotheby's International Realty with over 25 years of experience across residential and commercial markets in Pennsylvania.",
    imagePath: "/guests/anne-lusk.png",
    accentColor: "#2a2a24",
    matchTerms: ["anne lusk", "lusk"],
  },
  {
    name: "Matthew Teifke",
    slug: "matthew-teifke",
    shortLabel: "MATT",
    role: "Founder & Broker",
    company: "Teifke Real Estate",
    rank: 22,
    bio: "Founder of Teifke Real Estate in Austin, Texas and partner at TR3 Capital. He built a brokerage focused on helping buyers, sellers, investors, and agents succeed in central Texas markets.",
    imagePath: "/guests/matthew-teifke.png",
    accentColor: "#242820",
    matchTerms: ["matthew teifke", "teifke", "teifke real estate"],
  },
  {
    name: "Patti M Williams",
    slug: "patti-m-williams",
    shortLabel: "PATTI",
    role: "Real Estate Professional",
    company: "Independent",
    rank: 23,
    bio: "A New York-area real estate professional focused on building client relationships and navigating residential markets with discipline and long-term perspective.",
    imagePath: "/guests/patti-m-williams.png",
    accentColor: "#2d2826",
    matchTerms: ["patti williams", "patricia williams", "patti m williams"],
  },
  {
    name: "Nkem Ezeamama",
    slug: "nkem-ezeamama",
    shortLabel: "NKEM",
    role: "Founder & CEO",
    company: "Pheenyx Capital",
    rank: 24,
    bio: "Emergency medicine physician, multifamily investor, and founder of Pheenyx Capital Investment. She helps professionals build wealth through passive commercial real estate syndications.",
    imagePath: "/guests/nkem-ezeamama.png",
    accentColor: "#28242a",
    matchTerms: ["nkem ezeamama", "nkem ezemama", "ezeamama", "pheenyx"],
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

export function matchGuestSlugFromEpisode(
  episode: Episode
): string | undefined {
  const guest = CONFIRMED_GUESTS.find((g) => episodeMatchesGuest(episode, g));
  return guest?.slug;
}
