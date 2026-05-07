import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Pool } from 'pg'

export async function POST(request: NextRequest) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    // Simple security check - require a secret in production
    const { secret } = await request.json()

    if (process.env.NODE_ENV === 'production' && secret !== process.env.PAYLOAD_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Initializing Payload and database schema...')

    // Initialize Payload - this will auto-create the users table with push: true
    const payload = await getPayload({ config })

    console.log('Payload initialized successfully')

    //Create users_sessions table manually
    console.log('Creating users_sessions table...')
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users_sessions (
        id SERIAL PRIMARY KEY,
        _order INTEGER,
        _parent_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW(),
        expires_at TIMESTAMP
      )
    `)
    console.log('users_sessions table created')

    console.log('Creating demo admin user...')

    // Now create the user through Payload
    const admin = await payload.create({
      collection: 'users',
      data: {
        name: 'Test Admin',
        email: 'test@morada.sv',
        password: 'test',
        role: 'platform-admin',
      },
      overrideAccess: true,
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
  } finally {
    await pool.end()
  }
}
