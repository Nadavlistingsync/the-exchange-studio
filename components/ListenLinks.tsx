import { SITE } from "@/lib/site";

const platforms = [
  { label: "Apple Podcasts", href: SITE.listen.apple },
  { label: "Spotify", href: SITE.listen.spotify },
  { label: "YouTube", href: SITE.listen.youtube },
  { label: "RSS", href: SITE.listen.rss },
];

export function ListenLinks() {
  return (
    <section id="listen" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <p className="section-eyebrow mb-5">Listen Everywhere</p>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {platforms.map((platform) => (
            <a
              key={platform.label}
              href={platform.href}
              target={platform.href.startsWith("http") ? "_blank" : undefined}
              rel={
                platform.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="text-sm font-extralight text-white/40 transition-colors hover:text-white"
            >
              {platform.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
