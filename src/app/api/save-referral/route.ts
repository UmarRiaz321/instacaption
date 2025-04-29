// src/app/api/save-referral/route.ts

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const { referrer, newUserEmail } = await req.json()

  if (!referrer || !newUserEmail) {
    return NextResponse.json({ error: 'Missing referrer or newUserEmail' }, { status: 400 })
  }

  const { error } = await supabase.from('invites').insert({
    referrer,
    invited: newUserEmail,
    created_at: new Date().toISOString(),
  })

  if (error) {
    console.error('Error saving referral:', error)
    return NextResponse.json({ error: 'Failed to save referral' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Referral saved' })
}
