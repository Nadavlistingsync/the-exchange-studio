import Image from "next/image";
import Link from "next/link";
import { getGuestCompactLabel, getGuestFirstName, type Guest } from "@/lib/guests";

type GuestCardProps = {
  guest: Guest;
  hasEpisode?: boolean;
};

export function GuestCard({ guest, hasEpisode = true }: GuestCardProps) {
  return (
    <Link href={`/guests/${guest.slug}`} className="group block">
      <div
        className={`relative aspect-[3/4] overflow-hidden rounded-xl border bg-[#0a0a0a] transition-colors ${
          hasEpisode
            ? "border-white/10 group-hover:border-white/20"
            : "border-white/10 border-dashed opacity-80 group-hover:border-white/15"
        }`}
      >
        <Image
          src={guest.imagePath}
          alt={guest.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <div className="pointer-events-none absolute right-2 top-2 z-10 rounded-sm bg-[#e8e4dc] px-2 py-1 text-[10px] font-normal uppercase leading-none tracking-[0.06em] text-black">
          {getGuestFirstName(guest)}
        </div>
        <div className="absolute inset-x-0 bottom-0 px-2.5 pb-2.5 pt-8">
          <p className="truncate text-[10px] font-extralight text-white/85 sm:text-xs">
            {hasEpisode ? getGuestCompactLabel(guest) : "Episode coming soon"}
          </p>
        </div>
      </div>
    </Link>
  );
}
