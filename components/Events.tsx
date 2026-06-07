const PLACEHOLDER_EVENTS = [
  { id: 1, label: "Event photo 1" },
  { id: 2, label: "Event photo 2" },
  { id: 3, label: "Event photo 3" },
  { id: 4, label: "Event photo 4" },
  { id: 5, label: "Event photo 5" },
  { id: 6, label: "Event photo 6" },
];

export function Events() {
  return (
    <section id="events" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="fade-in mb-16 max-w-2xl">
          <p className="mb-4 text-xs font-extralight tracking-[0.25em] uppercase text-white/50">
            Events
          </p>
          <h2 className="text-3xl font-extralight tracking-tight text-white md:text-4xl">
            Off Market by The Exchange
          </h2>
          <p className="mt-4 text-sm font-extralight leading-relaxed text-white/50">
            An in-person mixer for NYC commercial real estate professionals.
            Proof the network exists beyond the microphone.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {PLACEHOLDER_EVENTS.map((item) => (
            <div
              key={item.id}
              className="flex aspect-[4/3] items-center justify-center border border-dashed border-white/20 bg-white/[0.02]"
            >
              <span className="text-xs font-extralight tracking-wide text-white/30">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
