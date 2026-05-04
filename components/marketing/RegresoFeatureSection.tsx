import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface RegresoFeatureSectionProps {
  title: string
  subtitle: string
  description: string
  features: {
    icon: string
    title: string
    description: string
  }[]
  ctaLabel: string
  ctaHref: string
  locale: string
}

/**
 * Regreso Module Feature Section
 *
 * Highlights Morada's unique diaspora-return feature
 * that helps operators connect with Salvadorans living abroad
 */
export function RegresoFeatureSection({
  title,
  subtitle,
  description,
  features,
  ctaLabel,
  ctaHref,
  locale,
}: RegresoFeatureSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-deep to-volcanic-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-9xl">🇸🇻</div>
        <div className="absolute bottom-10 right-10 text-9xl">🇸🇻</div>
        <div className="absolute top-1/2 left-1/3 text-6xl transform -translate-y-1/2">🇸🇻</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">🇸🇻</div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {title}
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">
            {subtitle}
          </p>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-colors"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/80 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href={ctaHref}>
            <Button
              variant="primary"
              size="lg"
              className="bg-sunset-coral hover:bg-sunset-coral/90 text-white border-none"
            >
              {ctaLabel}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
