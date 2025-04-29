import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 })
  }

  try {
    // 1. Insert into premium_users table
    const { data, error } = await supabase
      .from('premium_users')
      .insert([{ 
        email,
        premium_type: 'paid'
      }])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Could not save user' }, { status: 500 })
    }

    // 2. Send LogSnag Notification (NEW ✨)
    await fetch('https://api.logsnag.com/v1/event', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.LOGSNAG_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        project: 'caption-wizard', // Make sure this matches your LogSnag project
        channel: 'premium',         // You can name the channel anything you want
        event: 'New Premium User',
        description: `${email} just upgraded to Premium! 🎉`,
        icon: '🌟',
        notify: true,
      }),
    })

    return NextResponse.json({ message: 'User saved and notification sent', data })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
