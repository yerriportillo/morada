import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './collections/Users.js'
import { Operators } from './collections/Operators.js'
import { BookableItems } from './collections/BookableItems.js'
import { Guides } from './collections/Guides.js'
import { SurfSpots } from './collections/SurfSpots.js'
import { Media } from './collections/Media.js'
import { CommunityMembers } from './collections/CommunityMembers.js'
import { ImpactMetrics } from './collections/ImpactMetrics.js'
import { PickupLocations } from './collections/PickupLocations.js'
import { Bookings } from './collections/Bookings.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Spanish and English - equal support
  // Spanish is default for operators/admin, English equally important for guests
  localization: {
    locales: [
      {
        label: 'Español',
        code: 'es',
      },
      {
        label: 'English',
        code: 'en',
      },
    ],
    defaultLocale: 'es',
    fallback: true, // Fallback enabled, but critical fields validated to require both
  },

  // Admin panel configuration
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— Morada',
      description: 'Morada Admin - White-label tourism platform for El Salvador',
    },
    // Admin routes will be at /admin
    // Custom branding
    components: {
      // Custom dashboard can be added here in future phases
    },
  },

  // Collections
  collections: [
    Users,
    Operators,
    BookableItems,
    Guides,
    SurfSpots,
    Media,
    CommunityMembers,
    ImpactMetrics,
    PickupLocations,
    Bookings,
  ],

  // Editor
  editor: lexicalEditor({}),

  // Database
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),

  // TypeScript
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // File upload
  upload: {
    limits: {
      fileSize: 10000000, // 10MB max file size
    },
  },

  // Server URL
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  // Secret for JWT
  secret: process.env.PAYLOAD_SECRET || 'development-secret-key',
})
