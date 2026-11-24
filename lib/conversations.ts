import type { Episode } from "./episodes";
import { slugify } from "./episodes";

export type ConversationTurn = {
  speaker: "Nadav" | "Martin" | string;
  text: string;
};

export type GuestConversation = {
  guestSlug: string;
  title: string;
  recordedAt: string;
  intro: string;
  turns: ConversationTurn[];
};

const MARTIN_NUSSBAUM: GuestConversation = {
  guestSlug: "martin-nussbaum",
  title: "Martin Nussbaum on The Exchange",
  recordedAt: "2026-09-16T13:00:00.000Z",
  intro:
    "We sat down at Slate's office in NYC to talk about his move from Johannesburg to New Jersey, why he walked away from medicine, starting a business in 2008, and the habit that still shapes how he runs his portfolio. This conversation has been edited for length and clarity.",
  turns: [
    {
      speaker: "Nadav",
      text: "You moved from Johannesburg to New Jersey as a kid. Why did your parents decide to leave South Africa?",
    },
    {
      speaker: "Martin",
      text: "My father was a cantor at a synagogue in Johannesburg. In the late 1970s, during apartheid, he got caught in some riots that were taking place. It spooked him, as it should have. The next day he decided this wasn't the best place to bring up his family, and within a year he and my mother moved us to New Jersey. He took a job as the cantor at a synagogue in Cranford.",
    },
    {
      speaker: "Nadav",
      text: "Was it hard being an immigrant?",
    },
    {
      speaker: "Martin",
      text: "It was hard because you weren't around your extended family. Seeing now how my family lives, with cousins, aunts, uncles and grandparents close by, we didn't have that support system growing up. We worked around it by having a lot of really good friends who became like family. We also went back to South Africa often, at least for the first 10 years we were in America.",
    },
    {
      speaker: "Nadav",
      text: "Do you still go back?",
    },
    {
      speaker: "Martin",
      text: "Not really. Most of my family has since moved to Israel or Australia. It's a beautiful country, and hopefully we'll all get back there again soon.",
    },
    {
      speaker: "Nadav",
      text: "Did you know in high school that you wanted to be in real estate?",
    },
    {
      speaker: "Martin",
      text: "No. I always wanted to be a doctor. My whole high school and college career was focused on becoming a doctor.",
    },
    {
      speaker: "Nadav",
      text: "So how did you make the switch? What's that conversation like with your parents, going from medicine to investment banking?",
    },
    {
      speaker: "Martin",
      text: "It wasn't easy. Pre-med is one of the more difficult majors to pursue, and I worked very hard in college to keep up. After four years of undergrad, I took a year off before medical school, and during that year I realized it wasn't what I wanted to do for the rest of my life. If you commit to medicine, you're committing to another eight to ten years of education, and it just wasn't the right thing for me. So, I made the pivot. My parents were disappointed, but okay with it, and I fell into investment banking.",
    },
    {
      speaker: "Nadav",
      text: "You've talked about how medicine shaped your work ethic. Did you have that intensity before college?",
    },
    {
      speaker: "Martin",
      text: "I actually had a major learning disability all through high school, and really my whole life. Back then there weren't the programs or the level of awareness we have today, which I think is amazing. So, I always had to work differently than most people, not necessarily harder, because I didn't grasp concepts as quickly. I had to struggle through everything a bit more than the average person. When I got to college, working longer hours didn't bother me, because I'd always had to put in extra. I think my work ethic came from my learning challenges more than anything.",
    },
    {
      speaker: "Nadav",
      text: "You've mentioned that if someone else studied for one hour, you'd study for ten.",
    },
    {
      speaker: "Martin",
      text: "Yes. It just didn't sink in. I wish I'd had better tools back then to cope with it, but I just had to work more. It wasn't harder. It was just more hours.",
    },
    {
      speaker: "Nadav",
      text: "You started your business in 2008, during one of the biggest crashes in history. What was that like?",
    },
    {
      speaker: "Martin",
      text: "It didn't feel great the first year, year and a half. You finally feel ready to stand on your own two feet, and then you go into 12 to 18 months of no activity, because the markets were basically shut down. It was hard for my family, since I was married with children. A lot of doubt creeps in: can I do this or not? I stayed focused on what I was doing and kept a level of confidence that I could do it. I was also watching my peers around me struggle, even the most successful ones. So, I kept my mind on waking up every day, doing my job and working hard, knowing my break would eventually come. And it did. In 2009 the world started to open up, and that's when my career really started to flourish.",
    },
    {
      speaker: "Nadav",
      text: "So, for about a year you did nothing. How did you get by?",
    },
    {
      speaker: "Martin",
      text: "You have to bear down and live off your savings. Those are not comfortable moments, eating into your savings and squeezing your lifestyle down to something manageable.",
    },
    {
      speaker: "Nadav",
      text: "What was your first deal at Silverstone?",
    },
    {
      speaker: "Martin",
      text: "I started Silverstone at the end of 2008, and toward 2009 I acquired a small rental building on the Lower East Side, 166 Suffolk Street. You always remember your first deal. It was a 20-unit walk-up. I found the deal, raised the money, and did the property management, construction management and leasing. I was involved in every single decision, small or large.",
    },
    {
      speaker: "Nadav",
      text: "And then you bought the building across the street.",
    },
    {
      speaker: "Martin",
      text: "I got to know the supers on the street because I was there every day, and I'd have coffee with every one of them. One super told me the owner of her building might be selling. I met the owner and bought that building, 157 Suffolk Street. We almost bought two more buildings across the street, again because I got to know the owner from being there every day for about a year. The lesson is to be respectful of everyone along the way, because you never know where the next opportunity will come from. Mine came from a super I bought a cup of coffee for every day. You take chances, you're respectful to everybody, and you see where things go.",
    },
    {
      speaker: "Nadav",
      text: "You didn't raise institutional capital for your first deal. You raised from friends and family in 2009, when the market was still uncertain. How did you convince people to bet on you?",
    },
    {
      speaker: "Martin",
      text: "There was no institutional capital to pursue at that point. Frankly, I think we're in one of those cycles again now, where it's very challenging to raise institutional capital. A lot of it comes down to trust. I had spent 10 to 15 years before going out on my own building relationships, with friends and family and with people inside and outside the business. For my first deal, I went to that group and said: I really believe in this, I'm putting all my effort and all my money into it, I need your support, here are the metrics, and I'll keep you fully up to speed all the way through. Trust and relationships built over many years led someone to say, you seem like a smart young guy, I'll give you a little money and see how you do with it. Then it snowballed. The first deal did well, we rolled it into the next one, and the network grew organically. The investor in deal one introduced me to two or three friends, I did well for them, and they introduced me to their friends. That high-net-worth network grew from 10 people to 200 over five years. It's a lot to manage those relationships. You have to be as respectful of the person who gives you $10,000 as the person who gives you $1 million. No matter how big or small an investor you are, you're trusting us with your money, and we're very appreciative of that.",
    },
    {
      speaker: "Nadav",
      text: "There's an idea that if you work hard in a down market and your investors see it, they'll keep investing with you. Do you believe that?",
    },
    {
      speaker: "Martin",
      text: "Yes. It's very important for investors to see you working hard under all circumstances. When the world is going great, you should be working hard, and when it's going badly, you should be working hard to monetize the position as best you can. I'd argue we work harder on the challenging deals than on the easy ones. So much of our time in this office goes to the harder deals. The ones going well are the layups. The hard ones are like trying to hit a three-pointer at the buzzer.",
    },
    {
      speaker: "Nadav",
      text: "Why did you leave Silverstone to start Slate?",
    },
    {
      speaker: "Martin",
      text: "At the time, I felt there were greater aspirations for myself. We had a partnership with three other guys, and it was a great partnership, but it only took us so far. From 2009 to 2011 we did a good amount of work, and from 2011 on we tripled and quadrupled the business. It was about growth strategy and where the company was going, and I felt that could be done more strongly on my own. My partner, David Schwartz, has been with me since we started this company, and the two of us have a vision for where it's going. We're growing nicely and getting closer to it.",
    },
    {
      speaker: "Nadav",
      text: "Walking into your office, it's completely full and everyone is heads down working.",
    },
    {
      speaker: "Martin",
      text: "We have about 50 people in the office and about 100 outside it, roughly 150 across all the verticals we run. We're proud of what we've built, and we think there's still a lot to build.",
    },
    {
      speaker: "Nadav",
      text: "You chose to vertically integrate. Was that the plan from the beginning, or something that came along?",
    },
    {
      speaker: "Martin",
      text: "I come from a development management background, so I always knew I wanted to run a vertically integrated company. From day one we had our property management and leasing business, because when you're hands-on with your own properties you have much better control. Importantly, you also have much better data. I get reports every day on every one of our properties: leases up, leases down, opex up, opex down. That information makes me a more intelligent investor and more thoughtful about how we run the business. As the portfolio grew, we expanded into other sides of the business. We now self-perform our own construction, and we have in-house development and leasing teams.",
    },
    {
      speaker: "Nadav",
      text: "Can you keep up with higher deal flow while staying fully vertically integrated? If you go from 50 deals one year to 100 the next, can the rest of the business scale with it?",
    },
    {
      speaker: "Martin",
      text: "You have to be very methodical about how you scale, and I think we have been. We've never added a new business without a real plan, and we look at each business line as its own investment. If a silo isn't successful, you have to shut it down. You can't let it bleed out the rest of the business. So, we would never go from 50 to 100 transactions in a year, because we couldn't absorb it. If you grow methodically, from 50 to 55 to 60, you can absorb it, manage it properly and still provide the right level of care without letting things slip through.",
    },
    {
      speaker: "Nadav",
      text: "How did you do your first affordable housing deal?",
    },
    {
      speaker: "Martin",
      text: "My partner David runs our affordable business. It took us five to seven years to really break into it. We didn't decide to do affordable and close our first deal three months later. We decided we wanted to build an affordable business, David was going to run it, and we dedicated two years of time and capital to building it. For our first deal, we partnered with a very experienced affordable housing development firm in a co-GP structure, sharing the general partner role with them.",
    },
    {
      speaker: "Nadav",
      text: "Do you see co-GPing as the right strategy when you're starting a new line of business, or even a new development company?",
    },
    {
      speaker: "Martin",
      text: "I do. I've always said that if you're a young person starting your career, there are a couple of ways to learn quickly and avoid really tough mistakes. One is having a strong mentor. Another is having a strong partner with experience you may not have. A third is a co-GP relationship, where you bring in someone with that experience and leverage it. Any of those should keep you from major pitfalls early on.",
    },
    {
      speaker: "Nadav",
      text: "Now that you're the bigger company, have you co-GPed with smaller firms?",
    },
    {
      speaker: "Martin",
      text: "All the time. It's part of our business. If we want to extend into a new market, or a deal is too small to make sense for the resources we have here, we'll create co-GP relationships for certain asset sizes, submarkets or property types. It lets us grow the business while a co-GP partner handles the day-to-day operations.",
    },
    {
      speaker: "Nadav",
      text: "Is there anyone who helped you get where you are that we haven't mentioned?",
    },
    {
      speaker: "Martin",
      text: "When I look back, there are a couple of points in my career where I learned a lot. Right out of college, I went to work for a real estate investment banking firm called Wells Hill Partners. I knew nothing about real estate and nothing about investment banking. Peter Javalt was the owner, and at the time I couldn't stand him. In hindsight, what he and the senior people at the firm taught me in those first two or three years was an absolute crash course in real estate finance and development. I don't think you could ever learn that in college. Then I went to work for a large family office in New Jersey, Atlantic Realty Development Corporation, for a gentleman named Ivan Soil. Ivan taught me how to manage, negotiate and build. He was super smart and street smart. Where Peter was a finance guy, with Ivan we were in work boots, learning how to actually run real estate. Those two experiences gave me confidence on the underwriting and investment side and on the development and construction management side. Those are the two sides of the business we run today: an investment business and an operational business.",
    },
    {
      speaker: "Nadav",
      text: "What's the best piece of advice you've ever received?",
    },
    {
      speaker: "Martin",
      text: "It came from Ivan. As owners of real estate, we all know what a mezuzah is. If you don't go kiss the mezuzah at every one of your properties every so often, however you define that period, you don't know what's going on with it. For me, it's once a month.",
    },
    {
      speaker: "Nadav",
      text: "You still visit every property once a month? How many is that?",
    },
    {
      speaker: "Martin",
      text: "Yes, 35 properties. Friday mornings are usually my day. I just go and drive until I'm done.",
    },
    {
      speaker: "Nadav",
      text: "What happens when you visit?",
    },
    {
      speaker: "Martin",
      text: "You speak to people. You speak to the supers, you see your tenants, you see the mark on the wall that no one else sees. When you go home every day, you get used to the marks on your own walls. If I'm there once a month, I notice there's a mark on the wall, clean it up. The door isn't closing correctly. We need a new light bulb in here. This building needs freshening up in the next two years, so let's plan for it. You can strategize and care for your property differently. If you don't go kiss the mezuzah, you never know. You're trusting everyone, and they're probably doing the best they can, but you have a different eye and a different viewpoint on what to look for.",
    },
    {
      speaker: "Nadav",
      text: "Where can people find you if they want to work with you or lend?",
    },
    {
      speaker: "Martin",
      text: "LinkedIn is the best spot. I'm on LinkedIn at Martin Nussbaum, our whole team is on LinkedIn, and we're very responsive there. You can also find us at slatepg.com.",
    },
  ],
};

const CONVERSATIONS: GuestConversation[] = [MARTIN_NUSSBAUM];

export function getConversationForGuest(
  guestSlug: string
): GuestConversation | undefined {
  return CONVERSATIONS.find((c) => c.guestSlug === guestSlug);
}

/** Lightweight episode stub so mosaic/episode lists can rank text conversations. */
export function conversationToEpisode(
  conversation: GuestConversation
): Episode {
  return {
    title: conversation.title,
    slug: slugify(conversation.title),
    description: conversation.intro,
    pubDate: conversation.recordedAt,
    imageUrl: `/guests/${conversation.guestSlug}.png`,
  };
}

export function getConversationEpisodes(): Episode[] {
  return CONVERSATIONS.map(conversationToEpisode);
}
