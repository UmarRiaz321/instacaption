'use client'

import { useCallback, useEffect, useState } from 'react'
import { track } from '@/lib/logsnag'
import type { InspirationCard, VibeGroup } from '../types'
import { INSPIRATION_DECK, MAX_DESCRIPTION_LENGTH, QUICK_PROMPTS, VIBE_GROUPS } from '../constants'

const USAGE_STORAGE_KEY = 'captionwizard_usage'
const LAST_PROMPT_STORAGE_KEY = 'captionwizard_last_prompt'
const LAST_TONE_STORAGE_KEY = 'captionwizard_last_tone'
const USAGE_LIMIT = 10
const USAGE_WINDOW_MS = 60 * 60 * 1000
const DEFAULT_TONE = VIBE_GROUPS[0]?.vibes[0]?.value ?? 'funny'

type CopyTarget = number | 'all' | null

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
  const [tone, setTone] = useState(DEFAULT_TONE)
  const [captions, setCaptions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [copiedTarget, setCopiedTarget] = useState<CopyTarget>(null)
  const [error, setError] = useState<string | null>(null)
  const [usageHistory, setUsageHistory] = useState<number[]>([])
  const [remainingRuns, setRemainingRuns] = useState(USAGE_LIMIT)
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null)
  const [now, setNow] = useState(() => Date.now())

  const characterCount = description.length
  const wordCount = description.trim() ? description.trim().split(/\s+/).length : 0
  const isOverCharacterLimit = characterCount > MAX_DESCRIPTION_LENGTH
  const timeUntilReset = cooldownUntil ? Math.max(cooldownUntil - now, 0) : 0
  const isRateLimited = timeUntilReset > 0
  const canGenerate = description.trim().length > 0 && !isOverCharacterLimit && !isRateLimited
  const canReset = Boolean(description || captions.length > 0 || tone !== DEFAULT_TONE)

  useEffect(() => {
    const storedDescription = localStorage.getItem(LAST_PROMPT_STORAGE_KEY)
    const storedTone = localStorage.getItem(LAST_TONE_STORAGE_KEY)

    if (storedDescription) setDescription(storedDescription)
    if (storedTone && VIBE_GROUPS.some((group) => group.vibes.some((vibe) => vibe.value === storedTone))) {
      setTone(storedTone)
    }
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
      setError(`Free limit reached. Try again in ${formatRemainingTime(nextWindow - nowTimestamp)}.`)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (description) {
      localStorage.setItem(LAST_PROMPT_STORAGE_KEY, description)
    } else {
      localStorage.removeItem(LAST_PROMPT_STORAGE_KEY)
    }
  }, [description])

  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem(LAST_TONE_STORAGE_KEY, tone)
  }, [tone])

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
      setError('Describe the photo or video first. One or two short sentences is enough.')
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
      setError(`Free limit reached. Try again in ${formatRemainingTime(nextWindow - nowTimestamp)}.`)
      track('limit_reached', {
        email: email || 'anonymous',
        remainingMs: Math.max(nextWindow - nowTimestamp, 0),
      }).catch(() => {})
      return
    }

    setError(null)
    setLoading(true)
    setCopiedTarget(null)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: trimmedDescription, tone }),
      })

      const data = (await res.json().catch(() => null)) as { captions?: unknown; message?: unknown } | null

      if (!res.ok) {
        throw new Error(
          typeof data?.message === 'string'
            ? data.message
            : 'Failed to generate captions. Please try again in a moment.'
        )
      }

      const nextCaptions = Array.isArray(data?.captions)
        ? data.captions.filter((caption): caption is string => typeof caption === 'string' && caption.trim().length > 0)
        : []

      if (nextCaptions.length === 0) {
        throw new Error('No captions were returned. Please try again.')
      }

      setCaptions(nextCaptions)

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
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [description, tone, email])

  const copyToClipboard = useCallback(async (value: string, target: Exclude<CopyTarget, null>) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedTarget(target)
      setError(null)
      window.setTimeout(() => setCopiedTarget(null), 1500)
    } catch (err) {
      console.error(err)
      setError('Copy failed. You can still select the text and copy it manually.')
    }
  }, [])

  const handleCopy = useCallback((caption: string, index: number) => {
    void copyToClipboard(caption, index)
  }, [copyToClipboard])

  const handleCopyAll = useCallback(() => {
    if (captions.length === 0) return
    void copyToClipboard(captions.join('\n\n'), 'all')
  }, [captions, copyToClipboard])

  const handleApplyInspiration = useCallback((entry: InspirationCard) => {
    setDescription(entry.prompt)
    if (entry.tone) {
      setTone(entry.tone)
    }
    setError(null)
  }, [])

  const handleReset = useCallback(() => {
    setDescription('')
    setTone(DEFAULT_TONE)
    setCaptions([])
    setCopiedTarget(null)
    setError(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LAST_PROMPT_STORAGE_KEY)
      localStorage.removeItem(LAST_TONE_STORAGE_KEY)
    }
  }, [])

  const usageMessage = isRateLimited
    ? `Free limit reached. Try again in ${formatRemainingTime(timeUntilReset)}.`
    : `No sign-up required. ${Math.max(remainingRuns, 0)} free ${
        remainingRuns === 1 ? 'run' : 'runs'
      } left this hour.`

  const quickPrompts = QUICK_PROMPTS
  const inspirationDeck = INSPIRATION_DECK
  const vibeGroups: VibeGroup[] = VIBE_GROUPS

  return {
    state: {
      description,
      tone,
      captions,
      loading,
      copiedTarget,
      error,
      characterCount,
      wordCount,
      isOverCharacterLimit,
      canGenerate,
      canReset,
      usageMessage,
      quickPrompts,
      inspirationDeck,
      vibeGroups,
    },
    actions: {
      setDescription,
      setTone,
      handleGenerate,
      handleCopy,
      handleCopyAll,
      handleApplyInspiration,
      handleReset,
    },
  }
}
