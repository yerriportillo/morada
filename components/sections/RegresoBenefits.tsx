import { Card, CardContent } from '@/components/ui/Card'

interface Benefit {
  icon: string
  title: string
  description: string
}

interface RegresoBenefitsProps {
  title: string
  benefits: Benefit[]
  brandColor: string
}

export function RegresoBenefits({ title, benefits, brandColor }: RegresoBenefitsProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl md:text-5xl font-display font-bold text-center mb-16"
          style={{ color: brandColor }}
        >
          {title}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card key={index} variant="bordered" className="text-center">
              <CardContent className="pt-8 pb-6">
                {/* Icon */}
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl"
                  style={{ backgroundColor: `${brandColor}15` }}
                >
                  {benefit.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-display font-semibold text-volcanic-black mb-3">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-volcanic-black/70 leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
