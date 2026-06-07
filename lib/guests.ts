export type Guest = {
  name: string;
  slug: string;
  title?: string;
  imagePath: string;
};

export const CONFIRMED_GUESTS: Guest[] = [
  {
    name: "Bob Knakal",
    slug: "bob-knakal",
    title: "Chairman, JLL Capital Markets",
    imagePath: "/guests/bob-knakal.svg",
  },
  {
    name: "Jeff Gural",
    slug: "jeff-gural",
    title: "Chairman, GFP Real Estate",
    imagePath: "/guests/jeff-gural.svg",
  },
  {
    name: "Stephen Siegel",
    slug: "stephen-siegel",
    title: "Chairman, Global Holdings",
    imagePath: "/guests/stephen-siegel.svg",
  },
  {
    name: "Bess Freedman",
    slug: "bess-freedman",
    title: "CEO, Brown Harris Stevens",
    imagePath: "/guests/bess-freedman.svg",
  },
  {
    name: "Eric Benaim",
    slug: "eric-benaim",
    title: "Founder, Modern Spaces",
    imagePath: "/guests/eric-benaim.svg",
  },
  {
    name: "Michael Shah",
    slug: "michael-shah",
    title: "CEO, DelShah Capital",
    imagePath: "/guests/michael-shah.svg",
  },
  {
    name: "Jay Neveloff",
    slug: "jay-neveloff",
    title: "Partner, Kramer Levin",
    imagePath: "/guests/jay-neveloff.svg",
  },
  {
    name: "Eric Brody",
    slug: "eric-brody",
    title: "Founder, Adams & Company",
    imagePath: "/guests/eric-brody.svg",
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
