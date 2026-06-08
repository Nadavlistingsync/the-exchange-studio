import { getEpisodes } from "../lib/rss.ts";
import { CONFIRMED_GUESTS, findBestEpisodeForGuest } from "../lib/guests.ts";

async function main() {
  const episodes = await getEpisodes();
  console.log("Total episodes:", episodes.length);
  console.log("\nEpisode titles:");
  episodes.forEach((e, i) => console.log(`${i + 1}. ${e.title}`));

  let matched = 0;
  let withListen = 0;
  const unmatched = [];
  for (const guest of CONFIRMED_GUESTS) {
    const ep = findBestEpisodeForGuest(guest, episodes);
    if (ep) {
      matched++;
      console.log(`MATCH: ${guest.name} -> ${ep.title}`);
    } else {
      unmatched.push(guest.name);
    }
    if (ep || guest.spotifyEpisodeId) withListen++;
  }
  console.log(`With listen link: ${withListen} / ${CONFIRMED_GUESTS.length}`);
  console.log("\n---");
  console.log(`Matched: ${matched} / ${CONFIRMED_GUESTS.length}`);
  console.log("Unmatched:", unmatched.join(", "));
}

main().catch(console.error);
