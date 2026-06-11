import Link from "next/link";

type SiteTitleProps = {
  className?: string;
};

export function SiteTitle({ className = "" }: SiteTitleProps) {
  return (
    <Link
      href="/"
      className={`font-serif text-xl font-light tracking-tight text-white transition-colors duration-300 hover:text-[#e8e4dc] md:text-[1.4rem] ${className}`}
    >
      The Exchange
    </Link>
  );
}
