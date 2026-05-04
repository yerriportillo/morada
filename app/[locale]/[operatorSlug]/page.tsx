import { notFound } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { mockOperators, type MockOperator } from '@/lib/mockData/operators'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProgramsSection } from '@/components/sections/ProgramsSection'
import { GuidesSection } from '@/components/sections/GuidesSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { CommunitySection } from '@/components/sections/CommunitySection'
import { ImpactMetricsCounter } from '@/components/sections/ImpactMetricsCounter'

interface OperatorPageProps {
  params: {
    locale: string
    operatorSlug: string
  }
}

export default function OperatorPage({ params }: OperatorPageProps) {
  const { operatorSlug, locale } = params
  const t = useTranslations()
  const currentLocale = locale as 'es' | 'en'

  // Get operator data (mock for now, will be replaced with Payload CMS in Phase 11+)
  const operator =
    mockOperators[operatorSlug as keyof typeof mockOperators] as MockOperator

  if (!operator) {
    notFound()
  }

  // Helper to get localized value
  const getLocalized = (value: { es: string; en: string }) => value[currentLocale]

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title={getLocalized(operator.name)}
        tagline={getLocalized(operator.tagline)}
        brandColor={operator.brandColor}
        ctaPrimary={{
          label: t('cta.viewPrograms'),
          href: '#programs',
        }}
        ctaSecondary={{
          label: t('nav.contact'),
          href: '#contact',
        }}
      />

      {/* Programs Section (Moradas Costeras) */}
      {operator.type === 'moradas_costeras' && operator.programs && (
        <ProgramsSection
          title={t('sections.programs')}
          programs={operator.programs.map((program) => ({
            ...program,
            name: getLocalized(program.name),
            shortDescription: getLocalized(program.shortDescription),
          }))}
          brandColor={operator.brandColor}
          bookingUrl={`/${locale}/${operatorSlug}/book`}
          labels={{
            from: t('common.from'),
            days: (count: number) => t('common.days', { count }),
            hours: (count: number) => t('common.hours', { count }),
            capacity: t('common.capacity'),
            guests: (count: number) => t('common.guests', { count }),
            bookNow: t('cta.bookNow'),
          }}
          skillLevelLabels={{
            beginner: t('surf.levels.beginner'),
            intermediate: t('surf.levels.intermediate'),
            advanced: t('surf.levels.advanced'),
            all: t('surf.levels.all'),
          }}
        />
      )}

      {/* Guides Section */}
      {operator.guides && (
        <GuidesSection
          title={t('sections.guides')}
          guides={operator.guides.map((guide) => ({
            ...guide,
            bio: getLocalized(guide.bio),
          }))}
          brandColor={operator.brandColor}
          labels={{
            languages: t('community.languages'),
            yearsExperience: t('common.yearsExperience', {
              count: 0,
            }).split(' ')[1], // Extract "años" or "years"
          }}
        />
      )}

      {/* About Section */}
      <AboutSection
        title={t('sections.about')}
        content={getLocalized(operator.about)}
        brandColor={operator.brandColor}
      />

      {/* Community Section */}
      {operator.communityMembers && operator.communityMembers.length > 0 && (
        <CommunitySection
          members={operator.communityMembers}
          title={t('sections.community')}
          subtitle={
            currentLocale === 'es'
              ? 'Conoce a las personas que hacen posible esta experiencia'
              : 'Meet the people who make this experience possible'
          }
          locale={currentLocale}
        />
      )}

      {/* Impact Metrics */}
      {operator.impactMetrics && operator.impactMetrics.length > 0 && (
        <ImpactMetricsCounter
          metrics={operator.impactMetrics}
          title={t('sections.impact')}
          subtitle={
            currentLocale === 'es'
              ? 'Nuestro compromiso con la comunidad y el medio ambiente'
              : 'Our commitment to the community and environment'
          }
          locale={currentLocale}
        />
      )}

      {/* Contact Section */}
      <ContactSection
        title={t('contact.getInTouch')}
        whatsapp={operator.contact.whatsapp}
        email={operator.contact.email}
        instagram={operator.contact.instagram}
        address={getLocalized(operator.location.address)}
        taxiInstructions={getLocalized(operator.location.taxiInstructions)}
        brandColor={operator.brandColor}
        labels={{
          getInTouch: t('contact.getInTouch'),
          whatsapp: t('contact.whatsapp'),
          email: t('contact.email'),
          instagram: t('contact.instagram'),
          address: t('contact.address'),
          taxiInstructions: t('contact.taxiInstructions'),
          whatsappUs: t('cta.whatsappUs'),
        }}
      />
    </div>
  )
}
