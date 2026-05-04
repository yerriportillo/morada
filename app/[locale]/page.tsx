import { useTranslations, useLocale } from 'next-intl'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MarketingHero } from '@/components/marketing/MarketingHero'
import { OperatorTypesSection } from '@/components/marketing/OperatorTypesSection'
import { RegresoFeatureSection } from '@/components/marketing/RegresoFeatureSection'
import { BenefitsSection } from '@/components/marketing/BenefitsSection'
import { CallToActionSection } from '@/components/marketing/CallToActionSection'

export default function HomePage() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <MarketingHero
          headline={t('marketing.hero.headline')}
          subheadline={t('marketing.hero.subheadline')}
          description={t('marketing.hero.description')}
          ctaPrimary={{
            label: t('marketing.hero.ctaPrimary'),
            href: `/${locale}/join`, // TODO: Create join page in future
          }}
          ctaSecondary={{
            label: t('marketing.hero.ctaSecondary'),
            href: `#operator-types`,
          }}
          locale={locale}
        />

        {/* Operator Types Section */}
        <div id="operator-types">
          <OperatorTypesSection
            title={t('marketing.operatorTypes.title')}
            subtitle={t('marketing.operatorTypes.subtitle')}
            operatorTypes={[
              {
                id: 'moradas_costeras',
                icon: '🏄',
                name: t('marketing.operatorTypes.moradasCosteras.name'),
                description: t('marketing.operatorTypes.moradasCosteras.description'),
                features: [
                  t('marketing.operatorTypes.moradasCosteras.features.0'),
                  t('marketing.operatorTypes.moradasCosteras.features.1'),
                  t('marketing.operatorTypes.moradasCosteras.features.2'),
                  t('marketing.operatorTypes.moradasCosteras.features.3'),
                ],
              },
              {
                id: 'refugio',
                icon: '🏡',
                name: t('marketing.operatorTypes.refugio.name'),
                description: t('marketing.operatorTypes.refugio.description'),
                features: [
                  t('marketing.operatorTypes.refugio.features.0'),
                  t('marketing.operatorTypes.refugio.features.1'),
                  t('marketing.operatorTypes.refugio.features.2'),
                  t('marketing.operatorTypes.refugio.features.3'),
                ],
              },
              {
                id: 'guia',
                icon: '🗺️',
                name: t('marketing.operatorTypes.guia.name'),
                description: t('marketing.operatorTypes.guia.description'),
                features: [
                  t('marketing.operatorTypes.guia.features.0'),
                  t('marketing.operatorTypes.guia.features.1'),
                  t('marketing.operatorTypes.guia.features.2'),
                  t('marketing.operatorTypes.guia.features.3'),
                ],
              },
              {
                id: 'comunidad',
                icon: '🤝',
                name: t('marketing.operatorTypes.comunidad.name'),
                description: t('marketing.operatorTypes.comunidad.description'),
                features: [
                  t('marketing.operatorTypes.comunidad.features.0'),
                  t('marketing.operatorTypes.comunidad.features.1'),
                  t('marketing.operatorTypes.comunidad.features.2'),
                  t('marketing.operatorTypes.comunidad.features.3'),
                ],
              },
            ]}
          />
        </div>

        {/* Regreso Feature Section */}
        <RegresoFeatureSection
          title={t('marketing.regreso.title')}
          subtitle={t('marketing.regreso.subtitle')}
          description={t('marketing.regreso.description')}
          features={[
            {
              icon: t('marketing.regreso.features.0.icon'),
              title: t('marketing.regreso.features.0.title'),
              description: t('marketing.regreso.features.0.description'),
            },
            {
              icon: t('marketing.regreso.features.1.icon'),
              title: t('marketing.regreso.features.1.title'),
              description: t('marketing.regreso.features.1.description'),
            },
            {
              icon: t('marketing.regreso.features.2.icon'),
              title: t('marketing.regreso.features.2.title'),
              description: t('marketing.regreso.features.2.description'),
            },
          ]}
          ctaLabel={t('marketing.regreso.cta')}
          ctaHref={`/${locale}/puro-surf/regreso`} // Example Regreso page
          locale={locale}
        />

        {/* Operator Benefits */}
        <BenefitsSection
          title={t('marketing.operatorBenefits.title')}
          subtitle={t('marketing.operatorBenefits.subtitle')}
          benefits={[
            {
              icon: t('marketing.operatorBenefits.benefits.0.icon'),
              title: t('marketing.operatorBenefits.benefits.0.title'),
              description: t('marketing.operatorBenefits.benefits.0.description'),
            },
            {
              icon: t('marketing.operatorBenefits.benefits.1.icon'),
              title: t('marketing.operatorBenefits.benefits.1.title'),
              description: t('marketing.operatorBenefits.benefits.1.description'),
            },
            {
              icon: t('marketing.operatorBenefits.benefits.2.icon'),
              title: t('marketing.operatorBenefits.benefits.2.title'),
              description: t('marketing.operatorBenefits.benefits.2.description'),
            },
            {
              icon: t('marketing.operatorBenefits.benefits.3.icon'),
              title: t('marketing.operatorBenefits.benefits.3.title'),
              description: t('marketing.operatorBenefits.benefits.3.description'),
            },
            {
              icon: t('marketing.operatorBenefits.benefits.4.icon'),
              title: t('marketing.operatorBenefits.benefits.4.title'),
              description: t('marketing.operatorBenefits.benefits.4.description'),
            },
            {
              icon: t('marketing.operatorBenefits.benefits.5.icon'),
              title: t('marketing.operatorBenefits.benefits.5.title'),
              description: t('marketing.operatorBenefits.benefits.5.description'),
            },
          ]}
          variant="light"
        />

        {/* Traveler Benefits */}
        <BenefitsSection
          title={t('marketing.travelerBenefits.title')}
          subtitle={t('marketing.travelerBenefits.subtitle')}
          benefits={[
            {
              icon: t('marketing.travelerBenefits.benefits.0.icon'),
              title: t('marketing.travelerBenefits.benefits.0.title'),
              description: t('marketing.travelerBenefits.benefits.0.description'),
            },
            {
              icon: t('marketing.travelerBenefits.benefits.1.icon'),
              title: t('marketing.travelerBenefits.benefits.1.title'),
              description: t('marketing.travelerBenefits.benefits.1.description'),
            },
            {
              icon: t('marketing.travelerBenefits.benefits.2.icon'),
              title: t('marketing.travelerBenefits.benefits.2.title'),
              description: t('marketing.travelerBenefits.benefits.2.description'),
            },
            {
              icon: t('marketing.travelerBenefits.benefits.3.icon'),
              title: t('marketing.travelerBenefits.benefits.3.title'),
              description: t('marketing.travelerBenefits.benefits.3.description'),
            },
            {
              icon: t('marketing.travelerBenefits.benefits.4.icon'),
              title: t('marketing.travelerBenefits.benefits.4.title'),
              description: t('marketing.travelerBenefits.benefits.4.description'),
            },
            {
              icon: t('marketing.travelerBenefits.benefits.5.icon'),
              title: t('marketing.travelerBenefits.benefits.5.title'),
              description: t('marketing.travelerBenefits.benefits.5.description'),
            },
          ]}
          variant="dark"
        />

        {/* Final CTA */}
        <CallToActionSection
          title={t('marketing.finalCta.title')}
          description={t('marketing.finalCta.description')}
          ctaPrimary={{
            label: t('marketing.finalCta.ctaPrimary'),
            href: `/${locale}/join`, // TODO: Create join page
          }}
          ctaSecondary={{
            label: t('marketing.finalCta.ctaSecondary'),
            href: `mailto:hello@morada.sv`, // TODO: Update with real contact
          }}
          stats={[
            {
              value: t('marketing.finalCta.stats.0.value'),
              label: t('marketing.finalCta.stats.0.label'),
            },
            {
              value: t('marketing.finalCta.stats.1.value'),
              label: t('marketing.finalCta.stats.1.label'),
            },
            {
              value: t('marketing.finalCta.stats.2.value'),
              label: t('marketing.finalCta.stats.2.label'),
            },
            {
              value: t('marketing.finalCta.stats.3.value'),
              label: t('marketing.finalCta.stats.3.label'),
            },
          ]}
        />
      </main>
      <Footer />
    </>
  )
}
