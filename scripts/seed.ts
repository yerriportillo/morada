/**
 * Seed Script for Morada
 * Populates database with initial data:
 * - 8 El Salvador surf spots
 * - 4 demo operators (one of each type)
 * - Sample bookable items, guides, and other related data
 */

import payload from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// El Salvador surf spots from CLAUDE-CODE-PROMPT.md:259-271
const surfSpots = [
  {
    name: 'Punta Roca',
    slug: 'punta-roca',
    region: 'la_libertad',
    breakType: 'point',
    skillLevel: 'advanced',
    bestSeason: 'March–October',
    bestTide: 'all',
    crowdRating: 4,
    location: {
      latitude: 13.4894,
      longitude: -89.4297,
    },
    notes: {
      es: 'Una de las mejores olas derechas del mundo. Requiere experiencia avanzada.',
      en: 'One of the best right point breaks in the world. Requires advanced experience.',
    },
  },
  {
    name: 'El Sunzal',
    slug: 'el-sunzal',
    region: 'la_libertad',
    breakType: 'point',
    skillLevel: 'intermediate',
    bestSeason: 'March–October',
    bestTide: 'mid',
    crowdRating: 4,
    location: {
      latitude: 13.5072,
      longitude: -89.4492,
    },
    notes: {
      es: 'Point break consistente, ideal para nivel intermedio.',
      en: 'Consistent point break, ideal for intermediate level.',
    },
  },
  {
    name: 'El Zonte',
    slug: 'el-zonte',
    region: 'la_libertad',
    breakType: 'beach',
    skillLevel: 'intermediate',
    bestSeason: 'Year-round',
    bestTide: 'all',
    crowdRating: 3,
    location: {
      latitude: 13.5147,
      longitude: -89.4625,
    },
    notes: {
      es: 'Beach break amigable con buena comunidad surf.',
      en: 'Friendly beach break with good surf community.',
    },
  },
  {
    name: 'El Tunco',
    slug: 'el-tunco',
    region: 'la_libertad',
    breakType: 'beach',
    skillLevel: 'beginner',
    bestSeason: 'Year-round',
    bestTide: 'all',
    crowdRating: 5,
    location: {
      latitude: 13.5133,
      longitude: -89.4553,
    },
    notes: {
      es: 'El pueblo surf más popular de El Salvador. Perfecto para principiantes.',
      en: 'The most popular surf town in El Salvador. Perfect for beginners.',
    },
  },
  {
    name: 'Las Flores',
    slug: 'las-flores',
    region: 'eastern',
    breakType: 'point',
    skillLevel: 'advanced',
    bestSeason: 'March–November',
    bestTide: 'mid',
    crowdRating: 2,
    location: {
      latitude: 13.2889,
      longitude: -88.2861,
    },
    notes: {
      es: 'Ola de clase mundial en la costa este. Requiere experiencia.',
      en: 'World-class wave on the eastern coast. Requires experience.',
    },
  },
  {
    name: 'Punta Mango',
    slug: 'punta-mango',
    region: 'eastern',
    breakType: 'point',
    skillLevel: 'advanced',
    bestSeason: 'March–November',
    bestTide: 'mid',
    crowdRating: 1,
    location: {
      latitude: 13.2267,
      longitude: -88.2319,
    },
    notes: {
      es: 'Una de las mejores olas de El Salvador. Remota y poderosa.',
      en: 'One of El Salvador\'s best waves. Remote and powerful.',
    },
  },
  {
    name: 'El Cuco',
    slug: 'el-cuco',
    region: 'eastern',
    breakType: 'beach',
    skillLevel: 'beginner',
    bestSeason: 'Year-round',
    bestTide: 'all',
    crowdRating: 2,
    location: {
      latitude: 13.2556,
      longitude: -88.2458,
    },
    notes: {
      es: 'Beach break tranquilo en la costa este.',
      en: 'Mellow beach break on the eastern coast.',
    },
  },
  {
    name: 'La Bocana',
    slug: 'la-bocana',
    region: 'western',
    breakType: 'river_mouth',
    skillLevel: 'intermediate',
    bestSeason: 'March–October',
    bestTide: 'low',
    crowdRating: 2,
    location: {
      latitude: 13.7333,
      longitude: -89.7833,
    },
    notes: {
      es: 'River mouth con olas rápidas y huecas.',
      en: 'River mouth with fast, hollow waves.',
    },
  },
]

async function seed() {
  try {
    console.log('Starting Morada seed script...')

    // Initialize Payload
    await payload.init()

    console.log('Payload initialized successfully')

    // 1. Seed Surf Spots
    console.log('\n📍 Seeding surf spots...')
    for (const spot of surfSpots) {
      const existing = await payload.find({
        collection: 'surf-spots',
        where: {
          slug: {
            equals: spot.slug,
          },
        },
      })

      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'surf-spots',
          data: spot,
        })
        console.log(`  ✓ Created ${spot.name}`)
      } else {
        console.log(`  - ${spot.name} already exists, skipping`)
      }
    }

    // 2. Create Demo Operator: Puro Surf (Moradas Costeras)
    console.log('\n🏄 Creating demo operator: Puro Surf...')
    const puroSurf = await payload.create({
      collection: 'operators',
      data: {
        slug: 'puro-surf',
        name: {
          es: 'Puro Surf',
          en: 'Puro Surf',
        },
        tagline: {
          es: 'Tu morada en las olas de El Zonte',
          en: 'Your dwelling in the waves of El Zonte',
        },
        type: 'moradas_costeras',
        tier: 'operator',
        status: 'active',
        brandColor: '#1A6B8A',
        contact: {
          whatsapp: '+50312345678',
          email: 'info@purosurf.com',
          instagram: 'purosurf_elzonte',
        },
        location: {
          address: {
            es: 'Playa El Zonte, Km 53.5 Carretera del Litoral',
            en: 'El Zonte Beach, Km 53.5 Coastal Highway',
          },
          city: 'El Zonte',
          department: 'la_libertad',
          coast: 'central',
          latitude: 13.5147,
          longitude: -89.4625,
          taxiInstructions: {
            es: 'Desde San Salvador, tomar la carretera del litoral hacia El Zonte. Buscar el letrero de Puro Surf en la entrada del pueblo.',
            en: 'From San Salvador, take the coastal highway to El Zonte. Look for the Puro Surf sign at the town entrance.',
          },
        },
        regresoModule: {
          enabled: true,
          headline: {
            es: 'Vuelve a tus raíces surfeando las olas de casa',
            en: 'Return to your roots surfing the waves of home',
          },
        },
        launchedAt: new Date('2024-01-15'),
      },
    })
    console.log('  ✓ Puro Surf created')

    // 3. Create Surf Programs for Puro Surf
    console.log('\n📋 Creating surf programs...')
    const programs = [
      {
        operator: puroSurf.id,
        type: 'surf_program',
        status: 'active',
        name: {
          es: 'Surf por primera vez',
          en: 'First Time Surfing',
        },
        slug: 'beginner-surf-lessons',
        shortDescription: {
          es: 'Aprende a surfear desde cero con instructores certificados',
          en: 'Learn to surf from scratch with certified instructors',
        },
        fullDescription: {
          es: 'Programa completo para principiantes. Incluye teoría básica, práctica en espuma, y tu primera ola verde.',
          en: 'Complete program for beginners. Includes basic theory, foam practice, and your first green wave.',
        },
        pricing: {
          priceUsd: 50,
          depositPercent: 30,
        },
        duration: {
          days: 1,
        },
        capacity: {
          minGuests: 1,
          maxGuests: 6,
          minAge: 8,
        },
        skillLevel: 'beginner',
        includes: {
          es: '- Tabla de surf\n- Lycra\n- Instructor certificado\n- Seguro básico',
          en: '- Surfboard\n- Rash guard\n- Certified instructor\n- Basic insurance',
        },
        seasonal: false,
      },
      {
        operator: puroSurf.id,
        type: 'surf_program',
        status: 'active',
        name: {
          es: 'Mejora tu técnica',
          en: 'Improve Your Technique',
        },
        slug: 'intermediate-surf-coaching',
        shortDescription: {
          es: 'Para surfers que ya han surfeado y quieren mejorar',
          en: 'For surfers who have experience and want to improve',
        },
        fullDescription: {
          es: 'Programa de 3 días diseñado para surfers con experiencia que quieren perfeccionar su técnica. Incluye video análisis, coaching personalizado, y sesiones en diferentes breaks según las condiciones.',
          en: '3-day program designed for experienced surfers who want to perfect their technique. Includes video analysis, personalized coaching, and sessions at different breaks based on conditions.',
        },
        pricing: {
          priceUsd: 45,
          depositPercent: 30,
        },
        duration: {
          days: 3,
        },
        capacity: {
          minGuests: 1,
          maxGuests: 4,
        },
        skillLevel: 'intermediate',
        includes: {
          es: '- Tabla de surf o la tuya propia\n- Video análisis diario\n- Coaching en el agua\n- Transporte a diferentes breaks\n- Seguro',
          en: '- Surfboard or use your own\n- Daily video analysis\n- In-water coaching\n- Transportation to different breaks\n- Insurance',
        },
        seasonal: false,
      },
      {
        operator: puroSurf.id,
        type: 'surf_program',
        status: 'active',
        name: {
          es: 'Lleva tu surf al siguiente nivel',
          en: 'Take Your Surfing to the Next Level',
        },
        slug: 'advanced-surf-coaching',
        shortDescription: {
          es: 'Coaching avanzado para surfers experimentados',
          en: 'Advanced coaching for experienced surfers',
        },
        fullDescription: {
          es: 'Programa intensivo de 5 días para surfers avanzados que buscan perfeccionar maniobras y técnica en olas de clase mundial. Acceso a los mejores breaks de El Salvador con coaching especializado.',
          en: 'Intensive 5-day program for advanced surfers looking to perfect maneuvers and technique on world-class waves. Access to El Salvador\'s best breaks with specialized coaching.',
        },
        pricing: {
          priceUsd: 40,
          depositPercent: 30,
        },
        duration: {
          days: 5,
        },
        capacity: {
          minGuests: 1,
          maxGuests: 3,
        },
        skillLevel: 'advanced',
        includes: {
          es: '- Tu propia tabla o alquiler de performance\n- Video análisis con software profesional\n- Coaching experto en el agua\n- Acceso a breaks premium (Punta Roca, Las Flores)\n- Transporte privado\n- Seguro completo',
          en: '- Your own board or performance rental\n- Video analysis with professional software\n- Expert in-water coaching\n- Access to premium breaks (Punta Roca, Las Flores)\n- Private transportation\n- Comprehensive insurance',
        },
        seasonal: false,
      },
    ]

    for (const program of programs) {
      await payload.create({
        collection: 'bookable-items',
        data: program,
      })
      console.log(`  ✓ Created ${program.name.en}`)
    }

    // 4. Create Guides for Puro Surf
    console.log('\n👨‍🏫 Creating guides...')
    const guides = [
      {
        operator: puroSurf.id,
        name: 'Alex Martínez',
        slug: 'alex-martinez',
        bio: {
          es: 'Instructor certificado ISA con 8 años de experiencia. Surfeo las olas de El Salvador desde niño y me encanta compartir mi pasión con visitantes de todo el mundo.',
          en: 'ISA certified instructor with 8 years of experience. I\'ve been surfing El Salvador\'s waves since childhood and love sharing my passion with visitors from around the world.',
        },
        languages: ['es', 'en'],
        yearsExperience: 8,
        certifications: [
          {
            name: 'ISA Level 2 Surf Instructor',
            issuer: 'International Surfing Association',
            year: 2018,
          },
        ],
        specialties: [
          { specialty: 'Beginner instruction' },
          { specialty: 'Video analysis' },
        ],
        active: true,
        sortOrder: 1,
      },
      {
        operator: puroSurf.id,
        name: 'María López',
        slug: 'maria-lopez',
        bio: {
          es: 'Especialista en enseñar a principiantes. 5 años de experiencia ayudando a personas a ponerse de pie en su primera ola.',
          en: 'Specialist in teaching beginners. 5 years of experience helping people stand up on their first wave.',
        },
        languages: ['es'],
        yearsExperience: 5,
        certifications: [
          {
            name: 'ISA Level 1 Surf Instructor',
            issuer: 'International Surfing Association',
            year: 2020,
          },
        ],
        specialties: [
          { specialty: 'Beginner instruction' },
          { specialty: 'Kids lessons' },
        ],
        active: true,
        sortOrder: 2,
      },
    ]

    for (const guide of guides) {
      await payload.create({
        collection: 'guides',
        data: guide,
      })
      console.log(`  ✓ Created ${guide.name}`)
    }

    console.log('\n✅ Seed script completed successfully!')
    console.log('\nSeeded data:')
    console.log(`  - 8 surf spots`)
    console.log(`  - 1 demo operator (Puro Surf)`)
    console.log(`  - 3 surf programs`)
    console.log(`  - 2 guides`)

    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seed()
