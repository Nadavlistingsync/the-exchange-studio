/** Hand-edited show notes keyed by episode slug. */
export const EPISODE_SHOW_NOTES: Record<string, string> = {
  "how-he-became-the-ceo-of-cushman-wakefield-at-37-vfj_zixt6j8":
    "Stephen Siegel on becoming CEO of Cushman & Wakefield at 37, building one of the largest commercial real estate firms in the world, and what leadership looks like at the top of New York CRE.",
  "inside-brown-harris-stevens-with-ceo-bess-freedman-episode-jygxd8y8bbi":
    "Bess Freedman on leading Brown Harris Stevens, navigating luxury residential in Manhattan, and the operator mindset behind one of New York's most recognized brokerages.",
  "how-michael-shah-paid-off-1b-in-debt-with-zero-foreclosures-goxif0rsdeg":
    "Michael Shah on paying down more than $1B in debt without a single foreclosure — portfolio discipline, capital structure, and building in New York's toughest cycles.",
  "the-man-who-owns-the-flatiron-building-jeff-gural-7xj0bma9pzi":
    "Jeff Gural on owning the Flatiron Building, building GFP Real Estate, and decades of dealmaking across New York commercial real estate.",
  "she-left-personal-training-and-sold-1-billion-in-real-estate-beth-benalloul-hb1rvpzbvpy":
    "Beth Benalloul on leaving personal training to sell $1B in real estate — building a sales machine at The Corcoran Group and what it takes to break through in NYC.",
  "how-rena-kliot-went-from-a-divorce-to-2-billion-in-sales":
    "Rena Kliot on rebuilding after divorce to $2B in sales — resilience, client relationships, and building a top-producing career in New York real estate.",
  "how-michael-iuculano-built-a-2-2b-real-estate-lending-company-episode-16":
    "Michael Iuculano on building MJI Capital into a $2.2B real estate lending platform — debt, discipline, and financing the deals that shape the city.",
  "from-the-nfl-to-40-million-dollar-real-estate-deals-nate-weiland":
    "Nate Weiland on going from the NFL to $40M real estate deals — athletic discipline applied to brokerage, capital, and building a second career in CRE.",
  "from-opera-singer-to-1-at-brown-harris-stevens-ari-harkov":
    "Ari Harkov on going from opera singer to #1 at Brown Harris Stevens — craft, consistency, and standing out in Manhattan's most competitive residential market.",
};

export function getEpisodeShowNotes(slug: string): string | undefined {
  return EPISODE_SHOW_NOTES[slug];
}
