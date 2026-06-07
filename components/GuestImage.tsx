"use client";

import Image from "next/image";
import { useState } from "react";

type GuestImageProps = {
  src: string;
  alt: string;
  initials: string;
};

export function GuestImage({ src, alt, initials }: GuestImageProps) {
  const [failed, setFailed] = useState(false);

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
        src={src}
        alt={alt}
        fill
        className="object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
        sizes="(max-width: 768px) 50vw, 25vw"
        onError={() => setFailed(true)}
      />
    </>
  );
}
