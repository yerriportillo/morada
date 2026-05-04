# WhatsApp Notifications Setup Guide (POC - Twilio Sandbox)

This guide walks you through setting up WhatsApp notifications for Morada using **Twilio Sandbox** (POC approach).

## Overview

WhatsApp notifications keep guests informed throughout their booking journey:
- Booking confirmation after payment
- Pre-arrival reminders (1-2 days before)
- Balance payment reminders
- Post-visit review requests

**POC Tier**: Twilio Sandbox (free, but recipients must join first)
**Production Upgrade**: WhatsApp Business API (requires 2-4 week approval)

## Step 1: Create Twilio Account (5 minutes)

1. Go to [twilio.com/try-twilio](https://www.twilio.com/try-twilio)
2. Sign up with email
3. Verify your phone number
4. Complete the onboarding questionnaire
5. You'll get **$15 trial credit** (enough for ~750 WhatsApp messages)

## Step 2: Access WhatsApp Sandbox (2 minutes)

1. In Twilio Console, expand **Messaging** in the left sidebar
2. Click **Try it out** → **Send a WhatsApp message**
3. You'll see the WhatsApp Sandbox page with:
   - **Sandbox phone number**: `+1 415 523 8886` (US number)
   - **Join code**: A unique code like `join <sandbox-name>`

## Step 3: Join the Sandbox (1 minute per recipient)

**IMPORTANT**: In POC mode, every recipient must join the sandbox before they can receive messages.

### How to Join:

1. Save the Twilio WhatsApp number to your contacts:
   - **Number**: `+1 415 523 8886`
   - **Name**: "Twilio Sandbox"

2. Send a WhatsApp message to this number:
   ```
   join <your-sandbox-code>
   ```
   Example: `join yellow-elephant` (your code will be different)

3. You'll receive a confirmation message:
   ```
   Joined yellow-elephant
   ```

**For Testing**:
- Join from your own phone first
- Ask team members to join
- For guest testing, they must join before receiving notifications

## Step 4: Get Your Twilio Credentials (3 minutes)

1. In Twilio Console, click **Account** (top right)
2. Scroll to **API credentials**:
   - **Account SID**: Starts with `AC...`
   - **Auth Token**: Click "Show" to reveal

3. Copy both values

## Step 5: Configure Morada Environment Variables

Add the following to your `.env.local` file:

```bash
# Twilio WhatsApp Configuration (Sandbox)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

**Example**:
```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

**Note**: The WhatsApp number format must include `whatsapp:` prefix.

## Step 6: Test the Integration

1. Restart your Next.js dev server:
```bash
npm run dev
```

2. Make sure you've joined the sandbox (see Step 3)

3. Test by making an API call:

```bash
curl -X POST http://localhost:3005/api/notifications/whatsapp \
  -H "Content-Type: application/json" \
  -d '{
    "to": "+50371234567",
    "templateType": "booking_confirmation",
    "templateData": {
      "guestName": "Maria Garcia",
      "operatorName": "Puro Surf",
      "itemName": "Surf Lesson",
      "startDate": "June 15, 2026",
      "numGuests": 2,
      "depositPaid": 60,
      "bookingId": "MOR-12345",
      "locale": "es"
    }
  }'
```

4. Check your WhatsApp for the confirmation message

## Message Templates Implemented

### 1. Booking Confirmation (ES/EN)

**Spanish Example**:
```
¡Hola Maria! 👋

✅ Tu reserva con *Puro Surf* ha sido confirmada.

📋 *Detalles de la Reserva:*
• Surf Lesson
• Fecha: June 15, 2026
• Huéspedes: 2
• Depósito pagado: $60.00 USD
• ID de Reserva: MOR-12345

🇸🇻 ¡Nos vemos pronto en El Salvador!

_Reservado a través de Morada - morada.sv_
```

**English Example**:
```
Hi Maria! 👋

✅ Your booking with *Puro Surf* has been confirmed.

📋 *Booking Details:*
• Surf Lesson
• Date: June 15, 2026
• Guests: 2
• Deposit paid: $60.00 USD
• Booking ID: MOR-12345

🇸🇻 See you soon in El Salvador!

_Booked through Morada - morada.sv_
```

### 2. Pre-Arrival Reminder (ES/EN)

Sent 1-2 days before the booking start date.

**Spanish Example**:
```
¡Hola Maria! 🌴

📅 *Recordatorio:* Tu experiencia con *Puro Surf* comienza pronto.

🗓️ *Surf Lesson*
Fecha: June 15, 2026
⏰ Hora de llegada: 9:00 AM
📍 Ubicación: El Tunco Beach

🎒 *Consejos para tu visita:*
• Llega 15 minutos antes
• Trae protector solar y agua
• Revisa el clima local

¡Estamos emocionados de recibirte! 🇸🇻

_Morada - morada.sv_
```

### 3. Balance Reminder (ES/EN)

Sent when remaining balance is due.

**Spanish Example**:
```
Hola Maria,

💰 *Recordatorio de Pago*

Tu reserva con *Puro Surf* tiene un saldo pendiente de *$90.00 USD*.

📅 Fecha límite de pago: June 10, 2026
🔖 ID de Reserva: MOR-12345

Por favor, completa tu pago antes de la fecha límite para asegurar tu reserva.

¿Necesitas ayuda? Responde a este mensaje.

_Morada - morada.sv_
```

### 4. Review Request (ES/EN)

Sent after the visit is completed.

**Spanish Example**:
```
¡Hola Maria! 😊

Esperamos que hayas disfrutado tu experiencia con *Puro Surf* - Surf Lesson.

⭐ *¿Nos dejas una reseña?*

Tu opinión ayuda a otros viajeros a descubrir experiencias auténticas en El Salvador.

📝 Deja tu reseña aquí:
https://morada.sv/review/puro-surf

¡Gracias por apoyar el turismo local! 🇸🇻

_Morada - morada.sv_
```

## Integration with Booking Flow

The WhatsApp notifications are automatically sent at key points:

```typescript
import { sendBookingConfirmation } from '@/lib/notifications/sendWhatsApp'

// After successful payment
const result = await sendBookingConfirmation(
  booking.guestWhatsapp, // E.164 format: +50371234567
  {
    guestName: booking.guestName,
    operatorName: operator.name.es,
    itemName: bookableItem.name.es,
    startDate: booking.startDate,
    numGuests: booking.numGuests,
    depositPaid: booking.pricing.depositUsd,
    bookingId: booking.id,
    locale: booking.guestLanguage,
  }
)

if (result.success) {
  console.log('✅ WhatsApp sent:', result.messageSid)
} else {
  console.error('❌ WhatsApp failed:', result.error)
}
```

## POC Limitations & Workarounds

### Limitation 1: Recipients Must Join Sandbox

**Problem**: Guests can't receive messages unless they join the sandbox.

**Workarounds**:
1. **For Testing**: Ask team members to join
2. **For Demo**: Show notification preview in UI instead of sending
3. **For Production**: Apply for WhatsApp Business API

### Limitation 2: 24-Hour Session Window

**Problem**: After a recipient sends a message, you have 24 hours to respond. After that, you can't send messages until they message you again.

**Workaround**: Send all notifications within 24 hours of booking (or re-engagement message).

### Limitation 3: Sandbox Phone Number

**Problem**: Messages come from a US number (+1 415...) instead of a local El Salvador number.

**Workaround**: Include branding in message footer so recipients recognize it's from Morada.

## What You CAN Do (Sandbox Mode)

- ✅ Send WhatsApp messages to users who joined the sandbox
- ✅ Test all 4 message templates (booking, reminder, balance, review)
- ✅ Test bilingual messages (Spanish/English)
- ✅ Receive replies from users
- ✅ Send rich formatting (bold, italics, emojis)
- ✅ Send up to ~750 messages with trial credit

## What You CAN'T Do (Sandbox Mode)

- ❌ Send messages to users who haven't joined the sandbox
- ❌ Use a custom phone number (El Salvador number)
- ❌ Send pre-approved message templates (freeform only)
- ❌ Send messages to large groups (broadcast)
- ❌ Access WhatsApp Business features (catalog, labels, etc.)

## Production: WhatsApp Business API

When ready to go live:

### Step 1: Apply for WhatsApp Business API (2-4 weeks)

1. In Twilio Console, go to **Messaging** → **WhatsApp**
2. Click **Request Access**
3. Fill out the application:
   - **Business Name**: Morada
   - **Business Website**: morada.sv
   - **Business Category**: Travel & Hospitality
   - **Use Case**: Booking confirmations and customer notifications
   - **Phone Number**: Purchase a El Salvador number from Twilio

4. Submit and wait 2-4 weeks for WhatsApp approval

### Step 2: Create Message Templates

WhatsApp Business API requires pre-approved templates:

1. Go to **Messaging** → **WhatsApp** → **Content Templates**
2. Click **Create Template**
3. Submit each template for approval:
   - Booking Confirmation
   - Pre-Arrival Reminder
   - Balance Reminder
   - Review Request

4. Wait 1-3 days for approval

### Step 3: Update Environment Variables

```bash
# Replace sandbox number with your approved number
TWILIO_WHATSAPP_NUMBER=whatsapp:+50371234567
```

### Step 4: Update Code to Use Templates

```typescript
// Replace freeform messages with approved template IDs
await client.messages.create({
  from: twilioWhatsAppNumber,
  to: formattedTo,
  contentSid: 'HX1234567890abcdef', // Approved template ID
  contentVariables: JSON.stringify({
    1: guestName,
    2: operatorName,
    // ... template variables
  }),
})
```

**Production Cost**: $0.005 - $0.02 per message (depends on country)

## Troubleshooting

### Message Not Received:

1. **Check if recipient joined sandbox**:
   - They must send `join <code>` to the Twilio number first
   - Verify in Twilio Console → Sandbox → Participants

2. **Check phone number format**:
   - Must be E.164 format: `+50371234567` (country code + number)
   - No spaces, dashes, or parentheses

3. **Check Twilio error logs**:
   - Go to Twilio Console → Monitor → Logs → Errors
   - Common error: `21608` (unverified number or not in sandbox)

### "Recipient not in sandbox" Error:

**Solution**: Recipient must join the sandbox first (see Step 3).

### "Insufficient funds" Error:

**Solution**: Add credits to your Twilio account or upgrade to paid plan.

### Messages Sent but Not Delivered:

1. Check WhatsApp delivery status in Twilio Console → Monitor → Logs
2. Verify recipient's WhatsApp is active and connected to internet
3. Check if recipient blocked the Twilio number

## Testing Checklist

- [ ] Create Twilio account
- [ ] Join WhatsApp sandbox from your phone
- [ ] Add Twilio credentials to `.env.local`
- [ ] Restart dev server
- [ ] Send test booking confirmation
- [ ] Verify message received on WhatsApp
- [ ] Test Spanish message (locale: 'es')
- [ ] Test English message (locale: 'en')
- [ ] Test pre-arrival reminder template
- [ ] Test balance reminder template
- [ ] Test review request template

## Resources

- [Twilio WhatsApp Sandbox](https://www.twilio.com/docs/whatsapp/sandbox)
- [Twilio WhatsApp API](https://www.twilio.com/docs/whatsapp/api)
- [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp/getting-started)
- [WhatsApp Message Templates](https://developers.facebook.com/docs/whatsapp/message-templates)
- [Twilio Pricing](https://www.twilio.com/whatsapp/pricing)

---

**Phase 13 Status**: ✅ Complete (POC Ready - Sandbox Mode)

**Time to Set Up**: 15-20 minutes (sandbox only)

**POC Cost**: $0 (uses free trial credit, ~750 messages)

**Production Cost**: $0.005 - $0.02 per message + ~$15/month for dedicated number

**Approval Time**: 2-4 weeks for WhatsApp Business API approval
