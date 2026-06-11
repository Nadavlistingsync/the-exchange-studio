import type { Metadata } from "next";
import Link from "next/link";
import { SubpageNav } from "@/components/SubpageNav";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Network",
  description:
    "The Exchange network for New York commercial real estate operators.",
};

export default function NetworkPage() {
  const waitlistHref = `mailto:${SITE.email}?subject=${encodeURIComponent("Network waitlist")}&body=${encodeURIComponent("I'd like to join The Exchange network waitlist.")}`;

  return (
    <>
      <SubpageNav />
      <section className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-6 pb-24 pt-28 md:px-12 md:pt-32">
        <div className="fade-in max-w-2xl">
          <p className="section-eyebrow mb-4">The network</p>
          <h1 className="font-serif text-4xl font-light italic leading-[1.1] tracking-tight text-white md:text-6xl">
            Coming soon.
          </h1>
          <p className="mt-7 max-w-md text-base font-extralight leading-[1.8] text-white/55">
            A private room for the people who move New York commercial real
            estate. We will share more when the network opens.
          </p>
          <div className="mt-9 flex items-center gap-7">
            <a href={waitlistHref} className="link-quiet">
              Join the waitlist →
            </a>
            <Link href="/" className="link-subtle">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
