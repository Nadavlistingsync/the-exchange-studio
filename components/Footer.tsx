import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-extralight tracking-[0.2em] uppercase">
            {SITE.name}
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="text-sm font-extralight text-white/60 transition-colors hover:text-white"
          >
            {SITE.email}
          </a>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-extralight text-white/60 transition-colors hover:text-white"
          >
            LinkedIn
          </a>
          <p className="text-xs font-extralight text-white/40">
            &copy; {new Date().getFullYear()} The Exchange. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
