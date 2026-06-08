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
          className="object-cover object-center brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <div className="fade-in flex flex-col items-center">
            <p className="section-eyebrow mb-3">Events</p>
            <h2 className="font-serif text-3xl font-light leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
              Coming soon.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
