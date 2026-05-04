import { Button } from '@/components/ui/Button'

interface HeroSectionProps {
  title: string
  tagline: string
  brandColor: string
  backgroundImage?: string
  ctaPrimary?: {
    label: string
    href: string
  }
  ctaSecondary?: {
    label: string
    href: string
  }
}

export function HeroSection({
  title,
  tagline,
  brandColor,
  backgroundImage,
  ctaPrimary,
  ctaSecondary,
}: HeroSectionProps) {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-volcanic-black/60 to-volcanic-black/40">
        {backgroundImage ? (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}dd 100%)`,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 drop-shadow-lg">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
          {tagline}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {ctaPrimary && (
            <Button
              variant="primary"
              size="lg"
              className="shadow-xl"
              style={{ backgroundColor: brandColor }}
            >
              {ctaPrimary.label}
            </Button>
          )}
          {ctaSecondary && (
            <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20">
              {ctaSecondary.label}
            </Button>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/80"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}
