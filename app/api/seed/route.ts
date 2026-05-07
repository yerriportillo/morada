import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(request: NextRequest) {
  try {
    // Simple security check - require a secret in production
    const { secret } = await request.json()

    if (process.env.NODE_ENV === 'production' && secret !== process.env.PAYLOAD_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Initializing Payload and database schema...')

    // Initialize Payload - this will auto-create tables with push: true
    const payload = await getPayload({ config })

    console.log('Payload initialized successfully')
    console.log('Creating demo admin user...')

    // Create demo admin user directly - Payload will handle duplicates
    const admin = await payload.create({
      collection: 'users',
      data: {
        name: 'Test Admin',
        email: 'test@morada.sv',
        password: 'test',
        role: 'platform-admin',
      },
    })

    console.log('✅ Demo admin user created successfully')
    console.log('   Name: Test Admin')
    console.log('   Email: test@morada.sv')
    console.log('   Password: test')
    console.log('   Role: platform-admin')
    console.log('   Admin URL: /admin')

    return NextResponse.json({
      success: true,
      message: 'Demo admin user created successfully',
      credentials: {
        email: 'test@morada.sv',
        password: 'test',
        adminUrl: '/admin',
      },
    })
  } catch (error: any) {
    console.error('❌ Seed error:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
    })
    return NextResponse.json(
      {
        error: 'Failed to seed database',
        message: error.message,
        details: error.stack
      },
      { status: 500 }
    )
  }
}
