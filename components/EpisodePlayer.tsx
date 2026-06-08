import type { Episode } from "@/lib/episodes";
import { AudioPlayer } from "./AudioPlayer";

type EpisodePlayerProps = {
  episode: Episode;
};

export function EpisodePlayer({ episode }: EpisodePlayerProps) {
  if (episode.youtubeId) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${episode.youtubeId}`}
          title={episode.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  if (episode.audioUrl) {
    return <AudioPlayer src={episode.audioUrl} title={episode.title} />;
  }

  return null;
}
