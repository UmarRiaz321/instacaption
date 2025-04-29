import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Create Stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

export async function GET() {
  try {
    // Fetch all PaymentIntents in the last 7 days
    const { data } = await stripe.paymentIntents.list({
      created: {
        gte: Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60, // 7 days ago
      },
      limit: 100,
    })

    const total = data.reduce((sum, payment) => sum + (payment.amount_received || 0), 0)

    return NextResponse.json({
      totalRevenue: total / 100, // Stripe returns amounts in cents, so divide by 100
    })
  } catch (error) {
    console.error('Stripe Revenue API error:', error)
    return NextResponse.json({ error: 'Failed to fetch revenue' }, { status: 500 })
  }
}
