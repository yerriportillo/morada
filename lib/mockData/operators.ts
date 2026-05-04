/**
 * Mock operator data for UI development
 * This will be replaced with real Payload CMS data in Phase 11+
 */

export const mockOperators = {
  'puro-surf': {
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
    about: {
      es: 'Somos una escuela de surf familiar en el corazón de El Zonte. Desde 2015, hemos ayudado a miles de personas a aprender a surfear en las olas de El Salvador. Nuestro equipo de instructores certificados está dedicado a brindarte la mejor experiencia de surf, sin importar tu nivel.',
      en: "We're a family-run surf school in the heart of El Zonte. Since 2015, we've helped thousands of people learn to surf in El Salvador's waves. Our team of certified instructors is dedicated to giving you the best surf experience, regardless of your level.",
    },
    regresoModule: {
      enabled: true,
      headline: {
        es: 'Vuelve a tus raíces surfeando las olas de casa',
        en: 'Return to your roots surfing the waves of home',
      },
    },
    programs: [
      {
        id: '1',
        name: {
          es: 'Surf por primera vez',
          en: 'First Time Surfing',
        },
        slug: 'beginner-surf-lessons',
        shortDescription: {
          es: 'Aprende a surfear desde cero con instructores certificados',
          en: 'Learn to surf from scratch with certified instructors',
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
        },
        skillLevel: 'beginner',
      },
      {
        id: '2',
        name: {
          es: 'Mejora tu técnica',
          en: 'Improve Your Technique',
        },
        slug: 'intermediate-surf-coaching',
        shortDescription: {
          es: 'Para surfers que ya han surfeado y quieren mejorar',
          en: 'For surfers who have experience and want to improve',
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
      },
      {
        id: '3',
        name: {
          es: 'Lleva tu surf al siguiente nivel',
          en: 'Take Your Surfing to the Next Level',
        },
        slug: 'advanced-surf-coaching',
        shortDescription: {
          es: 'Coaching avanzado para surfers experimentados',
          en: 'Advanced coaching for experienced surfers',
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
      },
    ],
    guides: [
      {
        id: '1',
        name: 'Alex Martínez',
        slug: 'alex-martinez',
        bio: {
          es: 'Instructor certificado ISA con 8 años de experiencia. Surfeo las olas de El Salvador desde niño y me encanta compartir mi pasión con visitantes de todo el mundo.',
          en: "ISA certified instructor with 8 years of experience. I've been surfing El Salvador's waves since childhood and love sharing my passion with visitors from around the world.",
        },
        languages: ['es', 'en'],
        yearsExperience: 8,
      },
      {
        id: '2',
        name: 'María López',
        slug: 'maria-lopez',
        bio: {
          es: 'Especialista en enseñar a principiantes. 5 años de experiencia ayudando a personas a ponerse de pie en su primera ola.',
          en: 'Specialist in teaching beginners. 5 years of experience helping people stand up on their first wave.',
        },
        languages: ['es'],
        yearsExperience: 5,
      },
    ],
    nearbySurfSpots: [
      { name: 'El Zonte', distance: 0, skillLevel: 'beginner' },
      { name: 'El Sunzal', distance: 3, skillLevel: 'intermediate' },
      { name: 'El Tunco', distance: 1, skillLevel: 'beginner' },
    ],
    // Community features (for demonstrating Phase 9 components)
    communityMembers: [
      {
        name: 'José Morales',
        role: {
          es: 'Instructor local y embajador de la comunidad',
          en: 'Local instructor and community ambassador',
        },
        story: {
          es: 'Nací y crecí en El Zonte. El surf cambió mi vida cuando tenía 12 años. Ahora, como instructor en Puro Surf, comparto mi amor por las olas con visitantes de todo el mundo. Ver a alguien ponerse de pie en su primera ola nunca deja de emocionarme. El turismo sostenible nos ha permitido mantener nuestra playa limpia y nuestra comunidad unida.',
          en: 'I was born and raised in El Zonte. Surfing changed my life when I was 12 years old. Now, as an instructor at Puro Surf, I share my love for the waves with visitors from around the world. Seeing someone stand up on their first wave never fails to excite me. Sustainable tourism has allowed us to keep our beach clean and our community united.',
        },
      },
    ],
    impactMetrics: [
      {
        label: { es: 'Limpieza', en: 'Cleanup' },
        value: 150,
        unit: { es: 'kg plástico removido', en: 'kg plastic removed' },
        icon: '🌊',
      },
      {
        label: { es: 'Educación', en: 'Education' },
        value: 25,
        unit: { es: 'niños en programa surf', en: 'kids in surf program' },
        icon: '🏄',
      },
      {
        label: { es: 'Local', en: 'Local' },
        value: 90,
        unit: { es: '% empleados locales', en: '% local employees' },
        icon: '👥',
      },
      {
        label: { es: 'Conservación', en: 'Conservation' },
        value: 5,
        unit: { es: 'hectáreas playa protegida', en: 'hectares beach protected' },
        icon: '🌴',
      },
    ],
  },
}

export type MockOperator = typeof mockOperators['puro-surf']
