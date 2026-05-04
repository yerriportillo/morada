import { notFound } from 'next/navigation'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { mockSurfSpots, type SurfSpot } from '@/lib/mockData/surfSpots'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface SpotPageProps {
  params: {
    locale: string
    spotSlug: string
  }
}

export default function SurfSpotDetailPage({ params }: SpotPageProps) {
  const { spotSlug, locale } = params
  const t = useTranslations()
  const currentLocale = locale as 'es' | 'en'

  // Get spot data
  const spot = mockSurfSpots.find((s) => s.slug === spotSlug)

  if (!spot) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-ocean-blue text-white py-16">
          <div className="container mx-auto px-4">
            <Link
              href={`/${locale}/surf-guide`}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {t('nav.backToHome')}
            </Link>
            <h1 className="text-4xl md:text-5xl font-display font-bold">{spot.name}</h1>
            <p className="text-xl text-white/90 mt-2">
              {spot.region === 'la_libertad'
                ? t('surf.regions.la_libertad')
                : spot.region === 'eastern'
                ? t('surf.regions.eastern')
                : t('surf.regions.western')}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <Card variant="bordered">
                <CardContent className="pt-6">
                  <p className="text-lg text-volcanic-black/80 leading-relaxed">
                    {spot.notes[currentLocale]}
                  </p>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>{t('surf.spot.getDirections')}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="aspect-video bg-pacific-mist rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <svg
                        className="w-16 h-16 mx-auto mb-3 text-ocean-blue/40"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <p className="text-volcanic-black/60">
                        {currentLocale === 'es'
                          ? 'Mapa interactivo (próximamente)'
                          : 'Interactive map (coming soon)'}
                      </p>
                      <p className="text-sm text-volcanic-black/40 mt-2">
                        Lat: {spot.location.latitude.toFixed(4)}, Lng:{' '}
                        {spot.location.longitude.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Spot Info */}
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>{currentLocale === 'es' ? 'Información' : 'Information'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div>
                    <div className="text-sm text-volcanic-black/60 mb-1">
                      {t('surf.spot.breakType')}
                    </div>
                    <div className="font-medium text-volcanic-black">
                      {t(`surf.breakTypes.${spot.breakType}`)}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-volcanic-black/60 mb-1">
                      {t('surf.spot.skillLevel')}
                    </div>
                    <div className="font-medium text-volcanic-black">
                      {t(`surf.levels.${spot.skillLevel}`)}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-volcanic-black/60 mb-1">
                      {t('surf.spot.bestSeason')}
                    </div>
                    <div className="font-medium text-volcanic-black">{spot.bestSeason}</div>
                  </div>

                  <div>
                    <div className="text-sm text-volcanic-black/60 mb-1">
                      {t('surf.spot.bestTide')}
                    </div>
                    <div className="font-medium text-volcanic-black">
                      {t(`surf.tides.${spot.bestTide}`)}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-volcanic-black/60 mb-1">
                      {t('surf.spot.crowdRating')}
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-5 h-5 ${
                            star <= spot.crowdRating
                              ? 'text-sunset-coral fill-current'
                              : 'text-volcanic-black/20'
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs text-volcanic-black/60 mt-1">
                      {spot.crowdRating === 1
                        ? currentLocale === 'es'
                          ? 'Poco crowded'
                          : 'Not crowded'
                        : spot.crowdRating >= 4
                        ? currentLocale === 'es'
                          ? 'Muy crowded'
                          : 'Very crowded'
                        : currentLocale === 'es'
                        ? 'Moderadamente crowded'
                        : 'Moderately crowded'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Nearby Operators */}
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>{t('surf.spot.nearbyOperators')}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-sm text-volcanic-black/60 mb-4">
                    {currentLocale === 'es'
                      ? 'Encuentra operadores cerca de este spot:'
                      : 'Find operators near this spot:'}
                  </p>
                  <Link href={`/${locale}/puro-surf`}>
                    <Button variant="outline" fullWidth>
                      {currentLocale === 'es' ? 'Ver operadores' : 'View operators'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
