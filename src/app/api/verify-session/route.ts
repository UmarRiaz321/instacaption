import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

export async function POST(req: Request) {
  const { sessionId } = await req.json()

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session ID' }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const email = session.customer_details?.email || session.customer_email

    if (!email) {
      return NextResponse.json({ error: 'No email found in session' }, { status: 404 })
    }

    // 👇 Save this email to DB later (Supabase, Firebase, etc.)
    return NextResponse.json({ email })
  } catch (err) {
    console.error('Verify session error:', err)
    return NextResponse.json({ error: 'Invalid or expired session' }, { status: 400 })
  }
}
