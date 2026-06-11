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
        className={`relative aspect-[3/4] overflow-hidden rounded-xl border bg-[#0a0a0a] transition-colors duration-300 ${
          hasEpisode
            ? "border-white/10 group-hover:border-[#e8e4dc]/25"
            : "border-white/10 border-dashed opacity-80 group-hover:border-white/20"
        }`}
      >
        <Image
          src={guest.imagePath}
          alt={guest.name}
          fill
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
        <div className="pointer-events-none absolute right-2 top-2 z-10 rounded-sm bg-[#e8e4dc] px-2.5 py-[5px] text-[9.5px] font-normal uppercase leading-none tracking-[0.14em] text-[#1a1815] shadow-[0_2px_14px_rgba(0,0,0,0.4)]">
          {getGuestFirstName(guest)}
        </div>
        <div className="absolute inset-x-0 bottom-0 px-3 pb-3 pt-10">
          <p className="font-serif text-base font-light leading-snug text-white/95">
            {guest.name}
          </p>
          <p className="mt-0.5 truncate text-[9px] font-light uppercase tracking-[0.14em] text-white/50 sm:text-[10px]">
            {hasEpisode ? getGuestCompactLabel(guest) : "Episode coming soon"}
          </p>
        </div>
      </div>
    </Link>
  );
}
