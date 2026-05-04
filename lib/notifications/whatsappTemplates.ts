/**
 * WhatsApp Message Templates (Bilingual)
 *
 * These templates are used for sending automated notifications via WhatsApp.
 * Each template supports both Spanish (es) and English (en).
 *
 * POC Note: When using Twilio Sandbox, templates are not pre-approved.
 * You can send any message format. For production WhatsApp Business API,
 * templates must be submitted for approval.
 */

export interface BookingConfirmationData {
  guestName: string
  operatorName: string
  itemName: string
  startDate: string
  numGuests: number
  depositPaid: number
  bookingId: string
  locale: 'es' | 'en'
}

export interface PreArrivalReminderData {
  guestName: string
  operatorName: string
  itemName: string
  startDate: string
  checkInTime?: string
  checkInLocation?: string
  locale: 'es' | 'en'
}

export interface BalanceReminderData {
  guestName: string
  operatorName: string
  balanceDue: number
  dueDate: string
  bookingId: string
  locale: 'es' | 'en'
}

export interface ReviewRequestData {
  guestName: string
  operatorName: string
  itemName: string
  reviewUrl?: string
  locale: 'es' | 'en'
}

/**
 * Booking Confirmation Template
 */
export function bookingConfirmationTemplate(data: BookingConfirmationData): string {
  if (data.locale === 'es') {
    return `¡Hola ${data.guestName}! 👋

✅ Tu reserva con *${data.operatorName}* ha sido confirmada.

📋 *Detalles de la Reserva:*
• ${data.itemName}
• Fecha: ${data.startDate}
• Huéspedes: ${data.numGuests}
• Depósito pagado: $${data.depositPaid.toFixed(2)} USD
• ID de Reserva: ${data.bookingId}

🇸🇻 ¡Nos vemos pronto en El Salvador!

_Reservado a través de Morada - morada.sv_`
  } else {
    return `Hi ${data.guestName}! 👋

✅ Your booking with *${data.operatorName}* has been confirmed.

📋 *Booking Details:*
• ${data.itemName}
• Date: ${data.startDate}
• Guests: ${data.numGuests}
• Deposit paid: $${data.depositPaid.toFixed(2)} USD
• Booking ID: ${data.bookingId}

🇸🇻 See you soon in El Salvador!

_Booked through Morada - morada.sv_`
  }
}

/**
 * Pre-Arrival Reminder Template
 */
export function preArrivalReminderTemplate(data: PreArrivalReminderData): string {
  if (data.locale === 'es') {
    return `¡Hola ${data.guestName}! 🌴

📅 *Recordatorio:* Tu experiencia con *${data.operatorName}* comienza pronto.

🗓️ *${data.itemName}*
Fecha: ${data.startDate}${data.checkInTime ? `\n⏰ Hora de llegada: ${data.checkInTime}` : ''}${data.checkInLocation ? `\n📍 Ubicación: ${data.checkInLocation}` : ''}

🎒 *Consejos para tu visita:*
• Llega 15 minutos antes
• Trae protector solar y agua
• Revisa el clima local

¡Estamos emocionados de recibirte! 🇸🇻

_Morada - morada.sv_`
  } else {
    return `Hi ${data.guestName}! 🌴

📅 *Reminder:* Your experience with *${data.operatorName}* is coming up soon.

🗓️ *${data.itemName}*
Date: ${data.startDate}${data.checkInTime ? `\n⏰ Check-in time: ${data.checkInTime}` : ''}${data.checkInLocation ? `\n📍 Location: ${data.checkInLocation}` : ''}

🎒 *Tips for your visit:*
• Arrive 15 minutes early
• Bring sunscreen and water
• Check local weather

We're excited to welcome you! 🇸🇻

_Morada - morada.sv_`
  }
}

/**
 * Balance Reminder Template
 */
export function balanceReminderTemplate(data: BalanceReminderData): string {
  if (data.locale === 'es') {
    return `Hola ${data.guestName},

💰 *Recordatorio de Pago*

Tu reserva con *${data.operatorName}* tiene un saldo pendiente de *$${data.balanceDue.toFixed(2)} USD*.

📅 Fecha límite de pago: ${data.dueDate}
🔖 ID de Reserva: ${data.bookingId}

Por favor, completa tu pago antes de la fecha límite para asegurar tu reserva.

¿Necesitas ayuda? Responde a este mensaje.

_Morada - morada.sv_`
  } else {
    return `Hi ${data.guestName},

💰 *Payment Reminder*

Your booking with *${data.operatorName}* has a remaining balance of *$${data.balanceDue.toFixed(2)} USD*.

📅 Payment due date: ${data.dueDate}
🔖 Booking ID: ${data.bookingId}

Please complete your payment before the due date to secure your booking.

Need help? Reply to this message.

_Morada - morada.sv_`
  }
}

/**
 * Review Request Template
 */
export function reviewRequestTemplate(data: ReviewRequestData): string {
  if (data.locale === 'es') {
    return `¡Hola ${data.guestName}! 😊

Esperamos que hayas disfrutado tu experiencia con *${data.operatorName}* - ${data.itemName}.

⭐ *¿Nos dejas una reseña?*

Tu opinión ayuda a otros viajeros a descubrir experiencias auténticas en El Salvador.${data.reviewUrl ? `\n\n📝 Deja tu reseña aquí:\n${data.reviewUrl}` : ''}

¡Gracias por apoyar el turismo local! 🇸🇻

_Morada - morada.sv_`
  } else {
    return `Hi ${data.guestName}! 😊

We hope you enjoyed your experience with *${data.operatorName}* - ${data.itemName}.

⭐ *Would you leave a review?*

Your feedback helps other travelers discover authentic experiences in El Salvador.${data.reviewUrl ? `\n\n📝 Leave your review here:\n${data.reviewUrl}` : ''}

Thanks for supporting local tourism! 🇸🇻

_Morada - morada.sv_`
  }
}

/**
 * Template type mapping
 */
export type TemplateType = 'booking_confirmation' | 'pre_arrival' | 'balance_reminder' | 'review_request'

export type TemplateData =
  | BookingConfirmationData
  | PreArrivalReminderData
  | BalanceReminderData
  | ReviewRequestData

/**
 * Get template by type
 */
export function getTemplate(type: TemplateType, data: TemplateData): string {
  switch (type) {
    case 'booking_confirmation':
      return bookingConfirmationTemplate(data as BookingConfirmationData)
    case 'pre_arrival':
      return preArrivalReminderTemplate(data as PreArrivalReminderData)
    case 'balance_reminder':
      return balanceReminderTemplate(data as BalanceReminderData)
    case 'review_request':
      return reviewRequestTemplate(data as ReviewRequestData)
    default:
      throw new Error(`Unknown template type: ${type}`)
  }
}
