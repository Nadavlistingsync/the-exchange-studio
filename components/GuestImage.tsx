"use client";

import Image from "next/image";
import { useState } from "react";

type GuestImageVariant = "mosaic" | "row" | "featured" | "hero";

type GuestImageProps = {
  src: string;
  alt: string;
  initials: string;
  priority?: boolean;
  variant?: GuestImageVariant;
};

const variantClasses: Record<
  GuestImageVariant,
  { frame: string; image: string }
> = {
  mosaic: {
    frame: "absolute inset-0 overflow-hidden rounded-xl",
    // Bottom-anchor so shoulders sit on the tile edge like Dalfen.
    image:
      "object-cover object-bottom opacity-100 transition-transform duration-500 group-hover:scale-[1.04] group-focus-visible:scale-[1.04]",
  },
  row: {
    frame: "absolute inset-x-[8%] top-[6%] bottom-0",
    image:
      "object-contain object-bottom opacity-95 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100 group-focus-visible:scale-[1.03] group-focus-visible:opacity-100",
  },
  featured: {
    frame: "absolute inset-x-[10%] top-[8%] bottom-0",
    image:
      "object-contain object-bottom opacity-95 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100 group-focus-visible:scale-[1.03] group-focus-visible:opacity-100",
  },
  hero: {
    // Fill the profile panel — less empty black, shoulders on the bottom edge.
    frame: "absolute inset-x-0 top-0 bottom-0 md:inset-x-[4%]",
    image:
      "object-cover object-bottom opacity-100 transition-all duration-500 group-hover:scale-[1.02] group-hover:opacity-100 group-focus-visible:scale-[1.02] group-focus-visible:opacity-100",
  },
};

export function GuestImage({
  src,
  alt,
  initials,
  priority = false,
  variant = "mosaic",
}: GuestImageProps) {
  const [failed, setFailed] = useState(false);
  const [activeSrc, setActiveSrc] = useState(src);

  const isRemote = activeSrc.startsWith("http");
  const { frame, image } = variantClasses[variant];

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-black ${
          variant === "mosaic" ? "absolute inset-0 rounded-xl" : "absolute inset-0"
        }`}
      >
        <span className="text-4xl font-extralight text-white/20">{initials}</span>
      </div>
    );
  }

  return (
    <>
      <div className="absolute inset-0 bg-black" />
      <div className={frame}>
        <Image
          src={activeSrc}
          alt={alt}
          fill
          unoptimized={isRemote}
          priority={priority}
          className={image}
          sizes={
            variant === "hero"
              ? "(max-width: 1024px) 100vw, 50vw"
              : variant === "featured"
                ? "(max-width: 1024px) 100vw, 50vw"
                : variant === "row"
                  ? "160px"
                  : "(max-width: 768px) 50vw, 25vw"
          }
          onError={() => {
            if (isRemote && activeSrc.includes("maxresdefault")) {
              setActiveSrc(activeSrc.replace("maxresdefault", "hqdefault"));
              return;
            }
            setFailed(true);
          }}
        />
      </div>
    </>
  );
}
