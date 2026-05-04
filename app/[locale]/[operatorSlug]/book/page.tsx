'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useParams, useSearchParams } from 'next/navigation'
import { mockOperators, type MockOperator } from '@/lib/mockData/operators'
import { BookingForm, type BookingFormData } from '@/components/booking/BookingForm'
import { BookingConfirmation } from '@/components/booking/BookingConfirmation'
import CalendarWidget from '@/components/booking/CalendarWidget'

export default function BookingPage() {
  const t = useTranslations()
  const locale = useLocale()
  const params = useParams()
  const searchParams = useSearchParams()
  const operatorSlug = params.operatorSlug as string
  const currentLocale = locale as 'es' | 'en'

  // Check if user came from /regreso page
  const fromRegreso = searchParams.get('regreso') === 'true'

  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null)
  const [calBookingUid, setCalBookingUid] = useState<string | null>(null)

  // Get operator data
  const operator = mockOperators[operatorSlug as keyof typeof mockOperators] as MockOperator

  if (!operator) {
    return <div>Operator not found</div>
  }

  // Get first program for demo
  const program = operator.programs?.[0]

  if (!program) {
    return <div>No programs available</div>
  }

  const getLocalized = (value: { es: string; en: string }) => value[currentLocale]

  const handleBookingSubmit = (data: BookingFormData) => {
    // Mock booking confirmation
    const bookingId = `MOR-${Date.now().toString().slice(-8)}`
    const depositAmount = (program.pricing.priceUsd * data.numGuests * program.pricing.depositPercent) / 100

    setConfirmedBooking({
      bookingId,
      ...data,
      calBookingUid, // Include Cal.com booking UID if available
      depositPaid: depositAmount,
      itemName: getLocalized(program.name),
    })
    setBookingConfirmed(true)

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToHome = () => {
    window.location.href = `/${locale}/${operatorSlug}`
  }

  if (bookingConfirmed && confirmedBooking) {
    return (
      <BookingConfirmation
        bookingId={confirmedBooking.bookingId}
        guestEmail={confirmedBooking.email}
        guestPhone={confirmedBooking.whatsapp}
        itemName={confirmedBooking.itemName}
        date={confirmedBooking.date}
        numGuests={confirmedBooking.numGuests}
        depositPaid={confirmedBooking.depositPaid}
        brandColor={operator.brandColor}
        labels={{
          title: t('booking.confirmation.title'),
          subtitle: t('booking.confirmation.subtitle'),
          bookingId: t('booking.confirmation.bookingId'),
          whatsappSent: t('booking.confirmation.whatsappSent'),
          nextSteps: t('booking.confirmation.nextSteps'),
          receiptSent: t('booking.confirmation.receiptSent'),
          reminderScheduled: t('booking.confirmation.reminderScheduled'),
          contactOperator: t('booking.confirmation.contactOperator'),
          backToHome: t('nav.backToHome'),
        }}
        onBackToHome={handleBackToHome}
      />
    )
  }

  // Check if Cal.com is configured
  const calNamespace = process.env.NEXT_PUBLIC_CAL_NAMESPACE
  const isCalEnabled = !!calNamespace

  const handleCalBookingSuccess = (bookingData: { uid: string; [key: string]: any }) => {
    setCalBookingUid(bookingData.uid)
    console.log('Cal.com booking created:', bookingData)
  }

  return (
    <div className="min-h-screen bg-sand-white py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-volcanic-black mb-2">
            {getLocalized(program.name)}
          </h1>
          <p className="text-volcanic-black/60">{getLocalized(program.shortDescription)}</p>
        </div>

        {/* Cal.com Calendar Widget (POC - Optional) */}
        {isCalEnabled && (
          <div className="mb-8">
            <CalendarWidget
              calNamespace={calNamespace}
              eventSlug={program.slug || 'booking'}
              prefill={{
                name: '',
                email: '',
              }}
              onBookingSuccess={handleCalBookingSuccess}
            />
          </div>
        )}

        {/* Booking Form */}
        <BookingForm
          itemName={getLocalized(program.name)}
          priceUsd={program.pricing.priceUsd}
          depositPercent={program.pricing.depositPercent}
          brandColor={operator.brandColor}
          initialRegresoVisitor={fromRegreso}
          labels={{
            title: t('booking.form.title'),
            guestDetails: t('booking.form.guestDetails'),
            bookingDetails: t('booking.form.bookingDetails'),
            paymentDetails: t('booking.pricing.total'),
            name: t('booking.form.name'),
            namePlaceholder: t('booking.form.namePlaceholder'),
            email: t('booking.form.email'),
            emailPlaceholder: t('booking.form.emailPlaceholder'),
            whatsapp: t('booking.form.whatsapp'),
            whatsappPlaceholder: t('booking.form.whatsappPlaceholder'),
            country: t('booking.form.country'),
            countryPlaceholder: t('booking.form.countryPlaceholder'),
            language: t('booking.form.language'),
            selectDate: t('booking.form.selectDate'),
            numGuests: t('booking.form.numGuests'),
            numGuestsPlaceholder: t('booking.form.numGuestsPlaceholder'),
            specialRequests: t('booking.form.specialRequests'),
            specialRequestsPlaceholder: t('booking.form.specialRequestsPlaceholder'),
            regresoQuestion: t('booking.form.regresoQuestion'),
            regresoHelper: t('booking.form.regresoHelper'),
            subtotal: t('booking.pricing.subtotal'),
            deposit: t('booking.pricing.deposit'),
            remaining: t('booking.pricing.remaining'),
            total: t('booking.pricing.total'),
            bookNow: t('cta.bookNow'),
          }}
          languageOptions={[
            { value: 'es', label: 'Español' },
            { value: 'en', label: 'English' },
          ]}
          onSubmit={handleBookingSubmit}
        />
      </div>
    </div>
  )
}
