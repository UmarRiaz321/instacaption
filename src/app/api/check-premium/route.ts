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

  const { data: user, error } = await supabase
    .from('premium_users')
    .select('*')
    .eq('email', email)
    .maybeSingle()

  if (error) {
    console.error(error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  if (!user) {
    return NextResponse.json({ premium: false })
  }

  // Handle "invited" expiry
  if (user.premium_type === 'invited' && user.expires_at) {
    if (new Date(user.expires_at) < new Date()) {
      return NextResponse.json({ premium: false, expired: true })
    }
  }

  // Paid users or valid invited users
  return NextResponse.json({ premium: true })
}
