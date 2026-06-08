import type { Metadata } from "next";
import Link from "next/link";
import { SubpageNav } from "@/components/SubpageNav";

export const metadata: Metadata = {
  title: "Apple Podcasts",
  description: "The Exchange on Apple Podcasts — coming soon.",
};

function AppleLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.9 107.2 125.2 25-.3 43-16.5 76.4-16.5 31.9 0 48.4 16.5 76.4 16.5 48.6-.7 94.4-87.9 107.2-125.2C329.8 347.4 329.6 286.9 318.7 268.7zM257.7 76.4c26.1-31.2 46.8-74.8 39.5-118.5-38.1 1.5-84.4 25.4-111.9 57.7-24.2 28.5-45.3 74.1-39.5 119.2 41.5 3.2 83.8-18.9 111.9-58.6z" />
    </svg>
  );
}

export default function ApplePodcastsPage() {
  return (
    <>
      <SubpageNav />
      <section className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-6 pb-24 pt-28 md:px-12 md:pt-32">
        <div className="fade-in max-w-2xl">
          <AppleLogo className="mb-10 h-10 w-10 text-white/80" />
          <p className="section-eyebrow mb-4">Apple Podcasts</p>
          <h1 className="text-4xl font-extralight leading-[1.1] tracking-tight text-white md:text-5xl">
            Coming soon.
          </h1>
          <p className="mt-6 text-base font-extralight leading-relaxed text-white/55">
            Apple Podcasts is on the way.
          </p>
          <Link href="/" className="link-subtle mt-10 inline-block">
            Back to home
          </Link>
        </div>
      </section>
    </>
  );
}
