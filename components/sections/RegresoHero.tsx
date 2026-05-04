import { Button } from '@/components/ui/Button'

interface RegresoHeroProps {
  headline: string
  subheadline: string
  intro: string
  brandColor: string
  ctaLabel: string
  onCTAClick?: () => void
}

export function RegresoHero({
  headline,
  subheadline,
  intro,
  brandColor,
  ctaLabel,
  onCTAClick,
}: RegresoHeroProps) {
  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background with El Salvador imagery */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-gradient-to-br opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(135deg, #1A6B8A 0%, #2D3561 50%, #E07050 100%)',
          }}
        />
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Flag emoji or icon */}
          <div className="text-6xl mb-6">🇸🇻</div>

          <h1
            className="text-5xl md:text-7xl font-display font-bold mb-6"
            style={{ color: brandColor }}
          >
            {headline}
          </h1>

          <p className="text-2xl md:text-3xl text-volcanic-black/80 mb-6 font-medium">
            {subheadline}
          </p>

          <p className="text-lg md:text-xl text-volcanic-black/70 mb-10 leading-relaxed max-w-3xl mx-auto">
            {intro}
          </p>

          <Button
            variant="primary"
            size="lg"
            className="text-lg px-8 py-4 h-auto shadow-xl"
            style={{ backgroundColor: brandColor }}
            onClick={onCTAClick}
          >
            {ctaLabel}
          </Button>

          {/* Subtle decorative elements */}
          <div className="mt-16 flex justify-center gap-4 text-volcanic-black/40">
            <div className="w-16 h-1 rounded-full bg-current" />
            <div className="w-16 h-1 rounded-full bg-current" />
            <div className="w-16 h-1 rounded-full bg-current" />
          </div>
        </div>
      </div>
    </section>
  )
}
