import type { Metadata } from "next";
import { GuestIndex } from "@/components/GuestIndex";
import { SubpageNav } from "@/components/SubpageNav";
import { getGuestsWithEpisodes } from "@/lib/guests";
import { getEpisodes } from "@/lib/rss";

export const metadata: Metadata = {
  title: "Guests",
  description:
    "The operators and principals who have sat down with The Exchange podcast.",
};

export const revalidate = 3600;

export default async function GuestsPage() {
  const episodes = await getEpisodes();
  const guests = getGuestsWithEpisodes(episodes);

  return (
    <>
      <SubpageNav />
      <GuestIndex guests={guests} />
    </>
  );
}
