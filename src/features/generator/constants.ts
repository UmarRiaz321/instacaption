import type { InspirationCard, VibeGroup } from './types'

export const MAX_DESCRIPTION_LENGTH = 220

export const VIBE_GROUPS: VibeGroup[] = [
  {
    title: 'Everyday styles',
    vibes: [
      {
        value: 'funny',
        label: 'Funny',
        description: 'Light, playful captions with a quick punchline.',
        hashtags: ['#lol', '#memes', '#captiongame'],
        badge: 'Classic',
      },
      {
        value: 'motivational',
        label: 'Motivational',
        description: 'Positive, energetic copy for goals, wins, and milestones.',
        hashtags: ['#mondaymindset', '#riseandgrind'],
        badge: 'Trending',
      },
      {
        value: 'inspirational',
        label: 'Inspirational',
        description: 'Warm, reflective writing with a hopeful tone.',
        hashtags: ['#staygold', '#choosejoy'],
      },
      {
        value: 'relatable',
        label: 'Relatable',
        description: 'Casual captions that feel familiar and easy to share.',
        hashtags: ['#irl', '#relatable'],
      },
    ],
  },
  {
    title: 'Popular categories',
    vibes: [
      {
        value: 'travel',
        label: 'Travel',
        description: 'Clean travel captions for trips, views, and itineraries.',
        hashtags: ['#passportready', '#roam'],
        badge: 'Trending',
      },
      {
        value: 'wellness',
        label: 'Wellness',
        description: 'Calm, mindful captions for routines and self-care posts.',
        hashtags: ['#selfcare', '#mindfulliving'],
      },
      {
        value: 'foodie',
        label: 'Food',
        description: 'Short food captions for cafes, recipes, and restaurant posts.',
        hashtags: ['#eatpretty', '#foodstagram'],
      },
      {
        value: 'selfie',
        label: 'Selfie',
        description: 'Confident captions for portraits, glow-ups, and outfit shots.',
        hashtags: ['#glowup', '#selfielove'],
        badge: 'New',
      },
    ],
  },
  {
    title: 'Specialized styles',
    vibes: [
      {
        value: 'luxury',
        label: 'Luxury',
        description: 'Polished captions for premium products, travel, and lifestyle posts.',
        hashtags: ['#livinglavish', '#fivestar'],
        badge: 'Trending',
      },
      {
        value: 'entrepreneur',
        label: 'Business',
        description: 'Clear launch, founder, and business update captions.',
        hashtags: ['#buildinpublic', '#startuplife'],
      },
      {
        value: 'gaming',
        label: 'Gaming',
        description: 'Fast, energetic captions for clips, wins, and streams.',
        hashtags: ['#gg', '#twitchclip'],
      },
      {
        value: 'romantic',
        label: 'Romantic',
        description: 'Soft, affectionate captions for couples and date-night posts.',
        hashtags: ['#couplegoals', '#loveletters'],
      },
      {
        value: 'mysterious',
        label: 'Mysterious',
        description: 'Minimal captions with a moody, intriguing edge.',
        hashtags: ['#plottwist', '#afterdark'],
        badge: 'Classic',
      },
      {
        value: 'adventurous',
        label: 'Adventurous',
        description: 'Active captions for hikes, road trips, and outdoor content.',
        hashtags: ['#trailtime', '#staycurious'],
      },
    ],
  },
]

export const QUICK_PROMPTS = [
  'Sunset rooftop dinner with friends after work',
  'Hands holding iced matcha in a bright cafe',
  'Our team celebrating a small product launch',
  'Weekend hike through a misty forest trail',
]

export const INSPIRATION_DECK: InspirationCard[] = [
  {
    title: 'Product launch',
    prompt: 'Sneak peek of our new app dashboard before launch day.',
    tone: 'entrepreneur',
    tip: 'Good for launch posts, product updates, and waitlist announcements.',
    icon: '🚀',
  },
  {
    title: 'Creator collaboration',
    prompt: 'Filming a behind-the-scenes studio session with creator friends.',
    tone: 'relatable',
    tip: 'Useful for collaboration posts, vlogs, and team content.',
    icon: '🎬',
  },
  {
    title: 'Wellness update',
    prompt: 'Golden-hour selfie after finishing a 30-day wellness reset.',
    tone: 'wellness',
    tip: 'Works well for routine updates, personal wins, and self-care content.',
    icon: '✨',
  },
]
