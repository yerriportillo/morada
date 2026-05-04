import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface Program {
  id: string
  name: string
  shortDescription: string
  pricing: {
    priceUsd: number
  }
  duration: {
    days?: number
    hours?: number
  }
  capacity: {
    maxGuests: number
  }
  skillLevel?: string
}

interface ProgramsSectionProps {
  title: string
  programs: Program[]
  brandColor: string
  bookingUrl?: string
  labels: {
    from: string
    days: (count: number) => string
    hours: (count: number) => string
    capacity: string
    guests: (count: number) => string
    bookNow: string
  }
  skillLevelLabels: {
    beginner: string
    intermediate: string
    advanced: string
    all: string
  }
}

export function ProgramsSection({
  title,
  programs,
  brandColor,
  bookingUrl,
  labels,
  skillLevelLabels,
}: ProgramsSectionProps) {
  const getSkillLevelLabel = (level?: string) => {
    if (!level) return null
    return skillLevelLabels[level as keyof typeof skillLevelLabels]
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl font-display font-bold mb-12 text-center"
          style={{ color: brandColor }}
        >
          {title}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {programs.map((program) => (
            <Card key={program.id} variant="bordered" className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{program.name}</CardTitle>
                  {program.skillLevel && (
                    <span
                      className="text-xs px-2 py-1 rounded-full text-white font-medium"
                      style={{ backgroundColor: brandColor }}
                    >
                      {getSkillLevelLabel(program.skillLevel)}
                    </span>
                  )}
                </div>
                <CardDescription>{program.shortDescription}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1 space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-volcanic-black">
                    ${program.pricing.priceUsd}
                  </span>
                  <span className="text-sm text-volcanic-black/60">USD</span>
                </div>

                <div className="space-y-1.5 text-sm text-volcanic-black/80">
                  {program.duration.days && (
                    <div className="flex items-center gap-2">
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{labels.days(program.duration.days)}</span>
                    </div>
                  )}
                  {program.duration.hours && (
                    <div className="flex items-center gap-2">
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{labels.hours(program.duration.hours)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>
                      {labels.capacity}: {labels.guests(program.capacity.maxGuests)}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-4 border-t-0">
                {bookingUrl ? (
                  <Link href={bookingUrl} className="w-full">
                    <Button
                      variant="primary"
                      fullWidth
                      style={{ backgroundColor: brandColor }}
                    >
                      {labels.bookNow}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="primary"
                    fullWidth
                    style={{ backgroundColor: brandColor }}
                  >
                    {labels.bookNow}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
