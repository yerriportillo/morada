/**
 * Mock surf spot data for UI development
 * Based on the 8 El Salvador surf spots from the seed script
 */

export const mockSurfSpots = [
  {
    slug: 'punta-roca',
    name: 'Punta Roca',
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
      es: 'Una de las mejores olas derechas del mundo. Requiere experiencia avanzada. Puede alcanzar más de 3 metros en días grandes.',
      en: "One of the best right point breaks in the world. Requires advanced experience. Can reach over 10 feet on big days.",
    },
  },
  {
    slug: 'el-sunzal',
    name: 'El Sunzal',
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
      es: 'Point break consistente, ideal para nivel intermedio. Funciona casi todos los días con swell.',
      en: 'Consistent point break, ideal for intermediate level. Works almost every day with swell.',
    },
  },
  {
    slug: 'el-zonte',
    name: 'El Zonte',
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
      es: 'Beach break amigable con buena comunidad surf. Perfecto para progresión.',
      en: 'Friendly beach break with good surf community. Perfect for progression.',
    },
  },
  {
    slug: 'el-tunco',
    name: 'El Tunco',
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
      es: 'El pueblo surf más popular de El Salvador. Perfecto para principiantes y ambiente festivo.',
      en: "The most popular surf town in El Salvador. Perfect for beginners and party atmosphere.",
    },
  },
  {
    slug: 'las-flores',
    name: 'Las Flores',
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
      es: 'Ola de clase mundial en la costa este. Requiere experiencia. Menos crowded que La Libertad.',
      en: 'World-class wave on the eastern coast. Requires experience. Less crowded than La Libertad.',
    },
  },
  {
    slug: 'punta-mango',
    name: 'Punta Mango',
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
      es: 'Una de las mejores olas de El Salvador. Remota y poderosa. Acceso requiere barco o caminata.',
      en: "One of El Salvador's best waves. Remote and powerful. Access requires boat or hike.",
    },
  },
  {
    slug: 'el-cuco',
    name: 'El Cuco',
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
      es: 'Beach break tranquilo en la costa este. Bueno para principiantes que buscan menos multitud.',
      en: 'Mellow beach break on the eastern coast. Good for beginners seeking less crowds.',
    },
  },
  {
    slug: 'la-bocana',
    name: 'La Bocana',
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
      es: 'River mouth con olas rápidas y huecas. Buena para barrels cuando está encendido.',
      en: 'River mouth with fast, hollow waves. Good for barrels when it\'s firing.',
    },
  },
]

export type SurfSpot = typeof mockSurfSpots[0]
