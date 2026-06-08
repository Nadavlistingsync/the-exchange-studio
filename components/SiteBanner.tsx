import Image from "next/image";
import Link from "next/link";

type SiteBannerProps = {
  className?: string;
  priority?: boolean;
};

export function SiteBanner({ className = "", priority = false }: SiteBannerProps) {
  return (
    <Link
      href="/"
      className={`inline-block transition-opacity hover:opacity-80 ${className}`}
    >
      <span className="relative block h-7 w-36 md:h-8 md:w-40">
        <Image
          src="/the-exchange-banner.png"
          alt="The Exchange"
          fill
          priority={priority}
          sizes="160px"
          className="object-contain object-center"
        />
      </span>
    </Link>
  );
}
