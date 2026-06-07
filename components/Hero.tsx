import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-40 md:pb-32 md:pt-48">
      <div className="fade-in max-w-4xl">
        <p className="mb-6 text-xs font-extralight tracking-[0.25em] uppercase text-white/50">
          Private Network
        </p>
        <h1 className="text-4xl font-extralight leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
          For the principals and operators who move New York real estate.
        </h1>
        <p className="mt-8 max-w-xl text-base font-extralight leading-relaxed text-white/60 md:text-lg">
          An invitation-only room for the people closing deals, building
          portfolios, and setting the pace of the city&apos;s commercial market.
        </p>
        <div className="mt-12">
          <Link
            href="/#request-access"
            className="inline-block border border-white px-8 py-3 text-xs font-light tracking-[0.2em] uppercase transition-colors hover:bg-white hover:text-black"
          >
            Request Access
          </Link>
        </div>
      </div>
    </section>
  );
}
