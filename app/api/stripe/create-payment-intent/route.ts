import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe (POC: Test mode only)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency = 'usd', metadata = {} } = body

    // Validate required fields
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    // For POC: Ensure we're in test mode
    if (!process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_')) {
      return NextResponse.json(
        { error: 'POC mode: Only test mode Stripe keys are supported' },
        { status: 400 }
      )
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        ...metadata,
        environment: 'poc',
        platform: 'morada',
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error: any) {
    console.error('Stripe payment intent creation error:', error)

    return NextResponse.json(
      {
        error: 'Failed to create payment intent',
        message: error.message,
      },
      { status: 500 }
    )
  }
}
