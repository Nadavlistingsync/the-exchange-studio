import type { Episode } from "./episodes";
import { getGuestForEpisode } from "./guests";

/** Prefer guest bio as the canonical listen destination. */
export function getEpisodeHref(episode: Episode): string {
  const guest = getGuestForEpisode(episode);
  if (guest) return `/guests/${guest.slug}`;
  return `/episodes/${episode.slug}`;
}
