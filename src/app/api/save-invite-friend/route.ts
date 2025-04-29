import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const { inviterEmail, friendEmail } = await req.json()

  if (!inviterEmail || !friendEmail) {
    return NextResponse.json({ error: 'Missing emails' }, { status: 400 })
  }

  const { error } = await supabase
    .from('invites')
    .insert([{ inviter_email: inviterEmail, friend_email: friendEmail }])

  if (error) {
    console.error('Failed to save invite:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  // After inserting, check how many invited friends
  const { count } = await supabase
    .from('invites')
    .select('*', { count: 'exact' })
    .eq('inviter_email', inviterEmail)

  if (count && count >= 3) {
    // 3 friends joined, give premium
    const sevenDaysLater = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    await supabase.from('premium_users').upsert({
      email: inviterEmail,
      premium_type: 'invited',
      created_at: new Date().toISOString(),
      expires_at: sevenDaysLater.toISOString(),
    })
  }

  return NextResponse.json({ message: 'Invite saved' })
}
