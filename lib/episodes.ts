export type Episode = {
  title: string;
  slug: string;
  description: string;
  pubDate: string;
  audioUrl?: string;
  videoUrl?: string;
  youtubeId?: string;
  imageUrl?: string;
  duration?: string;
  isShort?: boolean;
};

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatEpisodeDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}
