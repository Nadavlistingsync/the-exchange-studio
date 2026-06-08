import type { Metadata } from "next";
import Link from "next/link";
import { SubpageNav } from "@/components/SubpageNav";

export const metadata: Metadata = {
  title: "Network",
  description:
    "The Exchange network for New York commercial real estate operators.",
};

export default function NetworkPage() {
  return (
    <>
      <SubpageNav />
      <section className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-6 pb-24 pt-40 md:pt-48">
        <div className="fade-in max-w-2xl">
          <p className="mb-6 text-xs font-extralight tracking-[0.25em] uppercase text-white/50">
            The Network
          </p>
          <h1 className="text-4xl font-extralight leading-[1.1] tracking-tight text-white md:text-5xl">
            Coming soon.
          </h1>
          <p className="mt-8 text-base font-extralight leading-relaxed text-white/60">
            A private room for the people who move New York commercial real
            estate. We will share more when the network opens.
          </p>
          <Link
            href="/"
            className="mt-12 inline-block text-xs font-extralight tracking-[0.15em] uppercase text-white/50 transition-colors hover:text-white"
          >
            Back to home
          </Link>
        </div>
      </section>
    </>
  );
}
