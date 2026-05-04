import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'

interface OperatorType {
  id: string
  icon: string
  name: string
  description: string
  features: string[]
}

interface OperatorTypesSectionProps {
  title: string
  subtitle: string
  operatorTypes: OperatorType[]
}

/**
 * Operator Types Showcase Section
 *
 * Displays the 4 types of tourism operators that Morada serves:
 * - Moradas Costeras (Surf Camps)
 * - Refugio (Eco-Lodges)
 * - Guía (Tour Operators)
 * - Comunidad (Community Cooperatives)
 */
export function OperatorTypesSection({
  title,
  subtitle,
  operatorTypes,
}: OperatorTypesSectionProps) {
  return (
    <section className="py-20 bg-sand-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-volcanic-black mb-4">
            {title}
          </h2>
          <p className="text-xl text-volcanic-black/70 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Operator Types Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {operatorTypes.map((type) => (
            <Card
              key={type.id}
              variant="bordered"
              className="hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader>
                <div className="flex items-start gap-4 mb-3">
                  <div className="text-5xl">{type.icon}</div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{type.name}</CardTitle>
                    <CardDescription className="text-base">
                      {type.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  {type.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-ocean-blue flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-volcanic-black/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
