import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request) {
    const authHeader = req.headers.get('Authorization')

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    try {
        // 1. Get all referrers
        const { data: referrers, error } = await supabase
            .from('invites')
            .select('referrer')

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json({ error: 'Error fetching invites' }, { status: 500 })
        }

        const counts: { [referrer: string]: number } = {}

        referrers?.forEach(({ referrer }) => {
            if (referrer) {
                counts[referrer] = (counts[referrer] || 0) + 1
            }
        })

        // 2. Upgrade referrers who invited 3+
        const promises = Object.entries(counts)
            .filter(([, count]) => count >= 3)
            .map(([referrer]) =>
                supabase.from('premium_users').upsert({
                    email: referrer,
                    premium_type: 'invited',
                    created_at: new Date().toISOString(),
                    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
                })
            )

        await Promise.all(promises)

        return NextResponse.json({ success: true, upgraded: promises.length })
    } catch (err) {
        console.error('Unexpected error:', err)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
