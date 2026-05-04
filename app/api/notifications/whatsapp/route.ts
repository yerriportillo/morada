import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'
import { getTemplate, TemplateType, TemplateData } from '@/lib/notifications/whatsappTemplates'

// Initialize Twilio client (POC: Sandbox mode)
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886' // Default sandbox number

let client: ReturnType<typeof twilio> | null = null

if (accountSid && authToken) {
  client = twilio(accountSid, authToken)
}

export async function POST(request: NextRequest) {
  try {
    // Check if Twilio is configured
    if (!client) {
      return NextResponse.json(
        {
          error: 'Twilio not configured',
          message: 'Add TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN to environment variables',
        },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { to, templateType, templateData } = body

    // Validate required fields
    if (!to) {
      return NextResponse.json({ error: 'Missing recipient phone number (to)' }, { status: 400 })
    }

    if (!templateType || !templateData) {
      return NextResponse.json({ error: 'Missing templateType or templateData' }, { status: 400 })
    }

    // Ensure phone number is in E.164 format with WhatsApp prefix
    const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`

    // Generate message from template
    const message = getTemplate(templateType as TemplateType, templateData as TemplateData)

    // Send WhatsApp message via Twilio
    const result = await client.messages.create({
      from: twilioWhatsAppNumber,
      to: formattedTo,
      body: message,
    })

    console.log('✅ WhatsApp message sent:', {
      sid: result.sid,
      to: formattedTo,
      status: result.status,
      templateType,
    })

    return NextResponse.json({
      success: true,
      messageSid: result.sid,
      status: result.status,
      to: formattedTo,
    })
  } catch (error: any) {
    console.error('❌ WhatsApp notification error:', error)

    // Handle specific Twilio errors
    if (error.code === 21608) {
      return NextResponse.json(
        {
          error: 'Recipient not in sandbox',
          message:
            'POC Mode: Recipient must join the Twilio Sandbox first. Send "join <sandbox-name>" to the Twilio WhatsApp number.',
          twilioError: error.message,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to send WhatsApp notification',
        message: error.message,
        code: error.code,
      },
      { status: 500 }
    )
  }
}

/**
 * GET endpoint for checking Twilio configuration
 */
export async function GET() {
  const isConfigured = !!(accountSid && authToken)

  return NextResponse.json({
    configured: isConfigured,
    sandboxNumber: twilioWhatsAppNumber,
    mode: 'sandbox',
    note: 'POC Mode: Recipients must join the Twilio Sandbox before receiving messages',
  })
}
