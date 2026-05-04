'use client'

import { useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useTranslations } from 'next-intl'

interface CalendarWidgetProps {
  /**
   * The Cal.com username or team namespace
   */
  calNamespace: string

  /**
   * The event type slug (e.g., '30min', 'consultation')
   */
  eventSlug: string

  /**
   * Pre-fill data for the booking form
   */
  prefill?: {
    name?: string
    email?: string
    guests?: string[]
    notes?: string
  }

  /**
   * Callback when a booking is successfully created
   */
  onBookingSuccess?: (bookingData: { uid: string; [key: string]: any }) => void

  /**
   * Custom styling for the embed container
   */
  className?: string
}

/**
 * CalendarWidget - Embeds Cal.com booking calendar
 *
 * Usage:
 * ```tsx
 * <CalendarWidget
 *   calNamespace="puro-surf"
 *   eventSlug="surf-lesson"
 *   prefill={{ name: "John", email: "john@example.com" }}
 *   onBookingSuccess={(data) => console.log('Booked!', data.uid)}
 * />
 * ```
 */
export default function CalendarWidget({
  calNamespace,
  eventSlug,
  prefill,
  onBookingSuccess,
  className = '',
}: CalendarWidgetProps) {
  const t = useTranslations('booking')

  useEffect(() => {
    (async function () {
      const cal = await getCalApi()

      cal('ui', {
        theme: 'light',
        styles: {
          branding: {
            brandColor: '#1A6B8A', // ocean-blue
          },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      })

      // Listen for booking success events
      cal('on', {
        action: 'bookingSuccessful',
        callback: (e) => {
          if (onBookingSuccess && e.detail.data) {
            onBookingSuccess(e.detail.data)
          }
        },
      })
    })()
  }, [onBookingSuccess])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{t('selectDateTime')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          data-cal-namespace={calNamespace}
          data-cal-link={`${calNamespace}/${eventSlug}`}
          data-cal-config={JSON.stringify({
            layout: 'month_view',
            theme: 'light',
            ...(prefill && { prefill }),
          })}
          style={{ width: '100%', height: '100%', minHeight: '600px', overflow: 'scroll' }}
        />
      </CardContent>
    </Card>
  )
}
