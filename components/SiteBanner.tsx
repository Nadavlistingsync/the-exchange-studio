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
      <span className="relative block h-9 w-40 md:h-10 md:w-48">
        <Image
          src="/the-exchange-banner.png"
          alt="The Exchange"
          fill
          priority={priority}
          sizes="192px"
          className="object-cover object-center"
        />
      </span>
    </Link>
  );
}
