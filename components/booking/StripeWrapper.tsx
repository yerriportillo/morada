'use client'

import { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import PaymentForm from './PaymentForm'

// Initialize Stripe (POC: Test mode only)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

interface StripeWrapperProps {
  /**
   * Amount to charge in USD
   */
  amount: number

  /**
   * Currency code (default: 'usd')
   */
  currency?: string

  /**
   * Metadata to attach to payment intent
   */
  metadata?: Record<string, string>

  /**
   * Callback when payment succeeds
   */
  onPaymentSuccess?: (paymentIntentId: string) => void

  /**
   * Callback when payment fails
   */
  onPaymentError?: (error: string) => void

  /**
   * Labels for bilingual support
   */
  labels: {
    title: string
    payNow: string
    processing: string
    errorMessage: string
    loading: string
  }

  /**
   * Operator brand color
   */
  brandColor?: string
}

/**
 * StripeWrapper - Wraps PaymentForm with Stripe Elements provider
 *
 * This component handles:
 * 1. Creating payment intent via API
 * 2. Initializing Stripe Elements
 * 3. Rendering PaymentForm
 *
 * Usage:
 * ```tsx
 * <StripeWrapper
 *   amount={150}
 *   metadata={{ bookingId: 'MOR-12345' }}
 *   onPaymentSuccess={(id) => handleSuccess(id)}
 *   labels={{ ... }}
 * />
 * ```
 */
export default function StripeWrapper({
  amount,
  currency = 'usd',
  metadata = {},
  onPaymentSuccess,
  onPaymentError,
  labels,
  brandColor,
}: StripeWrapperProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Create payment intent when component mounts
    const createPaymentIntent = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/stripe/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            currency,
            metadata,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to create payment intent')
        }

        const data = await response.json()
        setClientSecret(data.clientSecret)
      } catch (err: any) {
        console.error('Payment intent creation error:', err)
        setError(err.message)
        onPaymentError?.(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    // Only create payment intent if Stripe is configured
    if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      createPaymentIntent()
    } else {
      setIsLoading(false)
      setError('Stripe is not configured. Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to your environment.')
    }
  }, [amount, currency, metadata])

  // Show loading state
  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
        <p className="mt-4 text-volcanic-black/60">{labels.loading}</p>
      </div>
    )
  }

  // Show error state
  if (error || !clientSecret) {
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-700">{error || 'Failed to initialize payment'}</p>
      </div>
    )
  }

  // Stripe Elements options
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: brandColor || '#1A6B8A',
        borderRadius: '8px',
      },
    },
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm
        amount={amount}
        currency={currency}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
        labels={{
          title: labels.title,
          payNow: labels.payNow,
          processing: labels.processing,
          errorMessage: labels.errorMessage,
        }}
        brandColor={brandColor}
      />
    </Elements>
  )
}
