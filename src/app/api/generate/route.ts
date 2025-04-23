import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { description, tone } = await req.json()

  if (!description || !tone) {
    return NextResponse.json({ message: 'Missing description or tone' }, { status: 400 })
  }

  const prompt = `
Write 3 different Instagram captions in a ${tone} tone based on this scene:

"${description}"

- Keep each one short (1–2 lines max)
- Be creative. Use imagery, humor, emotion, or style based on the tone.
- Format the captions as a numbered or dashed list.
`

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://yourdomain.com', // Optional, for OpenRouter usage tracking
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat',
        messages: [
          { role: 'system', content: 'You are a creative assistant that writes Instagram captions.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.9,
        max_tokens: 200,
      }),
    })

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content?.trim() || ''

    const captions: string[] = content
      .split(/\n+/)
      .map((line: string) => line.replace(/^[-•\d.]+\s*/, '').trim())
      .filter((line: string) => line.length > 0)

    return NextResponse.json({ captions })
  } catch (err) {
    console.error('OpenRouter error:', err)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
