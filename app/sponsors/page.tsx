import type { Metadata } from "next";
import Link from "next/link";
import { SubpageNav } from "@/components/SubpageNav";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Partner with The Exchange — a New York commercial real estate podcast for principals, operators, and brokers.",
};

const benefits = [
  {
    title: "Podcast integration",
    description:
      "Thoughtful mentions woven into episodes and show notes — not scripted ads. Your brand sits alongside conversations with the people who move the market.",
  },
  {
    title: "Newsletter presence",
    description:
      "Placement in The Exchange newsletter, where subscribers follow new episodes, operator insights, and interviews from the New York CRE community.",
  },
  {
    title: "Network visibility",
    description:
      "Association with an invitation-only network of principals, developers, brokers, and operators — the decision-makers shaping commercial real estate in the city.",
  },
  {
    title: "Digital footprint",
    description:
      "Logo and link on theexchange.studio, plus distribution across YouTube, Instagram, TikTok, and LinkedIn where episodes and clips reach the industry.",
  },
];

const audiencePoints = [
  "Principals and owner-operators building and managing portfolios across the five boroughs",
  "Brokers and advisors closing office, retail, industrial, and multifamily transactions",
  "Developers, capital markets professionals, and service providers embedded in New York CRE",
  "Listeners who follow the operators and dealmakers featured on the show — not a general audience",
];

export default function SponsorsPage() {
  return (
    <>
      <SubpageNav />
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-28 md:px-12 md:pt-32">
        <div className="fade-in max-w-2xl">
          <p className="section-eyebrow mb-4">Sponsorship</p>
          <h1 className="font-serif text-4xl font-light leading-[1.12] tracking-tight text-white md:text-5xl">
            Reach the people who move New York commercial real estate.
          </h1>
          <p className="mt-8 text-base font-extralight leading-[1.8] text-white/60">
            The Exchange is a podcast and private network for principals and
            operators — not a mass-market show. Sponsorship puts your brand in
            front of a focused audience of dealmakers, portfolio builders, and
            industry leaders across the city.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="fade-in max-w-2xl">
            <p className="section-eyebrow mb-4">Why sponsor</p>
            <h2 className="font-serif text-3xl font-light tracking-tight text-white md:text-4xl">
              A premium channel in a niche market.
            </h2>
            <p className="mt-6 text-base font-extralight leading-[1.8] text-white/60">
              New York commercial real estate runs on relationships and
              reputation. The Exchange sits at that intersection — long-form
              conversations with the brokers, developers, and operators your
              customers already know and respect. Sponsors align with that
              editorial context, not interrupt it.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="fade-in mb-16 max-w-2xl">
            <p className="section-eyebrow mb-4">What sponsors receive</p>
            <h2 className="font-serif text-3xl font-light tracking-tight text-white md:text-4xl">
              Integrated, not intrusive.
            </h2>
          </div>

          <div className="fade-in grid grid-cols-1 gap-px border border-white/10 bg-white/10 md:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-[#0a0a0a] p-8 transition-colors duration-300 hover:bg-[#0d0c0b] md:p-10"
              >
                <h3 className="font-serif text-lg font-light tracking-tight text-white">
                  {benefit.title}
                </h3>
                <p className="mt-4 text-sm font-extralight leading-[1.8] text-white/55">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="fade-in grid gap-16 md:grid-cols-2 md:gap-24">
            <div>
              <p className="section-eyebrow mb-4">The audience</p>
              <h2 className="font-serif text-3xl font-light tracking-tight text-white md:text-4xl">
                Operators, not observers.
              </h2>
              <p className="mt-6 text-base font-extralight leading-[1.8] text-white/60">
                We do not publish vanity metrics. What we can say: every episode
                features confirmed guests who are active in New York commercial
                real estate — and the people who listen are here for that
                specificity.
              </p>
            </div>

            <ul className="flex flex-col gap-6">
              {audiencePoints.map((point) => (
                <li
                  key={point}
                  className="border-l border-[#e8e4dc]/25 pl-6 text-sm font-extralight leading-[1.8] text-white/60"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="fade-in max-w-2xl">
            <p className="section-eyebrow mb-4">Get in touch</p>
            <h2 className="font-serif text-3xl font-light tracking-tight text-white md:text-4xl">
              Let&apos;s talk about a fit.
            </h2>
            <p className="mt-6 text-base font-extralight leading-[1.8] text-white/60">
              Sponsorship packages are limited and tailored. Tell us about your
              brand and we will share availability, formats, and pricing.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={`mailto:${SITE.email}?subject=${encodeURIComponent("Sponsorship inquiry")}&body=${encodeURIComponent("I'd like to learn about sponsorship opportunities with The Exchange.")}`}
                className="link-quiet"
              >
                {SITE.email} →
              </a>
              <Link href="/" className="link-subtle">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
