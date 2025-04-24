import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// ✅ Initialize Stripe with your live secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

export async function POST() {
  try {
    // ✅ Create the Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'gbp', // 🇬🇧 Charge in British Pounds
            product_data: {
              name: 'Caption Wizard Premium Access',
            },
            unit_amount: 500, // £5.00 (in pence)
          },
          quantity: 1,
        },
      ],
      success_url: 'https://captionwizard.pro/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://captionwizard.pro/?canceled=true',
      billing_address_collection: 'auto',
      allow_promotion_codes: true,
      customer_creation: 'always',
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('❌ Stripe checkout session error:', err.message)
      return NextResponse.json({ message: err.message }, { status: 500 })
    }
  
    console.error('❌ Unknown error during checkout:', err)
    return NextResponse.json({ message: 'Checkout session failed' }, { status: 500 })
  }
  
}
