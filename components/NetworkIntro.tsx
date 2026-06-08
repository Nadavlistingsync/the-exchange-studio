import Link from "next/link";

export function NetworkIntro() {
  return (
    <section
      id="explore"
      className="border-t border-white/10 bg-[#0a0a0a]"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="fade-in max-w-4xl">
          <p className="mb-6 text-xs font-extralight tracking-[0.25em] uppercase text-white/50">
            Private Network
          </p>
          <h1 className="text-3xl font-extralight leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
            For the principals and operators who move New York real estate.
          </h1>
          <p className="mt-8 max-w-xl text-base font-extralight leading-relaxed text-white/60">
            An invitation-only room for the people closing deals, building
            portfolios, and setting the pace of the city&apos;s commercial
            market.
          </p>
          <Link
            href="/network"
            className="mt-12 inline-block text-xs font-extralight tracking-[0.15em] uppercase text-white/50 transition-colors hover:text-white"
          >
            The network is coming soon
          </Link>
        </div>
      </div>
    </section>
  );
}
