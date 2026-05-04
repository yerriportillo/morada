import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface MarketingHeroProps {
  headline: string
  subheadline: string
  description: string
  ctaPrimary: {
    label: string
    href: string
  }
  ctaSecondary: {
    label: string
    href: string
  }
  locale: string
}

/**
 * Marketing Hero Section
 *
 * Full-screen hero for the Morada marketing landing page
 * Tells the core value proposition and brand story
 */
export function MarketingHero({
  headline,
  subheadline,
  description,
  ctaPrimary,
  ctaSecondary,
  locale,
}: MarketingHeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-ocean-blue via-indigo-deep to-volcanic-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h6V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 text-center">
        {/* Logo/Brand Mark */}
        <div className="mb-8">
          <h1 className="text-7xl md:text-8xl font-display font-bold mb-2 tracking-tight">
            Morada
          </h1>
          <div className="text-sm md:text-base text-white/80 font-mono tracking-widest uppercase">
            {subheadline}
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-3xl md:text-5xl font-display font-semibold max-w-4xl mx-auto mb-6 leading-tight">
          {headline}
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
          {description}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href={ctaPrimary.href}>
            <Button variant="primary" size="lg" className="bg-white text-ocean-blue hover:bg-sand-white min-w-[200px]">
              {ctaPrimary.label}
            </Button>
          </Link>
          <Link href={ctaSecondary.href}>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 min-w-[200px]">
              {ctaSecondary.label}
            </Button>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <svg
            className="w-6 h-6 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
