import { NextResponse } from 'next/server'
import { LogSnag } from 'logsnag'
import { VIBE_GROUPS } from '@/features/generator/constants'

const logsnag = new LogSnag({
  token: process.env.LOGSNAG_API_KEY!,
  project: 'instacaption',
})

const ALLOWED_TONES = new Map(
  VIBE_GROUPS.flatMap((group) => group.vibes.map((vibe) => [vibe.value, vibe]))
)

const MAX_DESCRIPTION_LENGTH = 220

function buildPrompt(description: string, tone: string) {
  const vibe = ALLOWED_TONES.get(tone)
  const hashtagList = vibe?.hashtags?.join(', ') ?? ''

  return `You are a creative social media strategist.
Write 3 different Instagram captions in a ${tone} tone for the scene:
"""
${description}
"""

Instructions:
- Keep each caption 1–2 lines max.
- Make each caption distinct in structure, pacing, and imagery.
- Close every caption with 2-3 relevant, lowercase hashtags. Prioritise: ${hashtagList || 'scene-relevant tags'}.
- Do not repeat hashtags across captions.
- Do not include hashtags in the body copy—only at the end.
- Return the captions as a simple numbered list (1., 2., 3.).
`
}

function normaliseCaptions(raw: string) {
  return raw
    .split(/\n+/)
    .map((line) => line.replace(/^[-•\d.]+\s*/, '').trim())
    .filter(Boolean)
    .map((caption) => caption.replace(/\s+/g, ' '))
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

  const prompt = buildPrompt(description, tone)

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://captionwizard.pro',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are a creative social media expert in writing captions based on user-provided scenes and tones.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.85,
        max_tokens: 240,
      }),
    })

    if (!response.ok) {
      const body = await response.text()
      console.error('OpenRouter error response', response.status, body)
      return NextResponse.json({ message: 'Caption provider error' }, { status: 502 })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content?.trim() ?? ''
    const captions = normaliseCaptions(content)

    if (captions.length === 0) {
      return NextResponse.json({ message: 'No captions generated' }, { status: 502 })
    }

    const firstThree = Array.from(new Set(captions)).slice(0, 3)

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

    return NextResponse.json({ captions: firstThree })
  } catch (err) {
    console.error('OpenRouter error:', err)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
