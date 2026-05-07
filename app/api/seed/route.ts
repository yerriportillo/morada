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

    // Check if admin user already exists
    let existingUsers
    try {
      existingUsers = await payload.find({
        collection: 'users',
        limit: 1,
      })

      if (existingUsers.totalDocs > 0) {
        console.log('Database already seeded - users exist')
        return NextResponse.json({
          message: 'Database already seeded',
          adminExists: true
        })
      }
    } catch (findError: any) {
      console.log('No existing users found (or table just created):', findError.message)
      // Continue to create user - table might have just been created
    }

    console.log('Creating demo admin user...')

    // Create demo admin user
    const admin = await payload.create({
      collection: 'users',
      data: {
        email: 'test@morada.sv',
        password: 'test',
        role: 'admin',
      },
    })

    console.log('✅ Demo admin user created successfully')
    console.log('   Email: test@morada.sv')
    console.log('   Password: test')
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
