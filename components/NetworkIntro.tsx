import Image from "next/image";

export function NetworkIntro() {
  return (
    <section
      id="explore"
      className="relative w-full border-t border-white/10 bg-[#0a0a0a]"
    >
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9] md:max-h-[70vh]">
        <Image
          src="/events-coming-soon.png"
          alt="Rooftop gathering overlooking the New York City skyline"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-[0.72] saturate-[0.9]"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.2)_45%,rgba(0,0,0,0.55)_100%)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <div className="fade-in flex flex-col items-center">
            <span className="mb-5 rounded-sm bg-[#e8e4dc] px-3 py-1.5 text-[11px] font-normal tracking-[0.15em] uppercase text-black">
              Events
            </span>
            <h2 className="font-serif text-4xl font-light leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] md:text-5xl lg:text-6xl">
              Coming soon.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
