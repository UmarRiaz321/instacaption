export type VibeBadge = 'Trending' | 'New' | 'Classic'

export type Vibe = {
  value: string
  label: string
  description: string
  hashtags: string[]
  badge?: VibeBadge
}

export type VibeGroup = {
  title: string
  vibes: Vibe[]
}

export type InspirationCard = {
  title: string
  prompt: string
  tone: string
  tip: string
  icon: string
}

export type HighlightStat = {
  label: string
  value: string
}
