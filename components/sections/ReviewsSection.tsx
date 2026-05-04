'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'

interface Review {
  author: string
  authorUrl?: string
  profilePhoto?: string
  rating: number
  text: string
  date: string
  relativeTime: string
  language: string
}

interface ReviewsData {
  name?: string
  rating?: number
  totalReviews?: number
  reviews: Review[]
  mockData?: boolean
  cached?: boolean
  error?: string
}

interface ReviewsSectionProps {
  /**
   * Google Place ID for the operator
   */
  placeId?: string

  /**
   * Labels for bilingual support
   */
  labels: {
    title: string
    viewAllReviews: string
    basedOn: string
    reviews: string
    loading: string
    noReviews: string
    showMore: string
    showLess: string
  }

  /**
   * Maximum number of reviews to show initially
   */
  maxReviews?: number
}

/**
 * ReviewsSection - Displays Google Places reviews
 *
 * Usage:
 * ```tsx
 * <ReviewsSection
 *   placeId="ChIJ..."
 *   labels={{
 *     title: "Lo que dicen nuestros huéspedes",
 *     viewAllReviews: "Ver todas las reseñas",
 *     basedOn: "Basado en",
 *     reviews: "reseñas",
 *     loading: "Cargando reseñas...",
 *     noReviews: "No hay reseñas disponibles",
 *     showMore: "Mostrar más",
 *     showLess: "Mostrar menos"
 *   }}
 * />
 * ```
 */
export default function ReviewsSection({ placeId, labels, maxReviews = 3 }: ReviewsSectionProps) {
  const [data, setData] = useState<ReviewsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchReviews = async () => {
      if (!placeId) {
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/reviews/google?placeId=${placeId}`)
        const reviewsData = await response.json()
        setData(reviewsData)
      } catch (error) {
        console.error('Failed to fetch reviews:', error)
        setData({ reviews: [], error: 'Failed to load reviews' })
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [placeId])

  // Loading state
  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-48 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-volcanic-black/60">{labels.loading}</p>
          </div>
        </div>
      </section>
    )
  }

  // No reviews or error
  if (!data || data.reviews.length === 0) {
    return null // Don't show section if no reviews
  }

  const displayedReviews = showAll ? data.reviews : data.reviews.slice(0, maxReviews)

  return (
    <section className="py-16 bg-pacific-mist">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-volcanic-black mb-4">{labels.title}</h2>

          {data.rating && data.totalReviews && (
            <div className="flex items-center justify-center gap-2 text-lg">
              <div className="flex items-center gap-1">
                {renderStars(data.rating)}
                <span className="font-semibold text-volcanic-black ml-2">{data.rating.toFixed(1)}</span>
              </div>
              <span className="text-volcanic-black/60">
                ({labels.basedOn} {data.totalReviews} {labels.reviews})
              </span>
            </div>
          )}

          {data.mockData && (
            <p className="mt-2 text-sm text-orange-600">
              Demo Mode: Showing sample reviews (Google Places API not configured)
            </p>
          )}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedReviews.map((review, index) => (
            <Card key={index} variant="elevated" className="h-full">
              <CardContent className="p-6">
                {/* Author */}
                <div className="flex items-start gap-3 mb-4">
                  {review.profilePhoto ? (
                    <img
                      src={review.profilePhoto}
                      alt={review.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-ocean-blue text-white flex items-center justify-center font-semibold">
                      {review.author.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-volcanic-black">{review.author}</h3>
                    <p className="text-sm text-volcanic-black/60">{review.relativeTime}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">{renderStars(review.rating)}</div>

                {/* Review Text */}
                <p className="text-volcanic-black/80 leading-relaxed line-clamp-4">{review.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More/Less Button */}
        {data.reviews.length > maxReviews && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 border-2 border-ocean-blue text-ocean-blue font-semibold rounded-lg hover:bg-ocean-blue hover:text-white transition-colors"
            >
              {showAll ? labels.showLess : labels.showMore}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

/**
 * Render star rating
 */
function renderStars(rating: number) {
  return (
    <>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </>
  )
}
