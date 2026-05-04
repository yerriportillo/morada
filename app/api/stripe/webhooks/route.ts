import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      console.error('Missing Stripe signature')
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    // Verify webhook signature
    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message)
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('✅ Payment succeeded:', paymentIntent.id)

        // TODO: Update booking in Payload CMS
        // const bookingId = paymentIntent.metadata.bookingId
        // Update booking payment status to 'paid'

        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent
        console.error('❌ Payment failed:', failedPayment.id)

        // TODO: Update booking in Payload CMS
        // Mark booking payment as 'failed'

        break

      case 'charge.refunded':
        const refund = event.data.object as Stripe.Charge
        console.log('💰 Refund processed:', refund.id)

        // TODO: Update booking in Payload CMS
        // Mark booking payment as 'refunded'

        break

      case 'account.updated':
        // Stripe Connect account updated
        const account = event.data.object as Stripe.Account
        console.log('🔗 Connect account updated:', account.id)

        // TODO: Update operator in Payload CMS
        // Update operator.stripeConnectAccountId status

        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    // Return success response
    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook processing error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// Disable body parsing for raw webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
}
