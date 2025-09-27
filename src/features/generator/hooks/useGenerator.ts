'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { track } from '@/lib/logsnag'
import type { HighlightStat, InspirationCard, VibeGroup } from '../types'
import { INSPIRATION_DECK, MAX_DESCRIPTION_LENGTH, QUICK_PROMPTS, VIBE_GROUPS } from '../constants'

const USAGE_STORAGE_KEY = 'captionwizard_usage'
const USAGE_LIMIT = 10
const USAGE_WINDOW_MS = 60 * 60 * 1000

const loadUsage = (): number[] => {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(USAGE_STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed
      .filter((value): value is number => typeof value === 'number' && Number.isFinite(value))
      .sort((a, b) => a - b)
  } catch {
    return []
  }
}

const pruneUsage = (entries: number[], now: number): number[] =>
  entries.filter((timestamp) => now - timestamp < USAGE_WINDOW_MS).sort((a, b) => a - b)

const saveUsage = (entries: number[]) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(USAGE_STORAGE_KEY, JSON.stringify(entries))
}

const formatRemainingTime = (ms: number) => {
  if (ms <= 0) return 'a few seconds'

  const totalSeconds = Math.ceil(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
  }

  if (minutes > 0) {
    return `${minutes}m ${seconds.toString().padStart(2, '0')}s`
  }

  return `${seconds}s`
}

export function useGenerator(email: string | null) {
  const [description, setDescription] = useState('')
  const [tone, setTone] = useState(VIBE_GROUPS[0]?.vibes[0]?.value ?? 'funny')
  const [captions, setCaptions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [usageHistory, setUsageHistory] = useState<number[]>([])
  const [remainingRuns, setRemainingRuns] = useState(USAGE_LIMIT)
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null)
  const [now, setNow] = useState(() => Date.now())

  const characterCount = description.length
  const wordCount = description.trim() ? description.trim().split(/\s+/).length : 0
  const estimatedTokens = Math.max(1, Math.ceil(characterCount / 4))
  const isOverCharacterLimit = characterCount > MAX_DESCRIPTION_LENGTH
  const canGenerate = description.trim().length > 0 && !isOverCharacterLimit

  useEffect(() => {
    const storedDescription = localStorage.getItem('captionwizard_last_prompt')
    const storedTone = localStorage.getItem('captionwizard_last_tone')

    if (storedDescription) setDescription(storedDescription)
    if (storedTone) setTone(storedTone)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const nowTimestamp = Date.now()
    const usage = pruneUsage(loadUsage(), nowTimestamp)

    setUsageHistory(usage)
    setRemainingRuns(Math.max(USAGE_LIMIT - usage.length, 0))
    saveUsage(usage)

    if (usage.length >= USAGE_LIMIT) {
      const nextWindow = usage[0] + USAGE_WINDOW_MS
      setCooldownUntil(nextWindow)
      setError(
        `You've reached today's free runway. Next caption ready in ${formatRemainingTime(
          nextWindow - nowTimestamp,
        )}.`
      )
    }
  }, [])

  useEffect(() => {
    if (!cooldownUntil || typeof window === 'undefined') return

    setNow(Date.now())
    const id = window.setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => window.clearInterval(id)
  }, [cooldownUntil])

  useEffect(() => {
    if (!cooldownUntil) return

    if (now >= cooldownUntil) {
      const refreshed = pruneUsage(usageHistory, now)
      setUsageHistory(refreshed)
      setRemainingRuns(Math.max(USAGE_LIMIT - refreshed.length, 0))
      saveUsage(refreshed)

      if (refreshed.length < USAGE_LIMIT) {
        setCooldownUntil(null)
        setError(null)
      } else {
        setCooldownUntil(refreshed[0] + USAGE_WINDOW_MS)
      }
    }
  }, [cooldownUntil, now, usageHistory])

  const handleGenerate = useCallback(async () => {
    const trimmedDescription = description.trim()

    if (!trimmedDescription) {
      setError('Tell the AI what your photo or video feels like. A sentence or two is perfect!')
      return
    }

    if (trimmedDescription.length > MAX_DESCRIPTION_LENGTH) {
      setError(`Keep your description under ${MAX_DESCRIPTION_LENGTH} characters for best results.`)
      return
    }

    const nowTimestamp = Date.now()
    const usage = pruneUsage(loadUsage(), nowTimestamp)
    setUsageHistory(usage)
    setRemainingRuns(Math.max(USAGE_LIMIT - usage.length, 0))
    saveUsage(usage)

    if (usage.length >= USAGE_LIMIT) {
      const nextWindow = usage[0] + USAGE_WINDOW_MS
      setCooldownUntil(nextWindow)
      setError(`You've hit the hourly limit. Next caption ready in ${formatRemainingTime(nextWindow - nowTimestamp)}.`)
      track('limit_reached', {
        email: email || 'anonymous',
        remainingMs: Math.max(nextWindow - nowTimestamp, 0),
      }).catch(() => {})
      return
    }

    setError(null)
    setLoading(true)
    setCaptions([])
    setCopiedIndex(null)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: trimmedDescription, tone }),
      })

      if (!res.ok) {
        throw new Error('Failed to generate captions. Please try again in a moment.')
      }

      const data = await res.json()
      setCaptions(data.captions || [])
      localStorage.setItem('captionwizard_last_prompt', trimmedDescription)
      localStorage.setItem('captionwizard_last_tone', tone)

      const updatedUsage = [...usage, Date.now()].sort((a, b) => a - b)
      setUsageHistory(updatedUsage)
      setRemainingRuns(Math.max(USAGE_LIMIT - updatedUsage.length, 0))
      saveUsage(updatedUsage)

      if (updatedUsage.length >= USAGE_LIMIT) {
        const nextWindow = updatedUsage[0] + USAGE_WINDOW_MS
        setCooldownUntil(nextWindow)
      } else {
        setCooldownUntil(null)
      }

      const trimmedWordCount = trimmedDescription.split(/\s+/).length
      track('generate', {
        email: email || 'anonymous',
        tone,
        chars: trimmedDescription.length,
        words: trimmedWordCount,
      }).catch(() => {})
    } catch (err) {
      console.error(err)
      setError('Something glitched. Refresh or try another vibe in a few seconds.')
    } finally {
      setLoading(false)
    }
  }, [description, tone, email])

  const handleCopy = useCallback((caption: string, index: number) => {
    navigator.clipboard.writeText(caption)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 1500)
  }, [])

  const handleApplyInspiration = useCallback((entry: InspirationCard) => {
    setDescription(entry.prompt)
    if (entry.tone) {
      setTone(entry.tone)
    }
  }, [])

  const handleClearResults = useCallback(() => {
    setCaptions([])
  }, [])

  const highlightStats: HighlightStat[] = useMemo(
    () => [
      { label: 'Runs left this hour', value: `${Math.max(remainingRuns, 0)}` },
      { label: 'Prompt words', value: `${wordCount}` },
      { label: 'Average save boost', value: '23%' },
    ],
    [remainingRuns, wordCount],
  )

  const timeUntilReset = cooldownUntil ? Math.max(cooldownUntil - now, 0) : 0
  const usageMessage = cooldownUntil && timeUntilReset > 0
    ? `You've reached the free limit. Next caption in ${formatRemainingTime(timeUntilReset)}.`
    : `${Math.max(remainingRuns, 0)} free ${remainingRuns === 1 ? 'run' : 'runs'} left this hour.`

  const quickPrompts = QUICK_PROMPTS
  const inspirationDeck = INSPIRATION_DECK
  const vibeGroups: VibeGroup[] = VIBE_GROUPS

  return {
    state: {
      description,
      tone,
      captions,
      loading,
      copiedIndex,
      error,
      characterCount,
      wordCount,
      estimatedTokens,
      isOverCharacterLimit,
      canGenerate,
      usageMessage,
      highlightStats,
      quickPrompts,
      inspirationDeck,
      vibeGroups,
    },
    actions: {
      setDescription,
      setTone,
      handleGenerate,
      handleCopy,
      handleApplyInspiration,
      handleClearResults,
      setCaptions,
    },
  }
}
