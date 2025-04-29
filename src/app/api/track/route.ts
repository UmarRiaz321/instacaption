import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { event, properties } = await req.json()

  try {
    const res = await fetch('https://api.logsnag.com/v1/log', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.LOGSNAG_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        project: 'captionwizard',  // Your LogSnag project name
        channel: 'usage',          // or whatever you setup
        event,
        description: properties.description || '',
        icon: properties.icon || '✨',
        notify: properties.notify ?? false,
        tags: properties.tags || {},
      }),
    })

    if (!res.ok) {
      console.error('LogSnag Error:', await res.text())
      return NextResponse.json({ success: false }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('LogSnag Unexpected Error:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
