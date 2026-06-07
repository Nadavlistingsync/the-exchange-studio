export type Guest = {
  name: string;
  slug: string;
  shortLabel: string;
  title?: string;
  imagePath: string;
  accentColor: string;
};

export const CONFIRMED_GUESTS: Guest[] = [
  {
    name: "Bob Knakal",
    slug: "bob-knakal",
    shortLabel: "BOB",
    title: "Chairman, JLL Capital Markets",
    imagePath: "/guests/bob-knakal.svg",
    accentColor: "#1a2332",
  },
  {
    name: "Jeff Gural",
    slug: "jeff-gural",
    shortLabel: "JEFF",
    title: "Chairman, GFP Real Estate",
    imagePath: "/guests/jeff-gural.svg",
    accentColor: "#222222",
  },
  {
    name: "Stephen Siegel",
    slug: "stephen-siegel",
    shortLabel: "STEPHEN",
    title: "Chairman, Global Holdings",
    imagePath: "/guests/stephen-siegel.svg",
    accentColor: "#1f2d2d",
  },
  {
    name: "Bess Freedman",
    slug: "bess-freedman",
    shortLabel: "BESS",
    title: "CEO, Brown Harris Stevens",
    imagePath: "/guests/bess-freedman.svg",
    accentColor: "#2d2424",
  },
  {
    name: "Eric Benaim",
    slug: "eric-benaim",
    shortLabel: "ERIC B",
    title: "Founder, Modern Spaces",
    imagePath: "/guests/eric-benaim.svg",
    accentColor: "#242430",
  },
  {
    name: "Michael Shah",
    slug: "michael-shah",
    shortLabel: "MICHAEL",
    title: "CEO, DelShah Capital",
    imagePath: "/guests/michael-shah.svg",
    accentColor: "#1e2a1e",
  },
  {
    name: "Jay Neveloff",
    slug: "jay-neveloff",
    shortLabel: "JAY",
    title: "Partner, Kramer Levin",
    imagePath: "/guests/jay-neveloff.svg",
    accentColor: "#2a2420",
  },
  {
    name: "Eric Brody",
    slug: "eric-brody",
    shortLabel: "ERIC",
    title: "Founder, Adams & Company",
    imagePath: "/guests/eric-brody.svg",
    accentColor: "#282828",
  },
];

export function matchGuestToEpisodeSlug(
  guestName: string,
  episodeTitles: { title: string; slug: string }[]
): string | undefined {
  const normalizedGuest = guestName.toLowerCase();
  const match = episodeTitles.find((ep) =>
    ep.title.toLowerCase().includes(normalizedGuest)
  );
  return match?.slug;
}
