import { NextResponse } from 'next/server'

function acceptedResponse(success = false) {
  return NextResponse.json({ success }, { status: 202 })
}

export async function POST(req: Request) {
  let payload: { event?: unknown; properties?: Record<string, unknown> }

  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 })
  }

  const event = typeof payload.event === 'string' ? payload.event.trim() : ''
  const properties = payload.properties && typeof payload.properties === 'object' ? payload.properties : {}

  if (!event) {
    return NextResponse.json({ message: 'Event is required' }, { status: 400 })
  }

  if (!process.env.LOGSNAG_API_KEY) {
    return acceptedResponse()
  }

  try {
    const res = await fetch('https://api.logsnag.com/v1/log', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.LOGSNAG_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        project: 'captionwizard',
        channel: 'usage',
        event,
        description: typeof properties.description === 'string' ? properties.description : '',
        icon: typeof properties.icon === 'string' ? properties.icon : '✨',
        notify: typeof properties.notify === 'boolean' ? properties.notify : false,
        tags: properties.tags && typeof properties.tags === 'object' ? properties.tags : {},
      }),
    })

    if (!res.ok) {
      console.error('LogSnag Error:', await res.text())
      return acceptedResponse()
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('LogSnag Unexpected Error:', err)
    return acceptedResponse()
  }
}
