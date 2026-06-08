"use client";

import Image from "next/image";
import { useState } from "react";

type GuestImageProps = {
  src: string;
  alt: string;
  initials: string;
  priority?: boolean;
};

export function GuestImage({
  src,
  alt,
  initials,
  priority = false,
}: GuestImageProps) {
  const [failed, setFailed] = useState(false);
  const [activeSrc, setActiveSrc] = useState(src);

  const isRemote = activeSrc.startsWith("http");

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white/10 to-black">
        <span className="text-4xl font-extralight text-white/20">{initials}</span>
      </div>
    );
  }

  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white/10 to-black">
        <span className="text-4xl font-extralight text-white/20">{initials}</span>
      </div>
      <Image
        src={activeSrc}
        alt={alt}
        fill
        unoptimized={isRemote}
        priority={priority}
        className="object-cover object-top opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
        sizes="(max-width: 768px) 50vw, 25vw"
        onError={() => {
          if (isRemote && activeSrc.includes("maxresdefault")) {
            setActiveSrc(activeSrc.replace("maxresdefault", "hqdefault"));
            return;
          }
          setFailed(true);
        }}
      />
    </>
  );
}
