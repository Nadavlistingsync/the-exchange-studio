import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-start justify-center px-6 pt-28 md:pt-32">
      <p className="section-eyebrow">404</p>
      <h1 className="mt-4 font-serif text-3xl font-light italic text-white md:text-5xl">
        Page not found.
      </h1>
      <Link href="/" className="link-quiet mt-9">
        Return home →
      </Link>
    </section>
  );
}
