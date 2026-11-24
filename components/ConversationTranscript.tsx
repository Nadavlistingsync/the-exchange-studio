import { formatEpisodeDate } from "@/lib/episodes";
import type { GuestConversation } from "@/lib/conversations";

type ConversationTranscriptProps = {
  conversation: GuestConversation;
};

export function ConversationTranscript({
  conversation,
}: ConversationTranscriptProps) {
  return (
    <section className="border-t border-white/10 px-6 py-16 md:px-12 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <p className="section-eyebrow mb-3">The conversation</p>
        <h2 className="font-serif mb-3 max-w-3xl text-3xl font-light leading-tight text-white md:text-4xl">
          {conversation.title}
        </h2>
        <p className="mb-8 text-xs font-light uppercase tracking-[0.18em] text-white/40">
          Recorded {formatEpisodeDate(conversation.recordedAt)}
        </p>
        <p className="mb-12 text-sm font-extralight leading-[1.85] text-white/50 md:text-base">
          {conversation.intro}
        </p>

        <div className="flex flex-col gap-8">
          {conversation.turns.map((turn, index) => (
            <div key={`${turn.speaker}-${index}`}>
              <p className="mb-2 text-[11px] font-normal uppercase tracking-[0.2em] text-[#e8e4dc]/70">
                {turn.speaker}
              </p>
              <p className="text-sm font-extralight leading-[1.85] text-white/70 md:text-[15px]">
                {turn.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
