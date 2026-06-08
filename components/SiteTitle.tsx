import Link from "next/link";

type SiteTitleProps = {
  className?: string;
};

export function SiteTitle({ className = "" }: SiteTitleProps) {
  return (
    <Link
      href="/"
      className={`font-serif text-xl font-light tracking-tight text-white transition-opacity hover:opacity-80 md:text-2xl ${className}`}
    >
      The Exchange
    </Link>
  );
}
