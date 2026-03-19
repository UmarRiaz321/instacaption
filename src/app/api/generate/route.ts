import { NextResponse } from 'next/server'
import { LogSnag } from 'logsnag'
import { VIBE_GROUPS } from '@/features/generator/constants'

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL ?? 'deepseek/deepseek-chat'
const logsnag = process.env.LOGSNAG_API_KEY
  ? new LogSnag({
      token: process.env.LOGSNAG_API_KEY,
      project: 'instacaption',
    })
  : null

const ALLOWED_TONES = new Map(
  VIBE_GROUPS.flatMap((group) => group.vibes.map((vibe) => [vibe.value, vibe]))
)

const MAX_DESCRIPTION_LENGTH = 220

function buildPrompt(description: string, tone: string) {
  const vibe = ALLOWED_TONES.get(tone)
  const hashtagList = vibe?.hashtags?.join(', ') ?? ''

  return `You write short social media captions.

Scene:
"""
${description}
"""

Tone: ${tone}

Return JSON only in this exact format:
{"captions":["caption 1","caption 2","caption 3"]}

Rules:
- Write exactly 3 captions.
- Keep each caption concise and ready to post.
- End every caption with 2-3 relevant, lowercase hashtags.
- Prefer these hashtags when they fit: ${hashtagList || 'scene-relevant hashtags'}.
- Make each caption clearly different in structure and wording.
- Do not add numbering, markdown, or commentary outside the JSON.`
}

function cleanCaption(value: string) {
  return value.replace(/^[-•\d.)\s]+/, '').replace(/\s+/g, ' ').trim()
}

function parseJsonCaptions(raw: string): string[] {
  const jsonBlock = raw.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1] ?? raw
  const parsed = JSON.parse(jsonBlock) as { captions?: unknown } | unknown[]

  if (Array.isArray(parsed)) {
    return parsed.filter((value): value is string => typeof value === 'string').map(cleanCaption)
  }

  if (parsed && typeof parsed === 'object' && Array.isArray(parsed.captions)) {
    return parsed.captions
      .filter((value): value is string => typeof value === 'string')
      .map(cleanCaption)
  }

  return []
}

function fallbackCaptions(raw: string) {
  const numberedMatches = Array.from(
    raw.matchAll(/(?:^|\n)\s*(?:\d+[\).\s-]+|[-*•]\s+)([\s\S]*?)(?=(?:\n\s*(?:\d+[\).\s-]+|[-*•]\s+))|$)/g)
  )
    .map((match) => cleanCaption(match[1] ?? ''))
    .filter(Boolean)

  if (numberedMatches.length > 0) {
    return numberedMatches
  }

  return raw
    .split(/\n{2,}/)
    .map((block) => cleanCaption(block))
    .filter(Boolean)
}

function normaliseCaptions(raw: string) {
  const parsedCaptions = (() => {
    try {
      return parseJsonCaptions(raw)
    } catch {
      return fallbackCaptions(raw)
    }
  })()

  const uniqueCaptions: string[] = []
  const seen = new Set<string>()

  for (const caption of parsedCaptions) {
    const key = caption.toLowerCase()

    if (!caption || seen.has(key)) {
      continue
    }

    seen.add(key)
    uniqueCaptions.push(caption)
  }

  return uniqueCaptions
}

async function trackCaptionGenerated(tone: string, description: string) {
  if (!logsnag) {
    return
  }

  try {
    await logsnag.track({
      channel: 'caption',
      event: 'Caption Generated',
      icon: '💬',
      description: `Tone: ${tone}`,
      tags: {
        tone,
        prompt: description.slice(0, 60),
      },
    })
  } catch (error) {
    console.error('LogSnag tracking failed:', error)
  }
}

export async function POST(req: Request) {
  let payload: { description?: unknown; tone?: unknown }

  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 })
  }

  const description = typeof payload.description === 'string' ? payload.description.trim() : ''
  const tone = typeof payload.tone === 'string' ? payload.tone.trim() : ''

  if (!description) {
    return NextResponse.json({ message: 'Description is required' }, { status: 400 })
  }

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return NextResponse.json(
      { message: `Description must be less than ${MAX_DESCRIPTION_LENGTH} characters.` },
      { status: 400 },
    )
  }

  if (!tone || !ALLOWED_TONES.has(tone)) {
    return NextResponse.json({ message: 'Tone is invalid or missing' }, { status: 400 })
  }

  if (!process.env.OPENROUTER_API_KEY) {
    return NextResponse.json(
      { message: 'Caption generation is not configured. Add OPENROUTER_API_KEY to continue.' },
      { status: 503 },
    )
  }

  const prompt = buildPrompt(description, tone)

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://captionwizard.pro',
      },
      signal: AbortSignal.timeout(15_000),
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You write concise, high-quality social media captions and strictly follow the requested output format.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.8,
        max_tokens: 320,
      }),
    })

    if (!response.ok) {
      const body = await response.text()
      console.error('OpenRouter error response', response.status, body)
      return NextResponse.json(
        { message: 'The caption provider is temporarily unavailable. Please try again in a moment.' },
        { status: 502 },
      )
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content?.trim() ?? ''
    const captions = normaliseCaptions(content)

    if (captions.length === 0) {
      return NextResponse.json(
        { message: 'We could not format the generated captions. Please try again.' },
        { status: 502 },
      )
    }

    const firstThree = captions.slice(0, 3)
    await trackCaptionGenerated(tone, description)

    return NextResponse.json({ captions: firstThree })
  } catch (err) {
    console.error('OpenRouter error:', err)
    return NextResponse.json(
      { message: 'The generator timed out. Please try again with a shorter description.' },
      { status: 500 },
    )
  }
}
