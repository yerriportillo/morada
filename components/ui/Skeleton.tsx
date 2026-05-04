import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'default' | 'circle' | 'text'
}

/**
 * Skeleton Loading Component
 *
 * A versatile skeleton loader for displaying loading states.
 * Uses CSS animation for a subtle shimmer effect.
 *
 * Variants:
 * - default: Rectangular shape
 * - circle: Circular shape (for avatars/photos)
 * - text: Thin line (for text placeholders)
 */
export function Skeleton({ className, variant = 'default' }: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-pacific-mist via-gray-200 to-pacific-mist bg-[length:200%_100%]'

  const variantClasses = {
    default: 'rounded-lg',
    circle: 'rounded-full',
    text: 'h-4 rounded',
  }

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

/**
 * Card Skeleton
 *
 * Skeleton loader for Card components
 */
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-volcanic-black/10 p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" variant="text" />
          <Skeleton className="h-4 w-full" variant="text" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" variant="text" />
          <Skeleton className="h-4 w-5/6" variant="text" />
          <Skeleton className="h-4 w-4/6" variant="text" />
        </div>

        {/* Footer */}
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

/**
 * Program Card Skeleton
 *
 * Skeleton loader for surf program cards
 */
export function ProgramCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-volcanic-black/10 p-6">
      <div className="space-y-4">
        {/* Title and badge */}
        <div className="flex items-start justify-between">
          <Skeleton className="h-6 w-2/3" variant="text" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" variant="text" />
          <Skeleton className="h-4 w-4/5" variant="text" />
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Skeleton className="h-3 w-12" variant="text" />
            <Skeleton className="h-5 w-20" variant="text" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-3 w-12" variant="text" />
            <Skeleton className="h-5 w-16" variant="text" />
          </div>
        </div>

        {/* Price and button */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-8 w-24" variant="text" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
    </div>
  )
}

/**
 * Surf Spot Card Skeleton
 *
 * Skeleton loader for surf spot cards
 */
export function SurfSpotCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-volcanic-black/10 p-6">
      <div className="space-y-4">
        {/* Title and region badge */}
        <div className="flex items-start justify-between mb-2">
          <Skeleton className="h-6 w-1/2" variant="text" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" variant="text" />
          <Skeleton className="h-4 w-3/4" variant="text" />
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="space-y-1">
            <Skeleton className="h-3 w-16" variant="text" />
            <Skeleton className="h-4 w-20" variant="text" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-3 w-16" variant="text" />
            <Skeleton className="h-4 w-24" variant="text" />
          </div>
        </div>

        {/* Button */}
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

/**
 * Community Member Card Skeleton
 *
 * Skeleton loader for community member profile cards
 */
export function CommunityMemberCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-volcanic-black/10 p-6">
      <div className="space-y-4">
        {/* Photo and name */}
        <div className="flex items-center gap-4">
          <Skeleton className="w-20 h-20" variant="circle" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-32" variant="text" />
            <Skeleton className="h-4 w-40" variant="text" />
          </div>
        </div>

        {/* Story */}
        <div className="space-y-2 pt-4">
          <Skeleton className="h-4 w-full" variant="text" />
          <Skeleton className="h-4 w-full" variant="text" />
          <Skeleton className="h-4 w-full" variant="text" />
          <Skeleton className="h-4 w-5/6" variant="text" />
        </div>
      </div>
    </div>
  )
}
