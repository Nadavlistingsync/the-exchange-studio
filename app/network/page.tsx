import type { Metadata } from "next";
import { RequestAccessForm } from "@/components/RequestAccessForm";
import { SubpageNav } from "@/components/SubpageNav";

export const metadata: Metadata = {
  title: "Network",
  description:
    "An invitation-only network for the people who move New York commercial real estate.",
};

export default function NetworkPage() {
  return (
    <>
      <SubpageNav />
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-40 md:pt-48">
        <div className="fade-in max-w-3xl">
          <p className="mb-6 text-xs font-extralight tracking-[0.25em] uppercase text-white/50">
            The Network
          </p>
          <h1 className="text-4xl font-extralight leading-[1.1] tracking-tight text-white md:text-5xl">
            A private room for the people who move New York real estate.
          </h1>
          <div className="mt-10 space-y-6 text-base font-extralight leading-relaxed text-white/60">
            <p>
              The Exchange is an invitation-only network for principals,
              operators, and dealmakers in New York commercial real estate.
            </p>
            <p>
              This is not a public community or an open membership. Access is
              reviewed individually. If there is a fit, you will hear from us.
            </p>
            <p>
              The podcast is proof of who is already in the room. It is not the
              product. The network is.
            </p>
          </div>
        </div>
      </section>
      <RequestAccessForm />
    </>
  );
}
