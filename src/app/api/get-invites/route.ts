// src/app/api/get-invites/route.ts

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
    const { data, error } = await supabase
      .from('invites')
      .select('referrer')
      .eq('referrer', email)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Error fetching invites' }, { status: 500 })
    }

    const invitesCount = data.length

    return NextResponse.json({ invites: invitesCount })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
