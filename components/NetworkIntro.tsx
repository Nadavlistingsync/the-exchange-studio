import Image from "next/image";

export function NetworkIntro() {
  return (
    <section
      id="explore"
      className="relative w-full border-t border-white/10 bg-[#0a0a0a]"
    >
      <div className="mx-auto max-w-6xl px-6 pt-10 md:px-12 md:pt-12">
        <p className="section-eyebrow">Events</p>
      </div>
      <div className="relative mt-4 aspect-[16/9] w-full md:aspect-[21/9] md:max-h-[70vh]">
        <Image
          src="/events-coming-soon.png"
          alt="Rooftop gathering overlooking the New York City skyline"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/5" />
        <div className="absolute inset-0 flex items-end px-8 pb-10 md:px-12 md:pb-14 lg:px-16 lg:pb-16">
          <p className="text-2xl font-extralight tracking-tight text-white md:text-3xl lg:text-4xl">
            Events coming soon
          </p>
        </div>
      </div>
    </section>
  );
}
