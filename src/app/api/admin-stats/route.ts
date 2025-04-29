import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Fetch users and premium_users count
  const { count: totalUsers } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })

  const { count: premiumUsers } = await supabase
    .from('premium_users')
    .select('*', { count: 'exact', head: true })

  return NextResponse.json({
    totalUsers: totalUsers || 0,
    premiumUsers: premiumUsers || 0,
  })
}
