import { notFound, redirect } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { mockOperators, type MockOperator } from '@/lib/mockData/operators'
import { RegresoHero } from '@/components/sections/RegresoHero'
import { RegresoBenefits } from '@/components/sections/RegresoBenefits'
import { PhotoCollage } from '@/components/sections/PhotoCollage'
import { ProgramsSection } from '@/components/sections/ProgramsSection'

interface RegresoPageProps {
  params: {
    locale: string
    operatorSlug: string
  }
}

export default function RegresoPage({ params }: RegresoPageProps) {
  const { operatorSlug, locale } = params
  const t = useTranslations()
  const currentLocale = locale as 'es' | 'en'

  // Get operator data
  const operator = mockOperators[operatorSlug as keyof typeof mockOperators] as MockOperator

  if (!operator) {
    notFound()
  }

  // Check if Regreso module is enabled
  if (!operator.regresoModule?.enabled) {
    redirect(`/${locale}/${operatorSlug}`)
  }

  // Helper to get localized value
  const getLocalized = (value: { es: string; en: string }) => value[currentLocale]

  // Get custom headline or use default
  const headline = operator.regresoModule.headline
    ? getLocalized(operator.regresoModule.headline)
    : t('regreso.headline')

  // Scroll to programs section
  const scrollToPrograms = () => {
    const programsSection = document.getElementById('programs')
    programsSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      {/* Regreso Hero */}
      <RegresoHero
        headline={headline}
        subheadline={t('regreso.subheadline')}
        intro={t('regreso.intro')}
        brandColor={operator.brandColor}
        ctaLabel={t('regreso.cta')}
        onCTAClick={scrollToPrograms}
      />

      {/* Photo Collage of El Salvador */}
      <PhotoCollage
        title={getLocalized(operator.name)}
        subtitle={
          currentLocale === 'es'
            ? 'Tu conexión con El Salvador te espera'
            : 'Your connection to El Salvador awaits'
        }
      />

      {/* Why Regreso? Benefits */}
      <RegresoBenefits
        title={t('regreso.whyRegreso')}
        benefits={[
          {
            icon: '🌱',
            title:
              currentLocale === 'es'
                ? 'Conecta con tus raíces'
                : 'Connect with your roots',
            description: t('regreso.benefits.culturalConnection'),
          },
          {
            icon: '🤝',
            title:
              currentLocale === 'es'
                ? 'Guías que entienden'
                : 'Guides who understand',
            description: t('regreso.benefits.localGuides'),
          },
          {
            icon: '✨',
            title:
              currentLocale === 'es'
                ? 'Experiencias auténticas'
                : 'Authentic experiences',
            description: t('regreso.benefits.authenticExperience'),
          },
          {
            icon: '💚',
            title:
              currentLocale === 'es'
                ? 'Apoya a tu comunidad'
                : 'Support your community',
            description: t('regreso.benefits.support'),
          },
        ]}
        brandColor={operator.brandColor}
      />

      {/* Programs Section with special Regreso CTA */}
      {operator.programs && (
        <div id="programs">
          <ProgramsSection
            title={
              currentLocale === 'es'
                ? 'Elige tu experiencia de regreso'
                : 'Choose your return experience'
            }
            programs={operator.programs.map((program) => ({
              ...program,
              name: getLocalized(program.name),
              shortDescription: getLocalized(program.shortDescription),
            }))}
            brandColor={operator.brandColor}
            bookingUrl={`/${locale}/${operatorSlug}/book?regreso=true`}
            labels={{
              from: t('common.from'),
              days: (count: number) => t('common.days', { count }),
              hours: (count: number) => t('common.hours', { count }),
              capacity: t('common.capacity'),
              guests: (count: number) => t('common.guests', { count }),
              bookNow: t('regreso.cta'), // "Book with Pride"
            }}
            skillLevelLabels={{
              beginner: t('surf.levels.beginner'),
              intermediate: t('surf.levels.intermediate'),
              advanced: t('surf.levels.advanced'),
              all: t('surf.levels.all'),
            }}
          />
        </div>
      )}

      {/* Final CTA */}
      <section className="py-20 bg-pacific-mist">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-volcanic-black mb-6">
            {currentLocale === 'es'
              ? 'Es tiempo de volver a casa'
              : "It's time to come home"}
          </h2>
          <p className="text-lg text-volcanic-black/70 mb-8 max-w-2xl mx-auto">
            {currentLocale === 'es'
              ? 'Miles de salvadoreños en el extranjero ya han redescubierto sus raíces. Tú eres el siguiente.'
              : "Thousands of Salvadorans abroad have already rediscovered their roots. You're next."}
          </p>
          <div className="text-6xl mb-6">🇸🇻</div>
        </div>
      </section>
    </div>
  )
}
