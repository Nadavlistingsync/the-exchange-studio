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
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9] md:max-h-[60vh]">
        <Image
          src="/events-coming-soon.png"
          alt="Rooftop gathering overlooking the New York City skyline"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Cinematic vignette */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/30 to-black/40" />
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="fade-in section-eyebrow eyebrow-rule">Events</p>
          <h2 className="fade-in fade-in-delay-1 mt-6 font-serif text-5xl font-light italic leading-none tracking-tight text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.6)] md:text-7xl">
            Coming soon.
          </h2>
          <p className="fade-in fade-in-delay-2 mt-6 max-w-md text-sm font-extralight leading-relaxed text-white/65">
            Private gatherings for the people who move New York real estate.
          </p>
          <a
            href={eventsHref}
            target={SITE.eventsUrl ? "_blank" : undefined}
            rel={SITE.eventsUrl ? "noopener noreferrer" : undefined}
            className="fade-in fade-in-delay-3 link-quiet mt-8"
          >
            {eventsCta}
          </a>
        </div>
      </div>
    </section>
  );
}
