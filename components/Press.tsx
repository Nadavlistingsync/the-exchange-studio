const PRESS_OUTLETS = [
  { name: "Norwood News", active: true },
  { name: "Commercial Observer", active: false },
  { name: "Bisnow", active: false },
  { name: "Crain's", active: false },
  { name: "NY Post", active: false },
];

export function Press() {
  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="fade-in mb-12">
          <p className="mb-4 text-xs font-extralight tracking-[0.25em] uppercase text-white/50">
            Press
          </p>
        </div>

        <blockquote className="fade-in fade-in-delay-1 mb-16 max-w-3xl">
          <p className="text-2xl font-extralight leading-relaxed tracking-tight text-white md:text-3xl">
            &ldquo;A new voice in New York commercial real estate, bringing
            operators into conversation.&rdquo;
          </p>
          <footer className="mt-6 text-sm font-extralight text-white/50">
            Norwood News
          </footer>
        </blockquote>

        <div className="flex flex-wrap items-center gap-8 border-t border-white/10 pt-10">
          {PRESS_OUTLETS.map((outlet) => (
            <span
              key={outlet.name}
              className={`text-sm font-extralight tracking-wide ${
                outlet.active ? "text-white" : "text-white/25"
              }`}
            >
              {outlet.name}
              {!outlet.active && (
                <span className="ml-2 text-xs text-white/20">(coming)</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
