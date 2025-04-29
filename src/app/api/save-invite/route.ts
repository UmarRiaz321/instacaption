// src/app/api/save-invite/route.ts

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const { ref, newEmail } = await req.json()

  if (!ref || !newEmail) {
    return NextResponse.json({ error: 'Missing referrer or newEmail' }, { status: 400 })
  }

  try {
    // Decode referrer email
    const referrerEmail = decodeURIComponent(ref)

    // Save invite
    const { data, error } = await supabase
      .from('invites')
      .insert([{ referrer: referrerEmail, invited: newEmail }])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Could not save invite' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Invite saved', data })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
