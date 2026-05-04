import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface SurfSpotCardProps {
  slug: string
  name: string
  region: string
  breakType: string
  skillLevel: string
  bestSeason: string
  bestTide: string
  crowdRating: number
  notes: string
  locale: string
  labels: {
    breakType: string
    skillLevel: string
    bestSeason: string
    bestTide: string
    crowdRating: string
    viewDetails: string
  }
  breakTypeLabels: {
    point: string
    beach: string
    reef: string
    river_mouth: string
  }
  skillLevelLabels: {
    beginner: string
    intermediate: string
    advanced: string
    all: string
  }
  tideLabels: {
    low: string
    mid: string
    high: string
    all: string
  }
  regionLabels: {
    la_libertad: string
    eastern: string
    western: string
  }
}

export function SurfSpotCard({
  slug,
  name,
  region,
  breakType,
  skillLevel,
  bestSeason,
  bestTide,
  crowdRating,
  notes,
  locale,
  labels,
  breakTypeLabels,
  skillLevelLabels,
  tideLabels,
  regionLabels,
}: SurfSpotCardProps) {
  return (
    <Card variant="bordered" className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-xl">{name}</CardTitle>
          <span className="text-xs px-2 py-1 rounded-full bg-ocean-blue/10 text-ocean-blue font-medium">
            {regionLabels[region as keyof typeof regionLabels]}
          </span>
        </div>
        <CardDescription className="line-clamp-2">{notes}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 pt-6">
        {/* Break Type & Skill Level */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-volcanic-black/60 text-xs mb-1">
              {labels.breakType}
            </div>
            <div className="font-medium text-volcanic-black">
              {breakTypeLabels[breakType as keyof typeof breakTypeLabels]}
            </div>
          </div>
          <div>
            <div className="text-volcanic-black/60 text-xs mb-1">
              {labels.skillLevel}
            </div>
            <div className="font-medium text-volcanic-black">
              {skillLevelLabels[skillLevel as keyof typeof skillLevelLabels]}
            </div>
          </div>
        </div>

        {/* Season & Tide */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-volcanic-black/60 text-xs mb-1">
              {labels.bestSeason}
            </div>
            <div className="font-medium text-volcanic-black">{bestSeason}</div>
          </div>
          <div>
            <div className="text-volcanic-black/60 text-xs mb-1">
              {labels.bestTide}
            </div>
            <div className="font-medium text-volcanic-black">
              {tideLabels[bestTide as keyof typeof tideLabels]}
            </div>
          </div>
        </div>

        {/* Crowd Rating */}
        <div>
          <div className="text-volcanic-black/60 text-xs mb-1">
            {labels.crowdRating}
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-4 h-4 ${
                  star <= crowdRating
                    ? 'text-sunset-coral fill-current'
                    : 'text-volcanic-black/20'
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        {/* View Details Button */}
        <div className="pt-3">
          <Link href={`/${locale}/surf-guide/${slug}`}>
            <Button variant="outline" fullWidth>
              {labels.viewDetails}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
