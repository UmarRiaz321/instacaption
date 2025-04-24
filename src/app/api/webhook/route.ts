import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err)
    return new NextResponse(`Webhook Error: ${err}`, { status: 400 })
  }

  // ✅ Successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const customerEmail = session.customer_details?.email

    if (customerEmail) {
      const { error } = await supabase
        .from('premium_users')
        .insert([{ email: customerEmail }])

      if (error) {
        console.error('❌ Error saving to Supabase:', error)
      } else {
        console.log('✅ Premium email saved to Supabase:', customerEmail)
      }
    }
  }

  return NextResponse.json({ received: true })
}
