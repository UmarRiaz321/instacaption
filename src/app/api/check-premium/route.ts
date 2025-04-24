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

  // Check whitelist table
  const { data: whitelisted } = await supabase
    .from('whitelist_users')
    .select('email')
    .eq('email', email)
    .single()

  // Check Stripe subscribers table
  const { data: subscribed } = await supabase
    .from('premium_users')
    .select('email')
    .eq('email', email)
    .single()

  if (whitelisted || subscribed) {
    return NextResponse.json({ premium: true })
  }

  return NextResponse.json({ premium: false })
}
