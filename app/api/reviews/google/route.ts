import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory cache for reviews (POC - for production, use Redis or database)
const reviewsCache = new Map<
  string,
  {
    data: any
    timestamp: number
  }
>()

const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

interface GooglePlaceReview {
  author_name: string
  author_url?: string
  language: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}

interface GooglePlaceDetailsResponse {
  result: {
    name: string
    rating: number
    user_ratings_total: number
    reviews: GooglePlaceReview[]
  }
  status: string
}

/**
 * GET /api/reviews/google?placeId=ChIJ...
 *
 * Fetches Google Places reviews for an operator
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const placeId = searchParams.get('placeId')

    if (!placeId) {
      return NextResponse.json({ error: 'Missing placeId parameter' }, { status: 400 })
    }

    // Check if we have a valid cached response
    const cached = reviewsCache.get(placeId)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log('✅ Returning cached reviews for:', placeId)
      return NextResponse.json({
        ...cached.data,
        cached: true,
        cachedAt: new Date(cached.timestamp).toISOString(),
      })
    }

    // Check if Google Places API key is configured
    const apiKey = process.env.GOOGLE_PLACES_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'Google Places API not configured',
          message: 'Add GOOGLE_PLACES_API_KEY to environment variables',
          mockData: true,
          reviews: getMockReviews(),
        },
        { status: 200 }
      )
    }

    // Fetch from Google Places API
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}&language=en`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status}`)
    }

    const data: GooglePlaceDetailsResponse = await response.json()

    if (data.status !== 'OK') {
      console.error('Google Places API error:', data.status)
      return NextResponse.json(
        {
          error: 'Failed to fetch reviews',
          status: data.status,
          mockData: true,
          reviews: getMockReviews(),
        },
        { status: 200 }
      )
    }

    // Transform and filter reviews
    const reviews = (data.result.reviews || []).map((review) => ({
      author: review.author_name,
      authorUrl: review.author_url,
      profilePhoto: review.profile_photo_url,
      rating: review.rating,
      text: review.text,
      date: new Date(review.time * 1000).toISOString(),
      relativeTime: review.relative_time_description,
      language: review.language,
    }))

    const result = {
      name: data.result.name,
      rating: data.result.rating,
      totalReviews: data.result.user_ratings_total,
      reviews,
    }

    // Cache the result
    reviewsCache.set(placeId, {
      data: result,
      timestamp: Date.now(),
    })

    console.log('✅ Fetched fresh reviews for:', placeId, `(${reviews.length} reviews)`)

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('❌ Google Places API error:', error)

    // Return mock data on error (for POC graceful degradation)
    return NextResponse.json(
      {
        error: error.message,
        mockData: true,
        reviews: getMockReviews(),
      },
      { status: 200 }
    )
  }
}

/**
 * Mock reviews for POC (when API key is not configured)
 */
function getMockReviews() {
  return [
    {
      author: 'Sarah Johnson',
      rating: 5,
      text: 'Amazing surf experience! The instructors were patient and knowledgeable. El Tunco has perfect waves for beginners.',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      relativeTime: '1 week ago',
      language: 'en',
    },
    {
      author: 'Carlos Mendoza',
      rating: 5,
      text: '¡Excelente experiencia! El equipo es profesional y el ambiente es increíble. Definitivamente regresaré.',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      relativeTime: '2 weeks ago',
      language: 'es',
    },
    {
      author: 'Emily Chen',
      rating: 4,
      text: 'Great location and friendly staff. The waves were a bit challenging for beginners but overall a fantastic trip!',
      date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      relativeTime: '3 weeks ago',
      language: 'en',
    },
    {
      author: 'Miguel Ramirez',
      rating: 5,
      text: 'Una de las mejores experiencias de surf que he tenido. Los instructores son expertos y el lugar es hermoso.',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      relativeTime: '1 month ago',
      language: 'es',
    },
    {
      author: 'Jake Williams',
      rating: 5,
      text: 'Absolutely loved it! Perfect for intermediate surfers. The local vibe is authentic and welcoming.',
      date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      relativeTime: '1 month ago',
      language: 'en',
    },
  ]
}

/**
 * DELETE endpoint to clear cache (for testing)
 */
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const placeId = searchParams.get('placeId')

  if (placeId) {
    reviewsCache.delete(placeId)
    return NextResponse.json({ message: `Cache cleared for ${placeId}` })
  } else {
    reviewsCache.clear()
    return NextResponse.json({ message: 'All cache cleared' })
  }
}
