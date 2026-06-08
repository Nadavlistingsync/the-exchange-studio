import { SITE } from "@/lib/site";

export function NewsletterCTA() {
  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-extralight tracking-[0.2em] uppercase text-white/40">
              Newsletter
            </p>
            <p className="mt-2 text-sm font-extralight text-white/50">
              Episode updates and interviews, delivered to your inbox.
            </p>
          </div>
          <a
            href={SITE.newsletter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-extralight tracking-[0.15em] uppercase text-white/50 transition-colors hover:text-white"
          >
            Subscribe on Substack
          </a>
        </div>
      </div>
    </section>
  );
}
