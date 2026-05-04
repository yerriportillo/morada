'use client'

import { useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface PaymentFormProps {
  /**
   * Amount to charge in USD
   */
  amount: number

  /**
   * Currency code (default: 'usd')
   */
  currency?: string

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
  }

  /**
   * Operator brand color for button
   */
  brandColor?: string
}

/**
 * PaymentForm - Stripe Elements payment form
 *
 * Usage:
 * ```tsx
 * <Elements stripe={stripePromise} options={options}>
 *   <PaymentForm
 *     amount={150}
 *     onPaymentSuccess={(id) => console.log('Success:', id)}
 *     labels={{ ... }}
 *   />
 * </Elements>
 * ```
 */
export default function PaymentForm({
  amount,
  currency = 'usd',
  onPaymentSuccess,
  onPaymentError,
  labels,
  brandColor,
}: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setErrorMessage(null)

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/booking-confirmation`,
        },
        redirect: 'if_required',
      })

      if (error) {
        setErrorMessage(error.message || labels.errorMessage)
        onPaymentError?.(error.message || labels.errorMessage)
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onPaymentSuccess?.(paymentIntent.id)
      }
    } catch (err: any) {
      setErrorMessage(err.message || labels.errorMessage)
      onPaymentError?.(err.message || labels.errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{labels.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <PaymentElement
              options={{
                layout: 'tabs',
                paymentMethodOrder: ['card', 'apple_pay', 'google_pay'],
              }}
            />
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {errorMessage}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">
              ${amount.toFixed(2)} {currency.toUpperCase()}
            </div>
            <Button
              type="submit"
              disabled={!stripe || isProcessing}
              variant="primary"
              style={brandColor ? { backgroundColor: brandColor } : undefined}
            >
              {isProcessing ? labels.processing : labels.payNow}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
