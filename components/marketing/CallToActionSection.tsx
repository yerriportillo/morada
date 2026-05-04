import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface CallToActionSectionProps {
  title: string
  description: string
  ctaPrimary: {
    label: string
    href: string
  }
  ctaSecondary?: {
    label: string
    href: string
  }
  stats?: {
    label: string
    value: string
  }[]
}

/**
 * Call To Action Section
 *
 * Final CTA to encourage operators to join Morada
 * Includes optional stats/social proof
 */
export function CallToActionSection({
  title,
  description,
  ctaPrimary,
  ctaSecondary,
  stats,
}: CallToActionSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-ocean-blue to-indigo-deep text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title and Description */}
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            {title}
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            {description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href={ctaPrimary.href}>
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-ocean-blue hover:bg-sand-white border-none min-w-[200px]"
              >
                {ctaPrimary.label}
              </Button>
            </Link>
            {ctaSecondary && (
              <Link href={ctaSecondary.href}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 min-w-[200px]"
                >
                  {ctaSecondary.label}
                </Button>
              </Link>
            )}
          </div>

          {/* Stats (Optional) */}
          {stats && stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/20">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
