const PRESS_OUTLETS = [
  "Norwood News",
  "Commercial Observer",
  "Bisnow",
  "Crain's",
  "NY Post",
];

export function Press() {
  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="fade-in max-w-2xl">
          <p className="mb-4 text-xs font-extralight tracking-[0.25em] uppercase text-white/50">
            Press
          </p>
          <h2 className="text-3xl font-extralight tracking-tight text-white md:text-4xl">
            Coverage coming soon.
          </h2>
          <p className="mt-4 text-sm font-extralight leading-relaxed text-white/50">
            Pull quotes and press logos will appear here as coverage is
            published.
          </p>
        </div>

        <div className="fade-in fade-in-delay-1 mt-16 flex flex-wrap items-center gap-8 border-t border-white/10 pt-10">
          {PRESS_OUTLETS.map((outlet) => (
            <span
              key={outlet}
              className="text-sm font-extralight tracking-wide text-white/25"
            >
              {outlet}
              <span className="ml-2 text-xs text-white/20">(coming)</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
