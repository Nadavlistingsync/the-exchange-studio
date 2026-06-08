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

const variantInsets: Record<GuestImageVariant, string> = {
  mosaic: "inset-x-[16%] top-[14%] bottom-0",
  row: "inset-x-[12%] top-[10%] bottom-0",
  featured: "inset-x-[18%] top-[14%] bottom-[2%]",
  hero: "inset-x-[16%] top-[10%] bottom-[4%] md:inset-x-[22%] md:top-[12%]",
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
  const inset = variantInsets[variant];

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <span className="text-4xl font-extralight text-white/20">{initials}</span>
      </div>
    );
  }

  return (
    <>
      <div className="absolute inset-0 bg-black" />
      <div className={`absolute ${inset}`}>
        <Image
          src={activeSrc}
          alt={alt}
          fill
          unoptimized={isRemote}
          priority={priority}
          className="object-contain object-bottom opacity-95 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100 group-focus-visible:scale-[1.03] group-focus-visible:opacity-100"
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
