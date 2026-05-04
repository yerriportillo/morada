interface Benefit {
  icon: string
  title: string
  description: string
}

interface BenefitsSectionProps {
  title: string
  subtitle: string
  benefits: Benefit[]
  variant?: 'light' | 'dark'
}

/**
 * Benefits Section
 *
 * Displays key benefits for operators or travelers
 * Can be used multiple times with different content
 */
export function BenefitsSection({
  title,
  subtitle,
  benefits,
  variant = 'light',
}: BenefitsSectionProps) {
  const isDark = variant === 'dark'

  return (
    <section className={`py-20 ${isDark ? 'bg-volcanic-black text-white' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-display font-bold mb-4 ${
            isDark ? 'text-white' : 'text-volcanic-black'
          }`}>
            {title}
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-white/80' : 'text-volcanic-black/70'
          }`}>
            {subtitle}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg ${
                isDark
                  ? 'bg-white/5 border border-white/10'
                  : 'bg-pacific-mist border border-ocean-blue/10'
              } hover:shadow-lg transition-shadow`}
            >
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className={`text-xl font-semibold mb-3 ${
                isDark ? 'text-white' : 'text-volcanic-black'
              }`}>
                {benefit.title}
              </h3>
              <p className={`${
                isDark ? 'text-white/70' : 'text-volcanic-black/70'
              }`}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
