import type { InspirationCard, VibeGroup } from './types'

export const MAX_DESCRIPTION_LENGTH = 220

export const VIBE_GROUPS: VibeGroup[] = [
  {
    title: 'Core vibes',
    vibes: [
      {
        value: 'funny',
        label: '😂 Funny',
        description: 'Snappy one-liners & punchlines that spark shares.',
        hashtags: ['#lol', '#memes', '#captiongame'],
        badge: 'Classic',
      },
      {
        value: 'motivational',
        label: '🔥 Motivational',
        description: 'High-energy boosts for grinders, athletes, and hustlers.',
        hashtags: ['#mondaymindset', '#riseandgrind'],
        badge: 'Trending',
      },
      {
        value: 'inspirational',
        label: '🌟 Inspirational',
        description: 'Soulful storytelling & optimism with a cinematic tone.',
        hashtags: ['#staygold', '#choosejoy'],
      },
      {
        value: 'relatable',
        label: '😅 Relatable',
        description: 'Everyday chaos with a wink and a nod to the squad.',
        hashtags: ['#irl', '#relatable'],
      },
    ],
  },
  {
    title: 'Trending topics',
    vibes: [
      {
        value: 'travel',
        label: '✈️ Travel',
        description: 'Jet-setter captions for bucket-list feeds & vlogs.',
        hashtags: ['#passportready', '#roam'],
        badge: 'Trending',
      },
      {
        value: 'wellness',
        label: '🧘 Wellness',
        description: 'Calm, mindful, and self-care driven rituals.',
        hashtags: ['#selfcare', '#mindfulliving'],
      },
      {
        value: 'foodie',
        label: '🍜 Foodie',
        description: 'Plate poetry for chefs, cafes, and midnight snackers.',
        hashtags: ['#eatpretty', '#foodstagram'],
      },
      {
        value: 'selfie',
        label: '📸 Selfie',
        description: 'Confident glow-up energy tailor-made for portraits.',
        hashtags: ['#glowup', '#selfielove'],
        badge: 'New',
      },
    ],
  },
  {
    title: 'Niche creators',
    vibes: [
      {
        value: 'luxury',
        label: '💎 Luxury',
        description: 'Opulent flexes with polished finesse & exclusivity.',
        hashtags: ['#livinglavish', '#fiveStar'],
        badge: 'Trending',
      },
      {
        value: 'entrepreneur',
        label: '🚀 Entrepreneur',
        description: 'Founder storytelling, launches, and traction updates.',
        hashtags: ['#buildinpublic', '#startuplife'],
      },
      {
        value: 'gaming',
        label: '🕹️ Gaming',
        description: 'GG moments, esports hype, and lore drops.',
        hashtags: ['#gg', '#twitchclip'],
      },
      {
        value: 'romantic',
        label: '💖 Romantic',
        description: 'Soft-focus love notes & dreamy vibes for couples.',
        hashtags: ['#couplegoals', '#loveletters'],
      },
      {
        value: 'mysterious',
        label: '🕶️ Mysterious',
        description: 'Magnetic intrigue with cinematic tension & noir.',
        hashtags: ['#plotTwist', '#afterdark'],
        badge: 'Classic',
      },
      {
        value: 'adventurous',
        label: '🏔️ Adventurous',
        description: 'Wild escapes, road trips, and thrill-seeking sparks.',
        hashtags: ['#trailtime', '#staycurious'],
      },
    ],
  },
]

export const QUICK_PROMPTS = [
  'Sunset rooftop with friends after a long week',
  'Hands holding matcha lattes in a minimalist cafe',
  'First launch day at our startup HQ',
  'Weekend hike through misty forest trails',
]

export const INSPIRATION_DECK: InspirationCard[] = [
  {
    title: 'Launch tease',
    prompt: 'Sneak peek of our beta dashboard lighting up at midnight launch.',
    tone: 'entrepreneur',
    tip: 'Pair with behind-the-scenes carousel to build anticipation.',
    icon: '🚀',
  },
  {
    title: 'Creator collab',
    prompt: 'Filming a chaotic studio session with my favourite creator friends.',
    tone: 'relatable',
    tip: 'Tag collaborators and drop a CTA to comment their favourite moment.',
    icon: '🎬',
  },
  {
    title: 'Glow-up reveal',
    prompt: 'Soft golden hour selfie after finishing a 30-day wellness reset.',
    tone: 'wellness',
    tip: 'Mention the routine or playlist that kept you consistent.',
    icon: '✨',
  },
]
