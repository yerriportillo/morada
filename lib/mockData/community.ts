/**
 * Mock community data for UI development
 * Community members and impact metrics for sustainable tourism operators
 */

export const mockCommunityMembers = [
  {
    name: 'María González',
    role: {
      es: 'Artesana y Guía Cultural',
      en: 'Artisan and Cultural Guide',
    },
    story: {
      es: 'Crecí en esta comunidad, aprendiendo el arte de tejer cestas de mis abuelas. Hace tres años, comencé a compartir estas tradiciones con visitantes de todo el mundo. Cada vez que enseño a alguien a tejer, siento que estoy preservando nuestra cultura. El turismo sostenible nos ha permitido mantener nuestras tradiciones vivas mientras generamos ingresos para nuestras familias. Mi hija ahora también está aprendiendo el oficio, y sueño con que ella continúe esta tradición.',
      en: 'I grew up in this community, learning the art of basket weaving from my grandmothers. Three years ago, I started sharing these traditions with visitors from around the world. Every time I teach someone to weave, I feel like I\'m preserving our culture. Sustainable tourism has allowed us to keep our traditions alive while generating income for our families. My daughter is now also learning the craft, and I dream of her continuing this tradition.',
    },
    photoUrl: undefined, // Placeholder for real photo
  },
  {
    name: 'Carlos Martínez',
    role: {
      es: 'Guardián de Manglares',
      en: 'Mangrove Guardian',
    },
    story: {
      es: 'Durante veinte años fui pescador, viendo cómo los manglares desaparecían poco a poco. Hace cinco años, me uní al proyecto de reforestación de manglares. Ahora lidero tours educativos donde explico la importancia de estos ecosistemas. Hemos plantado más de 10,000 mangles con la ayuda de visitantes. Ver regresar las aves y los peces me llena de esperanza. Mis hijos ahora entienden que proteger la naturaleza es proteger nuestro futuro.',
      en: 'For twenty years I was a fisherman, watching the mangroves slowly disappear. Five years ago, I joined the mangrove reforestation project. Now I lead educational tours where I explain the importance of these ecosystems. We\'ve planted over 10,000 mangroves with the help of visitors. Seeing the birds and fish return fills me with hope. My children now understand that protecting nature is protecting our future.',
    },
    photoUrl: undefined,
  },
  {
    name: 'Ana Ramírez',
    role: {
      es: 'Chef de Cocina Tradicional',
      en: 'Traditional Cuisine Chef',
    },
    story: {
      es: 'La cocina salvadoreña es mi pasión. Aprendí de mi madre y abuela, quienes me enseñaron secretos de recetas transmitidas por generaciones. Ahora ofrezco clases de cocina donde los visitantes aprenden a hacer pupusas, tamales y atol de elote desde cero. Uso solo ingredientes locales y orgánicos de productores de la comunidad. Cada clase es una celebración de nuestra identidad culinaria. Ver a personas de otros países enamorarse de nuestros sabores es increíble.',
      en: 'Salvadoran cuisine is my passion. I learned from my mother and grandmother, who taught me recipe secrets passed down through generations. Now I offer cooking classes where visitors learn to make pupusas, tamales, and atol de elote from scratch. I use only local and organic ingredients from community producers. Each class is a celebration of our culinary identity. Seeing people from other countries fall in love with our flavors is incredible.',
    },
    photoUrl: undefined,
  },
  {
    name: 'Roberto Flores',
    role: {
      es: 'Guía de Aves y Conservacionista',
      en: 'Birding Guide and Conservationist',
    },
    story: {
      es: 'Desde niño me fascinaban las aves de El Salvador. Estudié biología y regresé a mi comunidad para trabajar en conservación. Como guía de avistamiento de aves, comparto mi conocimiento con turistas que buscan especies endémicas como el torogoz. Hemos creado un corredor biológico que protege 200 hectáreas de bosque. Trabajamos con 15 familias locales que ahora son guardianes del bosque. El ecoturismo nos demuestra que la naturaleza vale más viva que destruida.',
      en: 'Since I was a child, I was fascinated by El Salvador\'s birds. I studied biology and returned to my community to work in conservation. As a birding guide, I share my knowledge with tourists seeking endemic species like the torogoz. We\'ve created a biological corridor that protects 200 hectares of forest. We work with 15 local families who are now forest guardians. Ecotourism shows us that nature is worth more alive than destroyed.',
    },
    photoUrl: undefined,
  },
  {
    name: 'Lucía Hernández',
    role: {
      es: 'Coordinadora de Educación Comunitaria',
      en: 'Community Education Coordinator',
    },
    story: {
      es: 'Trabajo con niños y jóvenes de la comunidad, enseñándoles sobre sostenibilidad y turismo responsable. Hemos creado un programa educativo donde los estudiantes aprenden inglés mientras guían a visitantes por senderos ecológicos. Ver a los jóvenes con confianza, orgullosos de su cultura y su tierra, es mi mayor recompensa. Muchos de mis estudiantes ahora trabajan en turismo sostenible, algunos han ido a la universidad. El turismo está cambiando el futuro de nuestra comunidad.',
      en: 'I work with children and youth in the community, teaching them about sustainability and responsible tourism. We\'ve created an educational program where students learn English while guiding visitors on ecological trails. Seeing young people confident and proud of their culture and land is my greatest reward. Many of my students now work in sustainable tourism, some have gone to university. Tourism is changing the future of our community.',
    },
    photoUrl: undefined,
  },
  {
    name: 'José Morales',
    role: {
      es: 'Caficultor y Agro-turista',
      en: 'Coffee Farmer and Agro-tourism Host',
    },
    story: {
      es: 'Mi familia cultiva café desde hace cuatro generaciones. Hace diez años, la crisis del café casi nos obliga a abandonar la finca. Decidimos abrir nuestras puertas al turismo, ofreciendo tours de café desde la semilla hasta la taza. Los visitantes cosechan, tuestan y preparan su propio café. Esto nos ha permitido obtener precios justos sin intermediarios. Ahora mis hijos quieren quedarse en la finca, algo que nunca imaginé. El agro-turismo salvó nuestra tierra y nuestra tradición.',
      en: 'My family has grown coffee for four generations. Ten years ago, the coffee crisis almost forced us to abandon the farm. We decided to open our doors to tourism, offering coffee tours from seed to cup. Visitors harvest, roast, and prepare their own coffee. This has allowed us to get fair prices without intermediaries. Now my children want to stay on the farm, something I never imagined. Agro-tourism saved our land and our tradition.',
    },
    photoUrl: undefined,
  },
]

export const mockImpactMetrics = [
  {
    label: {
      es: 'Conservación',
      en: 'Conservation',
    },
    value: 250,
    unit: {
      es: 'árboles plantados',
      en: 'trees planted',
    },
    icon: '🌳',
  },
  {
    label: {
      es: 'Comunidad',
      en: 'Community',
    },
    value: 45,
    unit: {
      es: 'familias apoyadas',
      en: 'families supported',
    },
    icon: '👨‍👩‍👧‍👦',
  },
  {
    label: {
      es: 'Educación',
      en: 'Education',
    },
    value: 120,
    unit: {
      es: 'estudiantes becados',
      en: 'students sponsored',
    },
    icon: '📚',
  },
  {
    label: {
      es: 'Biodiversidad',
      en: 'Biodiversity',
    },
    value: 15,
    unit: {
      es: 'hectáreas protegidas',
      en: 'hectares protected',
    },
    icon: '🦜',
  },
  {
    label: {
      es: 'Océano',
      en: 'Ocean',
    },
    value: 500,
    unit: {
      es: 'kg de plástico removido',
      en: 'kg plastic removed',
    },
    icon: '🌊',
  },
  {
    label: {
      es: 'Economía Local',
      en: 'Local Economy',
    },
    value: 85,
    unit: {
      es: '% compras locales',
      en: '% local purchases',
    },
    icon: '🏪',
  },
]

export type CommunityMember = typeof mockCommunityMembers[0]
export type ImpactMetric = typeof mockImpactMetrics[0]
