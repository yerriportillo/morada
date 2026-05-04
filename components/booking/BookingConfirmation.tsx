import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface BookingConfirmationProps {
  bookingId: string
  guestEmail: string
  guestPhone: string
  itemName: string
  date: string
  numGuests: number
  depositPaid: number
  brandColor: string
  labels: {
    title: string
    subtitle: string
    bookingId: string
    whatsappSent: string
    nextSteps: string
    receiptSent: string
    reminderScheduled: string
    contactOperator: string
    backToHome: string
  }
  onBackToHome?: () => void
}

export function BookingConfirmation({
  bookingId,
  guestEmail,
  guestPhone,
  itemName,
  date,
  numGuests,
  depositPaid,
  brandColor,
  labels,
  onBackToHome,
}: BookingConfirmationProps) {
  return (
    <div className="min-h-screen bg-sand-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: `${brandColor}20` }}
          >
            <svg
              className="w-10 h-10"
              style={{ color: brandColor }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-display font-bold text-volcanic-black mb-2">
            {labels.title}
          </h1>
          <p className="text-volcanic-black/60">
            {labels.subtitle.replace('{email}', guestEmail)}
          </p>
        </div>

        {/* Booking Details Card */}
        <Card variant="elevated" className="mb-6">
          <CardHeader>
            <CardTitle>{itemName}</CardTitle>
            <CardDescription>
              {labels.bookingId}: <span className="font-mono">{bookingId}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-volcanic-black/60">Date</span>
                <p className="font-medium text-volcanic-black">{date}</p>
              </div>
              <div>
                <span className="text-volcanic-black/60">Guests</span>
                <p className="font-medium text-volcanic-black">{numGuests}</p>
              </div>
              <div>
                <span className="text-volcanic-black/60">Deposit Paid</span>
                <p className="font-medium" style={{ color: brandColor }}>
                  ${depositPaid.toFixed(2)} USD
                </p>
              </div>
              <div>
                <span className="text-volcanic-black/60">Status</span>
                <p className="font-medium text-volcanic-black">Confirmed</p>
              </div>
            </div>

            <div className="pt-4 border-t border-volcanic-black/10">
              <p className="text-sm text-volcanic-black/80 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-whatsapp"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {labels.whatsappSent.replace('{phone}', guestPhone)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card variant="bordered" className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{labels.nextSteps}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-6">
            <div className="flex items-start gap-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
                style={{ backgroundColor: brandColor }}
              >
                1
              </div>
              <p className="text-sm text-volcanic-black/80">{labels.receiptSent}</p>
            </div>
            <div className="flex items-start gap-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
                style={{ backgroundColor: brandColor }}
              >
                2
              </div>
              <p className="text-sm text-volcanic-black/80">
                {labels.reminderScheduled.replace('{date}', date)}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
                style={{ backgroundColor: brandColor }}
              >
                3
              </div>
              <p className="text-sm text-volcanic-black/80">{labels.contactOperator}</p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home Button */}
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={onBackToHome}
        >
          {labels.backToHome}
        </Button>
      </div>
    </div>
  )
}
