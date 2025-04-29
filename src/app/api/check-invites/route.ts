// src/app/api/check-invites/route.ts

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

  const { data: invites, error } = await supabase
    .from('invites')
    .select('invited')
    .eq('referrer', email)

  if (error) {
    console.error('Error fetching invites:', error)
    return NextResponse.json({ error: 'Failed to check invites' }, { status: 500 })
  }

  const successfulInvites = invites.length

  if (successfulInvites >= 3) {
    // Grant permanent premium
    const { error: premiumError } = await supabase
      .from('premium_users')
      .upsert({
        email,
        premium_type: 'invited',
        created_at: new Date().toISOString(),
        expires_at: null, // means no expiry, lifetime premium
      })

    if (premiumError) {
      console.error('Error upgrading user to premium:', premiumError)
      return NextResponse.json({ error: 'Failed to upgrade to premium' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Upgraded to premium' })
  }

  return NextResponse.json({ invites: successfulInvites })
}
