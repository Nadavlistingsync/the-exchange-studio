import Image from "next/image";
import { SITE } from "@/lib/site";

export function NetworkIntro() {
  const eventsHref = SITE.eventsUrl
    ? SITE.eventsUrl
    : `mailto:${SITE.email}?subject=${encodeURIComponent("Events at The Exchange")}&body=${encodeURIComponent("Notify me when The Exchange events go live.")}`;

  const eventsCta = SITE.eventsUrl ? "View events →" : "Get notified →";

  return (
    <section
      id="explore"
      className="relative w-full border-t border-white/10 bg-[#0a0a0a]"
    >
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9] md:max-h-[55vh]">
        <Image
          src="/events-coming-soon.png"
          alt="Rooftop gathering overlooking the New York City skyline"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <div className="flex max-w-2xl flex-col items-center rounded-sm border border-white/15 bg-black/35 px-10 py-12 backdrop-blur-sm md:px-14 md:py-14">
            <p className="fade-in mb-5 text-[11px] font-extralight uppercase tracking-[0.28em] text-white/75">
              Events
            </p>
            <h2 className="fade-in fade-in-delay-1 font-serif text-4xl font-light leading-none tracking-tight text-white shadow-[0_0_48px_rgba(255,255,255,0.12)] md:text-6xl lg:text-7xl">
              Coming soon.
            </h2>
            <div
              className="fade-in fade-in-delay-2 mt-7 h-px w-14 bg-white/35"
              aria-hidden
            />
            <a
              href={eventsHref}
              target={SITE.eventsUrl ? "_blank" : undefined}
              rel={SITE.eventsUrl ? "noopener noreferrer" : undefined}
              className="fade-in fade-in-delay-2 link-quiet mt-8"
            >
              {eventsCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
