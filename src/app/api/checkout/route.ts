import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil', // Updated to match the expected type
})

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'gbp', // 🇬🇧 British Pounds
            product_data: {
              name: 'Premium Caption Access',
            },
            unit_amount: 500, // £5.00 in pence
          },
          quantity: 1,
        },
      ],
      success_url: 'https://captionwizard.pro/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://captionwizard.pro/?canceled=true',
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      customer_creation: 'always',
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout session error:', err)
    return NextResponse.json({ message: 'Checkout session failed' }, { status: 500 })
  }
}
