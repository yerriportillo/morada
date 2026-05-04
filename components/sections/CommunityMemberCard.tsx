import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'

interface CommunityMemberCardProps {
  name: string
  role: string
  story: string
  photoUrl?: string
  locale: string
}

/**
 * Community Member Profile Card
 *
 * Displays a community member's profile with:
 * - Circular photo
 * - Name and role
 * - First-person story (max 300 words)
 *
 * Used in community sections to showcase local people
 * involved in sustainable tourism initiatives.
 */
export function CommunityMemberCard({
  name,
  role,
  story,
  photoUrl,
  locale,
}: CommunityMemberCardProps) {
  // Truncate story to 300 words if needed
  const truncateToWords = (text: string, maxWords: number) => {
    const words = text.split(' ')
    if (words.length <= maxWords) return text
    return words.slice(0, maxWords).join(' ') + '...'
  }

  const truncatedStory = truncateToWords(story, 300)

  return (
    <Card variant="bordered" className="h-full flex flex-col">
      {/* Photo Header */}
      <div className="p-6 pb-0">
        <div className="flex items-center gap-4">
          {/* Circular Photo */}
          <div className="relative w-20 h-20 flex-shrink-0">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={name}
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-pacific-mist flex items-center justify-center">
                <span className="text-3xl text-ocean-blue">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Name and Role */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-volcanic-black">{name}</h3>
            <p className="text-sm text-volcanic-black/70 font-medium mt-1">{role}</p>
          </div>
        </div>
      </div>

      {/* Story Content */}
      <CardContent className="flex-1 pt-4">
        <div className="relative">
          {/* Opening quote mark */}
          <div className="absolute -left-2 -top-2 text-5xl text-ocean-blue/20 font-serif leading-none">
            "
          </div>

          <p className="text-volcanic-black/80 leading-relaxed italic pl-6">
            {truncatedStory}
          </p>

          {/* Closing quote mark */}
          <div className="text-right">
            <span className="text-5xl text-ocean-blue/20 font-serif leading-none">"</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
