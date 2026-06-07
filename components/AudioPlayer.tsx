"use client";

type AudioPlayerProps = {
  src: string;
  title: string;
};

export function AudioPlayer({ src, title }: AudioPlayerProps) {
  if (!src) return null;

  return (
    <div className="w-full">
      <audio
        controls
        preload="none"
        className="w-full opacity-90"
        aria-label={`Play ${title}`}
      >
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
