import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-start justify-center px-6 pt-28 md:pt-32">
      <p className="text-xs font-extralight tracking-[0.25em] uppercase text-white/50">
        404
      </p>
      <h1 className="mt-4 text-3xl font-extralight text-white">
        Page not found.
      </h1>
      <Link
        href="/"
        className="mt-8 text-sm font-extralight text-white/50 transition-colors hover:text-white"
      >
        Return home
      </Link>
    </section>
  );
}
