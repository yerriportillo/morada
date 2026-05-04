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

    // Initialize Payload
    const payload = await getPayload({ config })

    // Check if admin user already exists
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (existingUsers.totalDocs > 0) {
      return NextResponse.json({ 
        message: 'Database already seeded',
        adminExists: true 
      })
    }

    // Create demo admin user
    const admin = await payload.create({
      collection: 'users',
      data: {
        email: 'demo@morada.sv',
        password: 'demo123456',
        role: 'admin',
      },
    })

    console.log('✅ Demo admin user created')
    console.log('   Email: demo@morada.sv')
    console.log('   Password: demo123456')

    return NextResponse.json({
      success: true,
      message: 'Demo admin user created successfully',
      credentials: {
        email: 'demo@morada.sv',
        password: 'demo123456',
        adminUrl: '/admin',
      },
    })
  } catch (error: any) {
    console.error('Seed error:', error)
    return NextResponse.json(
      { error: 'Failed to seed database', message: error.message },
      { status: 500 }
    )
  }
}
