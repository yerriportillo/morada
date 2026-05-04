import { CommunityMemberCard } from './CommunityMemberCard'

interface CommunityMember {
  name: string
  role: {
    es: string
    en: string
  }
  story: {
    es: string
    en: string
  }
  photoUrl?: string
}

interface CommunitySectionProps {
  members: CommunityMember[]
  title: string
  subtitle?: string
  locale: 'es' | 'en'
}

/**
 * Community Section
 *
 * Displays a grid of community member profile cards
 * showcasing local people involved in sustainable tourism.
 *
 * Used primarily by "comunidad" operator types, but can be
 * used by any operator to highlight local team members.
 */
export function CommunitySection({
  members,
  title,
  subtitle,
  locale,
}: CommunitySectionProps) {
  if (members.length === 0) return null

  return (
    <section className="py-16 bg-sand-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-volcanic-black mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-volcanic-black/70 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Community Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {members.map((member, index) => (
            <CommunityMemberCard
              key={index}
              name={member.name}
              role={member.role[locale]}
              story={member.story[locale]}
              photoUrl={member.photoUrl}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
