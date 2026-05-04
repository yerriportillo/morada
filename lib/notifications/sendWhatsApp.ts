import { TemplateType, TemplateData } from './whatsappTemplates'

interface SendWhatsAppOptions {
  /**
   * Recipient phone number (E.164 format: +503XXXXXXXX)
   */
  to: string

  /**
   * Template type to use
   */
  templateType: TemplateType

  /**
   * Data for the template
   */
  templateData: TemplateData
}

interface SendWhatsAppResponse {
  success: boolean
  messageSid?: string
  status?: string
  error?: string
  message?: string
}

/**
 * Send a WhatsApp notification
 *
 * Usage:
 * ```typescript
 * await sendWhatsApp({
 *   to: '+50371234567',
 *   templateType: 'booking_confirmation',
 *   templateData: {
 *     guestName: 'Maria Garcia',
 *     operatorName: 'Puro Surf',
 *     itemName: 'Surf Lesson',
 *     startDate: '2026-06-15',
 *     numGuests: 2,
 *     depositPaid: 60,
 *     bookingId: 'MOR-12345',
 *     locale: 'es',
 *   },
 * })
 * ```
 */
export async function sendWhatsApp(options: SendWhatsAppOptions): Promise<SendWhatsAppResponse> {
  try {
    const response = await fetch('/api/notifications/whatsapp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('WhatsApp notification failed:', data)
      return {
        success: false,
        error: data.error,
        message: data.message,
      }
    }

    return data
  } catch (error: any) {
    console.error('WhatsApp notification error:', error)
    return {
      success: false,
      error: 'Network error',
      message: error.message,
    }
  }
}

/**
 * Send booking confirmation WhatsApp
 */
export async function sendBookingConfirmation(
  to: string,
  data: {
    guestName: string
    operatorName: string
    itemName: string
    startDate: string
    numGuests: number
    depositPaid: number
    bookingId: string
    locale: 'es' | 'en'
  }
) {
  return sendWhatsApp({
    to,
    templateType: 'booking_confirmation',
    templateData: data,
  })
}

/**
 * Send pre-arrival reminder WhatsApp
 */
export async function sendPreArrivalReminder(
  to: string,
  data: {
    guestName: string
    operatorName: string
    itemName: string
    startDate: string
    checkInTime?: string
    checkInLocation?: string
    locale: 'es' | 'en'
  }
) {
  return sendWhatsApp({
    to,
    templateType: 'pre_arrival',
    templateData: data,
  })
}

/**
 * Send balance reminder WhatsApp
 */
export async function sendBalanceReminder(
  to: string,
  data: {
    guestName: string
    operatorName: string
    balanceDue: number
    dueDate: string
    bookingId: string
    locale: 'es' | 'en'
  }
) {
  return sendWhatsApp({
    to,
    templateType: 'balance_reminder',
    templateData: data,
  })
}

/**
 * Send review request WhatsApp
 */
export async function sendReviewRequest(
  to: string,
  data: {
    guestName: string
    operatorName: string
    itemName: string
    reviewUrl?: string
    locale: 'es' | 'en'
  }
) {
  return sendWhatsApp({
    to,
    templateType: 'review_request',
    templateData: data,
  })
}
