import { Card, CardContent } from '@/components/ui/Card'

interface Guide {
  id: string
  name: string
  bio: string
  languages: string[]
  yearsExperience: number
  photo?: string
}

interface GuidesSectionProps {
  title: string
  guides: Guide[]
  brandColor: string
  labels: {
    languages: string
    yearsExperience: string
  }
}

export function GuidesSection({ title, guides, brandColor, labels }: GuidesSectionProps) {
  return (
    <section className="py-20 bg-sand-white">
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl font-display font-bold mb-12 text-center"
          style={{ color: brandColor }}
        >
          {title}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {guides.map((guide) => (
            <Card key={guide.id} variant="elevated" className="text-center">
              <CardContent className="pt-6">
                {/* Photo */}
                <div
                  className="w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-4xl font-display font-bold"
                  style={{ backgroundColor: brandColor }}
                >
                  {guide.photo ? (
                    <img
                      src={guide.photo}
                      alt={guide.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    guide.name.charAt(0)
                  )}
                </div>

                {/* Name */}
                <h3 className="text-xl font-display font-semibold text-volcanic-black mb-2">
                  {guide.name}
                </h3>

                {/* Bio */}
                <p className="text-volcanic-black/80 text-sm mb-4 leading-relaxed">
                  {guide.bio}
                </p>

                {/* Meta Info */}
                <div className="space-y-2 text-sm text-volcanic-black/60 border-t border-volcanic-black/10 pt-4">
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                      />
                    </svg>
                    <span>
                      {labels.languages}: {guide.languages.join(', ').toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                    <span>
                      {guide.yearsExperience} {labels.yearsExperience}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
